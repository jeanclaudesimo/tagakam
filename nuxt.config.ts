export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  devServer: {
    port: 3004,
    host: '0.0.0.0'
  },

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
    // These can be overridden at runtime via NUXT_* environment variables
    contactFormEnabled: false,
    contactFormToEmail: 'info@tagakam.de',
    apiTenantKey: '60350fb6cfa9ffe0dd6990c31d380e107d6fe446232f695e77d6274455df5eec',
    apiLoginEmail: '',
    apiLoginPassword: '',

    public: {
      // Client-accessible variables (public)
      // These can be overridden at runtime via NUXT_PUBLIC_* environment variables
      siteUrl: 'https://www.tagakam.de',
      companyName: 'TaGaKaM&Co',
      companyEmail: 'info@tagakam.de',
      companyPhone: '0221 2981 3937',

      // Portal API configuration (public endpoints with tenant_key)
      portalApiUrl: 'http://portal_nginx/api/public',
      portalApiKey: '60350fb6cfa9ffe0dd6990c31d380e107d6fe446232f695e77d6274455df5eec'
    }
  }
})
