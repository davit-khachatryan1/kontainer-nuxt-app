import { defineNuxtConfig } from "nuxt/config"
// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from 'vite-svg-loader';

let baseUrl = 'http://localhost:3000'; // http://localhost:3000
let siteUrl = 'http://kontainer-api.test'; // https://kontainer.dev.konform.com // no trailing slash
let apiUrl = 'http://kontainer-api.test/'; // 'https://kontainercms.dev.konform.com'
let appUrl = 'http://kontainer.test';
let sentryDSN = 'https://52449f0e189c4bdc9abcf7274853a78b@sentry.konform.com/24';

if (process.env.SERVER_NAME === 'production') {
	baseUrl = 'https://kontainer.com';
	siteUrl = 'https://kontainer.com';
	apiUrl = 'https://cms.kontainer.com';
	appUrl = 'https://app.kontainer.com';
	sentryDSN = 'https://ed48997570fa466fb0a3fd668ea387ea@sentry.konform.com/15';
} else if (process.env.SERVER_NAME === 'next') {
	baseUrl = 'https://kontainer.dev.konform.com';
	siteUrl = 'https://kontainer.dev.konform.com';
	apiUrl = 'https://kontainercms.dev.konform.com';
	appUrl = 'https://next.kontainer.com';
}

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: baseUrl,
      siteUrl: siteUrl,
      apiUrl: apiUrl,
      appUrl: appUrl,
      sentryDSN: sentryDSN,
      postTypes: {
        news: 'news',
        blog: 'blog',
        prices: 'prices',
        prices_new: 'prices_new',
        cases: 'cases',
      },
    }
  },
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
  ssr: false,
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
