<template>
  <main>
    <h1>My Polls</h1>
    <section class="pollslist">
    <!-- Poll Main Content -->
    <div v-if="this.error">Error loading Polls</div> 
    <div v-else v-for="poll in mypolls">
      <router-link :to="{name: 'poll', params: { id: poll._id }}">
      {{ poll.question }}
      </router-link>
    </div>
  </section>
  </main>    
</template>

<script>
import Poll from './Poll.vue'

export default {
  data () {
    return {
      mypolls: [],
      error: null
    }
  },
  async created () {
    try {
      const response = await fetch('http://localhost:4040/mypolls', {
          'credentials': 'include'
        })
      if (response.ok) {
        this.mypolls = await response.json()
      } else {
        throw new Error('error')
      }
    } catch (err){
      this.error = err
    }
  },
  components: {
    Poll
  }
}
</script>

<style scoped>

h1 {
  text-align: center;
}
.pollslist {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
