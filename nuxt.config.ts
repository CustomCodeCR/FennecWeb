export default defineNuxtConfig({
  compatibilityDate: '2026-09-13',
  devtools: { enabled: false },
  css: ['~/assets/css/design-system.css', '~/assets/css/motion-system.css', '~/assets/css/main.css', '~/assets/css/cms.css'],
  runtimeConfig: {
    public: {
      contentApiBase: 'https://api.logisticacastrofallas.com/api/content/public',
      contentSiteKey: 'main',
      contentLocale: 'es-CR',
      trackingApiBase: 'http://127.0.0.1:8000',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      titleTemplate: '%s | Grupo Castro Fallas',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo__rojo.ico' },
      ],
      meta: [
        { name: 'theme-color', content: '#c8171d' },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
