<script>
import { Line } from 'vue-chartjs'

//
export default {
    extends: Line,
    computed: {
        data_1(){
            return this.$store.getters.mdat_items;
        }
    }, 
    mounted () {
        var self = this
        setTimeout(function () {
//            console.log( self.data_1 )
            self.render_proc()
        }, 1000)
    },
    methods: {
        render_proc:function (){
            this.renderChart(
                {
                    labels: this.data_1.lbl,
                    datasets: [
                        {
                            label: 'H-num',
                            fill: false,
                            backgroundColor: '#FF6384',
                            borderColor: '#FF6384',
                            data: this.data_1.hnum
                        },
                        {
                            label: 'L-num',
                            fill: false,
                            backgroundColor: '#36A2EB',
                            borderColor : '#36A2EB',
                            data: this.data_1.lnum
                        },
                    ]
                },
                { responsive: true, maintainAspectRatio: false }
            )
        },
    },
}
</script>