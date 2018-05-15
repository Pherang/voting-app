

<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      chartData: {
        labels: ['Jan','Feb'],
        datasets: [
          {
            label: '# Data One',
            data: [4,6],
            backgroundColor: ['blue','red'],
            borderColor: ['orange','pink'],
            borderWidth: 1
          }
        ]
      },
      chartOptions: {
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
    this.renderChart(this.chartData, this.chartOptions)
  },
}

</script>

<style scoped>

</style>
