export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Check cache first (10 minutes TTL for config)
  const cacheKey = 'portal_config'
  const cached = getCached(cacheKey, 10)
  if (cached) {
    console.log('Returning cached config data')
    return cached
  }

  try {
    console.log('Fetching config from portal...')
    // First, login to get token
    const loginResponse = await $fetch('http://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: config.apiLoginEmail,
        password: config.apiLoginPassword
      },
      timeout: 30000, // 30 seconds timeout
      redirect: 'follow' // Follow redirects explicitly
    })

    // Extract token from response
    const token = (loginResponse as any).token

    if (!token) {
      throw new Error('No token received from login')
    }

    // Then fetch config with the token
    const configResponse = await $fetch('http://portal.digitalssolutions.de/api/config', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 30000, // 30 seconds timeout
      redirect: 'follow' // Follow redirects explicitly
    })

    // Cache the successful response
    setCache(cacheKey, configResponse)
    console.log('Config fetched and cached successfully')

    return configResponse
  } catch (error: any) {
    console.error('Server API error:', error)
    console.log('Returning fallback config data')

    // Return fallback config instead of throwing error
    const fallbackConfig = {
      company: {
        name: 'TaGaKaM&Co',
        email: 'info@tagakam.de',
        phone: '+49 123 456789',
        address: 'Deutschland'
      },
      social: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
      },
      settings: {
        maintenanceMode: false
      }
    }

    // Cache the fallback config
    setCache(cacheKey, fallbackConfig)

    return fallbackConfig
  }
})
