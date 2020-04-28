<template lang="pug">
section#deviceRequests
  .container(class="w-3/4")
    h1 This is the Device Requests Page
    button.bg-blue-500.hover_bg-blue-700.text-white.font-bold.py-2.px-4.rounded Add Student
    v-client-table.text-center.justify-end.rounded(:columns='columns' :options='options' v-model='tableData')
      //- input(type='text' slot='id' slot-scope='{row, update}' v-model='row.id' @input='update')
      //- span(slot='id' slot-scope='{row, update}') {{row.id}}
      //- input(type='checkbox' slot='checkbox' slot-scope='{row, update}' v-model='row.checkbox' @input='update')
      //- div.flex(slot='name' slot-scope='{row, update, setEditing, isEditing, revertValue}')
      //-   span.w-full.cursor-pointer.text-center(@click='setEditing(true)' v-if='!isEditing()') {{row.name}}
      //-   span.container.flex.justify-center(v-else='')
      //-     input.mx-3(type='text' v-model='row.name')
      //-     .buttons.mx-3
      //-       button.mx-3.btn.bg-green-500(type='button' @click='update(row.name); setEditing(false)') Submit
      //-       button.btn.bg-red-500(type='button' @click='revertValue(); setEditing(false)') Cancel
      //- div.flex(slot='request' slot-scope='{row, update, setEditing, isEditing, revertValue}')
      //-   span.w-full.cursor-pointer.text-center(@click='setEditing(true)' v-if='!isEditing()') {{row.request}}
      //-   span.container.flex.justify-center(v-else='')
      //-     input.mx-3(type='text' v-model='row.request')
      //-     .buttons.mx-3
      //-       button.mx-3.btn.bg-green-500(type='button' @click='update(row.request); setEditing(false)') Submit
      //-       button.btn.bg-red-500(type='button' @click='revertValue(); setEditing(false)') Cancel
      //- div(slot='age' slot-scope='{row, update, setEditing, isEditing, revertValue}')
      //-   span {{row.age}}
</template>

<script>
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import bootstrap from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'deviceRequests',   
  data() {
    return {
      columns: ['id', 'name', 'request', 'age'],
      tableData: [
          { id: 1, name: "John Jimson",       request: "Laptop",        age: "16" },
          { id: 2, name: "Jane Jopplet",      request: "Desktop",       age: "17" },
          { id: 3, name: "Susan Suzako",      request: "Pony",          age: "15" },
          { id: 4, name: "Chris Camelizins",  request: "BB Gun",        age: "18" },
          { id: 5, name: "Dan Dimaggion",     request: "Action Figure", age: "17" }
      ],
      options: {
        editableColumns:['name', 'request'],
        resizableColumns: true,
        sortable:["name","age"]
      }
    }
  },
  methods:{
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
