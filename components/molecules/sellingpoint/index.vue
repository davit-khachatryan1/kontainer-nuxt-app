<template>
	<div class="sellingpoint">
		<div class="sellingpoint__icon">
			<NuxtImg loading="lazy" :src="sellingpoint.icon.url.replace('.png', '.webp').replace('.jpg', '.webp').replace('.jpeg', '.webp')" :alt="sellingpoint.icon.alt" />
		</div>
		<div class="sellingpoint__text" v-html="sellingpoint.description"></div>
	</div>
</template>

<script>
export default {
	name: 'SellingpointComponent',
	props: {
		sellingpoint: { type: Object },
	},
	computed: {},
	methods: {},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.sellingpoint {
	display: flex;
	margin-bottom: 40px;
	align-items: center;

	&__icon {
		margin-right: 40px;
		flex-basis: 70px;
		max-width: 70px;

		@include media('mobile') {
			margin-right: 20px;
			flex-basis: 40px;
			max-width: 40px;
		}

		img {
			display: block;
			max-width: 75%;
			width: 100%;
			height: auto;
			margin: 0 auto;
		}
	}

	&__text {
		@extend %text-paragraph2;
		flex-basis: calc(100% - 110px);

		@include media('mobile') {
			flex-basis: calc(100% - 60px);
		}
	}
}
</style>

<!-- <docs>
```jsx
<div>
</div>
```
</docs> -->
