<template>
  <div id="app">
    <Header :bgcolor="bgcolor" :header="header" />
    <router-view/>
    <Footer />

  </div>
</template>
<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return{
      bgcolor: '#043785',
      header: {
          title: "SHURE - Competible with you",
          subtitle: "Detachable sound, isolating earphones",
          img: '/assets/img/brian-mcgowan-gkpszAElZf8-unsplash.jpg',
          button: {
            url: '/shop',
            txt: 'SHOP NOW'
          }
      }
    }
  },
  metaInfo: {
      title: 'Corona (COVID-19) Live Stats WordPress Plugin',
      titleTemplate: '%s | Corona (COVID-19) Live Stats WordPress Plugin'
  }

}
</script>