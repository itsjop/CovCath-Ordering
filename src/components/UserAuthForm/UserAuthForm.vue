<template lang="pug">
section#userAuthForm  
  .text-black(v-if='authenticatedUser && !registering')
    p You are logged in as {{ authenticatedUser.email }}.
    p Logout?
    button(@click.prevent='logout') Logout
  .text-black(v-else='')
    form.grid.gap-2(@submit.prevent='loginOrRegister')
      input.border-b-2.border-solid.border-blue-800(type='email' v-model='email' placeholder='Your email address')
      input.border-b-2.border-solid.border-blue-800(type='password' v-model='password' placeholder='Your password')
      input.border-b-2.border-solid.border-blue-800(v-if='registering' type='password' v-model='registrationPassword' placeholder='Re-enter Password')
      button.bg-blue-500.text-white.font-bold.py-2.rounded(v-text="registering ? 'Register new account' : 'Login'")
    .error {{errorMessage}}
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UserAuthForm',
  
  data() {
    return {
      authenticatedUser: null,
      email: '',
      password: '',
      registrationPassword: '',
      errorMessage: ""
    }
  },
  methods: {
    register() {
      if(!this.authed){
        if (this.password === this.registrationPassword) {
          if(this.authenticatedUser){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=>{            
              this.$toast.success("Account created. Please check your mail for a verification link.")
            }).catch(error => {
              this.$toast.error("Error: "+error)
            })  
          }else{          
            this.$toast.error("You are not logged in. You must be an authorized user to create another's account.")
          }
        } else {
          // display error message
          this.errorMessage = "Your passwords do not match. Try again."
        }
      }else{        
        this.$toast.error("Nice try.")
      }
    },
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
        this.$toast.success("Success! You are now logged in.")
        $nuxt.$router.replace({ path: '/students' });
      }).catch(error => {
        this.$toast.error("Error: "+error)
      })        
    },
    loginOrRegister() {
      this.errorMessage = ""
      if (this.registering) {
        this.register()
      } else {
        this.login()
      }
    },
    logout() {
      firebase.auth().signOut().then(()=>{
        this.$toast.success("Success! You are now logged out.")
        $nuxt.$router.replace({ path: '/' });
      }).catch(error => {
        this.$toast.error("Error: "+error)
      })        
    },
    
    // async login() {      
    //   try {
    //     await this.$store.dispatch('login', {
    //       username: this.email,
    //       password: this.password
    //     })
    //     this.email = ''
    //     this.password = ''
    //     this.errorMessage = null
    //   } catch (e) {
    //     this.errorMessage = e.message
    //   }
    // },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
  },
  props: {
    registering: Boolean,
    authed: Boolean,
    
  }
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
