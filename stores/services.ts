import { defineStore } from 'pinia'
import type { Service } from '~/types/api'
import { servicesData } from '~/data/services'

// API response format from Portal
interface ApiService {
  id: number
  title: string
  description: string
  detailedDescription: string
  icon: string
  image: string
  price: number | null
  duration: string | null
  features: string[] | null
  category: string | null
  sortOrder: number
}

// Transform API service to local format
function transformService(apiService: ApiService): Service {
  return {
    id: apiService.id,
    title: apiService.title,
    description: apiService.description,
    detailedDescription: apiService.detailedDescription,
    icon: apiService.icon,
    image: apiService.image,
    active: true, // API only returns active services
    serviceItems: apiService.features || undefined
  }
}

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: servicesData as Service[], // Initialize with local data for hydration
    loading: false,
    error: null as string | null,
    fetched: false // Flag to avoid multiple calls
  }),

  getters: {
    activeServices(): Service[] {
      return this.services.filter(s => s.active)
    }
  },

  actions: {
    async fetchServices(force = false) {
      // Avoid multiple simultaneous calls
      if (this.loading) {
        return
      }

      // If already fetched and not forced, don't refetch
      if (this.fetched && !force) {
        return
      }

      // Don't make API call on server side
      if (process.server) {
        this.fetched = true
        return
      }

      this.loading = true
      this.error = null

      try {
        // Call to portal API (client-side only)
        const response = await $fetch<ApiService[]>('/api/portal/services')

        if (response && Array.isArray(response) && response.length > 0) {
          this.services = response.map(transformService)
        }
        // Otherwise keep local data already initialized

        this.fetched = true
      } catch (error: any) {
        console.warn('[Services Store] Failed to fetch services from API, keeping local data:', error.message || error)
        this.error = error.message || 'Failed to fetch services'
        // Keep local data already initialized
        this.fetched = true // Mark as fetched even on error to avoid loops
      } finally {
        this.loading = false
      }
    }
  }
})
