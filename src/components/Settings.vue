<template>
    <div>
        <div v-if="settings" uk-sticky class="uk-card uk-card-default uk-card-body uk-form-horizontal cov-options">
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
                    <label class="uk-form-label" for="form-horizontal-text">Disable Critical</label>
                    
                    <label class="rt-switch">
                        <input type="checkbox" v-model="critical" @change="$emit('critical')" />
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
                    <label class="uk-form-label" for="form-horizontal-text">Disable Cases / 1M</label>
                    
                    <label class="rt-switch">
                        <input type="checkbox" v-model="casesperm" @change="$emit('casesperm')" />
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
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Critical</label>
                    <input class="uk-input" v-model="labelcritical" type="text" @input="$emit('labelcritical', $event)" />
                </div>
                <div>
                    <label class="uk-form-label" for="form-horizontal-text">Cases / 1M</label>
                    <input class="uk-input" v-model="labelcasesperm" type="text" @input="$emit('labelcasesperm', $event)" />
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
            countriesList: ["USA","Spain","Italy","UK","France","Germany","Russia","Turkey","Iran","Brazil","Canada","Belgium","Peru","Netherlands","India","Switzerland","Ecuador","Saudi Arabia","Portugal","Sweden","Ireland","Mexico","Pakistan","Chile","Singapore","Israel","Belarus","Austria","Qatar","Japan","Poland","UAE","Romania","Ukraine","Indonesia","S. Korea","Denmark","Serbia","Philippines","Bangladesh","Norway","Czechia","Dominican Republic","Colombia","Australia","Panama","Malaysia","South Africa","Egypt","Finland","Morocco","Kuwait","Argentina","Algeria","Moldova","Luxembourg","Kazakhstan","Bahrain","Thailand","Hungary","Greece","Oman","Afghanistan","Armenia","Iraq","Nigeria","Ghana","Uzbekistan","Croatia","Cameroon","Azerbaijan","Bosnia and Herzegovina","Iceland","Estonia","Bulgaria","Cuba","Guinea","North Macedonia","New Zealand","Slovenia","Slovakia","Lithuania","Ivory Coast","Bolivia","Senegal","Djibouti","Hong Kong","Tunisia","Honduras","Latvia","Cyprus","Albania","Kyrgyzstan","Andorra","Lebanon","Niger","Costa Rica","Diamond Princess","Sri Lanka","Burkina Faso","Uruguay","Guatemala","DRC","Somalia","Georgia","San Marino","Mayotte","Channel Islands","Sudan","Maldives","Mali","Tanzania","Malta","Jordan","El Salvador","Kenya","Jamaica","Taiwan","Réunion","Palestine","Venezuela","Paraguay","Mauritius","Montenegro","Isle of Man","Equatorial Guinea","Gabon","Vietnam","Guinea-Bissau","Rwanda","Congo","Faeroe Islands","Martinique","Sierra Leone","Liberia","Guadeloupe","Myanmar","Gibraltar","Brunei","Madagascar","Ethiopia","French Guiana","Togo","Cabo Verde","Cambodia","Zambia","Trinidad and Tobago","Bermuda","Eswatini","Aruba","Monaco","Benin","Haiti","Uganda","Bahamas","Guyana","Liechtenstein","Barbados","Mozambique","Sint Maarten","Cayman Islands","Chad","CAR","Libya","Nepal","French Polynesia","Macao","South Sudan","Syria","Eritrea","Mongolia","Saint Martin","Malawi","Zimbabwe","Tajikistan","Angola","Antigua and Barbuda","Timor-Leste","Botswana","Grenada","Laos","Belize","Fiji","New Caledonia","Saint Lucia","Curaçao","Sao Tome and Principe","Dominica","Namibia","St. Vincent Grenadines","Saint Kitts and Nevis","Nicaragua","Falkland Islands","Gambia","Turks and Caicos","Burundi","Montserrat","Greenland","Vatican City","Seychelles","Suriname","MS Zaandam","Mauritania","Papua New Guinea","Yemen","Bhutan","British Virgin Islands","Caribbean Netherlands","St. Barth","Western Sahara","Anguilla","Comoros","Saint Pierre Miquelon","China"],
            charttypeData: ['bar', 'horizontalBar', 'doughnut', 'pie', 'line', 'radar', 'polarArea'],
            settings: true,
        }
    }
}
</script>