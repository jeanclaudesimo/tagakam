export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const tenantKey = config.apiTenantKey

  console.log('[API Services] Tenant Key:', tenantKey ? 'Present' : 'Missing')
  console.log('[API Services] API Base:', config.public.apiBase)

  if (!tenantKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API_TENANT_KEY is not configured'
    })
  }

  const url = `${config.public.apiBase}/services?tenant_key=${tenantKey}`
  console.log('[API Services] Fetching:', url)

  try {
    const response = await $fetch(`${config.public.apiBase}/services`, {
      params: {
        tenant_key: tenantKey
      }
    })

    console.log('[API Services] Success:', response)
    return response
  } catch (error: any) {
    console.error('[API Services] Error details:', {
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      message: error.message,
      data: error.data
    })
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch services',
      data: error.data
    })
  }
})
