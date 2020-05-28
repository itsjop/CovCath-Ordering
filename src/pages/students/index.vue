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
  .container.my-8.rounded(class="w-full max-w-screen-xl")  
    .flex.justify-between.bg-blue-200.rounded-t.px-4.py-2
      .grid.grid-flow-col.gap-10
        t-input-group(label="Search Columns:")
          t-input.rounded.text-gray-800.placeholder-gray-800(v-model="search" placeholder="Search...")
        t-input-group(label="Sort by:")
          select.block.w-full.bg-white.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight.focus_outline-none.focus_bg-white.focus_border-gray-500(v-model="sortProp")            
            option(value='assistancePercent') Assistance Amount
            option(value='firstName') First Name
            option(value='lastName') Last Name
            option(value='grade') Grade
            option(value='code') Login Code
            option(value='paymentStatus') Payment Status
            option(value='serialNumber') Serial Number
        button.my-2.bg-gray-700.hover_bg-gray-600.text-white.font-bold.py-2.px-4.rounded.h-16(@click="sortDir = !sortDir") Reverse Sort
      button.my-2.bg-blue-500.hover_bg-blue-700.text-white.font-bold.py-2.px-4.rounded.w-56(@click="showModal") Add New Student
    t-table.vtable.text-left(:headers="headers" :data="filterList")
      template(v-slot:row='props')
        tr.text-left.text-gray-800(:class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']")
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
          td.first-name.border-l-2.pl-4(:class="{'text-red-500': props.row.amountDue > 0, 'text-green-500': props.row.amountDue <= 0 }") 
            | {{props.row.firstName}} 
          td.last-name.border-l-2.pl-4(:class='props.tdClass')
            | {{props.row.lastName}}
          td.grade.border-l-2.pl-4(:class='props.tdClass')
            | {{grades[Number(props.row.grade) - 8].text}}
          td.login-code.border-l-2.pl-4(:class='props.tdClass')
            | {{props.row.code}}
          td.payment-status.capitalize.border-l-2.pl-4(:class='props.tdClass')
            select.block.w-full.bg-gray-200.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight.focus_outline-none.focus_bg-white.focus_border-gray-500(
                v-model="props.row.paymentStatus" @change="fbSync($event.target.value, props.row.id, 'paymentStatus')")            
              option(value='uninitiated') Uninitiated
              option(value='unconfirmed') Unconfirmed
              option(value='completed') Completed
          td.serial.border-l-2.pl-4(:class='props.tdClass')
            input(class="border-b-2 border-solid" v-model="props.row.serialNumber" @input="fbSync($event.target.value, props.row.id, 'serialNumber')" debounce="5000")
          td.serial.border-l-2.pl-4(:class='props.tdClass')
            textarea(class="border-b-2 border-solid" v-model="props.row.notes" @input="fbSync($event.target.value, props.row.id, 'notes')" debounce="5000")
          //- td.year(:class='props.tdClass')
          //-   | {{props.row.datePaid ? new Date(props.row.datePaid).toLocaleDateString() : "No Date"}}
          //- td.text-center(:class='props.tdClass')
          //-   p(:class="props.row.sync ? 'spin' : ''") {{props.row.sync ? '↻' : '✓'}} {{props.row.sync}}
    .justify-between.bg-blue-200.rounded-b.px-4.py-2.mb-8
      .controls.grid.grid-flow-col.gap-10
        h1.text-blue-700.text-2xl Other Controls:   
        t-input-group(label="Export Students:")
          button.bg-gray-600.p-2(@click="downloadCSV") Generate CSV
        t-input-group(label="View Old Data:")
          t-select.text-gray-800(v-model="selectedYear" name="my-input" @change="pullStudents" :options="pastYears")


  t-modal(wrapper-class="bg-blue-100 border-blue-400 text-blue-700 rounded shadow-xl flex flex-col"
          overlay-class="z-30 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-blue-900 opacity-75"
          container-class = 'z-40 relative p-3 mx-auto my-0 max-w-full'
          body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
          baseClass="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed" 
          footerClass="bg-blue-400 p-3 flex justify-between"
          ref="modal"
          @closed="updateRow()"
          transition="ease"
          hideCloseButton=true) 
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
const ObjectsToCsv = require('objects-to-csv');

import VueTailwind from 'vue-tailwind'
import TInput from 'vue-tailwind/src/elements/TInput.vue'
import TSelect from 'vue-tailwind/src/elements/TSelect.vue'
import TButton from 'vue-tailwind/src/elements/TButton.vue'
import TTable from 'vue-tailwind/src/components/TTable.vue'
import TInputGroup from 'vue-tailwind/src/components/TInputGroup.vue'
import TModal from 'vue-tailwind/src/components/TModal.vue'

export default {
  name: 'students',   
  data() {
    return {      
      newStudent:{},
      selectedYear: String(new Date().getFullYear()),
      search: "",
      sortProp: "",
      students:[],
      authenticatedUser:"",
      sortDir: true,
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
          id: 'login-id',
          value: 'code',
          text: 'Login Code',
        }, {
          id: 'paymentStatus-id',
          value: 'paymentStatus',
          text: 'Payment Status',
        }, {
          id: 'serialNumber-id',
          value: 'serialNumber',
          text: 'Serial Number',
        }, { 
          id: 'notes-id',
          value: 'notes',
          text: 'Notes',
        },
        //  {
        //   id: 'sync-id',
        //   value: 'sync',
        //   text: 'Saved?',
        // }, 
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
  created(){
    this.pullStudents()
  },
  // firestore() {    
  //   return {
  //     students: db.collection('students').orderBy('paid'),
  //   }
  // },
  methods:{
    convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    },
    downloadCSV(args) {  
        var data, filename, link;
        var csv = this.convertArrayOfObjectsToCSV({
            data: this.students
        });
        if (csv == null) return;

        filename = './Exported Student Hardware List ('+(new Date().toLocaleDateString())+').csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    },
    pullStudents(){
       let query = db.collection('students').where('year', '==', this.selectedYear).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        snapshot.forEach(doc => {
          this.students.push(doc.data())
        });
        this.students.forEach(stu => {
          stu.sync = false
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    },
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
          serialNumber: "",
          organizationId: "covcath",
          year: String(new Date().getFullYear())
        });
        let temp = this.newStudent
        db.collection("students").doc(this.newStudent.id).set(
          temp
        ).then(ob => {
          console.log("Document written with ID: ", this.newStudent.id);    
          this.$toast.success("Student succesfully added!")
          this.students.unshift(this.newStudent)
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
        console.log("turn off")     
        this.students[this.students.findIndex((stu) => stu.id === id)].sync =  false   
        console.log(this.students[this.students.findIndex((stu) => stu.id === id)].sync)
       
      })
    }
  },
  computed: {
    filterList(){
      let list = this.students
      if (this.search){
        list = list.filter(student => 
          String(student.assistancePercent).toLowerCase().includes(this.search.toLowerCase()) ||
          student.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          student.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
          String(student.grade).toLowerCase().includes(this.search.toLowerCase()) ||
          student.code.toLowerCase().includes(this.search) ||
          student.paymentStatus.toLowerCase().includes(this.search.toLowerCase()) ||
          (student.serialNumber ? student.serialNumber.toLowerCase().includes(this.search.toLowerCase()) : "") ||
          (student.notes ? student.notes.toLowerCase().includes(this.search.toLowerCase()) : "")
        )
        console.log('list', list)
      }
      if (this.sortProp){
        let sort = this.sortDir ? 1 : -1
        list = list.sort((a, b) => (a[this.sortProp].toLowerCase() > b[this.sortProp].toLowerCase()) ? sort : -sort)
      }
      return list
    },
    pastYears(){
      let years = []
      let currentYear = Number(new Date().getFullYear())
      let yearsSince = currentYear - 2020

      years.push({ value: 2020 , text: String(2020) })
      for(let i = 0; i < yearsSince; i++) { 
        years.push({ value: 2020 + i, text: String(2020 + i) })
      }
      return years
    }
  },
  components:{
    TInput,
    TSelect,
    TTable,
    TInputGroup ,
    TModal,
    TButton,
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
  button
    justify-self end
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
  .controls
    justify-items center
    align-items center
  .vtable
    thead
      tr
        border-style none
  .pointer-events-none, button
    svg
      display none
  // tr
  //   animation slide .5s forwards
@keyframes slide {
  from{
    transform: translateX(30%)
    opacity: 0
  }
  to{
    transform: translateX(0%)
    opacity: 1
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