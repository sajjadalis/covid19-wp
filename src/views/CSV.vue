<template>
    <div>
        <h1>CSV</h1>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    methods: {
        async countryData(country) {  

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                let latest = res.data[country][res.data[country].length - 1]
                let yesterday = res.data[country][res.data[country].length - 2];

                console.log(`${country} [${latest.date}]`);
                console.log(`cases: ${latest.confirmed}`);
                console.log(`deaths: ${latest.deaths}`);
                console.log(`recovered: ${latest.recovered}`);
                console.log(`active cases: ${latest.confirmed - latest.recovered - latest.deaths}`);
                console.log(`new cases: ${latest.confirmed - yesterday.confirmed}`);
                console.log(`new deaths: ${latest.deaths - yesterday.deaths}`);

            })
            .catch(err => {
                console.log(err);
            })
        },
        async globalData() {  

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                //console.log(res.data);

                let global = [];

                for (let [key, value] of Object.entries(res.data)) {
                    global.push(value[value.length - 1]);
                 
                }

                let date = global[global.length - 1].date;
                console.log(date);
                
                let confirmed = global.reduce((a, {confirmed}) => a + confirmed, 0);
                let deaths = global.reduce((a, {deaths}) => a + deaths, 0);
                let recovered = global.reduce((a, {recovered}) => a + recovered, 0);
                let active = confirmed - deaths - recovered;

                console.log(confirmed);
                console.log(deaths);
                console.log(recovered);
                console.log(active)

                // res.data.forEach(country => {
                //     global.push(country.length - 1);

                // })

                // console.log(global);


                //let sum = allProducts.reduce((a, {cases}) => a + watt, 0);

                
            })
            .catch(err => {
                console.log(err);
            })
        },
    },
    mounted() {
        //this.countryData("US");
        this.globalData();
    }
}
</script>