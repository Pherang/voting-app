<template>
  <main>
  <h3>Vote </h3>
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
  
}
</script>

<style scoped>

</style>
