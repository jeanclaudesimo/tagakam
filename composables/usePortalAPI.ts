export const usePortalAPI = () => {
  const getServices = async () => {
    try {
      const response = await $fetch('/api/portal/services')
      return response
    } catch (error: any) {
      // Silently fail - stores will use local data
      throw new Error('API_FAILED')
    }
  }

  const getTeam = async () => {
    try {
      const response = await $fetch('/api/portal/team')
      return response
    } catch (error: any) {
      // Silently fail - stores will use local data
      throw new Error('API_FAILED')
    }
  }

  const getFaqs = async () => {
    try {
      const response = await $fetch('/api/portal/faq')
      return response
    } catch (error: any) {
      // Silently fail - stores will use local data
      throw new Error('API_FAILED')
    }
  }

  return {
    getServices,
    getTeam,
    getFaqs
  }
}
