// import { firebase } from "@firebase/app";
// import "@firebase/firestore";

// const firebaseApp = firebase.initializeApp({ 
//   apiKey: "AIzaSyAZVrkaP6PNK8rZ8DPE6II9siX3AGi9Q0Y",
//   authDomain: "gbs-student-hardware.firebaseapp.com",
//   databaseURL: "https://gbs-student-hardware.firebaseio.com",
//   projectId: "gbs-student-hardware",
//   storageBucket: "gbs-student-hardware.appspot.com",
//   messagingSenderId: "926456447913",
//   appId: "1:926456447913:web:0f3c209b6f8435a6297ab8",
//   measurementId: "G-XSHYQRZ84Y"
// });
// const db = firebaseApp.firestore();

// export default db

import { firebase } from "@firebase/app";
import "@firebase/firestore";

let db = {}

if (!firebase.apps.length) {
  // only runs initializeApp when there's not already an app,
  // added to prevent duplication issues with hot-reloading
  const firebaseApp = firebase.initializeApp({ 
    apiKey: process.env.NUXT_ENV_FIREBASE_APIKEY,
    authDomain: process.env.NUXT_ENV_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASEURL,
    projectId: process.env.NUXT_ENV_FIREBASE_PROJECTID,
    storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_ENV_FIREBASE_APPID,
    measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID  
  });
  db = firebaseApp.firestore();
} else {
  db = firebase.apps[0].firestore();
}

export default db
