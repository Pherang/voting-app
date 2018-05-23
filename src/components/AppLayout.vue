<template>
  <div>
    <NavBar />
    <!-- Main Content -->
    <transition appear name="fade" mode="out-in">
      <router-view />
    </transition>
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
