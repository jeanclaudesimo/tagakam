import { defineStore } from 'pinia'
import type { ConfigResponse, ContactInfo } from '~/types/api'
import { configData } from '~/data/config'

// API response format from Portal
interface ApiConfigResponse {
  companyName: string
  address: {
    line1: string
    line2: string | null
    postalCode: string
    city: string
    country: string
  }
  phone: string
  email: string
  supportEmail: string
  website: string
  openingHours: string | null
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  } | null
  seo?: {
    title: string | null
    description: string | null
    keywords: string | null
  }
}

// Transform API response to local format
function transformApiToLocal(apiResponse: ApiConfigResponse): ConfigResponse {
  return {
    contact: {
      company_name: apiResponse.companyName,
      address_line1: apiResponse.address.line1,
      address_line2: apiResponse.address.line2,
      postal_code: apiResponse.address.postalCode,
      city: apiResponse.address.city,
      country: apiResponse.address.country,
      phone: apiResponse.phone,
      email: apiResponse.email,
      support_email: apiResponse.supportEmail,
      website: apiResponse.website,
      opening_hours: apiResponse.openingHours,
      social_links: apiResponse.socialLinks
    },
    smtp: {
      host: null,
      port: null,
      username: null,
      password: null,
      encryption: null,
      from_email: apiResponse.email,
      from_name: apiResponse.companyName
    },
    tenant: {
      id: 0,
      name: apiResponse.companyName,
      domain: apiResponse.website?.replace(/^https?:\/\//, '').replace(/\/$/, '') || ''
    }
  }
}

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: configData as ConfigResponse, // Initialize with local data for hydration
    loading: false,
    error: null as string | null,
    fetched: false // Flag to avoid multiple calls
  }),

  getters: {
    contact(): ContactInfo | null {
      return this.config?.contact || null
    }
  },

  actions: {
    async fetchConfig(force = false) {
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
        const response = await $fetch<ApiConfigResponse>('/api/portal/config')

        if (response && response.companyName) {
          this.config = transformApiToLocal(response)
        }
        // Otherwise keep local data already initialized

        this.fetched = true
      } catch (error: any) {
        console.warn('[Config Store] Failed to fetch config from API, keeping local data:', error.message || error)
        this.error = error.message || 'Failed to fetch config'
        // Keep local data already initialized
        this.fetched = true // Mark as fetched even on error to avoid loops
      } finally {
        this.loading = false
      }
    }
  }
})
