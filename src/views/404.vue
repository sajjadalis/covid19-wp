<template>
    <div class="error-404">

        <hero :header="header"></hero>

        <div class="uk-container uk-padding-large">

            <div class="content uk-text-center">
                
                <h2>We can't find the page you're looking for.</h2>

                <router-link to="/" class="uk-button uk-button-primary uk-margin-top">Go to Homepage</router-link>

            </div>

        </div>
  </div>
</template>

<script>
import Hero from '@/components/layout/Hero'
export default {
  name: '404',
  components: {
    'hero': Hero,
  },
  data() {
    return{
      header: {
				title: "404 / Lost in the Woods",
				img: '/assets/img/404.jpg',
			}
    }
  }
}
</script>
