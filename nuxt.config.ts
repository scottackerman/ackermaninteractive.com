// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'
// import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-06-20',
  nitro: {
    preset: 'static',
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  vite: {
    build: {
      target: 'esnext'
    }
  },
  css: [
    '~/assets/css/main.scss'
  ],
  modules: ['@nuxt/content'],
  app: {
    head: {
      titleTemplate: '%s · Ackerman portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Meta description' }
      ],
      link: [
        { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
        { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    },
  },
  build: {
    transpile: ['gsap']
  },
  runtimeConfig: {
    apiKey: '',
    apiUrl: '',
  },
})

