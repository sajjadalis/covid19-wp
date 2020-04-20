<template>
    <div class="uk-cover-container uk-light uk-flex uk-flex-middle top-wrap-height" :style="{ height: isHome }">
				
		<!-- TOP CONTAINER -->
		<div class="uk-container uk-flex-auto top-container uk-position-relative uk-margin-medium-top banner">
			<div class="uk-width-1-1@s" data-uk-scrollspy="cls: uk-animation-slide-right-medium; target: > *; delay: 150">
				<h2 class="uk-margin-remove-top">{{ header.title }}</h2>
				<p class="subtitle-text uk-visible@s">{{ header.subtitle }} </p>
				<p v-if="header.button"><a :href="header.button.url" class="uk-button uk-button-primary" data-uk-scrollspy-class="uk-animation-fade">{{ header.button.txt }}</a></p>
			</div>
		</div>
		<!-- /TOP CONTAINER -->
		<!-- TOP IMAGE -->
		<img :src="header.img" :data-src="header.img" alt="" data-uk-cover data-uk-img data-uk-parallax="easing:0">
		<div class="uk-overlay-primary uk-position-cover"></div>
		<!-- /TOP IMAGE -->
	</div>
</template>

<script>
export default {
	props: ['header'],
	data() {
		return{
			home: ""
		}
	},
	computed: {
		isHome() {
			if (this.$route.path === "/") {
				this.home = "80vh"
			} else {
				this.home = ""
			}

			return this.home
		}
	}
	
}
</script>