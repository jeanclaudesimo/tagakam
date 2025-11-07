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

    return configResponse
  } catch (error: any) {
    console.error('Server API error:', error)

    // Return fallback data if API fails
    return {
      contact: {
        company_name: 'TaGaKaM&Co',
        address_line1: 'Bergisch Gladbacher Str.427',
        address_line2: null,
        postal_code: 'D-51067',
        city: 'Köln',
        country: 'Deutschland',
        phone: '0221 2981 3937',
        email: 'info@tagakam.de',
        support_email: 'info@tagakam.de',
        website: 'https://tagakam.de',
        opening_hours: null,
        social_links: null
      },
      smtp: {
        host: null,
        port: null,
        username: null,
        password: null,
        encryption: null,
        from_email: 'noreply@tagakam.de',
        from_name: 'TaGaKaM&Co'
      },
      tenant: {
        id: 1,
        name: 'TaGaKaM&Co',
        domain: 'https://tagakam.de'
      }
    }
  }
})
