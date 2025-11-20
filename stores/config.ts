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

      // Use local data directly - no API call
      this.config = configData
      this.loading = false
    }
  }
})
