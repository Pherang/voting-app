// PollChart.vue

<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: [ 'chartData','options'],
  data () {
    return {
      localOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  mounted () {

   if (this.chartData) {
   this.renderChart(this.chartData, this.localOptions)
   }
  },
}

</script>

<style scoped>

</style>
