<template>
    <div class="chart-view">

        <hero :header="header"></hero>

        <div class="uk-section">
            <div class="uk-container">

                <div class="uk-card uk-card-primary uk-card-body uk-text-center">
                    <div class="uk-child-width-1-2@m cov-numbers" uk-grid>
                        <div v-if="confirmedCases">
                            <h3>Confirmed Cases</h3>
                            <h2>{{ confirmedCases.world }}</h2>
                            <p>+{{ CasesPercentage1 }}% since Yesterday</p>
                        </div>
                        <div v-if="confirmedDeaths">
                            <h3>Confirmed Deaths</h3>
                            <h2>{{ confirmedDeaths.world }}</h2>
                            <p>+{{ DeathsPercentage1 }}% since Yesterday</p>
                        </div>
                    </div>
                </div>

                <h2>Corona (COVID-19) / World / Daily Confirmed Cases</h2>
                <div id="canvas-holder" style="width:100%">
                    <canvas id="WorldNewCases"></canvas>
                </div>

                <h2>Corona (COVID-19) / World / Daily Confirmed Deaths</h2>
                <div id="canvas-holder" style="width:100%">
                    <canvas id="WorldNewDeaths"></canvas>
                </div>

                <h2>Corona (COVID-19) / World / Total Confirmed Cases</h2>
                <div id="canvas-holder" style="width:100%">
                    <canvas id="WorldCases"></canvas>
                </div>

                <h2>Corona (COVID-19) / World / Total Confirmed Deaths</h2>
                <div id="canvas-holder" style="width:100%">
                    <canvas id="WorldDeaths"></canvas>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import Hero from '@/components/layout/Hero'
import Chart from 'chart.js';
import moment from 'moment'

export default {
    name: 'chart',
    components: {
        'hero': Hero
    },
    data() {
        return {
            confirmedCases: '',
            confirmedDeaths: '',
            totalCases: null,
            newCases1d: null,
            totalDeaths: null,
            newDeaths1d: null,
            header: {
            title: "Chart",
            subtitle: "",
            img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
            }
        }
    },
    methods: {
        numberWithCommas(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
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
        WorldNewDeaths(){  
            let deaths = "https://covid.ourworldindata.org/data/ecdc/new_deaths.csv";

            this.$papa.parse(deaths, {
                header: true,
                download: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    let deaths = results.data.map(res => ({date: res.date, world: res.World}));

                     // CHART JS //
                    let chartLabels = deaths.map((doc) => doc.date );
                    let data = deaths.map((doc) =>  doc.world );
                    let chartData = {
                        labels: chartLabels,
                        datasets: [{
                            label: 'Corona (COVID-19) / World / New Confirmed Deaths',
                            data: data,
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                        }],
                    };
                    let ctx = document.getElementById('WorldNewDeaths');
                    new Chart(ctx, {
                            type: 'bar',
                            data: chartData,
                    });

                    this.newDeaths1d = deaths[deaths.length - 2];
                    //console.log(this.newDeaths1d);
                    this.newDeaths1d = this.newDeaths1d.world * 100;

                }
            })
        },
        WorldTotalCases(){  
            let cases = "https://covid.ourworldindata.org/data/ecdc/total_cases.csv";

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
                            label: 'Corona (COVID-19) / World / Total Confirmed Cases',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                        }],
                    };
                    let ctx = document.getElementById('WorldCases');
                    new Chart(ctx, {
                            type: 'line',
                            data: chartData,
                    });

                    this.confirmedCases = cases[cases.length - 1];
                    //console.log(this.confirmedCases);
                    this.totalCases = this.confirmedCases.world;
                    this.confirmedCases.date = moment(this.confirmedCases.date).format('MMMM Do YYYY');
                    this.confirmedCases.world = this.numberWithCommas(this.confirmedCases.world);

                }
            })
        },
        WorldTotalDeaths(){  
            let deaths = "https://covid.ourworldindata.org/data/ecdc/total_deaths.csv";
            this.$papa.parse(deaths, {
                header: true,
                download: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    let deaths = results.data.map(res => ({date: res.date, world: res.World}));
                    //console.log(this.cases);

                     // CHART JS //
                    let chartLabels = deaths.map((doc) => doc.date );
                    let data = deaths.map((doc) =>  doc.world );
                    let chartData = {
                        labels: chartLabels,
                        datasets: [{
                            label: 'Corona (COVID-19) / World / Total Confirmed Deaths',
                            data: data,
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                            borderColor: 'rgba(255, 99, 132, 1)',

                        }],
                    };
                    let ctx = document.getElementById('WorldDeaths');
                    new Chart(ctx, {
                            type: 'line',
                            data: chartData,
                    });

                    this.confirmedDeaths = deaths[deaths.length - 1];
                    //console.log(this.confirmedDeaths)
                    this.totalDeaths = this.confirmedDeaths.world;
                    this.confirmedDeaths.world = this.numberWithCommas(this.confirmedDeaths.world);

                }
            })
        }
    },
    mounted() {
        this.WorldNewCases();
        this.WorldNewDeaths();
        this.WorldTotalCases();
        this.WorldTotalDeaths();
    },
    computed: {
        CasesPercentage1() {
            let formatted = this.newCases1d / this.totalCases;
            return formatted.toFixed(2);
        },
        DeathsPercentage1() {
            let formatted = this.newDeaths1d / this.totalDeaths;
            return formatted.toFixed(2);
        }
    }
}
</script>