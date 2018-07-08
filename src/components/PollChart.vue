<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
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
  mounted() {
     this.renderChart(this.chartData, this.options)
 },
  watch: {
    chartData: function (n,o) {
    }
  }
}
</script>

<style scoped>

</style>
