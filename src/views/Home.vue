<template>
  <div class="card-shortcode">

      <hero :header="header"></hero>
        
        <div class="uk-section">
           
            <div class="uk-container">

                <div class="uk-child-width-1-2@m" uk-grid>
                    
                    <settings 
                        :selectedcountry="selectedcountry"
                        :bgcolor="bgcolor"
                        :charttype="charttype"
                        :cardwidth="cardwidth"
                        :cases="cases"
                        :deaths="deaths"
                        :recovered="recovered"
                        :active="active"
                        :labeltitle="labeltitle"
                        :labelglobal="labelglobal"
                        :labelcases="labelcases"
                        :labeldeaths="labeldeaths"
                        :labelrecovered="labelrecovered"
                        :labelactive="labelactive"
                        @color="bgcolor = $event;"
                        @country="selectedcountry = $event; destroyChart(); countryData(selectedcountry);"
                        @chart="charttype = $event; destroyChart(); countryData(selectedcountry);"
                        @cardwidth="cardwidth = $event.target.value"
                        @cases="cases = !cases;"
                        @deaths="deaths = !deaths"
                        @recovered="recovered = !recovered"
                        @active="active = !active"
                        @labeltitle="labeltitle = $event.target.value"
                        @labelglobal="labelglobal = $event.target.value"
                        @labelcases="labelcases = $event.target.value"
                        @labeldeaths="labeldeaths = $event.target.value"
                        @labelrecovered="labelrecovered = $event.target.value"
                        @labelactive="labelactive = $event.target.value"
                        >
                    </settings>

                    <div>
                        <br />
                        <global-widget 
                            :bgcolor="bgcolor" 
                            :cardwidth="cardwidth"
                            :cases="cases" 
                            :deaths="deaths" 
                            :recovered="recovered"
                            :active="active"
                            :labeltitle="labeltitle"
                            :labelglobal="labelglobal"
                            :labelcases="labelcases"
                            :labeldeaths="labeldeaths"
                            :labelrecovered="labelrecovered"
                            :labelactive="labelactive"
                            >
                        </global-widget>
                        <br />
                        <div class="cov-shortcode-container">
                            [covid-widget type="global-card"
                            <span v-if="bgcolor"> bgcolor="{{bgcolor}}"</span>
                            <span v-if="!cases"> cases="{{cases}}"</span>
                            <span v-if="!deaths"> deaths="{{deaths}}"</span>
                            <span v-if="!recovered"> recovered="{{recovered}}"</span>
                            <span v-if="labeltitle != 'Corona (COVID-19)'"> title="{{labeltitle}}"</span>
                            <span v-if="labelglobal != 'Global Stats'"> labelglobal="{{labelglobal}}"</span>
                            <span v-if="labelcases != 'Cases'"> labelcases="{{labelcases}}"</span>
                            <span v-if="labeldeaths != 'Deaths'"> labeldeaths="{{labeldeaths}}"</span>
                            <span v-if="labelrecovered != 'Recovered'"> labelrecovered="{{labelrecovered}}"</span>]
                        </div>

                        <br /><br />
                        <div v-if="loading" class="cov-spinner">
                            <div class="cov-bounce1"></div>
                            <div class="cov-bounce2"></div>
                            <div class="cov-bounce3"></div>
                        </div>

                        <div v-else-if="country" class="cov-card" :style="{ 'width': cardwidth, 'background-color': bgcolor, 'box-shadow': '0 0 30px 0' + bgcolor + 80  }">
                              
                            <h3>{{ labeltitle }}</h3>
                            
                            <h5 >{{ country.name }} <span class="cov-updated" :style="{ 'color': bgcolor }">{{country.date}}</span></h5>
                            <i class="fas fa-virus cov-icon"></i>
                            <div class="cov-grid">
                                <div v-if="cases" class="cov-col">
                                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelcases }}</h4>
                                    <div class="cov-stats">{{ country.cases.toLocaleString() }} <span class="cov-new">+{{ country.cases_new.toLocaleString() }} New</span></div>
                                </div>
                                <div v-if="deaths" class="cov-col">
                                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labeldeaths }}</h4>
                                    <div class="cov-stats">{{ country.deaths.toLocaleString() }} <span class="cov-new">+{{ country.deaths_new.toLocaleString() }} New</span></div>
                                </div>
                                <div v-if="recovered" class="cov-col">
                                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelrecovered }}</h4>
                                    <div class="cov-stats">{{ country.recovered.toLocaleString() }}</div>
                                </div>
                                <div v-if="active" class="cov-col">
                                    <i class="fas fa-syringe" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelactive }}</h4>
                                    <div class="cov-stats">{{ country.active.toLocaleString() }}</div>
                                </div>
                            </div>
                            
                        </div>

                        <div v-else>
                            <p>Error: Issue with retrieving data. Please try again in few moments</p>
                        </div>

                        <br />
                        <div class="cov-shortcode-container">
                            [covid-widget type="country-card" country="{{selectedcountry}}"
                            <span v-if="bgcolor"> bgcolor="{{bgcolor}}"</span>
                            <span v-if="!cases"> cases="{{cases}}"</span>
                            <span v-if="!deaths"> deaths="{{deaths}}"</span>
                            <span v-if="!recovered"> recovered="{{recovered}}"</span>
                            <span v-if="!active"> active="{{active}}"</span>
                            <span v-if="labeltitle != 'Corona (COVID-19)'"> title="{{labeltitle}}"</span>
                            <span v-if="labelglobal != 'Global Stats'"> labelglobal="{{labelglobal}}"</span>
                            <span v-if="labelcases != 'Cases'"> labelcases="{{labelcases}}"</span>
                            <span v-if="labeldeaths != 'Deaths'"> labeldeaths="{{labeldeaths}}"</span>
                            <span v-if="labelrecovered != 'Recovered'"> labelrecovered="{{labelrecovered}}"</span>
                            <span v-if="labelactive != 'Active Cases'"> labelactive="{{labelactive}}"</span>]
                        </div>

                        <br /> <br />

                        <div class="cov-chart" :style="{ 'width': cardwidth }">

                            <div v-if="loading" class="cov-spinner">
                                <div class="cov-bounce1"></div>
                                <div class="cov-bounce2"></div>
                                <div class="cov-bounce3"></div>
                            </div>

                            <div v-else-if="country" class="">
                                <h3>{{ labeltitle }}</h3>
                                <h5 >{{ country.name }} <span class="cov-updated" style="background-color: #333; color: #fff;">{{ country.date }}</span></h5>
                                <i class="fas fa-virus cov-icon"></i>
                                <ul class="chart-list">
                                    <li v-if="cases" class="cases">{{ labelcases }}: {{ country.cases.toLocaleString() }} <span>+{{ country.cases_new }} New</span></li>
                                    <li v-if="deaths" class="deaths">{{ labeldeaths }}: {{ country.deaths.toLocaleString() }} <span>+{{ country.deaths_new }} New</span></li>
                                    <li v-if="recovered" class="recovered">{{ labelrecovered }}: {{ country.recovered.toLocaleString() }}</li>
                                    <li v-if="active" class="active-cases">{{ labelactive }}: {{ country.active.toLocaleString() }}</li>
                                </ul>
                            </div>

                            <div v-else>
                                <p>Error: Issue with retrieving data. Please try again in few moments</p>
                            </div>
                            
                            <div id="canvas-holder" style="width:100%">
                                <canvas id="countryChart"></canvas>
                            </div>
                        </div>

                        <br />
                        <div class="cov-shortcode-container">
                            [covid-widget type="country-chart" country="{{selectedcountry}}" charttype="{{charttype}}"<span v-if="!cases"> cases="{{cases}}"</span>
                            <span v-if="!deaths"> deaths="{{deaths}}"</span>
                            <span v-if="!recovered"> recovered="{{recovered}}"</span>
                            <span v-if="!active"> active="{{active}}"</span>
                            <span v-if="labeltitle != 'Corona (COVID-19)'"> title="{{labeltitle}}"</span>
                            <span v-if="labelglobal != 'Global Stats'"> labelglobal="{{labelglobal}}"</span>
                            <span v-if="labelcases != 'Cases'"> labelcases="{{labelcases}}"</span>
                            <span v-if="labeldeaths != 'Deaths'"> labeldeaths="{{labeldeaths}}"</span>
                            <span v-if="labelrecovered != 'Recovered'"> labelrecovered="{{labelrecovered}}"</span>
                            <span v-if="labelactive != 'Active Cases'"> labelactive="{{labelactive}}"</span>]
                        </div>
                        

                    </div>

                </div>

            </div> 

        </div>

        <div class="uk-section">
            <div class="uk-container">
                <div class="uk-card uk-card-default uk-card-body uk-form-horizontal cov-options">
                    <h2 class="cov-heading">Global Shortcode Settings</h2>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-text">Background Color</label>
                        <verte v-model="bgcolor" display="picker" picker="square" model="hex" style="border: 1px solid #ccc;" @input="$emit('color', $event)"><svg width="100%" height="30">
                        <rect width="100%" height="30" />
                        </svg></verte>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-text">Text Color</label>
                        <verte v-model="textcolor" display="picker" picker="square" model="hex" style="border: 1px solid #ccc;" @input="$emit('textcolor', $event)"><svg width="100%" height="30">
                        <rect width="100%" height="30" />
                        </svg></verte>
                    </div>
                    <div class="uk-margin">
                        <div class="cov-shortcode-container" style="width: 100%;">
                            [covid-widget type="global-wide"
                            <span v-if="bgcolor"> bgcolor="{{bgcolor}}"</span>
                            <span v-if="textcolor"> textcolor="{{textcolor}}"</span>
                            <span v-if="labelcases != 'Cases'"> labelcases="{{labelcases}}"</span>
                            <span v-if="labeldeaths != 'Deaths'"> labeldeaths="{{labeldeaths}}"</span>
                            <span v-if="labelrecovered != 'Recovered'"> labelrecovered="{{labelrecovered}}"</span>]
                        </div>
                    </div>
                </div>
                <widget-global-wide :bgcolor="bgcolor" :textcolor="textcolor"></widget-global-wide>
            </div>
        </div>

        <div class="uk-section">
            <div class="uk-container">
                <div class="uk-card uk-card-default uk-card-body uk-form-horizontal cov-options">
                    <h2 class="cov-heading">Table Shortcode</h2>
                    <div class="uk-margin">
                        <div class="cov-shortcode-container" style="width: 100%;">
                            [covid-widget type="table"]
                        </div>
                    </div>

                    <table-view></table-view>

                </div>
            </div>
        </div>

  </div>
