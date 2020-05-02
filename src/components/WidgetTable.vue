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
                    {title:"Country", field:"country"},
                    {title:"Cases", field:"cases", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"New Cases", field:"todayCases", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"Deaths", field:"deaths", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"New Deaths", field:"todayDeaths", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"Critical", field:"critical", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"Recovered", field:"recovered", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"Active Cases", field:"active", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}},
                    {title:"Cases / 1 Million", field:"casesPerOneMillion", sorter:"number", align:"center", formatter:"money", formatterParams:{precision:false}}
                ]
            }
        }
    },
    mounted() {
        this.countriesTable();
    },
    methods: {
        async countriesTable() {

            this.loading = true;

            await axios.get("https://disease.sh/v2/countries")
            .then(res => {

                this.tabledata = res.data;

            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.loading = false;
            });
        }
    },
    computed: {
        filteredCountries() {
            return this.tabledata.filter((country) => {
                return country.country.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }
}
</script>