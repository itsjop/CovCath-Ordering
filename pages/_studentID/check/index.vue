<template lang="pug">
section#studentSignUp.justify-center.flex-col.align-center
  h1 hey your studentID is "{{this.$route.params.studentID}}" that's cool i guess
  .specsheet.border-8.flex.justify-center.flex-col.self-center(class='w-1/2')
    h1 here's your laptop
    img(src="https://via.placeholder.com/728x90.png?text=laptop_preview_image.png")
    h1 this thin has some fuckin STATS, like the following:
    ul
      li ram
      li a hard drive
      li a screen for images
      li 7-button keyboard
      li and a mouse
  nuxt-link.btn.bg-blue-500(:to="'/'+this.$route.params.studentID+'/buy/'") i wanna buy it!!

</template>

<script>
export default {
  name: 'studentSignUp',   
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
#studentSignUp
  grid-template-rows auto auto
</style>
