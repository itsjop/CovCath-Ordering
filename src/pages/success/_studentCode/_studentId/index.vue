<template lang="pug">
section#success.grid.justify-center.align-center
  .card.bg-white.text-gray-800.rounded.relative(class="w-3/4 h-3/4")
    transition(name="fade")
      .confirming.relative.grid.justify-center.absolute.top-0(v-if="!allConfirmed" )
        h1.text-center.font-light.text-3xl Just a second while we confirm your registration...
        .cube-holder.mt-8.transform.relative.w-12.pb-8
          .sk-chase
            .sk-chase-dot
            .sk-chase-dot
            .sk-chase-dot
            .sk-chase-dot
            .sk-chase-dot
            .sk-chase-dot
        h1.text-center
          span.font-bold Do not close the page 
          span or your order will not be automatically confirmed.
    transition(name="fade")
      .confirmation.top-0(v-if="allConfirmed" ) 
        .valid-order(v-if="validOrder")
          h1.text-center.font-light.text-3xl Your Order is confirmed!
          h1.text-center.text-xl.font-bold You can now close this window.
        .invalid-order(v-else)
          h1.text-center.font-light.text-3xl We could not confirm your order.
          h1.text-center.text-xl.font-bold Please contact the Financial Aid Office to confirm your order's status.
</template>


<script>
import { db } from "../../../../../firebase"
export default {
  name: 'success',   
  data() {
    return {
      studentCode:"",
      studentId:"",
      studentInfo:[],
      allConfirmed: false,
      validOrder: false
    }
  },
  
  firestore() {    
    studentInfo: db.collection('students').where('code', '==', this.$route.params.studentCode)
    
  },
  created(){
    this.studentCode = this.$route.params.studentCode
    this.studentId = this.$route.params.studentId
    db.collection('students').where('code', '==', this.$route.params.studentCode).get()
      .then(querySnapshot => {
      const documents = querySnapshot.docs.map(doc => doc.data())
      console.log("docs",documents[0])
      documents[0].id === this.$route.params.studentId 
        ? (this.validOrder = true, this.confirmOrder(this.$route.params.studentId))
        : (this.validOrder = false, this.allConfirmed = true)
    })
  },
  methods:{    
    confirmOrder(studentID){
      db.collection('students').doc(this.studentId).update({
        paid: true,
        paymentStatus: "completed",
        paidDate: new Date()
      }).then(querySnapshot => {
        this.allConfirmed = true
      })

    }
  },
  props: {
  }
}
</script>

<style lang="stylus">
#success
  grid-template-columns 1fr
  justify-items center
  align-items flex-start
  padding-top 40px
  .card
    padding 40px
    .confirming
      justify-items center

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position absolute
}

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
  background-color: #2d3748;
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
