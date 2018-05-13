<template>
  <main>
      <!-- Poll Main Content -->
    <div v-if="this.error">Error loading Poll</div>
    <div v-else>
      <h2 v-html="poll.question"></h2>
      <form @submit.prevent="submit">
        <div v-for="answer in poll.answers">
          <input 
            name="poll._id" 
            type="radio" 
            :value="answer.option" 
            v-model="option"> 
            {{ answer.option }}
          </input> 
          Votes: {{ answer.votes }}
        </div>
        <button 
          type="button" 
          @click="deletePoll" 
          v-if=this.isOwner>
          Delete Poll</button>
                <span v-if="this.voted">Thanks for Voting!</span>
        <button 
          :disabled="!this.option" 
          v-else type="submit">
          Submit Vote
        </button>
        <a v-if=this.isOwner role="button" class="link-button" href="#openModal">Share Poll</a>
      <div id="openModal" class="modalDialog">
        <div>
          <a id="closeModal" href="#close" title="Close" class="close">&times;</a>
          <p>Get your link here!</p>
          <input id="linkText" type="text" :value='"http://localhost:8080/"+poll._id'></input>
          <button type="button" @click="copyLink">Copy Link</button>
        </div>
      </div>
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
      voted: false,
      isOwner: false,
      error: null
    }
  },
  created: function findOwner() {
    console.log('This is defined as ', this)
    console.log('Creator is  defined as ', this.poll.creator)
    if (this.$state.user) {
      this.isOwner = (this.poll.creator === this.$state.user._id ? true : false)
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
          this.voted = true;
        } else {
          throw new Error('error')
        }
      } catch (err) {
        console.log('Vote error: ', err)
      }
    },
    async deletePoll () {
      console.log('Deleting Poll')
      try {
        const result = await fetch('http://localhost:4040/deletepoll', {
         method: 'POST',
         'credentials': 'include',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify( {
            pollid: this.poll._id,
            creator: this.poll.creator,
         })
        })
        console.log('Delete result', result)
        if (result.ok) {
          console.log('Poll deleted')
        } else {
          throw new Error('error')
        }
      } catch (err) {
        console.log('Delete error: ', err)
      }
    },
    async copyLink () {
      // A more vanilla JS way of doing this.
      // There is clipboard.js available for Vue but wanted
      // to be familair with this way.
      var copyText = document.getElementById("linkText")
      var closeButton = document.getElementById("closeModal")
      copyText.select()
      document.execCommand("Copy")
      closeButton.click()
      alert("Link copied to clipboard \n " + copyText.value)
    }
  }
}
</script>

<style scoped>

.link-button {
  display: inline-block;
  background-color: lightblue;
  padding: 0.2em;
  text-decoration: none;
  margin-top: 0.5em;
}

.modalDialog {
  position: fixed;
  color: white;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(20,0,0,0.8);
  z-index: 99999;
  opacity: 0;
  transition: opacity 400ms ease-in;
  pointer-events: none;
}

.modalDialog:target {
  opacity: 1;
  pointer-events: auto;
}

.modalDialog > div {
  width: 400px;
  position: relative;
  margin: 10% auto;
  padding: 5px 20px 13px 20px;
  border-radius: 10px;
  background: grey;
}

.close {
  background: #606061;
  color: red;
  line-height: 25px;
  position: absolute;
  right: -12px;
  text-align: center;
  top: -10px;
  width: 24px;
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 1px 1px 3px #000;
}

.close:hover {
  background: lightgrey;
}
</style>
