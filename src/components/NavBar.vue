<template>
  <div class="navbar">
    <!-- Navigation Links. router-link components -->
    <router-link :to="{name: 'polls'}" exact>Polls</router-link>
    <router-link :to="{name: 'my-polls'}" exact>MyPolls</div>
    <div class="spacer"></div>
    <router-link :to="{name: 'polls'}" exact>Login
    <router-link :to="{name: 'polls'}" exact>Logout
  </div>    
</template>

<script>
export default {

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
