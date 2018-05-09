<template>
  <nav class="navbar">
    <!-- Navigation Links. router-link components -->
    <router-link :to="{name: 'polls'}" exact>Polls</router-link>
    <router-link to="/pollcenter" exact>MyPolls</router-link>
    <div class="spacer"></div>
    <template v-if="$state.user">
      <a>{{ $state.user.username }} </a>&nbsp;
      <a @click="logout">Logout</a>
    </template>
    <router-link v-else :to="{name: 'login'}" exact>Login</router-link>
  </nav>    
</template>

<script>
export default {
  methods: {
    async logout () {
      const result = await fetch('http://localhost:4040/logout', { 'credentials': 'include'} )
      console.log('Logout clicked')
      let x = await result.json()
      if (x.status  === 'roger') {
        this.$state.user = null
        this.$router.replace( { name: 'polls'})
        console.log('This should work')
      }
    }
  }
}
</script>

<style>

.navbar {
  display: flex;
  justify-content: space-around;
  width: 90%;
}

.spacer {
  flex: 100%;
}

.router-link-active {
  border-bottom-color: red;
}

</style>
