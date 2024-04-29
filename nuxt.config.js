import { defineNuxtConfig } from "nuxt/config"
// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from 'vite-svg-loader';

export const pm2Configs = {
	apps: [
		{
			name: 'kontainersite',
			script: 'npm',
			args: 'start',
			watch: true,
			env_production: {
				NODE_ENV: 'production',
				SERVER_NAME: 'production',
				HOST: '127.0.0.1',
				PORT: 3001,
				REDIS_DB: 11,
			},
			env_next: {
				NODE_ENV: 'next',
				SERVER_NAME: 'next',
				HOST: '127.0.0.1',
				PORT: 3001,
				REDIS_DB: 11,
			},
		},
	],
}

let baseUrl = 'http://localhost:3000'; // http://localhost:3000
let siteUrl = 'http://kontainer-api.test'; // https://kontainer.dev.konform.com // no trailing slash
let apiUrl = 'http://kontainer-api.test/'; // 'https://kontainercms.dev.konform.com'
let appUrl = 'http://kontainer.test';
let analyticsId = null;
let sentryDSN = 'https://52449f0e189c4bdc9abcf7274853a78b@sentry.konform.com/24';
let redisUrl = 'redis://localhost:6379';

if (process.env.SERVER_NAME === 'production') {
  baseUrl = 'https://kontainer.com';
  siteUrl = 'https://kontainer.com';
  apiUrl = 'https://cms.kontainer.com';
  appUrl = 'https://app.kontainer.com';
  analyticsId = 'G-0WYFD1L6VN';
  sentryDSN = 'https://ed48997570fa466fb0a3fd668ea387ea@sentry.konform.com/15';
  redisUrl = '';
} else if (process.env.SERVER_NAME === 'next') {
  baseUrl = 'https://kontainer.dev.konform.com';
  siteUrl = 'https://kontainer.dev.konform.com';
  apiUrl = 'https://kontainercms.dev.konform.com';
  appUrl = 'https://next.kontainer.com';
  analyticsId = 'G-40FXY02M7H';
  redisUrl = 'redis://localhost:6379';
}

export const config = {
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


export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ...config,
    },
    private: {
      redisUrl,
    }
  },
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        port: 6379,
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "",
        db: 0, // Defaults to 0
        tls: {} // tls/ssl
      }
    }
  },
  css: [
    '@/assets/scss/framework.scss',
  ],
  vite: {
    plugins: [
      svgLoader()
    ],
  },
  devtools: { enabled: false },
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
    vueRouterOptions: {
      strict: true,
      trailingSlash: true,
    },
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
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', type: '/safari-pinned-tab.svg', href: '#5bbad5' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      script: [
        analyticsId ? {
          src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`,
          async: true,
        } : null,
        analyticsId && process.env.SERVER_NAME === 'next' && {
          src: '/js/nextgtag.js',
        },
        analyticsId && process.env.SERVER_NAME === 'production' && {
          src: '/js/livegtag.js',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },

  },
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/sitemap',
    '@vee-validate/nuxt'
  ],
  sitemap: {
    sources: ['/api/sitemap'],
    defaultSitemapsChunkSize: 1000 * 60 * 15,
    experimentalCompression: true,
    exclude: ['/register'],
  },
})
