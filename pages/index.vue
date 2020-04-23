<template lang="pug">
section.app.bg-gray-800
  .container.mx-auto.px-4.h-full.mt-16
    .flex.content-center.items-center.justify-center.h-full
      .relative.flex.flex-col.min-w-0.break-words.w-full.mb-6.shadow-lg.rounded-lg.bg-gray-300.border-0
        .rounded-t.mb-0.px-6.py-6
          .text-center.mb-3
            h6.text-gray-600.text-lg.font-bold Enter your ID to continue:
          form
            .relative.w-full.mb-3
              label.block.uppercase.text-gray-700.text-xs.font-bold.mb-2(for='grid-password') Student ID
              input.px-3.py-3.placeholder-gray-400.text-gray-700.bg-white.rounded.text-sm.shadow.w-full(v-model="studentID" type='text' class='focus:outline-none focus:shadow-outline' placeholder='CoolDinosaurBanana' style='transition: all 0.15s ease 0s;')
            .text-center.mt-6
              nuxt-link.bg-gray-900.text-white.text-sm.font-bold.uppercase.px-6.py-3.rounded.shadow.outline-none.mr-1.mb-1.w-full(
                :to="studentID+/check/"  class='active:bg-gray-700 hover:shadow-lg focus:outline-none' type='button' style='transition: all 0.15s ease 0s;')
                | Sign In

</template>

<script>
import Logo from '~/components/Logo.vue'

export default {  
  data() {
    return {
      studentID:""
    }
  },
  components: {
    Logo
  }
}
</script>

<style lang="stylus">
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.login-container
  display grid
  width 100vw
  height 50vmin
.student-login
  background lightgray
  justify-self center
  align-self center
  width 80vmin
  max-width 500px
  height 100%

</style>
