<template>
  <main>
    <!-- Poll Main Content -->
    <div v-if="this.error">Error loading Poll</div>
    <div v-else>
      <div>
        <PollChart
          :chartData="chartData">
        </PollChart>
      </div>
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
                <div>
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
          <a id="closeModal" 
             href="#close" 
             title="Close" 
             class="close">&times;</a>
          <p>Get your link here!</p>
          <input type="text" :value='"http://localhost:8080/poll/"+poll._id'></input>
          <button type="button" @click="copyLink">Copy Link</button>
        </div>
        </div>
      </div>
        
      </form>
    
    </div>
  </main>    
</template>

<script>
import PollChart from './PollChart.vue'
export default {
  props: [
    'id',
  ],
  data () {
    return {
      option: '',
      voted: false,
      isOwner: false,
      poll: {}, // If I set this to null, the render has warnings about null, but if I set it to an object, there is no warning even if that object has no properties..
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: 'grey',
            data: []
          }
        ]
      },
      chartQuestions: [],
      chartVotes: [],
      error: null
    }
  },
  created () {
    this.findPoll()
  },
  mounted: function () {
    this.$nextTick( function () {

    })
  },
  methods: {
    findOwner () { 
      if (this.$state.user) {
        console.log("Executing because I am joe")
        this.isOwner = (this.$route.name == "my-polls") 
        && (this.poll.creator === this.$state.user._id ? true : false)
      }
    },
    async findPoll() {
    
    console.log('Vue Instance is ', this)
      if (this.id) {
        try {
          let result = await fetch(`http://localhost:4040/poll/${this.id}`,{ "credentials": "true" })  
          if (result.ok) {
            this.poll = await result.json()
            this.findOwner()
            this.setupChartData()
          } else {
            alert("No Poll Found")
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
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
         method: 'POST', 'credentials': 'include',
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
      //var copyText = document.getElementById("linkText")
      var closeButton = document.getElementById("closeModal")
      var copyText = this.$refs.this.id
      copyText.select()
      document.execCommand("Copy")
      closeButton.click()
      alert("Link copied to clipboard \n " + copyText.value)
    },
    setupChartData () {
      console.log('The default chart is ', this.$data.chartData)
      this.poll.answers.forEach( function(element) {
        console.log('What is THIS inside forEach ', this)
        console.log('Answers are ', element)
        console.log(element.option)
        this.chartQuestions.push(element.option)
        console.log('After question push ', this.chartQuestions)
        this.chartVotes.push(element.votes)
        console.log('After votes push ', this.chartVotes)

      },this) // Passing the vue instance to forEach.

        // Setup chartData object to be passed as prop
        this.chartData.labels = this.chartQuestions
        this.chartData.datasets[0].data = this.chartVotes
        this.chartData.datasets[0].label = this.poll.question
      console.log('after setup ', JSON.stringify(this.chartData))
    }
  },
  components: {
    PollChart
  }

}
</script>

<style scoped>

.link-button {
  display: inline-block;
  background-color: lightblue;
  padding: 0.2em;
  text-decoration: none;
  border-radius: 3px;
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
