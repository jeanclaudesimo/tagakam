import { defineStore } from 'pinia'
import type { Partner } from '~/types/api'
import { partnersData } from '~/data/partners'

export const usePartnersStore = defineStore('partners', {
  state: () => ({
    partners: partnersData as Partner[], // Initialize with local data for hydration
    loading: false,
    error: null as string | null,
    fetched: false // Flag to avoid multiple calls
  }),

  getters: {
    sortedPartners(): Partner[] {
      return [...this.partners].sort((a, b) => a.sortOrder - b.sortOrder)
    }
  },

  actions: {
    async fetchPartners(force = false) {
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
        const response = await $fetch<Partner[]>('/api/portal/partners')

        if (response && Array.isArray(response) && response.length > 0) {
          this.partners = response
        }
        // Otherwise keep local data already initialized

        this.fetched = true
      } catch (error: any) {
        console.warn('[Partners Store] Failed to fetch partners from API, keeping local data:', error.message || error)
        this.error = error.message || 'Failed to fetch partners'
        // Keep local data already initialized
        this.fetched = true // Mark as fetched even on error to avoid loops
      } finally {
        this.loading = false
      }
    }
  }
})
