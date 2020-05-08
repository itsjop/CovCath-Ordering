
export default {
  mode: 'universal',
  /*  ** Headers of the page  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    // script: [
    //   { hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true }
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },  

  /* Customize the progress-bar color  */
  loading: { color: '#fff' },

  /* Global CSS  */
  css: [  ],

  /* Plugins to load before mounting the App  */
  plugins: [
    '~/plugins/VueFirestore',
    '~/plugins/VueTailwind',
  ],

  /* Nuxt.js dev-modules  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  /* Nuxt.js modules  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-stripe-module', {
      /* module options */
      version: 'v3', // Default
    }],
  ],  
  stripe: {
    version: 'v3',
    publishableKey: process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY || '',
  },
  /* Options for nuxt auth  */
  auth: {
    // Options
  },

  /* Setting Global Auth */
  router: {
    // middleware: ['auth']
  },

  /* Build configuration  */
  build: {
    /*    ** You can extend webpack config here    */
    extend (config, ctx) {
    }
  }
}
