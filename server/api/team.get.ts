export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const tenantKey = config.apiTenantKey

  if (!tenantKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API_TENANT_KEY is not configured'
    })
  }

  // Check cache first (5 minutes TTL)
  const cacheKey = `team_${tenantKey}`
  const cached = getCached(cacheKey, 5)
  if (cached) {
    console.log('Returning cached team data')
    return cached
  }

  try {
    console.log('Fetching team data from portal...')
    const response = await $fetch(`${config.public.apiBase}/team`, {
      params: {
        tenant_key: tenantKey
      },
      timeout: 30000 // 30 seconds timeout
    })

    // Cache the successful response
    setCache(cacheKey, response)
    console.log('Team data fetched and cached successfully')

    return response
  } catch (error: any) {
    console.error('Error fetching team from portal:', error)
    console.log('Returning fallback team data')

    // Return fallback data instead of throwing error
    const fallbackData = {
      team: [
        {
          id: 1,
          name: 'Nasser Toma',
          position: 'CEO & Founder',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          bio: 'Gründer und Geschäftsführer von TaGaKaM&Co'
        },
        {
          id: 2,
          name: 'Team Member',
          position: 'Specialist',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
          bio: 'Spezialist für Business-Partnerschaften'
        }
      ]
    }

    // Cache the fallback data too
    setCache(cacheKey, fallbackData)

    return fallbackData
  }
})
