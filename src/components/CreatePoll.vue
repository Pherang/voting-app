<template>
  <main>
  <h1>Create a Poll</h1>
  <section>
    Poll Question <input type="text"v-model="question"></input>   
    <div v-for="answer in answers">
      Option: <input type="text" v-model="answer.option"></input>
    </div>
    <button @click="addOption">Add Option</button>
    <button @click="createPoll">Submit</button>
  </section>
  </main>    
</template>

<script>
export default {
  data () {
    return {
      question: '',
      answers: [{ option: "Answer1"}, { option: "Answer2"} ],
      error: null
    }
  },
  methods: {
    async createPoll () {
      try {
      let result = await fetch('http://localhost:4040/createpoll', {
        'credentials': 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          creator: this.$state.user._id,
          question: this.question,
          answers: this.answers 
        })
        })
        if (result.ok) {
          this.question = ""
          this.answers[0].option = "Answer 1"
          this.answers[1].option = "Answer 2"
        }
      } catch (err) {
        alert("Error is " + err)
        console.log(err)
      }
    },
    async addOption () {
      this.answers.push({ option: ""})  
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
