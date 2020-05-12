<template lang="pug">
section#register
  h1.text-xl Register
  .login.bg-white.grid
    user-auth-form(buttonText="Register" :submitForm="registerUser" hasName="true")



  //- .login2
  //-   h2(class="title") Sign In with Google
  //-   button(class="signIn mb-2" primary @click="googleSignUp") Google Sign In
</template>

<script>
import firebase from "firebase";
import userAuthForm from '../../components/UserAuthForm/UserAuthForm'

export default {
  name: 'register',   
  data() {
    return {
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
  props: {
  }
}
</script>

<style lang="stylus">
#register
  .login
    justify-items center
</style>
