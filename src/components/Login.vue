<template>
  <div class="loginsignup">
    <!-- Login Main Content -->
    <form @submit.prevent="submit">
      <h2>{{ title }}</h2>
      <input type="text" name="username" v-model="username" placeholder="Username"></input><br>
      <template v-if="mode === 'signup'">
      <input type="text" name="email" v-model="email" placeholder="Email"></input><br>
      </template>
        <input type="password" name="password" v-model="password" placeholder="Password"></input><br>
      <template v-if="mode === 'signup'">
        <input type="password" name="password2" v-model="password2" placeholder="Confirm Password"></input><br>
      </template>
      <br>
      <template v-if="mode ==='login'">
        <button type="button" @click="mode ='signup'">Create Account</button>
        <button type="submit">Login</button>
      </template>
      <template v-if="mode ==='signup'">
        <button type="button" @click="mode ='login'">Login to Account </button>
        <button type="submit">Signup</button>
      </template>
    </form>
  </div>    
</template>

<script>
export default {
  data () {
    return {
      mode: 'signup',
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
    }
  },
  methods: {
    async submit () {
      console.log('Logging in...')
    }
  }
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
