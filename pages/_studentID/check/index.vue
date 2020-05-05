<template lang="pug">

// TODO: Programatically check if there's not a user wit the Routing ID, and if so, send them back to the front page.
section#studentModelCheck.justify-center.flex-col.align-center
  h1.text-center.text-4xl Welcome, {{studentInfo[0] ? studentInfo[0].name : ''}}!
  .specsheet.flex.justify-center(class='w-full')
    .model.bg-white.rounded-md.border-8.border-white.border-solid.text-gray-800.p-5.grid(class='w-1/2' v-if="modelList" v-for="model in modelList")
      h1.title.font-bold.text-3xl {{model.title}}
      img(:src="model.image")
      ul.details.list-disc
        li(v-for="feature in model.features")
          | {{feature}}
        li.text-red-500(v-for="additionalFeature in model.additionalFeatures")
          | {{additionalFeature}}
      .disclaimer
        p(v-for="disclaimer in model.disclaimers") {{disclaimer}}
      nuxt-link.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700( :to="'/'+$route.params.studentID+'/checkout/'")
        | i wanna buy it!!

</template>

<script>

import db from '../../../firebase'
export default {
  name: 'studentModelCheck',   
  data() {
    return {
      orgInfo: '',
      studentInfo: '',
    }
  },
  
  firestore() {    
    return {
      orgInfo: db.collection('orgs').doc('covCath'),
      studentInfo: db.collection('students').where('code', '==', this.$route.params.studentID)
    }
  },
  // props: ['studentInfo'],
  // watch: {
  //   studentInfo: {
  //     // call it upon creation too
  //     immediate: true,
  //     handler(studentInfo) {
  //      this.$bind('documents', 
  //       db.collection('students')
  //         .where('code', '==', this.$route.params.studentID))
  //     }
  //   }
  // },
  computed:{
    modelList() {
      return this.orgInfo.models
    }
  },
  methods:{    
  },
  props: {
  }
}
</script>

<style lang="stylus">
#studentModelCheck
  grid-template-rows auto auto
  .model
    grid-template: \
      "title title" auto \
      "img desc" auto \
      "discl discl" auto\
      "buy buy" auto\
      / 4fr 3fr
    justify-items center
    align-items center
    filter drop-shadow(0px 0px 10px #6381b5)
    img
      grid-area img
      width 100%
      filter drop-shadow(0px 0px 10px #666)
    .title
      grid-area title
      margin 10px
    .details
      grid-area desc
    .disclaimer
      grid-area discl
      margin 0
    .buybutton
      grid-area buy
      width 70%
      text-align center
      text-decoration none
    
</style>
