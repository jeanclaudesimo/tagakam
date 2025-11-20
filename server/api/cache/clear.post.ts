// Endpoint to clear cache manually
export default defineEventHandler(async (event) => {
  try {
    // Get optional cache key from query params
    const query = getQuery(event)
    const key = query.key as string | undefined

    clearCache(key)

    return {
      success: true,
      message: key ? `Cache cleared for key: ${key}` : 'All cache cleared'
    }
  } catch (error: any) {
    console.error('Error clearing cache:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to clear cache'
    })
  }
})
