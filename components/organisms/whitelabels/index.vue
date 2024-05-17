<template>
	<section :class="'whitelabels'">
		<div class="content-grid-container">
			<Teaser :class="['whitelabels__teaser', 'teaser--fluid']" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />
			<WhitelabelComponent v-for="(whitelabel, index) in data.resource_repeater" :key="index" :whitelabel="whitelabel" />
		</div>
	</section>
</template>

<script>
const WhitelabelComponent = defineAsyncComponent(() => import( '~/components/molecules/whitelabel/index.vue'));
const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));

export default {
	name: 'Whitelabels',
	components: {
		WhitelabelComponent,
		Teaser,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.whitelabels {
	padding: $section-inner-padding 0;

	&__teaser {
		max-width: 1000px;
		margin: 0 auto 50px;
		text-align: center;

		@include media('mobile-ab') {
			width: 80%;
			margin: 0 auto 130px;
		}
	}
}
</style>

<!-- <docs>
```jsx
<SignupSection/ >
```
</docs> -->
