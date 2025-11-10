export default defineEventHandler(async (event) => {
  try {
    // First, login to get token
    const loginResponse = await $fetch('https://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: 'claude@c-simweb.de',
        password: 'Da##29031990'
      }
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
      }
    })

    console.log('Config API response:', JSON.stringify(configResponse, null, 2))
    return configResponse
  } catch (error: any) {
    console.error('Server API error:', error)

    // Return fallback data if API fails (matching exact API structure)
    return {
      contact: {
        company_name: 'tagakam',
        address_line1: 'Bergisch Gladbacher Str. 427',
        address_line2: null,
        postal_code: 'D-51067',
        city: 'Köln',
        country: 'Deutschland',
        phone: '+49 221 2981 3937',
        email: 'info@tagakam.de',
        support_email: 'info@tagakam.de',
        website: 'https://www.tagakam.de',
        opening_hours: null,
        social_links: null
      },
      smtp: {
        host: null,
        port: null,
        username: 'info@tagakam.de',
        password: 'tagakam.de',
        encryption: null,
        from_email: 'info@tagakam.de',
        from_name: 'Tagakam'
      },
      tenant: {
        id: 2,
        name: 'tagakam',
        domain: 'tagakam.de'
      }
    }
  }
})
