
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  srcDir: 'src',
  buildDir: 'functions/.nuxt',

  /*
  ** Headers of the page
  */
  head: {
    title: "Covington Catholic Ordering System",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  loading: { color: '#fff' },
  css: ['~/assets/style/app.styl'], 

  plugins: [
    '~/plugins/VueFire',
    '~/plugins/VueTailwind',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',    
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',    
    '@nuxtjs/toast',
  ], 

  build: {
    extractCSS: true,
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  

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
  

  stripe: {
    version: 'v3',
    publishableKey: process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY || '',
  },
}