</template>

<script>
  import Hero from '@/components/layout/Hero'
  import WidgetGlobal from '@/components/WidgetGlobal'
  import WidgetGlobalWide from '@/components/WidgetGlobalWide'
  import Table from '@/components/WidgetTable'
  import axios from 'axios'
  import moment from 'moment'
  import Settings from '@/components/Settings'
  import Chart from 'chart.js';

  export default {
    name: 'home',
    components: {
      'hero': Hero,
      'global-widget': WidgetGlobal,
      'widget-global-wide': WidgetGlobalWide,
      'settings': Settings,
      'table-view': Table
    },
    data(){
      return {
        countriesList: [],
        global: null,
        country: {},
        taken_at: '',
        selectedcountry: 'US',
        charttype: 'bar',
        cardwidth: '400px',
        activeCases: null,
        chart: null,
        loading: false,
        bgcolor: '#043785',
        textcolor: '#fff',
        cases: true,
        deaths: true,
        recovered: true,
        active: true,
        labeltitle: 'Corona (COVID-19)',
        labelglobal: 'Global Stats',
        labelcases: 'Cases',
        labeldeaths: 'Deaths',
        labelrecovered: 'Recovered',
        labelactive: 'Active Cases',
        header: {
          title: "CORONA (COVID-19) Stats WordPress Plugin",
          subtitle: "Generate Shortcode to Display Widgets on Your Website",
          img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
          button: {
            url: 'https://github.com/sajjadalis/corona-covid-stats/archive/master.zip',
            txt: 'DOWNLOAD'
          }
        }
      }
    },
    methods: {
        numberWithCommas(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        async countryData(country) {
            this.loading = true;

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                console.log(res.data);

                let latest = res.data[country][res.data[country].length - 1]
                let yesterday = res.data[country][res.data[country].length - 2];              

                this.country = {
                    name: country,
                    date: moment(latest.date, "YYYY-M-DD").format('MMMM Do, YYYY'),
                    cases: latest.confirmed,
                    deaths: latest.deaths,
                    recovered: latest.recovered,
                    active: latest.confirmed - latest.deaths - latest.recovered,
                    cases_new: latest.confirmed - yesterday.confirmed,
                    deaths_new : latest.deaths - yesterday.deaths
                }
                
                let chartLabel = 'Corona Stats for ' + country;
                
                let chartBg = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(161, 196, 102, 1)'];
                
                let chartLabels = ['Confirmed Cases', 'Deaths', 'Recoverd', 'Active Cases'];
                
                let data = [this.country.cases, this.country.deaths, this.country.recovered, this.country.active];

                let chartData = {
                    labels: chartLabels,
                    datasets: [{
                        label: chartLabel,
                        data: data,
                        backgroundColor: chartBg,
                        borderColor: "#fff",
                    }],
                };
                let chartOptions = {
                    legend: {
                        display: false
                    }
                }

                // CHART JS //
                let ctx = document.getElementById('countryChart');
                this.chart = new Chart(ctx, {
                        type: this.charttype,
                        data: chartData,
                        options: chartOptions
                });

            })
            .catch(function(e) {
                console.log(e);
            })
            .finally(() => {
                this.loading = false;
            });            
        },
        destroyChart() {
            this.chart.destroy();
        }
    },
    mounted() {
        this.countryData(this.selectedcountry);
    }
  }
</script>