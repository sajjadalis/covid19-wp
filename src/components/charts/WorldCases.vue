<template>
    <div class="world-cases">

    </div>
</template>
<script>
import Chart from 'chart.js';
import moment from 'moment'
export default {
    data() {
        return {
            confirmedCases: '',
            totalCases: null,
            newCases1d: null,
        }
    },
    methods: {
        WorldNewCases(){  
            let cases = "https://covid.ourworldindata.org/data/ecdc/new_cases.csv";

            this.$papa.parse(cases, {
                header: true,
                download: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    let cases = results.data.map(res => ({date: res.date, world: res.World}));
                    //console.log(this.cases);
                    
                     // CHART JS //
                    let chartLabels = cases.map((doc) => doc.date );
                    let data = cases.map((doc) =>  doc.world );
                    let chartData = {
                        labels: chartLabels,
                        datasets: [{
                            label: 'Corona (COVID-19) / World / New Confirmed Cases',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                        }],
                    };
                    let ctx = document.getElementById('WorldNewCases');
                    new Chart(ctx, {
                            type: 'bar',
                            data: chartData,
                    });

                    this.newCases1d = cases[cases.length - 2];
                    //console.log(this.newCases1d);
                    this.newCases1d = this.newCases1d.world * 100;

                }
            })
        },
    }
}
</script>