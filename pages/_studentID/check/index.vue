<template lang="pug">
// TODO: Programatically check if there's not a user wit the Routing ID, and if so, send them back to the front page.
section#studentModelCheck.justify-center.flex-col.align-center
  script(type="application/javascript" src="js.stripe.com/v3")
  h1.text-center.text-4xl Welcome, {{studentInfo[0] ? studentInfo[0].name : ''}}!
  .specsheet.flex.justify-center(class='w-full')
    .model.bg-white.rounded-md.border-8.border-white.border-solid.text-gray-800.p-5.grid(class='w-1/2' v-if="modelList" v-for="model in modelList")
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
        h1 Purchase for
          span.tag(v-if="studentInfo[0].assistance")
            span.line-through ${{(model.price/100).toFixed(2)}}
            span ${{((model.price - studentInfo[0].assistance)/100).toFixed(2)}}
          span.tag(v-else)
            span ${{(model.price/100).toFixed(2)}}
      //- stripe-checkout.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700(
          ref='checkoutRef' :pk='pk' :items='items' :successurl='successUrl' :cancelurl='cancelUrl' :billingAddressCollection='billingAddressCollection' :locale="locale")
      //- template(slot='checkout-button')
      button#checkout-button-sku_HEL9wQzNu9XFG1(@click='checkout') Shutup and take my money!
      //- nuxt-link.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700( :to="'/'+$route.params.studentID+'/checkout/'")
      //-   | i wanna buy it!!
        

</template>

<script>

import db from '../../../firebase'
import { StripeCheckout } from 'vue-stripe-checkout';

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
  computed:{
    modelList() {
      return this.orgInfo.models
    }
  },
  methods:{    
    checkout () {
      var stripe = Stripe(process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY);

      var checkoutButton = document.getElementById('checkout-button-sku_HEL9wQzNu9XFG1');
      stripe.redirectToCheckout({
        items: [{sku: 'sku_HEL9wQzNu9XFG1', quantity: 1}],
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/canceled',        
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
    }
  },
  components: {
    StripeCheckout
  },
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
