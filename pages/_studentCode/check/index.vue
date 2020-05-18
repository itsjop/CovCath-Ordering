<template lang="pug">
// TODO: Programatically check if there's not a user wit the Routing ID, and if so, send them back to the front page.
section#studentModelCheck.justify-center.flex-col.align-center
  script(type="application/javascript" src="js.stripe.com/v3")
  h1.text-center.text-4xl Welcome, {{studentInfo[0] ? studentInfo[0].name : ''}}!
  .specsheet.flex.justify-center.sm_px-12.md_p-0(class='w-full')
    .model.bg-white.rounded-md.border-8.border-white.border-solid.text-gray-800.p-5.grid(class='w-full lg_w-1/2 md_w-3/4' v-if="modelList" v-for="model in modelList")
      h1.title.font-bold.text-3xl {{model.title}}
      img(:src="model.image")
      ul.details.list-disc
        li.ml-8(v-for="feature in model.features")
          | {{feature}}
        li.ml-8.text-green-500(v-for="additionalFeature in model.additionalFeatures")
          | {{additionalFeature}}
      .disclaimer
        p(v-for="disclaimer in model.disclaimers") {{disclaimer}}
      .price(v-if="studentInfo[0]")
        button.text-white.bg-blue-500.rounded.p-4.px-4.mt-8(@click="showModal") Purchase for 
          span.tag(v-if="studentInfo[0].assistance")
            span.line-through ${{(model.price/100).toFixed(2)}}
            span ${{((model.price - studentInfo[0].assistance)/100).toFixed(2)}}
          span.tag(v-else)
            span ${{(model.price/100).toFixed(2)}}
      //- stripe-checkout.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700(
          ref='checkoutRef' :pk='pk' :items='items' :successurl='successUrl' :cancelurl='cancelUrl' :billingAddressCollection='billingAddressCollection' :locale="locale")
      //- template(slot='checkout-button')
      //- nuxt-link.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700( :to="'/'+$route.params.studentCode+'/checkout/'")
      //-   | i wanna buy it!!
  
  transition(name="fade")
    t-modal( ref="modal") 
      .mod.text-gray-800.grid.justify-center.content-around.h-full
        h1.text-center.font-light.text-3xl Before you Check Out:
        h1.text-center.font-light.text-xl.mt-8 After finishing checkout, do 
          span.font-bold not 
          | close your browser, or your registration will 
          span.font-bold not 
          | be automatically updated.
        button#checkout-button-sku_HEL9wQzNu9XFG1.text-white.bg-blue-500.rounded.p-4.px-4.mt-8(@click='checkout') I Understand, Proceed to Checkout

</template>

<script>

import { db } from "~/firebase"
import { StripeCheckout } from 'vue-stripe-checkout';
import VueTailwindModal from 'vue-tailwind-modal'

export default {
  name: 'studentModelCheck',   
  data() {
    return {
      orgInfo: '',
      studentInfo: '',
      modal: false
    }
  },
  
  firestore() {    
    return {
      orgInfo: db.collection('orgs').doc('covCath'),
      studentInfo: db.collection('students').where('code', '==', this.$route.params.studentCode)
    }
  },
  computed:{
    modelList() {
      return this.orgInfo.models
    }
  },
  methods:{    
    showModal(){
      this.$refs.modal.show()
    },
    checkout () {
      db.collection('students').doc(this.studentInfo[0].id).update({
        paymentStatus: "unconfirmed"
      }).then(querySnapshot => {
        var stripe = Stripe(process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY);
        var checkoutButton = document.getElementById('checkout-button-sku_HEL9wQzNu9XFG1');
        stripe.redirectToCheckout({
          items: [{sku: 'sku_HEL9wQzNu9XFG1', quantity: 1}],
          successUrl: `http://localhost:3000/${this.studentInfo[0].code}/success/${this.studentInfo[0].id}`,
          cancelUrl: `http://localhost:3000/${this.studentInfo[0].code}/check`,        
          clientReferenceId: this.studentInfo[0].code,
        })
        .then(function (result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
      })
    }
  },
  components: {
    StripeCheckout,
    VueTailwindModal,
  },
  props: {
  }
}
</script>

<style lang="stylus">


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position absolute
}

#studentModelCheck
  grid-template-rows auto auto
  .model
    grid-template: \
      "title title" auto \
      "img desc" auto \
      "discl discl" auto\
      "price price" auto\
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
    .price
      grid-area price
    
</style>
