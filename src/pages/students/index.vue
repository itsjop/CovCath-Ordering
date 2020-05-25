FINAL TODO: 
✖ Get Searching and Sorting working
✖ Set up final real-money API keys
✖ Deploy site somewhere
✖ Fix wack-ass auth refresh errors

✓ Add Student Dialogue box
✓ Finish Select Arrows
✓ Generate the 20 SKUs for discounts
✓ Hook up assitancePercent before Checkout to pick the right SKU
✓ Put the right Laptop Specs in the FB Database
✓ Fix Body Inheritance expanding with content
<template lang="pug">
section#students
  .container(class="w-3/4")  
    button.bg-blue-500.hover_bg-blue-700.text-white.font-bold.py-2.px-4.rounded(@click="showModal") Add Student
    h1 Sorting and searching coming very soon!
    t-table.text-left(:headers="headers" :data="students")
      template(v-slot:row='props')
        tr.text-left.text-gray-800.border-0(:class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']")
          td.assistance(:class='props.tdClass') 
            select.block.w-full.bg-gray-200.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight.focus_outline-none.focus_bg-white.focus_border-gray-500(
                v-model="props.row.assistancePercent" @change="fbSync($event.target.value, props.row.id, 'assistancePercent')")            
              option(value='0') 0%
              option(value='5') 5%
              option(value='10') 10%
              option(value='15') 15%
              option(value='20') 20%
              option(value='25') 25%
              option(value='30') 30%
              option(value='35') 35%
              option(value='40') 40%
              option(value='45') 45%
              option(value='50') 50%
              option(value='55') 55%
              option(value='60') 60%
              option(value='65') 65%
              option(value='70') 70%
              option(value='75') 75%
              option(value='80') 80%
              option(value='85') 85%
              option(value='90') 90%
              option(value='95') 95%
              option(value='100') 100%
          td.first-name(:class="{'text-red-500': props.row.amountDue > 0, 'text-green-500': props.row.amountDue <= 0 }") 
            | {{props.row.firstName}} 
          td.last-name(:class='props.tdClass')
            | {{props.row.lastName}}
          td.grade(:class='props.tdClass')
            | {{props.row.grade}}
          td.payment-status.capitalize(:class='props.tdClass')
            select.block.appearance-none.w-full.bg-gray-200.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight.focus_outline-none.focus_bg-white.focus_border-gray-500(
                v-model="props.row.paymentStatus" @change="fbSync($event.target.value, props.row.id, 'paymentStatus')")            
              option(value='uninitiated') Uninitiated
              option(value='unconfirmed') Unconfirmed
              option(value='completed') Completed
          td.serial(:class='props.tdClass')
            input(class="border-b-2 border-solid" v-model="props.row.serialNumber" @input="fbSync($event.target.value, props.row.id, 'serialNumber')" debounce="5000")
          //- td.year(:class='props.tdClass')
          //-   | {{props.row.datePaid ? new Date(props.row.datePaid).toLocaleDateString() : "No Date"}}
          td(:class='props.tdClass')
            transition(name="fade")
              p(v-if="!props.row.sync") ✓
              p.spin(v-else) ↻

  t-modal(wrapper-class="bg-blue-100 border-blue-400 text-blue-700 rounded shadow-xl flex flex-col"
          overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-blue-900 opacity-75"
          body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
          footerClass="bg-blue-400 p-3 flex justify-between"
          ref="modal"
          @closed="updateRow()"
          transition="ease") 
    t-input-group(label="First Name")
      t-input(v-model="newStudent.firstName" type="text")
    t-input-group(label="Last Name")
      t-input(v-model="newStudent.lastName" type="text")
    t-input-group.fuggit(label="Grade")
      t-select.block.w-full.bg-gray-200.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight.focus_outline-none.focus_bg-white.focus_border-gray-500(:options="grades" v-model="newStudent.grade")      
    t-input-group(label="Assistance Percent")
      t-input(v-model="newStudent.assistancePercent" type="number" placeholder="0" min="0" max="100" step="5")
    t-input-group(label="Preferred Name (Optional)")
      t-input(v-model="newStudent.preferredName" type="text")
    .text-gray-800(v-if="errors")
      p Correct the following errors before submitting:
      ul
        li.text-red-600(v-for="err in errors") {{err}}
    template(v-slot:footer='')
      t-button(variant='danger' tertiary-class='border block text-white border-transparent hover:text-gray-300' @click='cancelModal()')
        | Cancel
      t-button(@click='confirmModal()' variant='primary')
        | Confirm
    
// get:  assistancePercent, firstName, lastName, grade, preferredName
// calc: code, dateCreated, fullName, id
// set:  paid, paymentStatus, serialNumber, organizationId, year
</template>

<script>

import firebase from 'firebase'
import { db } from '../../../firebase'

import shortid from 'shortid'
var hri = require('human-readable-ids').hri;
export default {
  name: 'students',   
  data() {
    return {      
      newStudent:{},
      students:[],
      authenticatedUser:"",
      headers: [
        {
          id: 'assistancePercent-id',
          value: 'assistancePercent',
          text: 'Assistance Amount',
          // className: 'bg-red-200',
        }, {
          id: 'firstName-id',
          value: 'firstName',
          text: 'First Name',
        }, {
          id: 'lastName-id',
          value: 'lastName',
          text: 'Last Name',
        }, {
          id: 'grade-id',
          value: 'grade',
          text: 'Grade',
        }, {
          id: 'paymentStatus-id',
          value: 'paymentStatus',
          text: 'Payment Status',
        }, {
          id: 'serialNumber-id',
          value: 'serialNumber',
          text: 'Serial Number',
        }, {
          id: 'sync-id',
          value: 'sync',
          text: 'Saved?',
        }, 
      ],
      tempRow:{},
      errors:null,
      grades:[
        { value: 8, text: '8th' },
        { value: 9, text: '9th' },
        { value: 10, text: '10th' },
        { value: 11, text: '11th' },
        { value: 12, text: '12th' },
      ]
    }
  },
  firestore: {
    students: db.collection('students').orderBy('paid'),
  },
  methods:{
    showModal(){
      this.$refs.modal.show()
    },
    cancelModal(){
      this.$refs.modal.hide()
    },
    confirmModal(){
      // calc: code, dateCreated, fullName, id
      // set:  paid, paymentStatus, serialNumber, organizationId, year
      this.errors = []
      console.log("prelog")
      console.log(JSON.stringify(this.newStudent))
      if (Number(this.newStudent.assistancePercent)%5 !== 0) this.errors.push("Please select a multiple of 5 for the discount.")
      if(!this.newStudent.firstName) this.errors.push("Please enter a first name.")
      if(!this.newStudent.lastName) this.errors.push("Please enter a Last name.")
      if(!this.newStudent.grade) this.errors.push("Please enter a grade." )
      console.log("this.errors", this.errors)
      if(this.errors.length===0){
        this.errors = null
        Object.assign(this.newStudent, {        
          code: hri.random(),
          id: shortid.generate(),
          fullName: this.newStudent.firstName+" "+this.newStudent.lastname,
          dateCreated: new Date(),
          paid: false,
          paymentStatus: "uninitiated",
          serial: "",
          organizationId: "covcath",
          year: "2020-2021"        
        });
        let temp = this.newStudent
        db.collection("students").doc(this.newStudent.id).set(
          temp
        ).then(ob => {
          console.log("Document written with ID: ", this.newStudent.id);    
          this.$toast.success("Student succesfully added!")
          // this.students.unshift(this.newStudent)
          this.newStudent = []
          this.cancelModal()
        })
      }
    },    
    updateRow(){
    },
    fbSync(val, id, prop){
      console.log("val", val)
      console.log("id", id)
      this.students[this.students.findIndex((stu) => stu.id === id)].sync =  true      
      db.collection('students').doc(id).update({
        [prop]: val
      }).then(querySnapshot => {        
        this.students[this.students.findIndex((stu) => stu.id === id)].sync =  false   
      })
    }
  },
  props: {
  },
  compontents:{
    ClientTable:"v-client-table"
  },
  beforeMount(){    
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
    if(!firebase.auth().currentUser) {
      $nuxt.$router.replace({ path: '/' });      
      this.$toast.error("Access denied. You are not logged in.")
    }
  },

}
</script>

<style lang="stylus">
#students
  display grid
  justify-items center
  .VueTables__table 
    background white
    color black
  .table-responsive
    border-radius 5px
    overflow hidden
  .spin
    animation spin 1s cubic-bezier(0.680, -0.550, 0.265, 1.550) infinite
    transform-origin 50% 53%
  .fuggit
    min-width 275px
@keyframes spin {
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position absolute
}
</style>