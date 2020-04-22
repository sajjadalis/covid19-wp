<template>
    <div class="table-view">

        <hero :header="header"></hero>

        <div class="uk-card uk-card-default">
            <div class="uk-card-body">
                <!-- <ul class="data" v-for="(active, index) in country" :key="index">
                    <li>{{ active }}</li>
                </ul> -->
            </div>
        </div>

    </div>
    
</template>
<script>
import axios from 'axios'
import _ from 'underscore'
import Hero from '@/components/layout/Hero'

export default {
    name: 'new',
    components: { 'hero': Hero },
    data() {
        return {
            country: [],
            header: {
                title: "New",
                subtitle: "",
                img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
            }
        }
    },
    mounted() {
        axios.get('https://pomber.github.io/covid19/timeseries.json')
        .then(res => {

            
            //this.country = _.last(res.data["Pakistan"]);

            //console.log(this.country)
            
            // this.country = res.data["Pakistan"].map(({ date, confirmed, recovered, deaths }) => {
                
            //     if(confirmed > 0) {
            //         return { 
            //             date:  date,
            //             confirmed: confirmed,
            //             recovered: recovered,
            //             deaths: deaths,
            //             active: confirmed - recovered - deaths
            //         }
            //     }
            //     //console.log(`${date} active cases: ${confirmed - recovered - deaths}`);
            // });

            // let total = function(items, prop){
            //     return items.reduce( function(a, b){
            //         return a + b[prop];
            //     }, 0);
            // };

            // let global = total(this.country, 'confirmed');

            // console.log(global);

            //console.log(this.country)
            
        })
    }
}
</script>