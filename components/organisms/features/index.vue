<template>
	<section class="features content-grid-container">
		<div class="span-container features-grid">
			<FeatureComponent
				v-for="(feature, index) in data.features"
				:key="index"
				:feature="feature"
				:class="featureClassname"
			/>
		</div>
	</section>
</template>

<script>
const ButtonComponent = defineAsyncComponent(() => import('~/components/atoms/button/index.vue'));
const FeatureComponent = defineAsyncComponent(() => import('~/components/molecules/feature/index.vue'));

export default {
	name: 'FeatureSection',
	components: {
		ButtonComponent,
		FeatureComponent,
	},
	props: {
		data: { type: Object },
	},
	computed: {
		featureClassname() {
			if (this.data.layout === 'column') {
				return 'feature--column feature--single span8 span10--tablet span4--mobile'; // column layout
			}
			const count = Object.keys(this.data.features).length;
			if (count === 1) {
				return 'feature--single span8 span10--tablet span4--mobile';
			}
			if (count === 2) {
				return 'feature--double span6 span6--tablet span4--mobile';
			}
			return 'span4';
		},
	},
	methods: {
		hasButton(feature) {
			return feature.button_text && feature.button_url;
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.features {
	padding-bottom: 70px;
	padding-top: 70px;

	&-grid {
		display: grid;
		width: inherit;
		justify-items: center;
		grid-template-columns: repeat(3, auto);
		@include media('tablet') {
			grid-template-columns: repeat(2, auto);
		}
		@include media('mobile') {
			grid-template-columns: repeat(1, auto);
		}
	}

	&__container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
}
</style>

<!-- <docs>
```jsx
<div>
</div>
```
</docs> -->
