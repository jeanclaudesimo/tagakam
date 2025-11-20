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
  const cacheKey = `faq_${tenantKey}`
  const cached = getCached(cacheKey, 5)
  if (cached) {
    console.log('Returning cached FAQ data')
    return cached
  }

  try {
    console.log('Fetching FAQ data from portal...')
    const response = await $fetch(`${config.public.apiBase}/faq`, {
      params: {
        tenant_key: tenantKey
      },
      timeout: 30000, // 30 seconds timeout
      redirect: 'follow' // Follow redirects explicitly
    })

    // Cache the successful response
    setCache(cacheKey, response)
    console.log('FAQ data fetched and cached successfully')

    return response
  } catch (error: any) {
    console.error('Error fetching FAQ from portal:', error)
    console.log('Returning fallback FAQ data')

    // Return fallback data instead of throwing error
    const fallbackData = {
      faqs: [
        {
          id: 1,
          question: 'Welche Dienstleistungen bieten Sie an?',
          answer: 'Wir bieten umfassende Dienstleistungen in den Bereichen KFZ-Zulassung, Transport & Logistik, Reiseveranstaltungen, Immobilien und Versicherungen.'
        },
        {
          id: 2,
          question: 'Wie kann ich Sie kontaktieren?',
          answer: 'Sie können uns per E-Mail unter info@tagakam.de oder telefonisch erreichen. Nutzen Sie auch gerne unser Kontaktformular.'
        },
        {
          id: 3,
          question: 'Wo sind Sie tätig?',
          answer: 'Wir sind deutschlandweit tätig und bieten auch internationale Dienstleistungen an.'
        }
      ]
    }

    // Cache the fallback data too
    setCache(cacheKey, fallbackData)

    return fallbackData
  }
})
