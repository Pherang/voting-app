<template>
  <main>
  <div class="base-form--background">
  <h1>Create a Poll</h1>
  <section class="base-form">
    <input type="text"v-model="question" placeholder="Poll Question"></input>   
    <div v-for="answer in answers">
      <input type="text" v-model="answer.option" placeholder="Option"></input>
    </div>
    <p v-if="errorMsg">{{ errorMsg }}</p>   
    <br>
    <button class="base-button--small" @click="addOption">Add Option</button>
    <button class="base-button--small" @click="createPoll">Submit</button>
  </section>
  </div>
  </main>    
</template>

<script>
export default {
  data () {
    return {
      question: '',
      answers: [{ option: ""}, { option: ""} ],
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

<style lang="scss" scoped>
@import '../style/forms';

h1 {                          
  text-align: center;         
  color: $primary-color-text; 
}                                 

</style>
