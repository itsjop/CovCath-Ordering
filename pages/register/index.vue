<template lang="pug">
section#registration
  .login.bg-white.text-gray-700.grid
    h1 This is new user registration page!
    h1 This link should only be accessible if you're logged in!
    t-input-group(label="Your Name")
      t-input(type="text" v-model="name" placeholder="James Norton")
    t-input-group(label="Email")
      t-input(type="email" v-model="email" placeholder="name@email.com")
    t-input-group(label="Password")
      t-input(type="password" v-model="password" placeholder="Password")
    button.button.bg-blue-500.p-3.rounded.text-white(type="submit" @click="submit") Register
</template>

<script>
import firebase from "firebase";
import db from '../../firebase'

export default {
  name: 'LoginPage',   
  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },  
  methods: {
    submit() {
      alert()
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log("data", data)
          data.user.updateProfile({
              displayName: this.name,
              role: "root"
            })
            .then((user = data.user) => {        
              console.log("name", this.name)      
              console.log("user", user)      
              db.collection('authUsers').add({
                name: this.name,
                uid: user.uid,
                role: "root"
              })
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  },
  
  firestore: {
      authUsers: db.collection('authUsers')
  },
  props: {
  }
}
</script>

<style lang="stylus">
#registration
  .login
    justify-items center
</style>
