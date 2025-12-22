export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const apiUrl = config.public.portalApiUrl as string
    // Use tenant key from config or fallback to default
    const tenantKey = config.apiTenantKey || config.public.portalApiKey || '8d1222ab7ba5da0eb4c83b17da0cbdf9176ccec9ef6127510978f4d734f7fa79'

    if (!tenantKey) {
      console.warn('[API] API_TENANT_KEY is not configured - returning empty array')
      return []
    }

    const response = await $fetch(`${apiUrl}/team`, {
      params: {
        tenant_key: tenantKey
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000, // 15 secondes timeout
      retry: 1, // Retry une fois en cas d'échec
      retryDelay: 1000 // Attendre 1 seconde avant le retry
    })

    return response
  } catch (error: any) {
    const status = error.statusCode || error.status || 500
    const message = error.message || error.data?.message || 'Failed to fetch team'
    
    // Ne pas logger les erreurs de timeout/connection comme des erreurs critiques
    const isTimeout = error.cause?.name === 'ConnectTimeoutError' || 
                     error.message?.includes('timeout') ||
                     error.message?.includes('fetch failed')
    
    if (isTimeout) {
      console.warn('[API] Timeout connecting to team API - returning empty array')
    } else {
      console.error('[API] Failed to fetch team:', {
        status,
        message,
        details: error.data || error
      })
    }
    
    // Retourner un tableau vide au lieu de lancer une erreur pour éviter les rechargements
    // Le store utilisera les données locales en fallback
    return []
  }
})

