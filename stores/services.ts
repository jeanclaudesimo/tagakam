import { defineStore } from 'pinia'
import type { Service } from '~/types/api'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [] as Service[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    activeServices(): Service[] {
      return this.services.filter(s => s.active)
    },

    isLoaded(): boolean {
      return this.services.length > 0
    }
  },

  actions: {
    setServices(services: Service[]) {
      this.services = services
      this.error = null
    },

    setError(error: string) {
      this.error = error
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    async fetchServices() {
      if (this.isLoaded) {
        return // Already loaded
      }

      this.setLoading(true)
      this.setError(null)

      try {
        const data = await $fetch('/api/services')
        this.setServices((data as any).services || [])
      } catch (error: any) {
        console.error('Error fetching services:', error)
        this.setError(error.message || 'Failed to fetch services')
      } finally {
        this.setLoading(false)
      }
    }
  }
})
