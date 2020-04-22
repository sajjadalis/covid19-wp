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
                    { column: "cases", dir: "desc" }
                ],
                columns: [
                    {title:"Country", field:"country_name"},
                    {title:"Cases", field:"cases", sorter:"number", width: "100"},
                    {title:"New Cases", field:"new_cases", sorter:"number", width: "120"},
                    {title:"Deaths", field:"deaths", sorter:"number", width: "100"},
                    {title:"New Deaths", field:"new_deaths", sorter:"number", width: "130"},
                    {title:"Total Recovered", field:"total_recovered", sorter:"number", width: "160"},
                    {title:"Active Cases", field:"active_cases", sorter:"number", width: "130"},
                    {title:"Critical", field:"serious_critical", sorter:"number", width: "100"},
                    {title:"Total Cases / 1M", field:"total_cases_per_1m_population", sorter:"number", width: "160"}
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

            let cases_by_country = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php';

            axios.get(cases_by_country, 
            { headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': key }  } )
            .then(res => {
                this.countries.data = res.data.countries_stat;
                this.countries.taken_at = res.data.statistic_taken_at;
                //console.log(this.countries);

                let data = this.countries.data
                //define some sample data
                data.forEach( country => {

                    this.tabledata.push(country);

                })         

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
                return country.country_name.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }
}
</script>