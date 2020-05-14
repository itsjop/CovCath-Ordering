<template lang="pug">
section#UserList
  t-table.bg-white(:headers="headers" :data="tableData")
</template>

<script>

import firebase from 'firebase'
export default {
  name: 'UserList',   
  data() {
    return {
        authenticatedUser:"",
        headers:['Name', 'Email', 'Age'],
        tableData: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Barney' }
        ]
    }
  },
  methods:{    
  },
  props: {
  },
  
  beforeMount(){    
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
    if(!firebase.auth().currentUser) {
      $nuxt.$router.replace({ path: '/' });
      this.$toast.error("Access denied. You are not logged in.")
    }
  }
}
</script>

<style lang="stylus">
#UserList
  // property value
</style>
