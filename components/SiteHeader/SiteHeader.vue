<template lang="pug">
section#site-header
  header
    nuxt-link(to="/")
      img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Covington_Catholic_High_School_logo.svg/1200px-Covington_Catholic_High_School_logo.svg.png") 
      
    nuxt-link(to="/users" v-if="authenticatedUser")
      h1 Users
      
    nuxt-link(to="/requests" v-if="authenticatedUser")
      h1 Device Requests 
        span.text-red-600 (new!)
      
    nuxt-link(to="/register" v-if="authenticatedUser")
      h1 Register New Account

    .logcheck.grid.justify-center(v-if="authenticatedUser") 
      p Welcome, {{authenticatedUser.email}}
      button.border-2.border-gray-900.border-solid.px-2.rounded(@click.prevent='logout') log out      

    nuxt-link(to="/login" v-if="!authenticatedUser")
      h1 Login
</template> 

<script>
import firebase from 'firebase'

export default {
  name: 'SiteHeader',   
  data() {
    return {
      authenticatedUser: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
  },
  methods:{   
    logout() {
      firebase.auth().signOut().then(()=>{        
        this.$toast.success("You are now logged out.")
        $nuxt.$router.replace({ path: '/' });
      })
    } 
  },
  props: {
  }
}
</script>

<style lang="stylus">
#site-header
  header
    width 100vw
    height 100%
    background-color skyblue 
    position fixed
    top 0
    display flex
    justify-content space-around
    align-content center
    align-items center
    img 
      max-width 80px
      max-height 80px
    h1
      cursor pointer
      &:hover
        color blue
</style>
