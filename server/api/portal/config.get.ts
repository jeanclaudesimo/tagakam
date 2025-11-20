import { getApiToken } from '~/server/utils/apiAuth'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const email = config.apiLoginEmail as string
    const password = config.apiLoginPassword as string
    
    // Vérifier si les credentials sont configurés
    if (!email || !password) {
      console.error('[API Config] Missing credentials:', {
        hasEmail: !!email,
        hasPassword: !!password,
        emailValue: email || 'not set',
        passwordValue: password ? '***' : 'not set'
      })
      throw createError({
        statusCode: 401,
        message: 'API authentication failed - API_LOGIN_EMAIL and API_LOGIN_PASSWORD must be configured'
      })
    }
    
    const token = await getApiToken(event)
    
    if (!token) {
      console.error('[API Config] Failed to obtain JWT token after login attempt')
      throw createError({
        statusCode: 401,
        message: 'API authentication failed - could not obtain JWT token'
      })
    }
    
    console.log('[API Config] Using JWT token (length:', token.length, ')')

    const apiUrl = config.public.portalApiUrl as string

    const response = await $fetch(`${apiUrl}/config`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000, // 15 secondes timeout
      retry: 1, // Retry une fois en cas d'échec
      retryDelay: 1000 // Attendre 1 seconde avant le retry
    })

    return response
  } catch (error: any) {
    const status = error.statusCode || error.status || 500
    const message = error.message || error.data?.message || 'Failed to fetch config'
    
    // Ne pas logger les erreurs de timeout/connection comme des erreurs critiques
    const isTimeout = error.cause?.name === 'ConnectTimeoutError' || 
                     error.message?.includes('timeout') ||
                     error.message?.includes('fetch failed')
    
    if (isTimeout) {
      console.warn('[API] Timeout connecting to config API - using local data')
    } else if (status === 401) {
      console.warn('[API] Authentication failed for config - using local data')
    } else {
      console.error('[API] Failed to fetch config:', {
        status,
        message,
        details: error.data || error
      })
    }
    
    throw createError({
      statusCode: status,
      message
    })
  }
})

