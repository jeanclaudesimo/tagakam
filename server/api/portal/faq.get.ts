export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const apiUrl = config.public.portalApiUrl as string
    // Use tenant key from config or fallback to default
    const tenantKey = config.apiTenantKey || config.public.portalApiKey || 'ce9563cab5f81156b3c1f6ba86ace15c5c1c48f97c4a4a68049d7e84f10a4d23'

    if (!tenantKey) {
      throw createError({
        statusCode: 500,
        message: 'API_TENANT_KEY is not configured'
      })
    }

    const response = await $fetch(`${apiUrl}/faq`, {
      params: {
        tenant_key: tenantKey
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error: any) {
    const status = error.statusCode || error.status || 500
    const message = error.message || error.data?.message || 'Failed to fetch FAQs'
    console.error('[API] Failed to fetch FAQs:', {
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

