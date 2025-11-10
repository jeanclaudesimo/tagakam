export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  try {
    // First, login to get token
    const loginResponse = await $fetch('https://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: config.apiLoginEmail,
        password: config.apiLoginPassword
      }
    })

    // Extract token from response
    const token = (loginResponse as any).token

    if (!token) {
      throw new Error('No token received from login')
    }

    // Then fetch services with the token
    const servicesResponse = await $fetch('https://portal.digitalssolutions.de/api/services', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return servicesResponse
  } catch (error: any) {
    console.error('Server API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch services from API'
    })
  }
})
