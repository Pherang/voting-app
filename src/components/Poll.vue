<template>
  <main>
      <!-- Poll Main Content -->
    <div v-if="this.error">Error loading Poll</div>
    <div v-else>
      <h2 v-html="poll.question"></h2>
      <form @submit.prevent="submit">
        <div v-for="answer in poll.answers">
          <input 
            name="poll._id" type="radio" :value="answer.option" v-model="option"> {{ answer.option }}
          </input> Votes: {{ answer.votes }}
        </div>
        <button type="submit">
          Submit Vote
        </button>
      </form>
    </div>
  </main>    
</template>

<script>
export default {
  props: [
    'poll',
  ],
  data () {
    return {
      option: '',
      error: null
    }
  },
  methods: {
    async submit () {
      try {
        const result = await fetch('http://localhost:4040/vote', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify( {
            pollid: this.poll._id,
            option: this.option
         })
        })

        if (result.ok) {
          console.log('Vote submitted')
        } else {
          throw new Error('error')
        }
      } catch (err) {
        console.log('Vote error: ', err)
      }
    },
  }
}
</script>

<style scoped>

</style>
