<template>
  <div class="home">
        
        <hero :header="header"></hero>

        <div class="uk-section">
           
            <div class="uk-container">

                 <widget-global-wide bgcolor="#ff0" textcolor="#000"></widget-global-wide>

                 <br /><br />
                 
                 <table-view></table-view>

            </div> 

        </div>
  </div>
</template>

<script>
    import Hero from '@/components/layout/Hero'
    import Table from '@/components/WidgetTable'
    import WidgetGlobalWide from '@/components/WidgetGlobalWide'
    import axios from 'axios'
    import moment from 'moment'
    import Chart from 'chart.js';

    var host = 'coronavirus-monitor.p.rapidapi.com';
    var key = 'cfd416e672msh1d31722e56ea3c4p1e4ffejsn11819d2d30f2';

    export default {
    name: 'home',
    components: {
        'hero': Hero,
        'table-view': Table,
        'widget-global-wide': WidgetGlobalWide
    },
    data() {
      return{
        header: {
          title: "CORONA (COVID-19) Stats WordPress Plugin",
          subtitle: "Generate Shortcode to Display Widgets on Your Website",
          img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
          button: {
            url: '/shortcode-generator',
            txt: 'Shortcode Generator'
          }
        }
      }
    },
  }
</script>
