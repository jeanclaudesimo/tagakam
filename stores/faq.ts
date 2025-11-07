import { defineStore } from 'pinia'
import type { FAQ } from '~/types/api'

export const useFaqStore = defineStore('faq', {
  state: () => ({
    faqs: [] as FAQ[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    activeFaqs(): FAQ[] {
      return this.faqs.filter(f => f.active)
    },

    isLoaded(): boolean {
      return this.faqs.length > 0
    }
  },

  actions: {
    setFaqs(faqs: FAQ[]) {
      this.faqs = faqs
      this.error = null
    },

    setError(error: string) {
      this.error = error
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    async fetchFaqs() {
      if (this.isLoaded) {
        return // Already loaded
      }

      this.setLoading(true)
      this.setError(null)

      try {
        const data = await $fetch('/api/faq')
        this.setFaqs((data as any).faqs || [])
      } catch (error: any) {
        console.error('Error fetching FAQs:', error)
        this.setError(error.message || 'Failed to fetch FAQs')
      } finally {
        this.setLoading(false)
      }
    }
  }
})
