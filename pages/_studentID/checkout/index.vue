<template lang="pug">
section#checkout
  script(type="thislication/javascript" src="js.stripe.com/v3")
  #firebaseui-auth-container
  #loader &mldr;
  div(v-if='currentUser')
    h2 Hello {{ currentUser.email }},
    button(v-on:click='signOut') Sign out
    div(v-if='stripeCustomerInitialized')
      h3 Credit Cards
      ul
        li(v-for='source in sources')
          span(v-if='source.id')
            | {{ source.brand }} &mldr;{{ source.last4 }}
            | (exp. {{ source.exp_month }}/{{ source.exp_year }})
          span(v-else='') &mldr;
      div
        h4 New
        div
          label
            | Number 
            input(v-model='newCreditCard.number')
        div
          label CCV 
            input(v-model='newCreditCard.cvc')
        div
          label Exp
            input(v-model='newCreditCard.exp_month' size='2') 
            span /
            input(v-model='newCreditCard.exp_year' size='4')
        div
          label
            | Zip 
            input(v-model='newCreditCard.address_zip')
        div
          button(v-on:click='submitNewCreditCard') Add
          |                 {{ newCreditCard.error }}
      h3 Charges
      ul
        li(v-for='(charge, id) in charges')
          | {{ charge.amount }}
          span(v-if='charge.error')
            | {{ charge.error }}
          span(v-else-if='charge.outcome')
            | {{ charge.outcome.seller_message }}
            | {{ charge.source.brand }} &mldr;{{ charge.source.last4 }}
            | (exp. {{ charge.source.exp_month }}/{{ charge.source.exp_year }})
          span(v-else='') &mldr;
      h4 New
      div
        label
          | Card
          select(v-model='newCharge.source')
            option(:value='null') Default payment method
            option(v-for='(source, id) in sources' v-bind:value='source.id' v-if='source.id')
              | {{ source.brand }} &mldr;{{ source.last4 }}
              | (exp. {{ source.exp_month }}/{{ source.exp_year }})
      div
        label
          | Amount 
          input(v-model='newCharge.amount')
      div
        button(v-on:click='submitNewCharge') Charge
        |               {{ newCharge.error }}
    div(v-else='') &mldr;
  script(type="thislication/javascript" src='/__/firebase/7.14.3/firebase-this.js')
  script(type="thislication/javascript" src='/__/firebase/7.14.3/firebase-auth.js')
  script(type="thislication/javascript" src='/__/firebase/7.14.3/firebase-firestore.js')
  script(type="thislication/javascript" src='/__/firebase/init.js')
  script(type="thislication/javascript" src='https://www.gstatic.com/firebasejs/ui/4.4.0/firebase-ui-auth.js')
</template>

<script>

import db from '../../../firebase'
import { StripeCheckout } from 'vue-stripe-checkout';
import * as firebaseui from 'firebaseui'
var firebase = require('firebase');
export default {
  name: 'checkout',   
  data() {
    return {
      currentUser: null,
      sources: {},
      stripeCustomerInitialized: false,
      newCreditCard: {
        number: '4242424242424242',
        cvc: '111',
        exp_month: 1,
        exp_year: 2020,
        address_zip: '00000'
      },
      charges: {},
      newCharge: {
        source: null,
        amount: 2000
      }
    }
  },
  created(){       
    var stripe = Stripe('pk_test_8nUr1tVtOxX0GXaMn6lBL9Q100FBO5R8Jr');
    var firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
    var firebaseAuthOptions = {
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl) => { return false; },
        uiShown: () => { document.getElementById('loader').style.display = 'none'; }
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ],
      tosUrl: '/'
    };
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        document.getElementById('loader').style.display = 'none';
        this.currentUser = firebaseUser;
        this.listen();
      } else {
        firebaseUI.start('#firebaseui-auth-container', firebaseAuthOptions);
        this.currentUser = null;
      }
    });
  },
  ready: () => {
  },
  methods: {
    listen: function() {
      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).onSnapshot(snapshot => {
        this.stripeCustomerInitialized = (snapshot.data() !== null);
      }, () => {
        this.stripeCustomerInitialized = false;
      });
      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('sources').onSnapshot(snapshot => {
        let newSources = {};
        snapshot.forEach(doc => {
          const id = doc.id;
          newSources[id] = doc.data();
        })
        this.sources = newSources;
      }, () => {
        this.sources = {};
      });
      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('charges').onSnapshot(snapshot => {
      let newCharges = {};
        snapshot.forEach(doc => {
          const id = doc.id;
          newCharges[id] = doc.data();
        })
        this.charges = newCharges;
      }, () => {
        this.charges = {};
      });
    },
    submitNewCreditCard: function() {
      Stripe.card.createToken({
        number: this.newCreditCard.number,
        cvc: this.newCreditCard.cvc,
        exp_month: this.newCreditCard.exp_month,
        exp_year: this.newCreditCard.exp_year,
        address_zip: this.newCreditCard.address_zip
      }, (status, response) => {
        if (response.error) {
          this.newCreditCard.error = response.error.message;
        } else {
          firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('tokens').add({token: response.id}).then(() => {
            this.newCreditCard = {
              number: '',
              cvc: '',
              exp_month: 1,
              exp_year: 2017,
              address_zip: ''
            };
          });
        }
      });
    },
    submitNewCharge: function() {
      firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('charges').add({
        source: this.newCharge.source,
        amount: parseInt(this.newCharge.amount)
      });
    },
    signOut: function() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style lang="stylus">
// #checkout
input
  color black !important
</style>
