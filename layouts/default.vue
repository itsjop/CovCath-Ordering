<template lang="pug">
section.default-layout.bg-gray-800.text-gray-100
  site-header
  nuxt
</template>

<script>
import SiteHeader from '../components/SiteHeader/SiteHeader'
export default {
  name: 'app',   
  data() {
    return {
    }
  },
  methods:{    
  },
  props: {
  },
  components:{
    SiteHeader
  }
}
</script>

<style lang="stylus">
#__layout
  .default-layout
    --header-size: 100px
    min-height 100vh
    #site-header header
      height var(--header-size)
      position relative
    section:nth-child(2) 
      // page container selector, uses nth() because it could be anything
      position: absolute
      top var(--header-size)
      min-width 100vw
      min-height calc(100vh - var(--header-size))
</style>
