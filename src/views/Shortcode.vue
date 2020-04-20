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
                        :critical="critical"
                        :active="active"
                        :casesperm="casesperm"
                        :labeltitle="labeltitle"
                        :labelglobal="labelglobal"
                        :labelcases="labelcases"
                        :labeldeaths="labeldeaths"
                        :labelrecovered="labelrecovered"
                        :labelcritical="labelcritical"
                        :labelactive="labelactive"
                        :labelcasesperm="labelcasesperm"
                        @color="bgcolor = $event;"
                        @country="selectedcountry = $event; destroyChart(); countryData(selectedcountry);"
                        @chart="charttype = $event; destroyChart(); countryData(selectedcountry);"
                        @cardwidth="cardwidth = $event.target.value"
                        @cases="cases = !cases;"
                        @deaths="deaths = !deaths"
                        @critical="critical = !critical"
                        @recovered="recovered = !recovered"
                        @active="active = !active"
                        @casesperm="casesperm = !casesperm"
                        @labeltitle="labeltitle = $event.target.value"
                        @labelglobal="labelglobal = $event.target.value"
                        @labelcases="labelcases = $event.target.value"
                        @labeldeaths="labeldeaths = $event.target.value"
                        @labelrecovered="labelrecovered = $event.target.value"
                        @labelcritical="labelcritical = $event.target.value"
                        @labelactive="labelactive = $event.target.value"
                        @labelcasesperm="labelcasesperm = $event.target.value"
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
                            :labeltitle="labeltitle"
                            :labelglobal="labelglobal"
                            :labelcases="labelcases"
                            :labeldeaths="labeldeaths"
                            :labelrecovered="labelrecovered"
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
                            
                            <h5 >{{ country.country_name }} <span class="cov-updated" :style="{ 'color': bgcolor }">{{ taken_at }}</span></h5>
                            <i class="fas fa-virus cov-icon"></i>
                            <div class="cov-grid">
                                <div v-if="cases" class="cov-col">
                                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelcases }}</h4>
                                    <div class="cov-stats">{{ country.total_cases }} <span class="cov-new">+{{ country.new_cases }} New</span></div>
                                </div>
                                <div v-if="deaths" class="cov-col">
                                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labeldeaths }}</h4>
                                    <div class="cov-stats">{{ country.total_deaths }} <span class="cov-new">+{{ country.new_deaths }} New</span></div>
                                </div>
                                <div v-if="critical" class="cov-col">
                                    <i class="fas fa-lungs-virus" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelcritical }}</h4>
                                    <div class="cov-stats">{{ country.serious_critical }}</div>
                                </div>
                                <div v-if="recovered" class="cov-col">
                                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelrecovered }}</h4>
                                    <div class="cov-stats">{{ country.total_recovered }}</div>
                                </div>
                                <div v-if="active" class="cov-col">
                                    <i class="fas fa-syringe" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelactive }}</h4>
                                    <div class="cov-stats">{{ activeCases }}</div>
                                </div>
                                <div v-if="casesperm" class="cov-col">
                                    <i class="fas fa-viruses" :style="{ 'color': bgcolor }"></i>
                                    <h4>{{ labelcasesperm }}</h4>
                                    <div class="cov-stats">{{ country.total_cases_per1m }}</div>
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
                            <span v-if="!critical"> critical="{{critical}}"</span>
                            <span v-if="!active"> active="{{active}}"</span>
                            <span v-if="!casesperm"> casesperm="{{casesperm}}"</span>
                            <span v-if="labeltitle != 'Corona (COVID-19)'"> title="{{labeltitle}}"</span>
                            <span v-if="labelglobal != 'Global Stats'"> labelglobal="{{labelglobal}}"</span>
                            <span v-if="labelcases != 'Cases'"> labelcases="{{labelcases}}"</span>
                            <span v-if="labeldeaths != 'Deaths'"> labeldeaths="{{labeldeaths}}"</span>
                            <span v-if="labelrecovered != 'Recovered'"> labelrecovered="{{labelrecovered}}"</span>
                            <span v-if="labelactive != 'Active Cases'"> labelactive="{{labelactive}}"</span>
                            <span v-if="labelcritical != 'Critical'"> labelcritical="{{labelcritical}}"</span>
                            <span v-if="labelcasesperm != 'Cases / 1M'"> labelcasesperm="{{labelcasesperm}}"</span>]
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
                                <h5 >{{ country.country_name }} <span class="cov-updated" style="background-color: #333; color: #fff;">{{ taken_at }}</span></h5>
                                <i class="fas fa-virus cov-icon"></i>
                                <ul class="chart-list">
                                    <li v-if="cases" class="cases">{{ labelcases }}: {{ country.total_cases }} <span>+{{ country.new_cases }} New</span></li>
                                    <li v-if="deaths" class="deaths">{{ labeldeaths }}: {{ country.total_deaths }} <span>+{{ country.new_deaths }} New</span></li>
                                    <li v-if="critical" class="critical">{{ labelcritical }}: {{ country.serious_critical }}</li>
                                    <li v-if="recovered" class="recovered">{{ labelrecovered }}: {{ country.total_recovered }}</li>
                                    <li v-if="active" class="active-cases">{{ labelactive }}: {{ activeCases }}</li>
                                    <li v-if="casesperm" class="casesper1m">{{ labelcasesperm }}: {{ country.total_cases_per1m }}</li>
                                </ul>
                            </div>

                            <div v-else>
                                <p>Error: Issue with retrieving data. Please try again in few moments</p>
                            </div>
                            
                            <div id="canvas-holder" style="width:100%">
                                <canvas id="myChart"></canvas>
                            </div>
                        </div>

                        <br />
                        <div class="cov-shortcode-container">
                            [covid-widget type="country-chart" country="{{selectedcountry}}" charttype="{{charttype}}"<span v-if="!cases"> cases="{{cases}}"</span>
                            <span v-if="!deaths"> deaths="{{deaths}}"</span>
                            <span v-if="!recovered"> recovered="{{recovered}}"</span>
                            <span v-if="!critical"> critical="{{critical}}"</span>
                            <span v-if="!active"> active="{{active}}"</span>
                            <span v-if="!casesperm"> casesperm="{{casesperm}}"</span>
                            <span v-if="labeltitle != 'Corona (COVID-19)'"> title="{{labeltitle}}"</span>
                            <span v-if="labelglobal != 'Global Stats'"> labelglobal="{{labelglobal}}"</span>
                            <span v-if="labelcases != 'Cases'"> labelcases="{{labelcases}}"</span>
                            <span v-if="labeldeaths != 'Deaths'"> labeldeaths="{{labeldeaths}}"</span>
                            <span v-if="labelrecovered != 'Recovered'"> labelrecovered="{{labelrecovered}}"</span>
                            <span v-if="labelactive != 'Active Cases'"> labelactive="{{labelactive}}"</span>
                            <span v-if="labelcritical != 'Critical'"> labelcritical="{{labelcritical}}"</span>
                            <span v-if="labelcasesperm != 'Cases / 1M'"> labelcasesperm="{{labelcasesperm}}"</span>]
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

  var host = 'coronavirus-monitor.p.rapidapi.com';
  var key = 'cfd416e672msh1d31722e56ea3c4p1e4ffejsn11819d2d30f2';

  export default {
    name: 'shortcode-generator',
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
        selectedcountry: 'USA',
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
        critical: true,
        active: true,
        casesperm: true,
        labeltitle: 'Corona (COVID-19)',
        labelglobal: 'Global Stats',
        labelcases: 'Cases',
        labeldeaths: 'Deaths',
        labelrecovered: 'Recovered',
        labelcritical: 'Critical',
        labelactive: 'Active Cases',
        labelcasesperm: 'Cases / 1M',
        header: {
          title: "CORONA (COVID-19) Stats WordPress Plugin",
          subtitle: "Generate Shortcode to Display Widgets on Your Website",
          img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
        }
      }
    },
    methods: {
        numberWithCommas(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        countryData(country) {
            this.loading = true;
            let stat_by_country = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php';

            axios.get(stat_by_country, { 
                headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': key },
                params: { 'country': country,  } 
            } )
            .then(res => {
                this.country = res.data.latest_stat_by_country[0];

                console.log(this.country.record_date)

                this.taken_at = moment(this.country.record_date).format('ll');;
                let cases = parseInt(this.country.total_cases.replace(/,/g, ''), 10);
                let recoverd = parseInt(this.country.total_recovered.replace(/,/g, ''), 10);
                let deaths = parseInt(this.country.total_deaths.replace(/,/g, ''), 10);
                let activeCases = cases - recoverd - deaths;
                this.activeCases = this.numberWithCommas(activeCases);
                let critical = parseInt(this.country.serious_critical.replace(/,/g, ''), 10);
                let caseper1m = parseInt(this.country.total_cases_per1m.replace(/,/g, ''), 10);
                
                let chartLabel = 'Corona Stats for ' + this.country.country_name;
                
                let chartBg = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(161, 196, 102, 1)', 'rgba(153, 102, 255, 1)'];
                
                let chartLabels = ['Total Cases', 'Deaths', 'Critical', 'Total Recoverd', 'Active Cases', 'Cases/1M'];
                
                let data = [cases, deaths, critical, recoverd, activeCases, caseper1m];

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
                let ctx = document.getElementById('myChart');
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
        this.globalData();
    }
  }
</script>