<template>
    <div class="global-widget">

        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>

        <div v-else-if="global" class="cov-card" :style="{ 'width': cardwidth, 'background-color': bgcolor, 'box-shadow': '0 0 30px 0' + bgcolor + 80  }">
            <h3>{{ labeltitle }}</h3>
            <h5>{{ labelglobal }}</h5>
            <i class="fas fa-virus cov-icon"></i>
            <div class="cov-grid">
                <div v-if="cases" class="cov-col">
                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcases }}</h4>
                    <div class="cov-stats">{{ global.cases.toLocaleString() }} <span class="cov-new">+{{ global.todayCases }} New</span></div>
                </div>
                <div v-if="deaths" class="cov-col">
                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labeldeaths }}</h4>
                    <div class="cov-stats">{{ global.deaths.toLocaleString() }} <span class="cov-new">+{{ global.todayDeaths }} New</span></div>
                </div>
                <div class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>Critical</h4>
                    <div class="cov-stats">{{ global.critical.toLocaleString() }}</div>
                </div>
                <div v-if="recovered" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelrecovered }}</h4>
                    <div class="cov-stats">{{ global.recovered.toLocaleString() }}</div>
                </div>
                <div v-if="active" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelactive }}</h4>
                    <div class="cov-stats">{{ global.active.toLocaleString() }}</div>
                </div>
                <div v-if="active" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>Cases / 1M</h4>
                    <div class="cov-stats">{{ global.casesPerOneMillion.toLocaleString() }}</div>
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
        'active': {
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
        'labeldeaths': {
            type: String,
            default: 'Deaths'
        },
        'labelrecovered': {
            type: String,
            default: 'Recovered'
        },
        'labelactive': {
            type: String,
            default: 'Active Cases'
        }
    },
    data() {
        return {
            loading: true,
            global: null,
            updated: ''
        }
    },
    methods: {

        async globalData() {  

            this.loading = true;

            await axios.get("https://disease.sh/v2/all")
            .then(res => {

                this.global = res.data;
                
                this.updated = moment.unix(this.global.updated);

                console.log(this.global);
                
                
            })
            .catch(err => {
                console.log(err);
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