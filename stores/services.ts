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

      // Use local data directly - no API call
      this.services = servicesData
      this.loading = false
    }
  }
})
