<script>
import { Line } from 'vue-chartjs'
 
export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data-1',
          fill: false,
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    },
    { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>