export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  try {
    // First, login to get token
    const loginResponse = await $fetch('https://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: config.apiLoginEmail,
        password: config.apiLoginPassword
      },
      timeout: 30000 // 30 seconds timeout
    })

    // Extract token from response
    const token = (loginResponse as any).token

    if (!token) {
      throw new Error('No token received from login')
    }

    // Then fetch config with the token
    const configResponse = await $fetch('https://portal.digitalssolutions.de/api/config', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 30000 // 30 seconds timeout
    })

    console.log('Config API response:', JSON.stringify(configResponse, null, 2))
    return configResponse
  } catch (error: any) {
    console.error('Server API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch configuration from API'
    })
  }
})
