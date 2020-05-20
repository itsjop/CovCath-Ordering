
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],    
    script: [
      { hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true }
    ]
  }, 
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        node: {fs: 'empty'}
      }
    }
  },
  /* Customize the progress-bar color  */
  loading: { color: '#fff' },

  /* Plugins to load before mounting the App  */
  plugins: [
    '~/plugins/VueFire',
    '~/plugins/VueTailwind',
  ],

  /* Nuxt.js dev-modules  */
  buildModules: [
    '@nuxtjs/tailwindcss',    
    '@nuxtjs/vuetify',
  ],

  /* Nuxt.js modules  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',    
    '@nuxtjs/toast',
    // ['nuxt-stripe-module', {
    //   /* module options */
    //   version: 'v3', // Default
    // }],
  ],  
  

  toast: {
    position: 'bottom-center',
    register: [ 
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ],
    duration: 5000
  },

  /* Setting Global Auth */
  router: {
    // middleware: ['auth']
  },

  stripe: {
    version: 'v3',
    publishableKey: process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY || '',
  },

  /* Build configuration  */
  build: {
    /*    ** You can extend webpack config here    */
    extend (config, ctx) {
    },
    // analyze: true,
  },
  
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  },
  
}
