

<template lang="pug">
section#deviceRequests
  .container(class="w-3/4")
    h1 This is the Device Requests Page
    button.bg-blue-500.hover_bg-blue-700.text-white.font-bold.py-2.px-4.rounded Add Student
    t-table(:headers="headers" :data="hardwareRequests")
      template(v-slot:row='props')
        tr.text-gray-800.border-0(:class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']")
          td(:class='props.tdClass') 
            | LOOKUP THIS NAME
          td(:class="{'text-red-500': props.row.amountDue > 0, 'text-green-500': props.row.amountDue <= 0 }") 
            | {{new Date(props.row.dateCreated).toLocaleDateString()}}
          td(:class='props.tdClass')
            | {{props.row.serial ? props.row.serial : "Not Specified"}}
          td(:class='props.tdClass')
            | ${{(props.row.amountDue/100).toFixed(2)}}
          td(:class='props.tdClass')
            | ${{(props.row.assistanceAmount/100).toFixed(2)}}
          td(:class='props.tdClass')
            | ${{(props.row.balance/100).toFixed(2)}}
          td(:class='props.tdClass')
            | {{props.row.datePaid ? new Date(props.row.datePaid).toLocaleDateString() : "No Date"}}
          td(:class='props.tdClass')
            t-button.border-2(size='sm' variant='secondary' @click="prepModal(props.row)") 
              | Edit
    t-modal(wrapper-class="bg-blue-100 border-blue-400 text-blue-700 rounded shadow-xl flex flex-col"
            overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-blue-900 opacity-75"
            body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
            footerClass="bg-blue-400 p-3 flex justify-between"
            ref="modal"
            @closed="updateRow()"
            transition="ease") 
      t-input-group(label="Amount Due")
        t-input(v-model="tempRow.amountDue" placeholder="0.00")
      template(v-slot:footer='')
        t-button(variant='danger' tertiary-class='border block text-white border-transparent hover:text-gray-300' @click='cancelModal()')
          | Cancel
        t-button(@click='confirmModal()' variant='primary')
          | Confirm


</template>

<script>
// TODO: TODAY
// Custom Lookup function for Firebase, that .thens and inserts the name of the student
// Make an Edit function that reliably stores the data in firebase that reliably changes the data locally too 
// Displayed Columns
// Associated Student - studentId
// Selection - specId
// Order Date - dateCreated
// Serial Number - serialNumber
// Assistance - assistanceAmount
// Balance - 86798
// Date Paid - datePaid
// Status - status

import firebase from 'firebase'
// import { db } from '../../firebase'

export default {
  name: 'deviceRequests',   
  data() {
    return {      
      hardwareRequests:[],
      authenticatedUser:"",
      headers: [
        {
          id: 'studentname-id',
          value: 'studentname',
          text: 'Student Name',
          // className: 'bg-red-200',
        }, 
        // {
        //   id: 'packageSelection-id',
        //   value: 'packageSelection',
        //   text: 'Package Selected',
        //   // className: 'bg-blue-700',
        // }, 
        {
          id: 'orderDate-id',
          value: 'orderDate',
          text: 'Order Date',
          // className: 'bg-blue-700',
        }, 
        {
          id: 'seriak-id',
          value: 'serial',
          text: 'Serial #',
          // className: 'bg-blue-700',
        }, {
          id: 'amountDue-id',
          value: 'amountDue',
          text: 'Amount Due',
          // className: 'bg-blue-700',
        }, {
          id: 'assistanceAmount-id',
          value: 'assistanceAmount',
          text: 'Assistance Amount',
          // className: 'bg-blue-700',
        }, {
          id: 'balance-id',
          value: 'balance',
          text: 'Balance',
          // className: 'bg-blue-700',
        }, {
          id: 'datePaid-id',
          value: 'datePaid',
          text: 'Date Paid',
          // className: 'bg-blue-700',
        }, {
          id: 'status-id',
          value: 'status',
          text: 'Status',
          // className: 'bg-blue-700',
        },
      ],
      tempRow:{}
      
      // Displayed Columns
      // Associated Student - studentId
      // Selection - specId
      // Order Date - dateCreated
      // Serial Number - serialNumber
      // Assistance - assistanceAmount
      // Balance - 86798
      // Date Paid - datePaid
      // Status - status
        //  Status Code:
        //  0 - Open
        //  1 - Can only imagine to be pending?
        //  2 - Payment Received 
        //  3 - Mailed Check <== Deprecated
        //  6 - Closed?

      // Availible Sort Properties
      // amountDue:86798
      // assistanceAmount:""
      // balance:""
      // chargeId:"ch_19wBE1HPxv5UNvlWGZcb4ZKF"
      // dateCreated:"2016-10-03T00:00:00"
      // datePaid:"2017-03-11T09:30:45.390"
      // id:"-3Qq5yb5LQSm"
      // legacyId:1255
      // legacyStudentId:4866
      // name:"2016/2017 School Year"
      // orderDate:"2017-03-11T09:30:45.390"
      // organizationId:"covcath"
      // specId:"1018"
      // status:6
      // studentId:"EpcUjLIAH60k
    }
  },
  // firestore: {
  //   hardwareRequests: db.collection('hardwareRequests').orderBy('orderDate').limit(50),
  // },
  methods:{
    prepModal(rowData){
      console.log("rowData", rowData)
      this.$refs.modal.show()
      this.tempRow = rowData
    },
    cancelModal(){
      $refs.modal.hide()
    },
    confirmModal(){
      //write to Firebase,
      // .then( write to local db)
    },    
    updateRow(){
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
#deviceRequests
  .VueTables__table 
    background white
    color black
  .table-responsive
    border-radius 5px
    overflow hidden
</style>