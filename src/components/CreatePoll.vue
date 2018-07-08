<template>
  <main>
  <div class="base-form--background">
  <h1>Create a Poll</h1> <section class="base-form">
    <div class="text-field-container text-field-container--wide">
      <div class="text-field">
        <input 
          class="text-field__input"
          id="theQuestion"
          type="text"
          v-model="question"
          required="true"
          >
          <label for="theQuestion" class="text-field__label">
          Poll Question
          </label>
          <div class="text-field__line"></div>
        </input>
       </div>
         <transition name="fade" mode="out-in">
       <div v-if="createStatus !== ''" class="status-message-container">
          <span class="status-message">{{ createStatus }}</span>
       </div>
         </transition>
    </div>
    <div v-for="(answer, index) in answers">
      <div class="text-field-container">
        <div class="text-field">
          <input 
          class="text-field__input"
          :id="htmlIds[index]"
          type="text"
          v-model="answer.option"
          required="true"
          >
          <label :for="htmlIds[index]" class="text-field__label">
          Option
          </label>
          </input>
        </div>
      </div>
    </div>
    <p v-if="error">{{ error }}</p>   
    <br>
    <button 
      class="base-button--small" 
      @click="addOption">
      Add Option
    </button>
    <button 
      class="base-button--small" 
      @click="createPoll">
      Submit
    </button>
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
      htmlIds: ["option0","option1"],
      createStatus: '',
      error: null
    }
  },
  methods: {
    async createPoll () {
      try {
      let result = await fetch('http://vabe.herokuapp.com/createpoll', {
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
          this.answers = [{ option: ""}, { option: ""} ]
          this.htmlIds = ["option0","option1"]
          this.createStatus = "Poll Created"
          // Arrow function used so that this would be in the context
          // of the Vue instance.
          setTimeout( () => { console.log('create status blank'); this.createStatus = '' }, 3000)

        }
      } catch (err) {
        alert("Error is " + err)
        console.log(err)
      }
    },
    async addOption () {
      this.answers.push({ option: ""})  
      this.htmlIds.push("option" + (this.htmlIds.length))
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

.text-field-container--wide {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.status-message-container {
  display: flex;
  margin-left: 10px;
}

.status-message {
  align-self: center; 
}

</style>
