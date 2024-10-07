<template lang="html">
	<div class="latest-news">
		<div class="content-grid-container">
			<div class="span-container">
				<div
					:class="['span4', 'span6--tablet', 'span4--mobile', 'swiper-slider']" v-for="(kard, index) in data.lastestNews" :key="index" 
				>
					<KardComponent :kard="kard" />
				</div>
			</div>
			<!-- TODO add pagination? -->
		</div>
	</div>
</template>

<script>
const KardComponent = defineAsyncComponent(() => import( '~/components/molecules/kard/index.vue'));

export default {
	components: {
		KardComponent,
	},
	props: {
		data: { type: Object },
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
h1 {
	@extend %text-h1;
	text-align: center;
	margin: 50px 0 100px;
}

.swiper-slider {
	display: flex;
}

.latest-news {
	padding: $section-angle-height 0;
}
</style>
