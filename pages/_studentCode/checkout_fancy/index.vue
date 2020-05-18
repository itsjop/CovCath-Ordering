<template lang="pug">
section#checkout.justify-center.flex-col.align-center  
  script(src="js.stripe.com/v3")
  .card-form
    .card-list
      .card-item(v-bind:class="{ '-active' : isCardFlipped }")
        .card-item__side.-front
          .card-item__focus(v-bind:class="{'-active' : focusElementStyle }" v-bind:style='focusElementStyle' ref='focusElement')
          .card-item__cover
            img.card-item__bg(v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'")
          .card-item__wrapper
            .card-item__top
              img.card-item__chip(src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png')
              .card-item__type
                transition(name='slide-fade-up')
                  img.card-item__typeImg(v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'" v-if='getCardType' v-bind:key='getCardType' alt='')
            label.card-item__number(for='cardNumber' ref='cardNumber')
              template(v-if="getCardType === 'amex'")
                span(v-for='(n, $index) in amexCardMask' :key='$index')
                  transition(name='slide-fade-up')
                    .card-item__numberItem(v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''") *
                    .card-item__numberItem(:class="{ '-active' : n.trim() === '' }" :key='$index' v-else-if='cardNumber.length > $index')
                      | {{cardNumber[$index]}}
                    .card-item__numberItem(:class="{ '-active' : n.trim() === '' }" v-else='' :key='$index + 1') {{n}}
              template(v-else='')
                span(v-for='(n, $index) in otherCardMask' :key='$index')
                  transition(name='slide-fade-up')
                    .card-item__numberItem(v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''") *
                    .card-item__numberItem(:class="{ '-active' : n.trim() === '' }" :key='$index' v-else-if='cardNumber.length > $index')
                      | {{cardNumber[$index]}}
                    .card-item__numberItem(:class="{ '-active' : n.trim() === '' }" v-else='' :key='$index + 1') {{n}}
            .card-item__content
              label.card-item__info(for='cardName' ref='cardName')
                .card-item__holder Card Holder
                transition(name='slide-fade-up')
                  .card-item__name(v-if='cardName.length' key='1')
                    transition-group(name='slide-fade-right')
                      span.card-item__nameItem(v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')" v-if='$index === $index' v-bind:key='$index + 1') {{n}}
                  .card-item__name(v-else='' key='2') Full Name
              .card-item__date(ref='cardDate')
                label.card-item__dateTitle(for='cardMonth') Expires
                label.card-item__dateItem(for='cardMonth')
                  transition(name='slide-fade-up')
                    span(v-if='cardMonth' v-bind:key='cardMonth') {{cardMonth}}
                    span(v-else='' key='2') MM             
                label.card-item__dateItem(for='cardYear')
                  transition(name='slide-fade-up')
                    span(v-if='cardYear' v-bind:key='cardYear') /{{String(cardYear).slice(2,4)}}
                    span(v-else='' key='2') /YY
        .card-item__side.-back
          .card-item__cover
            img.card-item__bg(v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'")
          .card-item__band
          .card-item__cvv
            .card-item__cvvTitle CVV
            .card-item__cvvBand
              span(v-for='(n, $index) in cardCvv' :key='$index')
                | *
            .card-item__type
              img.card-item__typeImg(v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'" v-if='getCardType')
    .card-form__inner#card-element
      .card-input
        label.card-input__label(for='cardNumber') Card Number
        input#cardNumber.card-input__input(type='text' v-mask='generateCardNumberMask' v-model='cardNumber' v-on:focus='focusInput' v-on:blur='blurInput' data-ref='cardNumber' autocomplete='off')
      .card-input
        label.card-input__label(for='cardName') Card Holders
        input#cardName.card-input__input(type='text' v-model='cardName' v-on:focus='focusInput' v-on:blur='blurInput' data-ref='cardName' autocomplete='off')
      .card-form__row
        .card-form__col
          .card-form__group
            label.card-input__label(for='cardMonth') Expiration Date
            select#cardMonth.card-input__input.-select(v-model='cardMonth' v-on:focus='focusInput' v-on:blur='blurInput' data-ref='cardDate')
              option(value='' disabled='' selected='') Month
              option(v-bind:value="n < 10 ? '0' + n : n" v-for='n in 12' v-bind:disabled='n < minCardMonth' v-bind:key='n')
                | {{n &lt; 10 ? &apos;0&apos; + n : n}}
            select#cardYear.card-input__input.-select(v-model='cardYear' v-on:focus='focusInput' v-on:blur='blurInput' data-ref='cardDate')
              option(value='' disabled='' selected='') Year
              option(v-bind:value='$index + minCardYear' v-for='(n, $index) in 12' v-bind:key='n')
                | {{$index + minCardYear}}
        .card-form__col.-cvv
          .card-input
            label.card-input__label(for='cardCvv') CVV
            input#cardCvv.card-input__input(type='text' v-mask="'####'" maxlength='4' v-model='cardCvv' v-on:focus='flipCard(true)' v-on:blur='flipCard(false)' autocomplete='off')
      button.card-form__button Submit




    #example-2.cell.example.example2
      form
        .row.addresses.bg-white.text-gray-700(data-locale-reversible='')
          .row.address
            .field
              input#example2-address.input.empty(data-tid='elements_examples.form.address_placeholder' type='text' placeholder='185 Berry St' required='' autocomplete='address-line1')
              label(for='example2-address' data-tid='elements_examples.form.address_label') Address
              .baseline
          .row.addr-details(data-locale-reversible='')
            .field.half-width
              input#example2-city.input.empty(data-tid='elements_examples.form.city_placeholder' type='text' placeholder='San Francisco' required='' autocomplete='address-level2')
              label(for='example2-city' data-tid='elements_examples.form.city_label') City
              .baseline
            .field.quarter-width
              input#example2-state.input.empty(data-tid='elements_examples.form.state_placeholder' type='text' placeholder='CA' required='' autocomplete='address-level1')
              label(for='example2-state' data-tid='elements_examples.form.state_label') State
              .baseline
            .field.quarter-width
              input#example2-zip.input.empty(data-tid='elements_examples.form.postal_code_placeholder' type='text' placeholder='94107' required='' autocomplete='postal-code')
              label(for='example2-zip' data-tid='elements_examples.form.postal_code_label') ZIP
              .baseline
        .row.card-no
          .field
            #example2-card-number.input.empty
            label(for='example2-card-number' data-tid='elements_examples.form.card_number_label') Card number
            .baseline
        .row.expiry
          .field.half-width
            #example2-card-expiry.input.empty
            label(for='example2-card-expiry' data-tid='elements_examples.form.card_expiry_label') Expiration
            .baseline
          .field.half-width
            #example2-card-cvc.input.empty
            label(for='example2-card-cvc' data-tid='elements_examples.form.card_cvc_label') CVC
            .baseline
        button(type='submit' data-tid='elements_examples.form.pay_button') Pay $25
        .error(role='alert')
          svg(xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewbox='0 0 17 17')
            path.base(fill='#000' d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z')
            path.glyph(fill='#FFF' d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z')
          span.message
      .success
        .icon
          svg(width='84px' height='84px' viewbox='0 0 84 84' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink')
            circle.border(cx='42' cy='42' r='40' stroke-linecap='round' stroke-width='4' stroke='#000' fill='none')
            path.checkmark(stroke-linecap='round' stroke-linejoin='round' d='M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338' stroke-width='4' stroke='#000' fill='none')
        h3.title(data-tid='elements_examples.success.title') Payment successful
        p.message
          span(data-tid='elements_examples.success.message')
            | Thanks for trying Stripe Elements. No money was charged, but we generated a token:
          span.token tok_189gMN2eZvKYlo2CwTBv9KKh
        a.reset(href='#')
          svg(width='32px' height='32px' viewbox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink')
            path(fill='#000000' d='M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z')
      .caption
        span.no-charge(data-tid='elements_examples.caption.no_charge') Your card won&apos;t be charged
        a.source(href='https://github.com/stripe/elements-examples/#example-2')
          svg(width='16px' height='10px' viewbox='0 0 16 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink')
            path(d='M1,8 L12,8 C12.5522847,8 13,8.44771525 13,9 C13,9.55228475 12.5522847,10 12,10 L1,10 C0.44771525,10 6.76353751e-17,9.55228475 0,9 C-6.76353751e-17,8.44771525 0.44771525,8 1,8 L1,8 Z M1,4 L8,4 C8.55228475,4 9,4.44771525 9,5 C9,5.55228475 8.55228475,6 8,6 L1,6 C0.44771525,6 6.76353751e-17,5.55228475 0,5 C-6.76353751e-17,4.44771525 0.44771525,4 1,4 L1,4 Z M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,1 C16,1.55228475 15.5522847,2 15,2 L1,2 C0.44771525,2 6.76353751e-17,1.55228475 0,1 L0,1 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 L1,0 Z' fill='#AAB7C4')
          span(data-tid='elements_examples.caption.view_source') View source on GitHub

</template>

<script>
import {mask} from 'vue-the-mask'
import registerElements from './registerElements'
// import {loadStripe} from '@stripe/stripe-js';
// const stripe = await loadStripe(process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY);

export default {
  name: 'checkout',   
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  directives: {mask},
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();

    var stripe = Stripe(process.env.NUXT_ENV_STRIPE_PUBLISH_TEST_KEY);
   var elements = stripe.elements({
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
      },
    ],
    // Stripe's examples are localized to specific languages, but if
    // you wish to have Elements automatically detect your user's locale,
    // use `locale: 'auto'` instead.
    locale: window.__exampleLocale
  });

  // Floating labels
  var inputs = document.querySelectorAll('.cell.example.example2 .input');
  Array.prototype.forEach.call(inputs, function(input) {
    input.addEventListener('focus', function() {
      input.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      input.classList.remove('focused');
    });
    input.addEventListener('keyup', function() {
      if (input.value.length === 0) {
        input.classList.add('empty');
      } else {
        input.classList.remove('empty');
      }
    });
  });

  var elementStyles = {
    base: {
      color: '#32325D',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',

      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  var elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  };

  var cardNumber = elements.create('cardNumber', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardNumber.mount('#example2-card-number');

  var cardExpiry = elements.create('cardExpiry', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardExpiry.mount('#example2-card-expiry');

  var cardCvc = elements.create('cardCvc', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardCvc.mount('#example2-card-cvc');

  registerElements([cardNumber, cardExpiry, cardCvc], 'example2');
  },
  computed: {
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
}
</script>

<style lang="stylus">
@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap")
#checkout
  .addresses
    display grid
    grid-template-columns 1fr 1fr 1fr
    .address
      grid-column 1/4
      display grid
    .addr-details
      display flex
    >*
      border 2px solid red





body
  background: #ddeefc
  font-family: "Source Sans Pro", sans-serif
  font-size: 16px
*
  box-sizing: border-box
  &:focus
    outline: none
.wrapper
  min-height: 100vh
  display: flex
  padding: 50px 15px
  @media screen and (max-width: 700px), (max-height: 500px)
    flex-wrap: wrap
    flex-direction: column
.card-form
  max-width: 570px
  margin: auto
  width: 100%
  @media screen and (max-width: 576px)
    margin: 0 auto
  &__inner
    background: #fff
    // box-shadow: 3px 13px 30px 0px rgba(21, 34, 67, 0.2);
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4)
    border-radius: 10px
    padding: 35px
    padding-top: 180px
    @media screen and (max-width: 480px)
      padding: 25px
      padding-top: 165px
    @media screen and (max-width: 360px)
      padding: 15px
      padding-top: 165px
  &__row
    display: flex
    align-items: flex-start
    @media screen and (max-width: 480px)
      flex-wrap: wrap
  &__col
    flex: auto
    margin-right: 35px
    &:last-child
      margin-right: 0
    @media screen and (max-width: 480px)
      margin-right: 0
      flex: unset
      width: 100%
      margin-bottom: 20px
      &:last-child
        margin-bottom: 0
    &.-cvv
      max-width: 150px
      @media screen and (max-width: 480px)
        max-width: initial
  &__group
    display: flex
    align-items: flex-start
    flex-wrap: wrap
    .card-input__input
      flex: 1
      margin-right: 15px
      &:last-child
        margin-right: 0
  &__button
    width: 100%
    height: 55px
    background: #2364d2
    border: none
    border-radius: 5px
    font-size: 22px
    font-weight: 500
    font-family: "Source Sans Pro", sans-serif
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3)
    color: #fff
    margin-top: 20px
    cursor: pointer
    @media screen and (max-width: 480px)
      margin-top: 10px
.card-item
  max-width: 430px
  height: 270px
  margin-left: auto
  margin-right: auto
  position: relative
  z-index: 2
  width: 100%
  @media screen and (max-width: 480px)
    max-width: 310px
    height: 220px
    width: 90%
  @media screen and (max-width: 360px)
    height: 180px
  &.-active
    .card-item__side
      &.-front
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg)
      &.-back
        transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg)
        // box-shadow: 0 20px 50px 0 rgba(81, 88, 206, 0.65);
  &__focus
    position: absolute
    z-index: 3
    border-radius: 5px
    left: 0
    top: 0
    width: 100%
    height: 100%
    transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85)
    opacity: 0
    pointer-events: none
    overflow: hidden
    border: 2px solid rgba(255, 255, 255, 0.65)
    &:after
      content: ""
      position: absolute
      top: 0
      left: 0
      width: 100%
      background: rgb(8, 20, 47)
      height: 100%
      border-radius: 5px
      filter: blur(25px)
      opacity: 0.5
    &.-active
      opacity: 1
  &__side
    border-radius: 15px
    overflow: hidden
    // box-shadow: 3px 13px 30px 0px rgba(11, 19, 41, 0.5);
    box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55)
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)
    transform-style: preserve-3d
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85)
    backface-visibility: hidden
    height: 100%
    &.-back
      position: absolute
      top: 0
      left: 0
      width: 100%
      transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)
      z-index: 2
      padding: 0
      // background-color: #2364d2;
      // background-image: linear-gradient(
      //   43deg,
      //   #4158d0 0%,
      //   #8555c7 46%,
      //   #2364d2 100%
      // );
      height: 100%
      .card-item__cover
        transform: rotateY(-180deg)
  &__bg
    max-width: 100%
    display: block
    max-height: 100%
    height: 100%
    width: 100%
    object-fit: cover
  &__cover
    height: 100%
    background-color: #1c1d27
    position: absolute
    height: 100%
    background-color: #1c1d27
    left: 0
    top: 0
    width: 100%
    border-radius: 15px
    overflow: hidden
    &:after
      content: ""
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      background: rgba(6, 2, 29, 0.45)
  &__top
    display: flex
    align-items: flex-start
    justify-content: space-between
    margin-bottom: 40px
    padding: 0 10px
    @media screen and (max-width: 480px)
      margin-bottom: 25px
    @media screen and (max-width: 360px)
      margin-bottom: 15px
  &__chip
    width: 60px
    @media screen and (max-width: 480px)
      width: 50px
    @media screen and (max-width: 360px)
      width: 40px
  &__type
    height: 45px
    position: relative
    display: flex
    justify-content: flex-end
    max-width: 100px
    margin-left: auto
    width: 100%
    @media screen and (max-width: 480px)
      height: 40px
      max-width: 90px
    @media screen and (max-width: 360px)
      height: 30px
  &__typeImg
    max-width: 100%
    object-fit: contain
    max-height: 100%
    object-position: top right
  &__info
    color: #fff
    width: 100%
    max-width: calc(100% - 85px)
    padding: 10px 15px
    font-weight: 500
    display: block
    cursor: pointer
    @media screen and (max-width: 480px)
      padding: 10px
  &__holder
    opacity: 0.7
    font-size: 13px
    margin-bottom: 6px
    @media screen and (max-width: 480px)
      font-size: 12px
      margin-bottom: 5px
  &__wrapper
    font-family: "Source Code Pro", monospace
    padding: 25px 15px
    position: relative
    z-index: 4
    height: 100%
    text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8)
    user-select: none
    @media screen and (max-width: 480px)
      padding: 20px 10px
  &__name
    font-size: 18px
    line-height: 1
    white-space: nowrap
    max-width: 100%
    overflow: hidden
    text-overflow: ellipsis
    text-transform: uppercase
    @media screen and (max-width: 480px)
      font-size: 16px
  &__nameItem
    display: inline-block
    min-width: 8px
    position: relative
  &__number
    font-weight: 500
    line-height: 1
    color: #fff
    font-size: 27px
    margin-bottom: 35px
    display: inline-block
    padding: 10px 15px
    cursor: pointer
    @media screen and (max-width: 480px)
      font-size: 21px
      margin-bottom: 15px
      padding: 10px 10px
    @media screen and (max-width: 360px)
      font-size: 19px
      margin-bottom: 10px
      padding: 10px 10px
  &__numberItem
    width: 16px
    display: inline-block
    &.-active
      width: 30px
    @media screen and (max-width: 480px)
      width: 13px
      &.-active
        width: 16px
    @media screen and (max-width: 360px)
      width: 12px
      &.-active
        width: 8px
  &__content
    color: #fff
    display: flex
    align-items: flex-start
  &__date
    flex-wrap: wrap
    font-size: 18px
    margin-left: auto
    padding: 10px
    display: inline-flex
    width: 80px
    white-space: nowrap
    flex-shrink: 0
    cursor: pointer
    @media screen and (max-width: 480px)
      font-size: 16px
  &__dateItem
    position: relative
    span
      width: 22px
      display: inline-block
  &__dateTitle
    opacity: 0.7
    font-size: 13px
    padding-bottom: 6px
    width: 100%
    @media screen and (max-width: 480px)
      font-size: 12px
      padding-bottom: 5px
  &__band
    background: rgba(0, 0, 19, 0.8)
    width: 100%
    height: 50px
    margin-top: 30px
    position: relative
    z-index: 2
    @media screen and (max-width: 480px)
      margin-top: 20px
    @media screen and (max-width: 360px)
      height: 40px
      margin-top: 10px
  &__cvv
    text-align: right
    position: relative
    z-index: 2
    padding: 15px
    .card-item__type
      opacity: 0.7
    @media screen and (max-width: 360px)
      padding: 10px 15px
  &__cvvTitle
    padding-right: 10px
    font-size: 15px
    font-weight: 500
    color: #fff
    margin-bottom: 5px
  &__cvvBand
    height: 45px
    background: #fff
    margin-bottom: 30px
    text-align: right
    display: flex
    align-items: center
    justify-content: flex-end
    padding-right: 10px
    color: #1a3b5d
    font-size: 18px
    border-radius: 4px
    box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35)
    @media screen and (max-width: 480px)
      height: 40px
      margin-bottom: 20px
    @media screen and (max-width: 360px)
      margin-bottom: 15px
.card-list
  margin-bottom: -130px
  @media screen and (max-width: 480px)
    margin-bottom: -120px
.card-input
  margin-bottom: 20px
  &__label
    font-size: 14px
    margin-bottom: 5px
    font-weight: 500
    color: #1a3b5d
    width: 100%
    display: block
    user-select: none
  &__input
    width: 100%
    height: 50px
    border-radius: 5px
    box-shadow: none
    border: 1px solid #ced6e0
    transition: all 0.3s ease-in-out
    font-size: 18px
    padding: 5px 15px
    background: none
    color: #1a3b5d
    font-family: "Source Sans Pro", sans-serif
    &:hover,
    &:focus
      border-color: #3d9cff
    &:focus
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35)
    &.-select
      -webkit-appearance: none
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC")
      background-size: 12px
      background-position: 90% center
      background-repeat: no-repeat
      padding-right: 30px
.slide-fade-up-enter-active
  transition: all 0.25s ease-in-out
  transition-delay: 0.1s
  position: relative
.slide-fade-up-leave-active
  transition: all 0.25s ease-in-out
  position: absolute
.slide-fade-up-enter
  opacity: 0
  transform: translateY(15px)
  pointer-events: none
.slide-fade-up-leave-to
  opacity: 0
  transform: translateY(-15px)
  pointer-events: none
.slide-fade-right-enter-active
  transition: all 0.25s ease-in-out
  transition-delay: 0.1s
  position: relative
.slide-fade-right-leave-active
  transition: all 0.25s ease-in-out
  position: absolute
.slide-fade-right-enter
  opacity: 0
  transform: translateX(10px) rotate(45deg)
  pointer-events: none
.slide-fade-right-leave-to
  opacity: 0
  transform: translateX(-10px) rotate(45deg)
  pointer-events: none
.github-btn
  position: absolute
  right: 40px
  bottom: 50px
  text-decoration: none
  padding: 15px 25px
  border-radius: 4px
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65)
  background: #24292e
  color: #fff
  font-weight: bold
  letter-spacing: 1px
  font-size: 16px
  text-align: center
  transition: all .3s ease-in-out
  @media screen and (min-width: 500px)
    &:hover
      transform: scale(1.1)
      box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36)
  @media screen and (max-width: 700px)
    position: relative
    bottom: auto
    right: auto
    margin-top: 20px
    &:active
      transform: scale(1.1)
      box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36)
</style>
