<template lang="pug">
section#register.grid.p-8
  .register.bg-white.grid.p-8.w-full.rounded(class="lg_w-1/2")
    h1.text-xl.text-blue-800 Register a new account:
    user-auth-form(buttonText="Register" :submitForm="registerUser" :authed="thisAuth" registering=true)



  //- .login2
  //-   h2(class="title") Sign In with Google
  //-   button(class="signIn mb-2" primary @click="googleSignUp") Google Sign In
</template>

<script>
import { db } from '../../../firebase'
import firebase from "firebase";
import userAuthForm from '../../components/UserAuthForm/UserAuthForm'

export default {
  name: 'register',   
  data() {
    return {
      thisAuth: false
    }
  },  
  methods: {
    registerUser(registrationInfo){
      alert()
    }
  },
  components:{
    userAuthForm
  },
  beforeMount(){    
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
    if(!firebase.auth().currentUser) {
      this.thisAuth = true
      $nuxt.$router.replace({ path: '/' });      
      this.$toast.error("Access denied. You are not logged in.")
    }
  },
  props: {
  }
}
</script>

<style lang="stylus">
#register
  grid-template-columns 1fr
  grid-template-rows min-content
  justify-items center
  .register
    grid-template-columns 1fr 1fr
    justify-items center
    align-items center
</style>
