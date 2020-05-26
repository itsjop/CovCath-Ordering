<template lang="pug">
section#site-header.bg-blue-200
  header.text-xl.font-light.text-blue-800.underline
    nuxt-link(to="/")
      img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Covington_Catholic_High_School_logo.svg/1200px-Covington_Catholic_High_School_logo.svg.png") 
      
    nuxt-link(to="/students" v-if="authenticatedUser")
      h1 Student Listing
      
    nuxt-link(to="/register" v-if="authenticatedUser")
      h1 Register New Account

    .logcheck.grid.justify-center.no-underline.cursor-default(v-if="authenticatedUser") 
      p.no-underline.italic Welcome, {{authenticatedUser.email}}
      button.border-2.border-gray-900.bg-blue-800.text-white.border-solid.rounded(@click.prevent='logout') log out      

    nuxt-link(to="/login" v-if="!authenticatedUser")
      h1 Admin Login
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
