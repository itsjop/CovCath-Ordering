import firebase from 'firebase/app'
import 'firebase/firestore'

let app = null;

const firebaseConfig = {
  apiKey: process.env.NUXT_ENV_FIREBASE_APIKEY,
  authDomain: process.env.NUXT_ENV_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASEURL,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECTID,
  storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_FIREBASE_APPID,
  measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID  
}

app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)
  

export const db = app.firestore()