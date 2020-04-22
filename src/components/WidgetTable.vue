<template>
    <div class="table-widget">
        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>
        <div v-else-if="tabledata">
            <div>
                <input class="cov-input" type="text" v-model="search" placeholder="Filter Data by Country Name">
            </div>
            <VueTabulator id="countriesData" v-model="filteredCountries" :options="options" />
        </div>
        <div v-else>
            <h1>Error</h1>
            <p>We're having issues with retrieving data. Please try again in few moments</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
        return {
            loading: false,
            tabledata: [],
            countries: {},
            search: '',
            options: {
                layout:"fitColumns",
                movableColumns: true,
                tooltips: true,
                tooltipsHeader: true,
                pagination:"local",
                //height: '400',
                paginationSize:15,
                paginationSizeSelector:[10, 15, 25, 50,],
                columnMinWidth: '100',
                initialSort : [
                    { column: "confirmed", dir: "desc" }
                ],
                columns: [
                    {title:"Date", field:"date"},
                    {title:"Confirmed", field:"confirmed", sorter:"number"},
                    {title:"Deaths", field:"deaths", sorter:"number"},
                    {title:"Recovered", field:"recovered", sorter:"number"},
                    {title:"Active Cases", field:"active", sorter:"number"},
                ]
            }
        }
    },
    mounted() {
        this.countriesStats();
    },
    methods: {
        countriesStats() {
            this.loading = true;
            
            let host = 'coronavirus-monitor.p.rapidapi.com';
            let key = 'cfd416e672msh1d31722e56ea3c4p1e4ffejsn11819d2d30f2';

            let cases_by_country = 'https://pomber.github.io/covid19/timeseries.json';

            axios.get(cases_by_country)
            .then(res => {
                
                this.tabledata = res.data["Pakistan"].map(({ date, confirmed, recovered, deaths }) => {
                
                        return { 
                            date:  date,
                            confirmed: confirmed,
                            recovered: recovered,
                            deaths: deaths,
                            active: confirmed - recovered - deaths
                        }
                    //console.log(`${date} active cases: ${confirmed - recovered - deaths}`);
                });       

            })
            .catch(function(e) {
                console.log(e);
            })
            .finally(() => {
                this.loading = false;
            });

        }
    },
    computed: {
        filteredCountries() {
            return this.tabledata.filter((country) => {
                return country.date.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }
}
</script>