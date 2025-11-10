export default defineEventHandler(async (event) => {
  try {
    // First, login to get token
    const loginResponse = await $fetch('https://portal.digitalssolutions.de/api/login', {
      method: 'POST',
      body: {
        email: 'info@tagakam.de',
        password: 'tagakam'
      }
    })

    // Extract token from response
    const token = (loginResponse as any).token

    if (!token) {
      throw new Error('No token received from login')
    }

    // Then fetch team with the token
    const teamResponse = await $fetch('https://portal.digitalssolutions.de/api/team', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return teamResponse
  } catch (error: any) {
    console.error('Server API error:', error)

    // Return fallback data if API fails
    return {
      team: [
        {
          id: 1,
          name: 'Dipl.-Ing Brice Tagakam',
          position: 'Geschäftsführer',
          email: 'b.tagakam@tagakam.de',
          avatar: null,
          social: {
            twitter: '',
            facebook: '',
            linkedin: ''
          },
          active: true
        },
        {
          id: 2,
          name: 'Doriane Ngatchie',
          position: 'Praktikantin',
          email: 'd.ngatchie@tagakam.de',
          avatar: null,
          social: {
            twitter: '',
            facebook: '',
            linkedin: ''
          },
          active: true
        },
        {
          id: 3,
          name: 'Claude Simo',
          position: 'IT',
          email: 'it@tagakam.de',
          avatar: null,
          social: {
            twitter: '',
            facebook: '',
            linkedin: ''
          },
          active: true
        },
        {
          id: 4,
          name: 'Stephanie',
          position: 'Marketing',
          email: 'step@tagakam.de',
          avatar: null,
          social: {
            twitter: '',
            facebook: '',
            linkedin: ''
          },
          active: true
        }
      ].filter(member => member.active),
      total: 4
    }
  }
})
