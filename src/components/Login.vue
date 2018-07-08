<template>
  <div class="base-form--background">
    <!-- Login Main Content -->
    <form class="base-form" @submit.prevent="submit">
      <h2>{{ title }}</h2>
      <div class="text-field-container">
        <div class="text-field">
          <input 
            class="text-field__input"
            id="username"
            type="text" 
            required="true"
            name="username" 
            v-model="username" 
            >
          <label class="text-field__label" for="username">
            Username  
          </label>
          </input>
        </div>
      </div>
      <transition-group name="fade">
      <template v-if="mode === 'signup'">
        <div class="text-field-container" key="emailcontainer">
          <div class="text-field">
            <input 
              id="email"
              type="text"
              class="text-field__input"
              name="email" 
              v-model="email"
              required="true">
              <label class="text-field__label" for="email">
                Email
              </label>
            </div>
        </div>
        <span v-if="!validEmail" key="emailspan"> 
          Please enter a valid email address
        </span>
      </template>
      </transition-group>
      <div class="text-field-container">
        <div class="text-field">
          <input
            id="password"
            class="text-field__input"
            type="password"
            required="true"
            name="password"
            v-model="password">
            <label for="password" class="text-field__label" >
              Password
            </label>
          </input>
        </div>
      </div>
      <transition-group appear name="fade">
        <template v-if="mode === 'signup'" >
          <div class="text-field-container" key="password2container">
            <div class="text-field">
              <input
                id="password2"
                type="password"
                class="text-field__input"
                name="password2"
                v-model="password2"
                required="true">
                <label for="password2" class="text-field__label" >
                  Confirm Password
                </label>
              </input>
            </div>
          </div>
          <br key="password2br">
        </template>
      </transition-group>
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <template v-if="mode ==='login'">
        <button
          class="base-button--small"
          type="button"
          @click="mode ='signup'">
          Create Account
        </button>
        <button 
          class="base-button--small"
          type="submit" 
          :disabled="!validLogin" >
          Login
        </button>
      </template>
      <template v-if="mode ==='signup'">
        <button
          class="base-button--small"
          type="button"
          @click="mode ='login'">
          Log in
        </button>
        <button 
          class="base-button--small"
          type="submit" 
          :disabled="!validSignup">
          Signup
        </button>
      </template>
    </form>
  </div>    
</template>

<script>
export default {
  data () {
    return {
      mode: 'login',
      username: '',
      email: '',
      password: '',
      password2: '',
      errorMsg: ''
    }
  },
  computed: {
    title () {
      switch (this.mode) {
        case 'login': return 'Login'
        case 'signup': return 'Create an account'
      }
    },
    validLogin () {
      return (!!this.username && !!this.password)
    },
    validNewPassword () {
      if (this.password !== '') {
        return (this.password === this.password2)
      }
    },
    validEmail () {
      let regexEmail = /(\w+)\@(\w+)([\.-]\w+)+$/
      return regexEmail.test(this.email)
    },
    validUsername () {
      // TODO
      return true
    },
    validSignup () {
      // A valid signup is passwords that match
      // A user name
      // An email
      return (this.validNewPassword && this.validEmail && this.validUsername)
    }
  },
  methods: {
    async submit () {
      if (this.mode === 'signup') {
        await this.signup()
      }
      if (this.mode === 'login') {
        await this.login()
      }
    },
    async signup () {
      console.log('Signing up')
      // Need to call fetch and send username, email, password
      let result = await fetch('https://vabe.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          username: this.username,
          email: this.email,
          password: this.password
        })
      })
      let finalResult = await result.json()
      if ((finalResult) == 1) {
        finalResult = "New Account created. Please login"
      }
      alert(`Signup status: ${finalResult}`)
      this.$router.replace({ path: '/pollcenter'})
    },
    async login () {
      console.log('Loggin in')
        let result = await fetch('https://vabe.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          'credentials': 'include',
          body: JSON.stringify( {
            username: this.username,
            password: this.password
          })
        })

        console.log(result.status)
        switch (result.status) {
          case 200: 
            this.$state.user = await result.json()
            console.log("Allo ", this.$state.user)
            this.$router.replace({ path: '/pollcenter'})
            break
          case 401: 
            alert('Username or password incorrect')
            break
          default: 
            alert('Please report error: ' + result.status)
        }
      }
  },
}
</script>

<style lang="scss" scoped>
  @import '../style/forms';
 
</style>
