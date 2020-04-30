<template>
    <div>
        <div v-if="settings" uk-sticky class="uk-card uk-card-default uk-card-body uk-form-horizontal cov-options uk-sticky">
            <h2 class="cov-heading">Card Shortcode Settings</h2>
            <div class="uk-margin">
                <label  class="uk-form-label" for="form-horizontal-select">Select Country</label>
                <div class="uk-form-controls">
                <v-select v-model="selectedcountry" :value="selectedcountry" :options="countriesList" @input="$emit('country', $event)" />

                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">Chart Type</label>
                <div class="uk-form-controls">
                    <v-select  v-model="charttype"  :value="charttype" :options="charttypeData" @input="$emit('chart', $event)" />
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">Background Color</label>
                <verte v-model="bgcolor" display="picker" picker="square" model="hex" @input="$emit('color', $event)"><svg width="100%" height="30">
                <rect width="100%" height="30" />
                </svg></verte>
            </div>
            
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">Card Width</label>
                <div class="uk-form-controls">
                    <input class="uk-input" v-model="cardwidth" type="text" @input="$emit('cardwidth', $event)" />
                </div>
            </div>

            <div class="uk-child-width-1-2@m" uk-grid>
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Disable Cases</label>
                    
                    <label class="rt-switch">
                        <input type="checkbox" v-model="cases" @change="$emit('cases')" />
                        <span class="rt-slider rt-round"></span>
                    </label>
                </div>

                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Disable Deaths</label>
                    
                    <label class="rt-switch">
                        <input type="checkbox" v-model="deaths" @change="$emit('deaths')" />
                        <span class="rt-slider rt-round"></span>
                    </label>
                </div>

                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Disable Recovered</label>
                    
                    <label class="rt-switch">
                        <input type="checkbox" v-model="recovered" @change="$emit('recovered')" />
                        <span class="rt-slider rt-round"></span>
                    </label>
                </div>

                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Disable Active Cases</label>
                    
                    <label class="rt-switch">
                        <input type="checkbox" v-model="active" @change="$emit('active')" />
                        <span class="rt-slider rt-round"></span>
                    </label>
                </div>

                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Main Title</label>
                    <input class="uk-input" v-model="labeltitle" type="text" @input="$emit('labeltitle', $event)" />
                </div>
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Global Stats Label</label>
                    <input class="uk-input" v-model="labelglobal" type="text" @input="$emit('labelglobal', $event)" />
                </div>
                
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Cases Label</label>
                    <input class="uk-input" v-model="labelcases" type="text" @input="$emit('labelcases', $event)" />
                </div>
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Deaths Label</label>
                    <input class="uk-input" v-model="labeldeaths" type="text" @input="$emit('labeldeaths', $event)" />
                </div>
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Recovered</label>
                    <input class="uk-input" v-model="labelrecovered" type="text" @input="$emit('labelrecovered', $event)" />
                </div>
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Active</label>
                    <input class="uk-input" v-model="labelactive" type="text" @input="$emit('labelactive', $event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: ['selectedcountry', 'bgcolor', 'charttype', 'cardwidth', 'cases', 'deaths', 'recovered', 'critical', 'active', 'casesperm', 'labeltitle', 'labelglobal', 'labelcases', 'labeldeaths', 'labelrecovered', 'labelcritical', 'labelactive', 'labelcasesperm',],
    data() {
        return{
            countriesList: [],
            charttypeData: ['bar', 'horizontalBar', 'doughnut', 'pie', 'line', 'radar', 'polarArea'],
            settings: true,
        }
    },
    methods: {
        async countries() {
            await axios('https://pomber.github.io/covid19/countries.json')
            .then(res => {

                for (let [key, value] of Object.entries(res.data)) {
                    this.countriesList.push(key);
                }

                console.log(countries);
            })
        }
    },
    mounted() {
        this.countries();
    }
}
</script>