import type { LoginRequest, LoginResponse, ConfigResponse } from '~/types/api'

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await $fetch<LoginResponse>(`${baseURL}/login`, {
        method: 'POST',
        body: credentials,
      })
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const getConfig = async (token: string): Promise<ConfigResponse> => {
    try {
      const response = await $fetch<ConfigResponse>(`${baseURL}/config`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      console.error('Config fetch error:', error)
      throw error
    }
  }

  return {
    login,
    getConfig,
  }
}
