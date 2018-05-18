<template>
  <nav class="navbar">
    <router-link 
      class="router-link--logo" 
      :to="{name: 'polls'}" exact>
      <span class="logo">Votetastic</span>
      </router-link>
    <!-- Navigation Links. router-link components -->
    <router-link 
      class="router-link--custom" 
      :to="{name: 'polls'}" 
      exact>
      Polls
    </router-link>
    <router-link 
      class="router-link--custom" 
      to="/pollcenter" 
      exact>
      MyPolls
    </router-link>
    <div class="spacer"></div>
    <template v-if="$state.user">
      <a>{{ $state.user.username }} </a>&nbsp;
      <a class="nav-bar__logout-button"i @click="logout">Logout</a>
    </template>
    <router-link 
      class="router-link--custom" 
      v-else 
      :to="{name: 'login'}" 
      exact>
      Login
    </router-link>
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

<style lang="scss" scoped>
  @import '../style/nav-bar.scss';
</style>
