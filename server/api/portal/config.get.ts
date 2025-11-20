import { getApiToken } from '~/server/utils/apiAuth'

export default defineEventHandler(async (event) => {
  try {
    const token = await getApiToken(event)
    
    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'API authentication failed'
      })
    }

    const config = useRuntimeConfig(event)
    const apiUrl = config.public.portalApiUrl as string

    const response = await $fetch(`${apiUrl}/config`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error: any) {
    const status = error.statusCode || error.status || 500
    const message = error.message || error.data?.message || 'Failed to fetch config'
    console.error('[API] Failed to fetch config:', {
      status,
      message,
      details: error.data || error
    })
    throw createError({
      statusCode: status,
      message
    })
  }
})

