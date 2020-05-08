<template lang="pug">
section#checkout.justify-center.flex-col.align-center  
  script(type="application/javascript" src="js.stripe.com/v3")
  stripe-checkout(ref='checkoutRef' :pk='pk' :items='items' :successurl='successUrl' :cancelurl='cancelUrl' :billingAddressCollection='billingAddressCollection' :locale="locale")
    template(slot='checkout-button')
      button#checkout-button-sku_HEL9wQzNu9XFG1(@click='checkout') Shutup and take my money!



</template>

<script>
// import registerElements from './registerElements'
import { StripeCheckout } from 'vue-stripe-checkout';
// import {loadStripe} from '@stripe/stripe-js';
// const stripe = await loadStripe(process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY);

export default {
  name: 'checkout',   
  data() {
    return {
      billingAddressCollection:"auto",
      items:[{
        quantity:1,
        sku:"sku_FdQKocNoVzznpJ",
      },],
      locale:"auto",
      pk:process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY,
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/canceled',
    }
  },
  methods: {
    checkout () {
      var stripe = Stripe('pk_test_8nUr1tVtOxX0GXaMn6lBL9Q100FBO5R8Jr');

      var checkoutButton = document.getElementById('checkout-button-sku_HEL9wQzNu9XFG1');
      stripe.redirectToCheckout({
        items: [{sku: 'sku_HEL9wQzNu9XFG1', quantity: 1}],
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/canceled',
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
  mounted() {
    
    //   stripe.redirectToCheckout({
    //     // Make the id field from the Checkout Session creation API response
    //     // available to this file, so you can provide it as parameter here
    //     // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    //     sessionId: '{{CHECKOUT_SESSION_ID}}'
    //   }).then(function (result) {
    //     // If `redirectToCheckout` fails due to a browser or network
    //     // error, display the localized error message to your customer
    //     // using `result.error.message`.
    //  });
  },

  components: {
    StripeCheckout
  },
}
</script>

<style lang="stylus">

</style>
