<template>
  <div id="app">
    <header-layout :bgcolor="bgcolor" :header="header"></header-layout>
    <router-view/>
  </div>
</template>
<script>
import Header from '@/components/layout/Header'
export default {
  components: {
    'header-layout': Header
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