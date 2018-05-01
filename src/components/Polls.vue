<template>
  <main>
  
  <h1>Polls to Vote On</h1>
  <section class="pollslist">
    <!-- Poll Main Content -->
  <div v-if="this.error">Error loading Polls</div>
  <div v-else v-for="poll in polls"> 
    <h2 v-html="poll.question"></h2>
    <div v-for="answer in poll.answers">
      <form>
      <input type="radio"> {{ answer.option }}</input> Votes: {{ answer.votes }}
      </form>
    </div>
  </div>
  
  </section>
  </main>    
</template>

<script>
export default {
  data () {
    return {
      polls: [],
      error: null
    }
  },
  async created () {
    try {
      const response = await fetch('http://localhost:4040/polls')
      if (response.ok) {
        this.polls = await response.json()
      } else {
        throw new Error('error')
      }
    } catch (err){
      this.error = err
    }
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
