<template>
  <div class="table-view">
    
    <hero :header="header"></hero>

    <div class="uk-section">
        <div class="uk-container">
            <table-view></table-view>
        </div>
    </div>
  </div>
</template>
<script>
import Hero from '@/components/layout/Hero'
import TableWidget from '@/components/WidgetTable'

export default {
  name: 'table',
  components: { 'table-view': TableWidget, 'hero': Hero },
  data() {
    return{
      header: {
          title: "Table",
          subtitle: "",
          img: '/assets/img/martin-sanchez-j2c7yf223Mk-unsplash.jpg',
      }
    }
  }
}
</script>
