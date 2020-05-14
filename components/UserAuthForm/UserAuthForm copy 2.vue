<template lang="pug">
section#userAuthForm  
  .logger
    h1 Register a new Account:
    hr
    .user
      label Username:
      .email
        input(v-model="userInfo.email" type="text" placeholder="YourName@email.com")
    .pass
      label Password:
      input(v-model="userInfo.password" type="password" placeholder="Password")
    .actions
      button(@click="login()") Sign up
    p 
      | or 
      router-link(to="/login") go back 
      | to the login screen
</template>

<script>
import validations from "@/utils/validations"
import firebase from 'firebase'

export default {
  name: 'userAuthForm',   
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: '',
        password: ''
      },
      ...validations
    }
  },
  methods:{    
    signUp(){
      firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password).then(
        (user) =>{
          this.$router.replace('/')
        },
        (err) =>{
          alert("Oops! " + err.message)
        }
      )
    },    
    login(){
      this.logAttempt = true
      firebase.auth().signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password).then(
        (user) => {
          this.$router.replace('/')
          console.log("user info", user)
        },
        (err) => {
          alert("Oops! "+err.message)
        }
      )
    },
  },
  computed:{
    eVerified(){
      return (firebase.auth().currentUser ? firebase.auth().currentUser.emailVerified : false)
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=> {
      // user.sendEmailVerification(); 
      if (user) {
        // User is signed in.
        console.log("found")
        console.log("verified",user.emailVerified)
        this.authed = true
        this.emailVerified = user.emailVerified
        console.log("displayName",user.displayName)
        console.log("email",user.email)
        console.log("emailVerified",user.emailVerified)
        console.log("photoURL",user.photoURL)
        console.log("isAnonymous",user.isAnonymous)
        console.log("uid",user.uid)
        console.log("providerData",user.providerData)
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = ;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log("not found")
        this.authed = false
        // ...
      }
    });
  },
  props: ["submitForm", "buttonText", "hasName"]
}
</script>

<style lang="stylus">
// #userAuthForm
.logger
  display grid 
  justify-content  center
  justify-items  center
  gap 5px
  color black
  hr
    width 80%
    border-width 2px
    border-top 0
    border-style dashed
.user, .pass
  display grid
  justify-content center
  input
    border 0px black solid 
    border-bottom 1px solid
    font-size .9em
  .email 
    display flex
    justify-content center
</style>
