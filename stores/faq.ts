import { defineStore } from 'pinia'
import type { FAQ } from '~/types/api'
import { faqData } from '~/data/faq'

export const useFaqStore = defineStore('faq', {
  state: () => ({
    faqs: faqData as FAQ[], // Initialize with local data for hydration
    loading: false,
    error: null as string | null,
    fetched: false // Flag to avoid multiple calls
  }),

  getters: {
    activeFaqs(): FAQ[] {
      return this.faqs.filter(f => f.active).sort((a, b) => a.order - b.order)
    }
  },

  actions: {
    async fetchFaqs(force = false) {
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
        const response = await $fetch<{ faqs: FAQ[], total: number } | FAQ[]>('/api/portal/faq')

        let apiFaqData: FAQ[] = []

        if (response && typeof response === 'object') {
          if ('faqs' in response && Array.isArray(response.faqs)) {
            // Handle wrapped response: {faqs: [...], total: N}
            apiFaqData = response.faqs
          } else if (Array.isArray(response)) {
            // Handle direct array response
            apiFaqData = response
          }
        }

        if (apiFaqData.length > 0) {
          this.faqs = apiFaqData
        }
        // Otherwise keep local data already initialized

        this.fetched = true
      } catch (error: any) {
        console.warn('[FAQ Store] Failed to fetch FAQs from API, keeping local data:', error.message || error)
        this.error = error.message || 'Failed to fetch FAQs'
        // Keep local data already initialized
        this.fetched = true // Mark as fetched even on error to avoid loops
      } finally {
        this.loading = false
      }
    }
  }
})
