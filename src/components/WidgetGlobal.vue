<template>
    <div class="global-widget">

        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>

        <div v-else-if="global" class="cov-card" :style="{ 'width': cardwidth, 'background-color': bgcolor, 'box-shadow': '0 0 30px 0' + bgcolor + 80  }">
            <h3>{{ labeltitle }}</h3>
            <h5>{{ labelglobal }} <span class="cov-updated" :style="{ 'color': bgcolor }">{{ taken_at }}</span></h5>
            <i class="fas fa-virus cov-icon"></i>
            <div class="cov-grid">
                <div v-if="cases" class="cov-col">
                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcases }}</h4>
                    <div class="cov-stats">{{ global.total_cases }} <span class="cov-new">+{{ global.new_cases }} New</span></div>
                </div>
                <div v-if="deaths" class="cov-col">
                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labeldeaths }}</h4>
                    <div class="cov-stats">{{ global.total_deaths }} <span class="cov-new">+{{ global.new_deaths }} New</span></div>
                </div>
                <div v-if="recovered" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelrecovered }}</h4>
                    <div class="cov-stats">{{ global.total_recovered }}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Error: Issue with retrieving data. Please try again in few moments</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
var host = 'coronavirus-monitor.p.rapidapi.com';
var key = 'cfd416e672msh1d31722e56ea3c4p1e4ffejsn11819d2d30f2';

export default {
    props: {
        'bgcolor': {
            type: String,
            default: '#043785'
        },
        'cardwidth': {
            type: String,
            default: '400px'
        },
        'cases': {
            type: Boolean,
            default: true
        },
        'deaths': {
            type: Boolean,
            default: true
        }, 
        'recovered': {
            type: Boolean,
            default: true
        },
        'labeltitle': {
            type: String,
            default: 'Corona (COVID-19)'
        },
        'labelglobal': {
            type: String,
            default: 'Global Stats'
        },
        'labelcases': {
            type: String,
            default: 'Cases'
        },
        'labelcases': {
            type: String,
            default: 'Cases'
        },
        'labeldeaths': {
            type: String,
            default: 'Deaths'
        },
        'labelrecovered': {
            type: String,
            default: 'Recovered'
        }
    },
    data() {
        return {
            loading: true,
            global: null,
            taken_at: ''
        }
    },
    methods: {
        globalData() {
            let worldstat = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php';

            axios.get(worldstat, 
            { headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': key }  } )
            .then(res => {
                this.global = res.data;
                this.taken_at = moment(this.global.statistic_taken_at).format('ll');
            })
            .catch(function(e) {
                console.log(e);
            })
            .finally(() => {
                this.loading = false;
            });
        }
    },
    mounted() {
        this.globalData();
    }
}
</script>