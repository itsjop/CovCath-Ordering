import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
  apiKey: "AIzaSyAZVrkaP6PNK8rZ8DPE6II9siX3AGi9Q0Y",
  authDomain: "gbs-student-hardware.firebaseapp.com",
  databaseURL: "https://gbs-student-hardware.firebaseio.com",
  projectId: "gbs-student-hardware",
  storageBucket: "gbs-student-hardware.appspot.com",
  messagingSenderId: "926456447913",
  appId: "1:926456447913:web:0f3c209b6f8435a6297ab8",
  measurementId: "G-XSHYQRZ84Y"  
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase