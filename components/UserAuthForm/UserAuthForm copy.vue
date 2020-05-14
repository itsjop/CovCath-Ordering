<template lang="pug">
section#userAuthForm
  v-form(v-model="valid")
    v-text-field(
      label="Name" 
      v-if="hasName"
      v-model="userInfo.name" 
      placeholder="Jane Withenberg" 
      :rules="[required('name')]"
    )
    v-text-field(
      label="Email" 
      v-model="userInfo.email" 
      placeholder="name@email.com" 
      :rules="[required('email'), emailFormat()]"
    )
    v-text-field(
      label="Password"
      :type="showPassword ? 'text' : 'password'" 
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
      @click:append="showPassword = !showPassword"
      counter = true
      :rules="[required('password'), minLength('password',8)]"
      v-model="userInfo.password" 
    )
    v-btn.button.bg-blue-500.p-3.rounded(@click="submitForm(userInfo)" :disabled="!valid") {{buttonText}}
</template>

<script>
import validations from "@/utils/validations"

export default {
  name: 'userAuthForm',   
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: '',
        password: ''
      },
      ...validations
    }
  },
  methods:{    
  },
  props: ["submitForm", "buttonText", "hasName"]
}
</script>

<style lang="stylus">
// #userAuthForm
</style>
