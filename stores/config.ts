import { defineStore } from 'pinia'
import type { ConfigResponse, ContactInfo } from '~/types/api'
import { configData } from '~/data/config'

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as ConfigResponse | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    contact(): ContactInfo | null {
      return this.config?.contact || null
    }
  },

  actions: {
    async fetchConfig() {
      this.loading = true
      this.error = null

      try {
        const api = usePortalAPI()
        const data = await api.getConfig()
        this.config = data
      } catch (error: any) {
        // Silently fall back to local data
        this.config = configData
      } finally {
        this.loading = false
      }
    }
  }
})
