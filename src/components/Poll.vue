<template>
  <main>
  <!-- Poll Main Content -->
  <div v-if="this.error">Error loading Poll</div>
  <div class="poll-background" v-else>
    <div class="poll" >
      <div class="chart">
        <PollChart
          :chartData="chartData"
          :options="chartOptions"
          :width="400"
          :height="400"
          >
        </PollChart>
      </div>
      <form @submit.prevent="submit">
        <h2 v-html="poll.question"></h2>
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
     <div class="poll-button-group">
        <button 
          class="base-button--delete"
          type="button" 
          @click="deletePoll" 
          v-if=this.isOwner>
          Delete Poll</button>
        <span v-if="this.voted">Thanks for Voting!</span>
        <button 
          class="base-button"
          :disabled="!this.option" 
          v-else type="submit">
          Submit Vote
        </button>
        <a v-if=this.isOwner 
          role="button" 
          class="base-button" 
          href="#openModal">
          Share Poll
        </a>
      </div>
      </form>
      <div id="openModal" class="modalDialog">
        <div>
          <a id="closeModal" 
             href="#close" 
             title="Close" 
             class="close">&times;</a>
          <p>Get your link here!</p>
          <input :id="this.poll._id" type="text" :value='"http://localhost:8080/poll/"+poll._id'></input>
          <button type="button" @click="copyLink">Copy Link</button>
        </div>
        </div>
        
    </div> 
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
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: ['blue','red'],
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
  methods: { findOwner () { 
      if (this.$state.user) {
        this.isOwner = (this.poll.creator === this.$state.user._id ? true : false)
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
          this.findPoll()
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
      var copyText = document.getElementById(this.poll._id)
      var closeButton = document.getElementById("closeModal")
      copyText.select()
      document.execCommand("Copy")
      closeButton.click()
      alert("Link copied to clipboard \n " + copyText.value)
    },
    setupChartData () {
      console.log('The default chart is ', this.$data.chartData)
      // Need to zero these arrays everytime we update the chart data.
      this.chartQuestions = []
      this.chartVotes = []
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
        //this.chartData.labels = this.chartQuestions
        //this.chartData.datasets[0].data = this.chartVotes
        //this.chartData.datasets[0].label = this.poll.question
        // Because of limitations of javascript if we replace
        // the whole object that will trigger a state update.
        this.chartData = {
          labels: this.chartQuestions,
          datasets: [
            {
              label: this.poll.question,
              backgroundColor: ['red','blue'],
              data: this.chartVotes
            }
          ]
        }
      }
  },
  components: {
    PollChart
  }

}
</script>

<style lang="scss" scoped>
@import '../style/main';

h2 {
  background: white;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
}

form {
  background: white;
  margin-top: -4px;
  padding-left: 10px;
  box-shadow: 3px 3px 1px $primary-color-dark;
  border-radius: 0px 0px 3px 3px;
}

</style>
