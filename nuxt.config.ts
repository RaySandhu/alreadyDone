// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@sidebase/nuxt-auth', 
    '@nuxtjs/tailwindcss',
    'nuxt-icons',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  auth: {
    globalAppMiddleware: true,
  },
  runtimeConfig: {
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/css/main.css',],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
