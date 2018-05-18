<template>
  <div>
    <NavBar />
    <!-- Main Content -->
    <router-view />
  </div>    
</template>

<script>
import NavBar from './NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  @import '../style/main';
</style>
