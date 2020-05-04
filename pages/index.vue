<template lang="pug">
section.app.bg-gray-800
  .container.mx-auto.px-4.h-full.mt-16
    .flex.content-center.items-center.justify-center.h-full
      .relative.flex.flex-col.min-w-0.break-words.w-full.mb-6.shadow-lg.rounded-lg.bg-gray-300.border-0
        .rounded-t.mb-0.px-6.py-6
          .text-center.mb-3
            h6.text-gray-600.text-lg.font-bold Enter your ID to continue:
          form
            .relative.w-full.mb-3
              label.block.uppercase.text-gray-700.text-xs.font-bold.mb-2(for='grid-password') Student ID
              input.px-3.py-3.placeholder-gray-400.text-gray-700.bg-white.rounded.text-sm.shadow.w-full(v-model="studentID" type='text' class='focus:outline-none focus:shadow-outline' placeholder='CoolDinosaurBanana' style='transition: all 0.15s ease 0s;')
            .text-center.mt-6
              nuxt-link.bg-gray-900.text-white.text-sm.font-bold.uppercase.px-6.py-3.rounded.shadow.outline-none.mr-1.mb-1.w-full(
                :to="studentID+/check/"  class='active:bg-gray-700 hover:shadow-lg focus:outline-none' type='button' style='transition: all 0.15s ease 0s;')
                | Sign In
          //- button.button.bg-blue-500(@click="fbupload") fbsupasdf
              

</template>

<script>

// import studentListing from '../archive/fsup-students'
// import hardwareListing from '../archive/fsup-hardware'
import db from '../firebase'
import shortid from 'shortid'
var hri = require('human-readable-ids').hri;
export default {  
  data() {
    return {
      studentID:"",
      // studentList: studentListing,
      // hardwareList: hardwareListing
    }
  },  
  methods:{
    
  },
  components: {
  }
}
</script>

<style lang="stylus">
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.login-container
  display grid
  width 100vw
  height 50vmin
.student-login
  background lightgray
  justify-self center
  align-self center
  width 80vmin
  max-width 500px
  height 100%

</style>

// included for mass upload of old data, uses fsup-student/hardware in archive. 
// TODO: remove this
// fbupload(){  
//   // Initialize Cloud Firestore through Firebase
  
//   // re-sync IDs
//   this.studentList.map(student =>{
//     let oldId = student.id
//     let newId = shortid.generate()
//     student.legacyId = oldId
//     student.legacyCode = student.code
//     student.code = hri.random()
//     student.id = newId
//     student.studentId === 0 ? student.studentId = "" : ""
//     student.gradYear === 0 ? student.gradYear = "" : ""
//     this.hardwareList.map(hardware =>{
//       if (hardware.studentId == oldId){
//         hardware.legacyId = hardware.id
//         hardware.id = shortid.generate()
//         hardware.legacyStudentId = hardware.studentId
//         hardware.studentId = newId
//       }
//     })        
//   })

//   // check for dupes before upload

//   console.log(this.hardwareList)
//   console.log(this.studentList)
//   alert()
//   this.hardwareList.forEach(function(obj) {
//     db.collection("hardwareRequests").doc(obj.id).set({     
//       id: obj.id ? obj.id : "",
//       legacyId: obj.legacyId ? obj.legacyId : "",
//       name:  obj.name ? obj.name : "",
//       chargeId:  obj.chargeId ? obj.chargeId : "",
//       status:  obj.status ? obj.status : "", 
//       datePaid:  obj.datePaid ? obj.datePaid : "",
//       organizationId:  "covcath",
//       studentId:  obj.studentId ? obj.studentId : "",
//       legacyStudentId:  obj.legacyStudentId ? obj.legacyStudentId : "",
//       specId:  obj.specId ? String(obj.specId) : "",
//       dateCreated:  obj.dateCreated ? obj.dateCreated: "",
//       amountDue:  obj.amountDue ? obj.amountDue : "",
//       orderDate:  obj.orderDate ? obj.orderDate : "",
//       assistanceAmount:  obj.assistanceAmount ? obj.assistanceAmount : "",
//       balance:  obj.balance ? obj.balance : "",
//       serialNumber: obj.serialNumber ? obj.serialNumber : ""
//     }).then(function(docRef) {
//         console.log("hardwareRequests Document written with ID: ", obj.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding hardwareRequests document: ", error);
//     });
//   });
//   this.studentList.forEach(function(obj) {
//     console.log("student")
//     db.collection("students").doc(obj.id).set({     
//       id: obj.id ? obj.id : "",
//       legacyId: obj.legacyId ? obj.legacyId : "",
//       name: obj.name ? obj.name : "",
//       code: obj.code ? obj.code : "",
//       legacyCode: obj.legacyCode ? obj.legacyCode : "",
//       dateCreated: obj.dateCreated ? obj.dateCreated : "",
//       organizationId: "covcath",
//       stateId: obj.studentId ? String(obj.studentId) : "",
//       gradYear: obj.gradYear ? String(obj.gradYear) : "",
//       address: obj.address ? obj.address : "",
//       city: obj.city ? obj.city : "",
//       zipCode: obj.zipCode ? obj.zipCode : "",
//       state: obj.state ? obj.state : "",
//       email: obj.email ? obj.email : "",
//       homePhone: obj.homePhone ? obj.homePhone : "",
//       parents: obj.parents ? obj.parents : "",
//       momCell: obj.momCell ? obj.momCell : "",
//       dadCell: obj.dadCell ? obj.dadCell : "",
//       parentEmail: obj.parentEmail ? obj.parentEmail : "",   
//     }).then(function() {
//         console.log("Document written with ID: ", obj.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });
//   });
//   }