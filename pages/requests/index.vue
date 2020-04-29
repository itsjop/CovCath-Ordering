<template lang="pug">
section#deviceRequests
  .container(class="w-3/4")
    h1 This is the Device Requests Page
    button.bg-blue-500.hover_bg-blue-700.text-white.font-bold.py-2.px-4.rounded Add Student
    t-table(:headers="headers" :data="hardwareRequests")
      template(v-slot:row='props')
        tr.text-gray-800(:class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']")
          td(:class='props.tdClass') 
            | {{props.row.name}}
          td(:class="{'text-red-500': props.row.amountDue > 0, 'text-green-500': props.row.amountDue <= 0 }") 
            | ${{(props.row.amountDue/100).toFixed(2)}}
          td(:class='props.tdClass')
            | ${{(props.row.amountDue/100).toFixed(2)}}
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
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import bootstrap from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import '@firebase/auth'
import db from '../../firebase'

export default {
  name: 'deviceRequests',   
  data() {
    return {      
      hardwareRequests:[],
      headers: [
        {
          id: 'name-id',
          value: 'name',
          text: 'Summary',
          // className: 'bg-red-200',
        }, {
          id: 'amountDue-id',
          value: 'amountDue',
          text: 'Amount Due',
          // className: 'bg-red-200',
        }, {
          id: 'assistanceAmount-id',
          value: 'assistanceAmount',
          text: 'Assistance Amount',
          // className: 'bg-blue-700',
        }
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
  firestore: {
      hardwareRequests: db.collection('hardwareRequests').orderBy('orderDate').limit(50),
  },
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
  }
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


// Old Vue-table-2. Moved to comments because it won't work with the server-side
// data querying that needs to be done in order to not overwhelm firebase with 
// endless 1000+ long document pulls.

// v-client-table.text-center.justify-end.rounded(:columns='columns' :options='options' v-model='hardwareRequests')
//   span(slot='amountDue' slot-scope='{row, update}') ${{(row.amountDue/100).toFixed(2)}}
//   div.flex(slot='assistanceAmount' slot-scope='{row, update, setEditing, isEditing, revertValue}')
//     span(slot='assistanceAmount' slot-scope='{row, update}') ${{(row.assistanceAmount/100).toFixed(2)}}
//     input(type='text' slot='assistanceAmount' slot-scope='{row, update}' v-model='row.assistanceAmount' @input='update')
//   input(type='checkbox' slot='checkbox' slot-scope='{row, update}' v-model='row.checkbox' @input='update')
//   div.flex(slot='name' slot-scope='{row, update, setEditing, isEditing, revertValue}')
//     span.w-full.cursor-pointer.text-center(@click='setEditing(true)' v-if='!isEditing()') {{row.name}}
//     span.container.flex.justify-center(v-else='')
//       input.mx-3(type='text' v-model='row.name')
//       .buttons.mx-3
//         button.mx-3.btn.bg-green-500(type='button' @click='update(row.name); setEditing(false)') Submit
//         button.btn.bg-red-500(type='button' @click='revertValue(); setEditing(false)') Cancel
//   div.flex(slot='request' slot-scope='{row, update, setEditing, isEditing, revertValue}')
//     span.w-full.cursor-pointer.text-center(@click='setEditing(true)' v-if='!isEditing()') {{row.request}}
//     span.container.flex.justify-center(v-else='')
//       input.mx-3(type='text' v-model='row.request')
//       .buttons.mx-3
//         button.mx-3.btn.bg-green-500(type='button' @click='update(row.request); setEditing(false)') Submit
//         button.btn.bg-red-500(type='button' @click='revertValue(); setEditing(false)') Cancel
//   div(slot='age' slot-scope='{row, update, setEditing, isEditing, revertValue}')
//     span {{row.age}}

// options: {
//   editableColumns:['name', 'assistanceAmount', 'request'],
//   resizableColumns: true,
//   sortable:["name","age"],
// },