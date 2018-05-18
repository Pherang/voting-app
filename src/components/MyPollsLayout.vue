<template>
  <main>

    <div class="mypolls__buttons-slot" >
      <router-link class="base-button" :to="{name: 'my-polls'}" tag="button" exact>My Polls</router-link>
      <router-link class="base-button" :to="{name: 'create-poll'}" tag="button" exact>Create</router-link>
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

<style lang="scss" scoped>

h1 {
  text-align: center;
}
.pollslist {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.mypolls__buttons-slot {
  margin-top: 1em; 
  margin-left: 0.5em;
}

</style>
