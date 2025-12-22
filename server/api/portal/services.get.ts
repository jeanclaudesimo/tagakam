export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const apiUrl = config.public.portalApiUrl as string
    // Use tenant key from config or fallback to default
    const tenantKey = config.apiTenantKey || config.public.portalApiKey || '8d1222ab7ba5da0eb4c83b17da0cbdf9176ccec9ef6127510978f4d734f7fa79'

    if (!tenantKey) {
      throw createError({
        statusCode: 500,
        message: 'API_TENANT_KEY is not configured'
      })
    }

    const response = await $fetch(`${apiUrl}/services`, {
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
    const message = error.message || error.data?.message || 'Failed to fetch services'
    
    // Ne pas logger les erreurs de timeout/connection comme des erreurs critiques
    const isTimeout = error.cause?.name === 'ConnectTimeoutError' || 
                     error.message?.includes('timeout') ||
                     error.message?.includes('fetch failed')
    
    if (isTimeout) {
      console.warn('[API] Timeout connecting to services API - using local data')
    } else {
      console.error('[API] Failed to fetch services:', {
        status,
        message,
        details: error.data || error
      })
    }
    
    // Lancer l'erreur pour que le store puisse utiliser les données locales
    throw createError({
      statusCode: status,
      message
    })
  }
})

