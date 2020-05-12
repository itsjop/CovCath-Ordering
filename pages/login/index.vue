<template lang="pug">
section#LoginPage
  h1.text-xl Login
  .login.bg-white.grid
    user-auth-form(buttonText="Login" :submitForm="loginUser")



  //- .login2
  //-   h2(class="title") Sign In with Google
  //-   button(class="signIn mb-2" primary @click="googleSignUp") Google Sign In
</template>

<script>
import firebase from "firebase";
import userAuthForm from '../../components/UserAuthForm/UserAuthForm'

export default {
  name: 'LoginPage',   
  data() {
    return {
    }
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
#LoginPage
  .login
    justify-items center
</style>
