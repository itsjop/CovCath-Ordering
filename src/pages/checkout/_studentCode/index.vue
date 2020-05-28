<template lang="pug">
// TODO: Programatically check if there's not a user wit the Routing ID, and if so, send them back to the front page.
section#studentModelCheck.justify-center.flex-col.align-center.py-8
  script(type="application/javascript" src="https://js.stripe.com/v3")
  h1.text-center.text-4xl(v-if="studentInfo") Welcome, {{studentInfo ? (studentInfo.preferredName ? studentInfo.preferredName : studentInfo.firstName) +" "+ studentInfo.lastName : ''}}!
  .specsheet.flex.justify-center.sm_px-12.md_p-0(v-if="studentInfo" class='w-full')
    .model.bg-white.rounded-md.border-8.border-white.border-solid.text-gray-800.p-5.grid(class='w-full md_w-3/4' v-if="modelList" v-for="model in modelList")
      h1.title.font-bold.text-3xl {{model.title}}
      img(:src="model.image")
      ul.details.list-disc
        li.ml-8(v-for="feature in model.features")
          | {{feature}}
        li.ml-8.text-green-500(v-for="additionalFeature in model.additionalFeatures")
          | {{additionalFeature}}
      .disclaimer
        p(v-for="disclaimer in model.disclaimers") {{disclaimer}}
      .price(v-if="studentInfo")
        button.text-white.bg-blue-500.rounded.p-4.px-4.mt-8(@click="showModal") Purchase for 
          span.tag(v-if="String(studentInfo.assistancePercent) !=='0'")
            span.line-through ${{(model.price/100).toFixed(2)}}
            span &nbsp;${{((model.price * (1.0 -(Number(studentInfo.assistancePercent)/100)))/100).toFixed(2)}} ({{studentInfo.assistancePercent}}% off{{Number(studentInfo.assistancePercent)>50 ? "!" : ''}})
          span.tag(v-else)
            span ${{(model.price/100).toFixed(2)}}
      //- stripe-checkout.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700(
          ref='checkoutRef' :pk='pk' :items='items' :successurl='successUrl' :cancelurl='cancelUrl' :billingAddressCollection='billingAddressCollection' :locale="locale")
      //- template(slot='checkout-button')
      //- nuxt-link.buybutton.bg-blue-500.text-white.font-bold.py-2.px-4.rounded.hover_bg-blue-700( :to="'/'+$route.params.studentCode+'/checkout/'")
      //-   | i wanna buy it!!
  
  .cube-holder.mt-8.transform.relative.w-12.pb-8(v-else)
    .sk-chase
      .sk-chase-dot
      .sk-chase-dot
      .sk-chase-dot
      .sk-chase-dot
      .sk-chase-dot
      .sk-chase-dot

  t-modal.modal-custom( wrapper-class="bg-blue-100 border-blue-400 text-blue-700 rounded shadow-xl flex flex-col"
                        overlay-class="z-30 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-blue-900 opacity-75"
                        body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
                        container-class = 'z-40 relative p-3 mx-auto my-0 max-w-full'
                        base-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed" 
                        footerClass="bg-blue-400 p-3 flex justify-between"
                        ref="modal" 
                        transition="ease"
                        hideCloseButton=true) 
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

import { db } from "../../../../firebase"
import TModal from 'vue-tailwind/src/components/TModal.vue'

