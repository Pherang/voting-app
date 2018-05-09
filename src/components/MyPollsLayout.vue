<template>
  <main>
  <h1>My Polls</h1>
  <section class="pollslist">
    <!-- Poll Main Content -->
  <div v-if="this.error">Error loading Polls</div>
    <Poll v-else v-for="poll in mypolls"
    :key="poll.id"
    :poll="poll"
    ></Poll>
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
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
