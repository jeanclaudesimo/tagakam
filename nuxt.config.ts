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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only variables (private)
    // These can be overridden at runtime via NUXT_* environment variables
    contactFormEnabled: false,
    contactFormToEmail: 'info@tagakam.de',
    apiTenantKey: '25b74f7a48ced0828436abdae901e07cc88141f9173b1cf3a93265dbb1ef7b2e',
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
      portalApiKey: '8d1222ab7ba5da0eb4c83b17da0cbdf9176ccec9ef6127510978f4d734f7fa79'
    }
  }
})
