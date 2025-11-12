// https://nuxt.com/docs/api/configuration/nuxt-config
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
    // Private keys (only available on server-side)
    apiLoginEmail: process.env.API_LOGIN_EMAIL || 'info@tagakam.de',
    apiLoginPassword: process.env.API_LOGIN_PASSWORD || 'tagakam',
    apiTenantKey: process.env.API_TENANT_KEY || '',

    public: {
      apiBase: 'http://portal.digitalssolutions.de/api'
    }
  }
})
