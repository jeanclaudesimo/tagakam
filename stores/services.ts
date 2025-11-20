import { defineStore } from 'pinia'
import type { Service } from '~/types/api'
import { servicesData } from '~/data/services'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [] as Service[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    activeServices(): Service[] {
      return this.services.filter(s => s.active)
    }
  },

  actions: {
    async fetchServices() {
      this.loading = true
      this.error = null

      try {
        const api = usePortalAPI()
        const data = await api.getServices()
        this.services = data.services || []
      } catch (error: any) {
        // Silently fall back to local data
        this.services = servicesData
      } finally {
        this.loading = false
      }
    }
  }
})
