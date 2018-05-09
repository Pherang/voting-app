<template>
  <main>
    <h1>My Polls</h1>
    <router-view />
    <div>
      <router-link :to="{name: 'my-polls'}" tag="button" exact>My Polls</router-link>
      <router-link :to="{name: 'create-poll'}" tag="button" exact>Create</router-link>
    </div>
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
