<template>
  <main>
    <h1>Poll Center</h1>

    <div>
      <router-link :to="{name: 'my-polls'}" tag="button" exact>My Polls</router-link>
      <router-link :to="{name: 'create-poll'}" tag="button" exact>Create</router-link>
    </div>
    <router-view />
  </main>    
</template>

<script>
import MyPolls from './MyPolls.vue'
import CreatePoll from './CreatePoll.vue'

export default {
  components: {
    MyPolls,
    CreatePoll
  }
}
</script>

<style scoped>

h1 {
  text-align: center;
}
.pollslist {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
