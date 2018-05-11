<template>
  <div class="loginsignup">
    <!-- Login Main Content -->
    <form @submit.prevent="submit">
      <h2>{{ title }}</h2>
      <input 
        type="text" 
        name="username" 
        v-model="username" 
        placeholder="Username" /><br>
      <template v-if="mode === 'signup'">
        <input 
          type="text"
          name="email" v-model="email"
          placeholder="Email" /><span v-if="!validEmail"> Please enter a valid email addres</span> <br>
      </template>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password" /><br>
      <template v-if="mode === 'signup'">
        <input
          type="password"
          name="password2"
          v-model="password2"
          placeholder="Confirm Password" /><br>
      </template>
      <br>
      <template v-if="mode ==='login'">
        <button
          type="button"
          @click="mode ='signup'">
          Create Account
        </button>
        <button type="submit" :disabled="!validLogin" >Login</button>
      </template>
      <template v-if="mode ==='signup'">
        <button
          type="button"
          @click="mode ='login'">
          Log in
        </button>
        <button type="submit" :disabled="!validSignup">Signup</button>
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
      let result = await fetch('http://localhost:4040/signup', {
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
      console.log('Signup status: ', await result.json())
    },
    async login () {
      console.log('Loggin in')
        let result = await fetch('http://localhost:4040/login', {
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

<style scoped>

.loginsignup {
  margin:auto;
  margin-top:10%;
  padding: 1%;
  background-color: lightblue;
  width: 80%;
  border: 1px;

}

form {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
}
</style>
