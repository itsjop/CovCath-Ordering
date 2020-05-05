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
  },
  transition: 'slide',
  
  
  // Watch for $route.query.page to call Component methods (asyncData, fetch, validate, layout, etc.)
  watchQuery: ['page'],
  // Key for <NuxtChild> (transitions)
  key: to => to.fullPath,
  // Called to know which transition to apply
  transition (to, from) {
    if (!from) { return 'slide-left' }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  async asyncData ({ query }) {
    const page = +query.page || 1
    const data = await fetch(`https://reqres.in/api/users?page=${page}`).then(res => res.json())

    return {
      page: +data.page,
      totalPages: data.total_pages,
      users: data.data
    }
  },   
}
</script>

<style lang="stylus">
body
  margin 0
  padding 0
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
      
.page-enter-active, .page-leave-active {
  transition: opacity .2s
}
.page-enter, .page-leave-active {
  opacity: 0
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

</style>
