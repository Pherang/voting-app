<template>
  <div>
    <!-- Login Main Content -->
    <form @submit.prevent="submit">
      <input type="text" name="username">UserName</input>
      <input type="text" name="password">Password</input>
      <button type="submit">Login</button>
    </form>
  </div>    
</template>

<script>
export default {
  methods: {
    async submit () {
      console.log('Logging in...')
    }
  }
}
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin-top: 10%;
}
</style>
