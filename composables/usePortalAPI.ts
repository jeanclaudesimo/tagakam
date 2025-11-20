export const usePortalAPI = () => {
  const getServices = async () => {
    try {
      const response = await $fetch('/api/portal/services')
      return response
    } catch (error: any) {
      const status = error.statusCode || error.status
      if (status === 401 || status === 403) {
        console.warn('[API] Authentication failed - using local data')
      } else {
        console.warn('[API] Failed to fetch services - using local data')
      }
      throw new Error('API_FAILED')
    }
  }

  const getTeam = async () => {
    try {
      const response = await $fetch('/api/portal/team')
      return response
    } catch (error: any) {
      const status = error.statusCode || error.status
      if (status === 401 || status === 403) {
        console.warn('[API] Authentication failed - using local data')
      } else {
        console.warn('[API] Failed to fetch team - using local data')
      }
      throw new Error('API_FAILED')
    }
  }

  const getFaqs = async () => {
    try {
      const response = await $fetch('/api/portal/faq')
      return response
    } catch (error: any) {
      const status = error.statusCode || error.status
      if (status === 401 || status === 403) {
        console.warn('[API] Authentication failed - using local data')
      } else {
        console.warn('[API] Failed to fetch FAQs - using local data')
      }
      throw new Error('API_FAILED')
    }
  }

  const getConfig = async () => {
    try {
      const response = await $fetch('/api/portal/config')
      return response
    } catch (error: any) {
      const status = error.statusCode || error.status
      if (status === 401 || status === 403) {
        console.warn('[API] Authentication failed - using local data')
      } else {
        console.warn('[API] Failed to fetch config - using local data')
      }
      throw new Error('API_FAILED')
    }
  }

  return {
    getServices,
    getTeam,
    getFaqs,
    getConfig
  }
}
