<template>
	<section class="link-kards">
		<div class="content-grid-container">
			<Teaser :class="'link-kards__teaser'" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />
			<div class="span-container">
				<KardComponent :class="{'span4': data.links_per_row === '3', 'span6': data.links_per_row === '2', 'kard--link': true}" v-for="(kard, index) in data.links_repeater" :key="index" :kard="kard" />
			</div>
		</div>
	</section>
</template>

<script>
const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));
const KardComponent = defineAsyncComponent(() => import( '~/components/molecules/kard/index.vue'));
const SmartLink = defineAsyncComponent(() => import('~/components/helper/smartlink/index.vue'));
import { prepareWPObjectsToLinks } from '~/components/composables/prepareWPObjectsToLinks';

import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'Links',
	components: {
		Teaser,
		KardComponent,
		SmartLink,
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	methods: {
		prepLink(obj) {
			return prepareWPObjectsToLinks(obj);
		},
	},
	computed: {
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.content-grid-container {
	width: $desktopWidth;
	margin: auto;

	@include media('tablet') {
		width: auto;
	}
}

.link-kards {
	.span-container {
		@include media('tablet') {
			justify-content: center;
			margin-left: auto;
			margin-right: auto;
		}
	}

	@include media('tablet-ab') {
		padding: $section-inner-padding 0;
	}

	&__teaser {
		text-align: center;
		margin-bottom: 60px;

		@include media('tablet') {
			margin-left: $section-inner-padding;
			margin-right: $section-inner-padding;
		}
	}

	&__actions {
		text-align: center;
		margin: 30px auto 0 auto;

		@include media('mobile') {
			width: calc(#{$mobileWidth} - 10px);
		}
	}
}
</style>

<!-- <docs>
```jsx
<SignupSection/ >
```
</docs> -->
