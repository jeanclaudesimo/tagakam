export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  nitro: {
    preset: 'node',
    port: 3004,
    host: '0.0.0.0'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],

  app: {
    head: {
      title: 'TaGaKaM&Co - Ihr Business Partner Spezialist',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'TaGaKaM&Co - Ihr vertrauenswürdiger Spezialist für maßgeschneiderte Business-Partnerschaften in den Bereichen Technologie, Immobilien und Reisen.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only variables (private)
    contactFormEnabled: process.env.NUXT_CONTACT_FORM_ENABLED === 'true',
    contactFormToEmail: process.env.NUXT_CONTACT_FORM_TO_EMAIL || 'info@tagakam.de',
    apiTenantKey: process.env.API_TENANT_KEY || process.env.NUXT_PORTAL_API_KEY || 'ce9563cab5f81156b3c1f6ba86ace15c5c1c48f97c4a4a68049d7e84f10a4d23',
    apiLoginEmail: process.env.API_LOGIN_EMAIL || '',
    apiLoginPassword: process.env.API_LOGIN_PASSWORD || '',

    public: {
      // Client-accessible variables (public)
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      companyName: process.env.NUXT_PUBLIC_COMPANY_NAME || 'TaGaKaM&Co',
      companyEmail: process.env.NUXT_PUBLIC_COMPANY_EMAIL || 'info@tagakam.de',
      companyPhone: process.env.NUXT_PUBLIC_COMPANY_PHONE || '+49 123 456789',

      // Portal API configuration
      portalApiUrl: process.env.NUXT_PORTAL_API_URL || 'http://portal.digitalssolutions.de/api',
      portalApiKey: process.env.NUXT_PORTAL_API_KEY || 'ce9563cab5f81156b3c1f6ba86ace15c5c1c48f97c4a4a68049d7e84f10a4d23'
    }
  }
})
