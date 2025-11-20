import type { H3Event } from 'h3'

let cachedToken: string | null = null
let tokenExpiry: number = 0

export async function getApiToken(event?: H3Event): Promise<string | null> {
  const config = useRuntimeConfig(event)
  const apiUrl = config.public.portalApiUrl as string
  const email = config.apiLoginEmail as string
  const password = config.apiLoginPassword as string

  // Si pas de credentials, retourner null
  if (!email || !password) {
    console.error('[API Auth] Missing credentials:', {
      hasEmail: !!email,
      hasPassword: !!password,
      emailLength: email?.length || 0,
      passwordLength: password?.length || 0
    })
    return null
  }

  // Vérifier si le token est encore valide (avec une marge de 5 minutes)
  const now = Date.now()
  if (cachedToken && tokenExpiry > now + 5 * 60 * 1000) {
    return cachedToken
  }

  try {
    console.log('[API Auth] Attempting login with:', {
      apiUrl: `${apiUrl}/login`,
      email: email.substring(0, 5) + '***', // Log partiel pour sécurité
      hasPassword: !!password
    })

    // Faire le login pour obtenir le token
    const response = await $fetch<{ token?: string; code?: number; message?: string }>(
      `${apiUrl}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password
        },
        timeout: 10000, // 10 secondes timeout pour le login
        retry: 1, // Retry une fois en cas d'échec
        retryDelay: 1000 // Attendre 1 seconde avant le retry
      }
    )

    if (response.token) {
      cachedToken = response.token
      // Supposons que le token expire dans 24h (ajuster selon vos besoins)
      tokenExpiry = now + 24 * 60 * 60 * 1000
      console.log('[API Auth] Successfully authenticated and cached token (length:', response.token.length, ')')
      return cachedToken
    }

    console.error('[API Auth] Login failed - no token in response:', {
      hasToken: !!response.token,
      code: response.code,
      message: response.message,
      responseKeys: Object.keys(response)
    })
    return null
  } catch (error: any) {
    console.error('[API Auth] Login error:', {
      message: error.message || error,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      data: error.data,
      cause: error.cause?.name || error.cause
    })
    return null
  }
}

export function clearApiToken() {
  cachedToken = null
  tokenExpiry = 0
}

