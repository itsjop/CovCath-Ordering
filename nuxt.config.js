
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

  /* Plugins to load before mounting the App  */
  plugins: [
    '~/plugins/VueFirestore',
    '~/plugins/VueTailwind',
    '~/plugins/firebase.js'
  ],

  /* Nuxt.js dev-modules  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',    
    '@nuxtjs/vuetify',
  ],

  /* Nuxt.js modules  */
  modules: [
    '@nuxtjs/pwa',
    // '@nuxtjs/firebase',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',    
    '@nuxtjs/toast',
    ['nuxt-stripe-module', {
      /* module options */
      version: 'v3', // Default
    }],
    
    // ['@nuxtjs/firebase', {
    //   config: {
    //     production: {
    //       apiKey: process.env.NUXT_ENV_FIREBASE_APIKEY,
    //       authDomain: process.env.NUXT_ENV_FIREBASE_AUTHDOMAIN,
    //       databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASEURL,
    //       projectId: process.env.NUXT_ENV_FIREBASE_PROJECTID,
    //       storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGEBUCKET,
    //       messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
    //       appId: process.env.NUXT_ENV_FIREBASE_APPID,
    //       measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID  
    //     }
    //   },      
    //   customEnv: true,
    //   services: {
    //     auth: {
    //       ssr: true
    //     }
    //   },
    // }]
  ],  
  

  toast: {
    position: 'top-right',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  stripe: {
    version: 'v3',
    publishableKey: process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY || '',
  },

  // /* Options for nuxt auth  */
  // auth: {
  //   strategies:{
  //     local:{
  //       endpoints:{          
  //         login: { url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[${process.env.NUXT_ENV_FIREBASE_APIKEY}]`, method: 'post', propertyName: 'token' },
  //         logout: { url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[${process.env.NUXT_ENV_FIREBASE_APIKEY}]`, method: 'post' },
  //         // user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
  //       }
  //     }
  //   }
  // },

  /* Setting Global Auth */
  router: {
    // middleware: ['auth']
  },

  /* Build configuration  */
  build: {
    /*    ** You can extend webpack config here    */
    extend (config, ctx) {
    }
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
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  }
}
