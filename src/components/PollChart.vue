// PollChart.vue
<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: [ 'chartData','chartLabels','options'],
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
    this.$nextTick ( this.renderChart(this.localData,
      this.localOptions))
  },
}

</script>

<style scoped>

</style>
