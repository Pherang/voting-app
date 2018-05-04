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
         body: JSON.stringify( {
            pollid: this.poll._id,
            option: this.option
         })
        })
        console.log(this.poll._id)
        console.log(this.option)

        if (response.ok) {
          this.poll = await response.json()
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
