<template lang="pug">
section#loginPage.grid.p-8
  .login.bg-white.grid.p-8.w-full.rounded(class="lg_w-1/2")
    h1.text-xl.text-blue-800 Login to your account:
    user-auth-form(buttonText="Login" :submitForm="loginUser")



  //- .login2
  //-   h2(class="title") Sign In with Google
  //-   button(class="signIn mb-2" primary @click="googleSignUp") Google Sign In
</template>

<script>
import { db } from '../../firebase'
import firebase from "firebase";
import userAuthForm from '../../components/UserAuthForm/UserAuthForm'

export default {
  name: 'loginPage',   
  data() {
    return {
    }
  },  
  created(){

  },
  methods: {
    loginUser(loginInfo){
      this.$auth.loginWith('local', {
        data: loginInfo
        
      })
    }
    // submit() {
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(this.email, this.password)
    //     .then(data => {
    //       this.$router.replace({ name: "requests" });
    //     })
    //     .catch(err => {
    //       this.error = err.message;
    //     });
    // },    
    // emailLogin () {
    //   firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(function(result) {
    //       console.log("user", result.user.tenantId) 
    //     }).catch(function(error) {
    //       // Handle error.
    //     });
    // },
  },
  components:{
    userAuthForm
  },
  props: {
  }
}
</script>

<style lang="stylus">
#loginPage
  grid-template-columns 1fr
  grid-template-rows min-content
  justify-items center
  .login
    grid-template-columns 1fr 1fr
    justify-items center
    align-items center
</style>
