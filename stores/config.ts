import { defineStore } from 'pinia'
import type { ConfigResponse, ContactInfo } from '~/types/api'

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as ConfigResponse | null,
    loading: false,
    error: null as string | null,
    token: null as string | null,
  }),

  getters: {
    contact(): ContactInfo | null {
      return this.config?.contact || null
    },

    isLoaded(): boolean {
      return this.config !== null
    },

    hasError(): boolean {
      return this.error !== null
    }
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    setConfig(config: ConfigResponse) {
      this.config = config
      this.error = null
    },

    setError(error: string) {
      this.error = error
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    async fetchConfig() {
      if (this.config) {
        return // Already loaded
      }

      this.setLoading(true)
      this.setError(null)

      try {
        // Call server API route (no CORS issues)
        const configData = await $fetch('/api/config')
        this.setConfig(configData as ConfigResponse)
      } catch (error: any) {
        console.error('Error fetching config:', error)
        this.setError(error.message || 'Failed to fetch configuration')
      } finally {
        this.setLoading(false)
      }
    }
  }
})
