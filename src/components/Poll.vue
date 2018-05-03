<template>
  <main>
    <!-- Poll Main Content -->
  <div v-if="this.error">Error loading Poll</div>
    <h2 v-html="poll.question"></h2>
    <div v-for="answer in poll.answers">
      <input type="radio"> {{ answer.option }}</input> Votes: {{ answer.votes }}
    </div>
  </div>
  
  </section>
  </main>    
</template>

<script>
  props: [
    'poll'
    ]
export default {
  data () {
    return {
      error: null
    }
  },
  
}
</script>

<style scoped>

</style>
