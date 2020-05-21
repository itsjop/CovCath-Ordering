<template lang="pug">
// TODO: Programatically check if there's not a user wit the Routing ID, and if so, send them back to the front page.
section#studentModelCheck.justify-center.flex-col.align-center
  script(type="application/javascript" src="https://js.stripe.com/v3")
  h1.text-center.text-4xl Welcome, {{studentInfo[0] ? (studentInfo[0].preferredName ? studentInfo[0].preferredName : studentInfo[0].firstName) +" "+ studentInfo[0].lastName : ''}}!
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
          span.tag(v-if="studentInfo[0].assistancePercent !=='0'")
            span.line-through ${{(model.price/100).toFixed(2)}}
            span &nbsp;${{((model.price * (1.0 -(Number(studentInfo[0].assistancePercent)/100)))/100).toFixed(2)}} ({{studentInfo[0].assistancePercent}}% off{{Number(studentInfo[0].assistancePercent)>50 ? "!" : ''}})
          span.tag(v-else)
            span ${{(model.price/100).toFixed(2)}}
      //- stripe-checkout.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700(
          ref='checkoutRef' :pk='pk' :items='items' :successurl='successUrl' :cancelurl='cancelUrl' :billingAddressCollection='billingAddressCollection' :locale="locale")
      //- template(slot='checkout-button')
      //- nuxt-link.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700( :to="'/'+$route.params.studentCode+'/checkout/'")
      //-   | i wanna buy it!!
  
  transition(name="fade")
    t-modal( ref="modal" hideCloseButton="true") 
      .mod.text-gray-800.grid.justify-center.content-around.h-full
        h1.text-center.font-light.text-3xl Before you Check Out:
        h1.text-center.font-light.text-xl.mt-8 After submitting your information, do 
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
        let discountSku = "price_HJb2t1wEODoxqy"
        if(this.studentInfo[0].assistancePercent === "0"  ) discountSku = "price_HJb2t1wEODoxqy"
        if(this.studentInfo[0].assistancePercent === "5"  ) discountSku = "price_HJbd5wEUdS2cfM"
        if(this.studentInfo[0].assistancePercent === "10" ) discountSku = "price_HJbe6ifT04cVdy"
        if(this.studentInfo[0].assistancePercent === "15" ) discountSku = "price_HJbeoBHNMGztbH"
        if(this.studentInfo[0].assistancePercent === "20" ) discountSku = "price_HJbeH2viNYMNpO"
        if(this.studentInfo[0].assistancePercent === "25" ) discountSku = "price_HJbeq40mkHevA7"
        if(this.studentInfo[0].assistancePercent === "30" ) discountSku = "price_HJbeEayQm6oAWb"
        if(this.studentInfo[0].assistancePercent === "35" ) discountSku = "price_HJbeEHqm6IOx3k"
        if(this.studentInfo[0].assistancePercent === "40" ) discountSku = "price_HJbeyxL9LCNROU"
        if(this.studentInfo[0].assistancePercent === "45" ) discountSku = "price_HJbfNg3dwtZw9L"
        if(this.studentInfo[0].assistancePercent === "50" ) discountSku = "price_HJbghkjHfsWbPu"
        if(this.studentInfo[0].assistancePercent === "55" ) discountSku = "price_HJbghi9R3xjO8S"
        if(this.studentInfo[0].assistancePercent === "60" ) discountSku = "price_HJbgWqrH4Fc4wb"
        if(this.studentInfo[0].assistancePercent === "65" ) discountSku = "price_HJbgkNcQbqzkA6"
        if(this.studentInfo[0].assistancePercent === "70" ) discountSku = "price_HJbgQP2cAju7oK"
        if(this.studentInfo[0].assistancePercent === "75" ) discountSku = "price_HJbgMBMgxmt0eX"
        if(this.studentInfo[0].assistancePercent === "80" ) discountSku = "price_HJbgKLPLUGVpJm"
        if(this.studentInfo[0].assistancePercent === "85" ) discountSku = "price_HJbhaHpEKa6lYX"
        if(this.studentInfo[0].assistancePercent === "90" ) discountSku = "price_HJbhcn61kPQ9cy"
        if(this.studentInfo[0].assistancePercent === "95" ) discountSku = "price_HJbhDyLAGjhirl"
        if(this.studentInfo[0].assistancePercent === "100") discountSku = "price_HJbh9mBnynn7Ng"
        stripe.redirectToCheckout({
          // items: [{sku: discountSku, quantity: 1}],          
          lineItems: [{price: discountSku, quantity: 1}],
          mode: 'payment',
          successUrl: `http://localhost:3000/success/${this.studentInfo[0].code}/${this.studentInfo[0].id}`,
          cancelUrl: `http://localhost:3000/checkout/${this.studentInfo[0].code}`,        
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


// GBS SKUs
  if(this.studentInfo[0].assistancePercent === "0"  ) discountSku = "sku_HIn9wxYZrMH0a7"
  if(this.studentInfo[0].assistancePercent === "5"  ) discountSku = "sku_HJUy21Ha5yy1r2"
  if(this.studentInfo[0].assistancePercent === "10" ) discountSku = "sku_HJUyEJ7CJ6dRie"
  if(this.studentInfo[0].assistancePercent === "15" ) discountSku = "sku_HJUzcns1st3qF5"
  if(this.studentInfo[0].assistancePercent === "20" ) discountSku = "sku_HJV15pyWZalB4q"
  if(this.studentInfo[0].assistancePercent === "25" ) discountSku = "sku_HJV2ns7rC0pA3k"
  if(this.studentInfo[0].assistancePercent === "30" ) discountSku = "sku_HJV2cZyW05gp8q"
  if(this.studentInfo[0].assistancePercent === "35" ) discountSku = "sku_HJV3G699pMOprS"
  if(this.studentInfo[0].assistancePercent === "40" ) discountSku = "sku_HJV4rxbWAnF7Nf"
  if(this.studentInfo[0].assistancePercent === "45" ) discountSku = "sku_HJV4igYguOxkrw"
  if(this.studentInfo[0].assistancePercent === "50" ) discountSku = "sku_HJV4mOuX4hWmEU"
  if(this.studentInfo[0].assistancePercent === "55" ) discountSku = "sku_HJV5nEhJf5Wtg3"
  if(this.studentInfo[0].assistancePercent === "60" ) discountSku = "sku_HJV5XDbbchpHLW"
  if(this.studentInfo[0].assistancePercent === "65" ) discountSku = "sku_HJV5AnVm7qaDs0"
  if(this.studentInfo[0].assistancePercent === "70" ) discountSku = "sku_HJV6ZF01fuwXLA"
  if(this.studentInfo[0].assistancePercent === "75" ) discountSku = "sku_HJV6a1i1ZWMNoI"
  if(this.studentInfo[0].assistancePercent === "80" ) discountSku = "sku_HJV6UhgOF8XRSO"
  if(this.studentInfo[0].assistancePercent === "85" ) discountSku = "sku_HJV762wmQsYmsl"
  if(this.studentInfo[0].assistancePercent === "90" ) discountSku = "sku_HJV7D14JWs1bCq"
  if(this.studentInfo[0].assistancePercent === "95" ) discountSku = "sku_HJV7kacHNfdDsK"
  if(this.studentInfo[0].assistancePercent === "100") discountSku = "sku_HJV88Sq0AJbFju"