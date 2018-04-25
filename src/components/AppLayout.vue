<template>
  <div>
    <header>
    Votetastic
    </header>
    
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

<style>
</style>