export default {
  name: 'studentModelCheck',   
  data() {
    return {
      orgInfo: '',
      studentInfo: '',
      modal: false
    }
  },
  created(){
    db.collection('orgs').doc('covCath').get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        this.orgInfo = snapshot.data()
      }).catch(err => {
        console.log('Error getting documents', err);
      });
    db.collection('students').where('code', '==', this.$route.params.studentCode).get()
      .then(snapshot => {
        if (snapshot.empty) {
          $nuxt.$router.replace({ path: '/' });      
          this.$toast.error("Sorry. No one with that code exists. Check your spelling and try again.")
        }  
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.studentInfo = doc.data()
        });
      }).catch(err => {
        $nuxt.$router.replace({ path: '/' });      
        this.$toast.error("Sorry. No one with that code exists. Check your spelling and try again.")
      });
  },

  // firestore() {    
  //   return {
  //     orgInfo: db.collection('orgs').doc('covCath'),
  //     studentInfo: db.collection('students').where('code', '==', this.$route.params.studentCode)
  //   }
  // },
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
      db.collection('students').doc(this.studentInfo.id).update({
        paymentStatus: "unconfirmed"
      }).then(querySnapshot => {
        var stripe = Stripe(process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY);
        var checkoutButton = document.getElementById('checkout-button-sku_HEL9wQzNu9XFG1');
        let discountSku = "price_HJb2t1wEODoxqy"
        if(this.studentInfo.assistancePercent === "0"  ) discountSku = "price_HJb2t1wEODoxqy"
        if(this.studentInfo.assistancePercent === "5"  ) discountSku = "price_HJbd5wEUdS2cfM"
        if(this.studentInfo.assistancePercent === "10" ) discountSku = "price_HJbe6ifT04cVdy"
        if(this.studentInfo.assistancePercent === "15" ) discountSku = "price_HJbeoBHNMGztbH"
        if(this.studentInfo.assistancePercent === "20" ) discountSku = "price_HJbeH2viNYMNpO"
        if(this.studentInfo.assistancePercent === "25" ) discountSku = "price_HJbeq40mkHevA7"
        if(this.studentInfo.assistancePercent === "30" ) discountSku = "price_HJbeEayQm6oAWb"
        if(this.studentInfo.assistancePercent === "35" ) discountSku = "price_HJbeEHqm6IOx3k"
        if(this.studentInfo.assistancePercent === "40" ) discountSku = "price_HJbeyxL9LCNROU"
        if(this.studentInfo.assistancePercent === "45" ) discountSku = "price_HJbfNg3dwtZw9L"
        if(this.studentInfo.assistancePercent === "50" ) discountSku = "price_HJbghkjHfsWbPu"
        if(this.studentInfo.assistancePercent === "55" ) discountSku = "price_HJbghi9R3xjO8S"
        if(this.studentInfo.assistancePercent === "60" ) discountSku = "price_HJbgWqrH4Fc4wb"
        if(this.studentInfo.assistancePercent === "65" ) discountSku = "price_HJbgkNcQbqzkA6"
        if(this.studentInfo.assistancePercent === "70" ) discountSku = "price_HJbgQP2cAju7oK"
        if(this.studentInfo.assistancePercent === "75" ) discountSku = "price_HJbgMBMgxmt0eX"
        if(this.studentInfo.assistancePercent === "80" ) discountSku = "price_HJbgKLPLUGVpJm"
        if(this.studentInfo.assistancePercent === "85" ) discountSku = "price_HJbhaHpEKa6lYX"
        if(this.studentInfo.assistancePercent === "90" ) discountSku = "price_HJbhcn61kPQ9cy"
        if(this.studentInfo.assistancePercent === "95" ) discountSku = "price_HJbhDyLAGjhirl"
        if(this.studentInfo.assistancePercent === "100") discountSku = "price_HJbh9mBnynn7Ng"
        stripe.redirectToCheckout({
          // items: [{sku: discountSku, quantity: 1}],          
          lineItems: [{price: discountSku, quantity: 1}],
          mode: 'payment',
          successUrl: `http://${process.env.NUXT_ENV_STRIPE_REDIRECT_URL}/success/${this.studentInfo.code}/${this.studentInfo.id}`,
          cancelUrl: `http://${process.env.NUXT_ENV_STRIPE_REDIRECT_URL}/checkout/${this.studentInfo.code}`,        
          clientReferenceId: this.studentInfo.code,
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
    TModal
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
    @media screen and (max-width: 760px) 
      grid-template: \
        "title" auto \
        "img" auto \
        "desc" auto \
        "discl" auto\
        "price" auto\
        "buy" auto\
        / 1fr
    img
      grid-area img
      width 100%
      // filter drop-shadow(0px 0px 10px #666)
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
  .modal-custom
    div:first-child
      z-index 50
    div:nth-child(2)
      background-color #00000088
  .cube-holder
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  animation: sk-chase-dot 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: white;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
}

</style>

// Cov Test SKUs
let discountSku = "price_HJb67DvVvt52JB"
if(this.studentInfo.assistancePercent === "0"  ) discountSku = "price_HJb67DvVvt52JB"
if(this.studentInfo.assistancePercent === "5"  ) discountSku = "price_HJbEo3e5g11ipV"
if(this.studentInfo.assistancePercent === "10" ) discountSku = "price_HJbEOs6JD6SwMz"
if(this.studentInfo.assistancePercent === "15" ) discountSku = "price_HJbFbUbKlekz1S"
if(this.studentInfo.assistancePercent === "20" ) discountSku = "price_HJbFTzUieuIrZO"
if(this.studentInfo.assistancePercent === "25" ) discountSku = "price_HJbFVullCv6TFZ"
if(this.studentInfo.assistancePercent === "30" ) discountSku = "price_HJbGi0py6E6B59"
if(this.studentInfo.assistancePercent === "35" ) discountSku = "price_HJbGxEuskDVVkZ"
if(this.studentInfo.assistancePercent === "40" ) discountSku = "price_HJbG2Fhm4Z2JM7"
if(this.studentInfo.assistancePercent === "45" ) discountSku = "price_HJbGyKtSM2Qzwl"
if(this.studentInfo.assistancePercent === "50" ) discountSku = "price_HJb9dKJG6lmsRj"
if(this.studentInfo.assistancePercent === "55" ) discountSku = "price_HJbGQXoCdzRIsL"
if(this.studentInfo.assistancePercent === "60" ) discountSku = "price_HJbHd3bexeEhzq"
if(this.studentInfo.assistancePercent === "65" ) discountSku = "price_HJbHs5E5yFZAU2"
if(this.studentInfo.assistancePercent === "70" ) discountSku = "price_HJbIhDW1DcT2Vr"
if(this.studentInfo.assistancePercent === "75" ) discountSku = "price_HJbIbdosPcZZjg"
if(this.studentInfo.assistancePercent === "80" ) discountSku = "price_HJbICvRGrT1D8j"
if(this.studentInfo.assistancePercent === "85" ) discountSku = "price_HJbIAgykN7DtIA"
if(this.studentInfo.assistancePercent === "90" ) discountSku = "price_HJbIeBJkSXtr09"
if(this.studentInfo.assistancePercent === "95" ) discountSku = "price_HJbJZ9VzsbgXFe"
if(this.studentInfo.assistancePercent === "100") discountSku = "price_HJbJ56v1FXcxHc"

// Cov Live SKUs
let discountSku = "price_HJb2t1wEODoxqy"
if(this.studentInfo.assistancePercent === "0"  ) discountSku = "price_HJb2t1wEODoxqy"
if(this.studentInfo.assistancePercent === "5"  ) discountSku = "price_HJbd5wEUdS2cfM"
if(this.studentInfo.assistancePercent === "10" ) discountSku = "price_HJbe6ifT04cVdy"
if(this.studentInfo.assistancePercent === "15" ) discountSku = "price_HJbeoBHNMGztbH"
if(this.studentInfo.assistancePercent === "20" ) discountSku = "price_HJbeH2viNYMNpO"
if(this.studentInfo.assistancePercent === "25" ) discountSku = "price_HJbeq40mkHevA7"
if(this.studentInfo.assistancePercent === "30" ) discountSku = "price_HJbeEayQm6oAWb"
if(this.studentInfo.assistancePercent === "35" ) discountSku = "price_HJbeEHqm6IOx3k"
if(this.studentInfo.assistancePercent === "40" ) discountSku = "price_HJbeyxL9LCNROU"
if(this.studentInfo.assistancePercent === "45" ) discountSku = "price_HJbfNg3dwtZw9L"
if(this.studentInfo.assistancePercent === "50" ) discountSku = "price_HJbghkjHfsWbPu"
if(this.studentInfo.assistancePercent === "55" ) discountSku = "price_HJbghi9R3xjO8S"
if(this.studentInfo.assistancePercent === "60" ) discountSku = "price_HJbgWqrH4Fc4wb"
if(this.studentInfo.assistancePercent === "65" ) discountSku = "price_HJbgkNcQbqzkA6"
if(this.studentInfo.assistancePercent === "70" ) discountSku = "price_HJbgQP2cAju7oK"
if(this.studentInfo.assistancePercent === "75" ) discountSku = "price_HJbgMBMgxmt0eX"
if(this.studentInfo.assistancePercent === "80" ) discountSku = "price_HJbgKLPLUGVpJm"
if(this.studentInfo.assistancePercent === "85" ) discountSku = "price_HJbhaHpEKa6lYX"
if(this.studentInfo.assistancePercent === "90" ) discountSku = "price_HJbhcn61kPQ9cy"
if(this.studentInfo.assistancePercent === "95" ) discountSku = "price_HJbhDyLAGjhirl"
if(this.studentInfo.assistancePercent === "100") discountSku = "price_HJbh9mBnynn7Ng"

// GBS Test SKUs
let discountSku = "asfd"
if(this.studentInfo.assistancePercent === "0"  ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "5"  ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "10" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "15" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "20" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "25" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "30" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "35" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "40" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "45" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "50" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "55" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "60" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "65" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "70" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "75" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "80" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "85" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "90" ) discountSku = "asdf"
if(this.studentInfo.assistancePercent === "95" ) discountSku = "adsf"
if(this.studentInfo.assistancePercent === "100") discountSku = "adsf"
