<template lang="pug">
section#site-header
  header
    nuxt-link(to="/")
      img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Covington_Catholic_High_School_logo.svg/1200px-Covington_Catholic_High_School_logo.svg.png") 
      
    nuxt-link(to="/users")
      h1 Users
      
    nuxt-link(to="/requests")
      h1 Device Requests
      
    nuxt-link(to="/register")
      h1 Registration
</template> 

<script>
export default {
  name: 'SiteHeader',   
  data() {
    return {
    }
  },
  methods:{    
  },
  props: {
  }
}
</script>

<style lang="stylus">
#site-header
  header
    width 100vw
    height 100px
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
