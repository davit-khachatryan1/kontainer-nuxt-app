import { defineNuxtConfig } from "nuxt/config"
// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from 'vite-svg-loader';

import config from "./config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ...config,
    }
  },
  css: [
    '@/assets/scss/framework.scss',
  ],
  vite: {
    plugins: [
      svgLoader()
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "@/assets/scss/import.scss";'
    //     }
    //   }
    // }
  },
  devtools: { enabled: true },
  plugins: [
    '~/plugins/swiper.js',
    '~/plugins/axios.js',
    '~/plugins/linkedin.js',
    '~/plugins/vuex-store.js',
    '~/plugins/directives.js',
    '~/plugins/vee-validate.js',
    '~/plugins/api.js',
    '~/plugins/meta.js',
    '~/plugins/fonts.js',
    '~/plugins/vue-select.js',
    '~/plugins/googletagmanager.js',
  ],
  css: ['~/assets/scss/framework.scss', '~/assets/scss/import.scss'],
  ssr: true,
  debug: false,
  app: {
    layoutTransition: {
      name: 'layout',
      mode: 'in-out',
    },
    head: {
      title: 'Kontainer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { hid: 'description', name: 'description', content: 'Kontainer' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
        // { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', type: '/safari-pinned-tab.svg', href: '#5bbad5' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      script: [],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },

  },
  modules: [
    '@nuxt/image-edge',
    // 'nuxt-trailingslash-module',
    // 'cookie-universal-nuxt',
    // '@nuxtjs/sitemap',
    // '@nuxtjs/sentry',
   '@vee-validate/nuxt'
  ],
})
