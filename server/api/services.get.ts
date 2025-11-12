export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const tenantKey = config.apiTenantKey

  if (!tenantKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API_TENANT_KEY is not configured'
    })
  }

  try {
    const response = await $fetch(`${config.public.apiBase}/services`, {
      params: {
        tenant_key: tenantKey
      }
    })

    return response
  } catch (error: any) {
    console.error('Error fetching services from portal:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch services'
    })
  }
})
