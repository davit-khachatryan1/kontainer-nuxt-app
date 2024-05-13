<template>
	<section class="news-kards">
		<div class="content-grid-container">
			<Teaser :class="'news-kards__teaser'" :data="data" v-if="data.heading || data.text"
				:positionOnPage="positionOnPage" />
			<div class="span-container">
				<div class="my-swiper swiper-no-swiping" v-swiper:mySwiper="swiperOptions()">
					<div class="swiper-wrapper">
						<KardComponent :class="['span4', 'swiper-slide']" v-for="(kard, index) in kards" :key="index"
							:kard="kard" />
					</div>
				</div>
			</div>
			<!-- @TODO add slider functionality -->
			<!-- <SmartLink :type="'news'">fsd</SmartLink> -->
			<div class="news-kards__actions">
				<ButtonComponent :link="prepLink('news')" :type="'outline'">{{ langString('_view_all_news') }}
				</ButtonComponent>
			</div>
		</div>
	</section>
</template>

<script>
import ButtonComponent from '~/components/atoms/button/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';
import KardComponent from '~/components/molecules/kard/index.vue';
import SmartLink, {
	prepareWPObjectsToLinks,
} from '~/components/helper/smartlink/index.vue';
import useStore from '@/store'
import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'NewsKards',
	components: {
		ButtonComponent,
		Teaser,
		KardComponent,
		SmartLink,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	data() {
		return {
			lastestKards: [],
		};
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	created() {
		
		const store = useStore();
		if (this.data.fetch_resource_type === 'latest') {
			$fetch(`/api/content/list/news?lang=${store.locale}`, {
					params: {
						per_page: '3',
						order: 'desc',
						orderby: 'date',
					},
				})
				.then((data) => {
					this.lastestKards = data;
				});
		}
	},
	methods: {
		prepLink(obj) {
			return prepareWPObjectsToLinks(obj);
		},
		swiperOptions() {
			const options = {
				startSlide: 1,
				slidesPerView: 3,
				centeredSlides: true,
				spaceBetween: 30,
				noSwiping: true,
				noSwipingClass: 'swiper-no-swiping',
				breakpoints: {
					1024: {
						startSlide: 0,
						slidesPerView: 'auto',
						spaceBetween: 20,
						noSwiping: false,
					},
					768: {
						startSlide: 0,
						slidesPerView: 'auto',
						spaceBetween: 15,
					}
				}
			};

			return options;
		},
	},
	computed: {
		kards() {
			if (this.data.fetch_resource_type === 'latest') {
				return this.lastestKards.map((o) => {
					// hack for different data structure
					const newDataStructure = { resource: o };
					newDataStructure.resource.custom = {
						kard_info: newDataStructure.resource.kard_info,
						kard_image: newDataStructure.resource.kard_image,
					};
					delete newDataStructure.resource.kard_info;
					delete newDataStructure.resource.kard_image;
					return newDataStructure;
				});
			}

			return this.data.resource_repeater;
		},
	},
	mounted() {
		if (this.mySwiper) {
			this.mySwiper.slideTo(this.swiperOptions().startSlide);
		}
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

.my-swiper {
	&.swiper-container {
		margin: 0 -20px -60px;
		padding: 0 20px 60px;
	}

	.swiper-slide {
		width: calc(#{$mobileWidth} - 10px);
	}
}

.news-kards {
	.span-container {
		@include media('tablet') {
			flex-wrap: nowrap;
			margin-left: auto;
			margin-right: auto;
		}
	}

	@include media('tablet-ab') {
		padding: $section-inner-padding 0;
	}

	.content-grid-container {
		@include media('desktop-1400-ab') {
			margin: 0 auto;
			max-width: 1400px;
		}
	}

	.span4 {
		margin-right: 0;
		margin-left: 0;
	}

	&__teaser {
		text-align: center;
		margin-bottom: 60px;
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
