<template lang="pug">
section#LoginPage
  .login.bg-white.grid
    t-input-group(label="Email")
      t-input(v-model="email" placeholder="name@email.com")
    t-input-group(label="Password")
      t-input(type="password" v-model="password" placeholder="Password")
    button.button.bg-blue-500.p-3.rounded(@click="emailLogin") Login
  .login2
    h2(class="title") Sign In with Google
    button(class="signIn mb-2" primary @click="googleSignUp") Google Sign In
</template>

<script>
import firebase from "firebase";

export default {
  name: 'LoginPage',   
  data() {
    return {
      email: "",
      password: ""
    }
  },  
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.$router.replace({ name: "requests" });
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    
    emailLogin () {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(result) {
          console.log("user", result.user.tenantId) 
        }).catch(function(error) {
          // Handle error.
        });
    },
    googleSignUp () {
      this.$store.dispatch('signInWithGoogle').then(() => {
        console.log('inside then statement on login');
      }).catch((e) => {
        console.log(e.message);
      })
    }
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
