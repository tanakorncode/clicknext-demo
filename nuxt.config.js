import colors from 'vuetify/es5/util/colors'
import session from 'express-session'
const devMode = process.env.NODE_ENV === 'development'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fontend Test',
    titleTemplate: '%s | Clicknext',
    htmlAttrs: {
      dir: 'ltr',
    },
    bodyAttrs: {
      // class: ['light'],
      dir: 'ltr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Poppins:200,200i,300,400,500,600,700,800,900|Roboto:300,400,500,600,700|Sarabun:300,400,500,600,700|Sriracha:300,400,500,600,700|Prompt:300,400,500,600,700',
      },
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css',
      // },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/services.js' },
    { src: '~/plugins/persistedState.client.js', mode: 'client' },
    { src: '~/plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/vuetify.js', mode: 'client' },
    { src: '~/plugins/vue-router.js' },
    { src: '~/plugins/axios.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/App',
      '~/components/Auth',
      '~/components/Dialog',
      '~/components/Form',
      '~/components/Table',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    // '@nuxt/content',
    '@nuxtjs/i18n',

    ['v-currency-field/nuxt', {
      locale: 'th-TH',
      decimalLength: 0,
      autoDecimalMode: true,
      min: null,
      max: 100000,
      defaultValue: null,
      valueAsInteger: false,
      allowNegative: true
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    https: false,
    debug: devMode,
    // proxy: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#089bab', // colors.blue.darken2,
          accent: colors.blue.darken3,
          secondary: colors.amber.darken3,
          info: '#02d1ff', // colors.teal.lighten1,
          warning: '#fc9e5b', // colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#31c02c', // colors.green.accent3,
          danger: '#d84a45',
          light: '#e9eef4',
          dark: '#374949',
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  i18n: {
    locales: [
      {
        name: '🇹🇭 ภาษาไทย',
        code: 'th',
        file: 'th-TH.js',
        iso: 'th-TH',
      },
      {
        name: '🇺🇸 English',
        code: 'en',
        file: 'en-US.js',
        iso: 'en-US',
      },
    ],
    seo: true,
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'th',
    fallbackLocale: 'th',
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'th',
    },
  },

  serverMiddleware: [
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
      name: process.env.SESSION_NAME,
    }),
    { path: "/api", handler: "~/api/index" },
  ],

  watch: ['~/api/**/*.js'],
}
