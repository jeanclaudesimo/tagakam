import axios from 'axios'

export const usePortalAPI = () => {
  const config = useRuntimeConfig()

  const client = axios.create({
    baseURL: config.public.portalApiUrl as string,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const apiKey = config.public.portalApiKey as string

  const getServices = async () => {
    try {
      const response = await client.get('/services', {
        params: { tenant_key: apiKey }
      })
      return response.data
    } catch (error: any) {
      const status = error.response?.status
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
      const response = await client.get('/team', {
        params: { tenant_key: apiKey }
      })
      return response.data
    } catch (error: any) {
      const status = error.response?.status
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
      const response = await client.get('/faq', {
        params: { tenant_key: apiKey }
      })
      return response.data
    } catch (error: any) {
      const status = error.response?.status
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
      const response = await client.get('/config', {
        params: { tenant_key: apiKey }
      })
      return response.data
    } catch (error: any) {
      const status = error.response?.status
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
