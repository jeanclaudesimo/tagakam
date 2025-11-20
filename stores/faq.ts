import { defineStore } from 'pinia'
import type { FAQ } from '~/types/api'
import { faqData } from '~/data/faq'

export const useFaqStore = defineStore('faq', {
  state: () => ({
    faqs: [] as FAQ[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    activeFaqs(): FAQ[] {
      return this.faqs.filter(f => f.active).sort((a, b) => a.order - b.order)
    }
  },

  actions: {
    async fetchFaqs() {
      this.loading = true
      this.error = null

      try {
        const api = usePortalAPI()
        const data = await api.getFaqs()
        this.faqs = data.faqs || []
      } catch (error: any) {
        // Silently fall back to local data
        this.faqs = faqData
      } finally {
        this.loading = false
      }
    }
  }
})
