import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import Verte from 'verte';
import VueTabulator from 'vue-tabulator';
import VuePapaParse from 'vue-papa-parse'
import Meta from 'vue-meta'

Vue.use(VueTabulator);
Vue.use(VuePapaParse)
Vue.use(Meta)

Vue.component('v-select', vSelect)
Vue.component('verte', Verte);

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
