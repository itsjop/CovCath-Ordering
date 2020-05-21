// TODO:  Replace default store function with the firebase auth storage



import firebase from 'firebase'
export default function({ store, redirect, route }) {
  let authUser = {}
  firebase.auth().onAuthStateChanged(user => ( authUser = user))
  console.log("authUser", authUser)
  console.log("firebase.auth.currentUser", firebase.auth.currentUser)
  authUser != null && route.name == 'login' ? redirect('/register') : ''
  authUser == null && isAdminRoute(route) ? redirect('/login') : ''
}

function isAdminRoute(route) {
  // if (route.matched.some(record => record.path == '/register')) {
  //   return true
  // }
}

function isPublicRoute(route){

}