<template>
    <!-- TOP -->
		<div class="top-wrap uk-position-relative uk-light uk-background-secondary">
			
			<!-- NAV -->
			<div class="nav">
				<div class="uk-container">
					<nav class="uk-navbar uk-navbar-container uk-navbar-transparent" data-uk-navbar>
						<div class="uk-navbar-left">
							<div class="uk-navbar-item uk-padding-remove-horizontal">
								<router-link :to="{ name: 'home' }" class="uk-logo">CORONA (COVID-19) STATS</router-link>
							</div>
						</div>
						<div class="uk-navbar-right">
							<ul class="uk-navbar-nav uk-visible@s">
								<li><router-link :to="{ name: 'home' }">Shortcode Generator</router-link></li>
								<li><router-link :to="{ name: 'table' }">Table</router-link></li>
								<li><router-link :to="{ name: 'chart' }">Chart</router-link></li>
								<li><a href="https://github.com/sajjadalis/corona-covid-stats" uk-icon="github" target="_blank"></a></li>
								<li><a href="https://wordpress.org/plugins/corona-covid-19-stats/" uk-icon="wordpress" target="_blank"></a></li>
								<li><a href="https://twitter.com/sajjadali" uk-icon="twitter"  target="_blank"></a></li>
							</ul>
							<a class="uk-navbar-toggle uk-navbar-item uk-hidden@s" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav"></a>
						</div>
					</nav>
				</div>
			</div>
			<!-- /NAV -->
		</div>
		<!-- /TOP -->
</template>
<script>
export default {
	props: ['bgcolor', 'header']
}
</script>