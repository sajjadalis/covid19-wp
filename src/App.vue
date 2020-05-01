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
          img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
          button: {
            url: '/shop',
            txt: 'SHOP NOW'
          }
      }
    }
  }
}
</script>