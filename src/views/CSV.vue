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
                let cases = global.reduce((a, {confirmed}) => a + confirmed, 0);
                let deaths = global.reduce((a, {deaths}) => a + deaths, 0);
                let recovered = global.reduce((a, {recovered}) => a + recovered, 0);
                let active = cases - deaths - recovered;

                console.log(date);
                console.log(cases);
                console.log(deaths);
                console.log(recovered);
                console.log(active);

                let yesterday = []
                for (let [key, value] of Object.entries(res.data)) {
                    yesterday.push(value[value.length - 2]);
                }

                let ydate = yesterday[yesterday.length - 1].date;
                let yconfirmed = yesterday.reduce((a, {confirmed}) => a + confirmed, 0);
                let ydeaths = yesterday.reduce((a, {deaths}) => a + deaths, 0);

                console.log(ydate);
                console.log(yconfirmed);
                console.log(ydeaths);

                let threeDaysAgo = [];

                for (let [key, value] of Object.entries(res.data)) {
                    threeDaysAgo.push(value[value.length - 4]);
                }

                let threeDaysAgo_cases = threeDaysAgo.reduce((a, {confirmed}) => a + confirmed, 0);
                let threeDaysAgo_deaths = threeDaysAgo.reduce((a, {deaths}) => a + deaths, 0);
                let threeDaysAgo_recovered = threeDaysAgo.reduce((a, {recovered}) => a + recovered, 0);

                let casesSince3DaysAgo = cases - threeDaysAgo_cases;
                let deathsSince3DaysAgo = deaths - threeDaysAgo_deaths;
                let recoveredSince3DaysAgo = recovered - threeDaysAgo_recovered;

                console.log(threeDaysAgo[threeDaysAgo.length - 1].date);
                console.log(casesSince3DaysAgo);
                console.log(deathsSince3DaysAgo);
                console.log(recoveredSince3DaysAgo);
            })
            .catch(err => {
                console.log(err);
            })
        },
        async countries() {
            await axios('https://pomber.github.io/covid19/countries.json')
            .then(res => {

                let countries = [];

                for (let [key, value] of Object.entries(res.data)) {
                    countries.push(key);
                }

                console.log(countries);
            })
        },
        async countriesTable() {
            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {
                
                let latest = [];

                for (let [key, value] of Object.entries(res.data)) {
                    latest.push(
                        {
                            country:key,
                            cases_new: value[value.length - 1].confirmed - value[value.length - 2].confirmed,
                            deaths_new: value[value.length - 1].deaths - value[value.length - 2].deaths,
                            active_cases: value[value.length - 1].confirmed - value[value.length - 1].deaths - value[value.length - 1].recovered,
                            ...value[value.length - 1]
                        }
                    );
                }

                console.log(latest);

            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        //this.countryData("US");
        //this.globalData();
        //this.countries();
        this.countriesTable();

    }
}
</script>