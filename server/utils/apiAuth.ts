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
    return null
  }

  // Vérifier si le token est encore valide (avec une marge de 5 minutes)
  const now = Date.now()
  if (cachedToken && tokenExpiry > now + 5 * 60 * 1000) {
    return cachedToken
  }

  try {
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
      console.log('[API Auth] Successfully authenticated and cached token')
      return cachedToken
    }

    console.error('[API Auth] Login failed:', response.message || 'Unknown error', response)
    return null
  } catch (error: any) {
    console.error('[API Auth] Login error:', error.message || error, {
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      data: error.data
    })
    return null
  }
}

export function clearApiToken() {
  cachedToken = null
  tokenExpiry = 0
}

