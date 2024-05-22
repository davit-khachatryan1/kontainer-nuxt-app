<template>
	<section class="link-swiper">
	  <div class="content-grid-container">
		<Teaser :class="'link-swiper__teaser'" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />
		<div class="span-container">
		  <div class="swiper-button-prev" @click="prevSlide">
			<Arrow />
		  </div>
		  <div class="my-swiper" ref="mySwiper" :options="swiperOptions">
			<div :class="['fade-before', `fade-before--${data.section_bg_color}`]"></div>
			<div class="swiper-wrapper">
			  <KardComponent :class="['swiper-slide']" v-for="(kard, index) in data.links_repeater" :key="index" :kard="kard" />
			</div>
			<div :class="['fade-after', `fade-after--${data.section_bg_color}`]"></div>
		  </div>
		  <div class="swiper-button-next" @click="nextSlide">
			<Arrow />
		  </div>
		</div>
		<div v-if="data.show_view_all && data.link_view_all_wrapper && data.link_view_all_wrapper.link_view_all" class="link-swiper__actions">
		  <ButtonComponent :link="data.link_view_all_wrapper.link_view_all" :type="'outline'">{{ langString('_view_all', 'View all') }}</ButtonComponent>
		</div>
	  </div>
	</section>
</template>

  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));
  const KardComponent = defineAsyncComponent(() => import('~/components/molecules/kard-inverted/index.vue'));
  const ButtonComponent = defineAsyncComponent(() => import('~/components/atoms/button/index.vue'));
  const Arrow = defineAsyncComponent(() => import('~/assets/svg/arrow-big.svg'));
  const SmartLink = defineAsyncComponent(() => import('~/components/helper/smartlink/index.vue'));
  import Swiper from 'swiper';
  import 'swiper/swiper-bundle.css';
  import { useLangString } from '~/components/composables/useLangString';
  
  export default defineComponent({
	name: 'LinksSwiper',
	components: {
	  Teaser,
	  KardComponent,
	  ButtonComponent,
	  SmartLink,
	  Arrow,
	},
	props: {
	  data: { type: Object },
	  positionOnPage: { type: Number },
	},
	setup() {
	  const mySwiper = ref(null);
	  const swiperOptions = {
		startSlide: 2,
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		breakpoints: {
		  1024: {
			startSlide: 1,
			slidesPerView: 3,
			spaceBetween: 20,
		  },
		  768: {
			startSlide: 1,
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		},
	  };
	  const { langString } = useLangString();
  
	  onMounted(() => {
		mySwiper.value = new Swiper(mySwiper.value, swiperOptions);
	  });
  
	  const nextSlide = () => {
		if (mySwiper.value) {
		  mySwiper.value.slideNext();
		}
	  };
  
	  const prevSlide = () => {
		if (mySwiper.value) {
		  mySwiper.value.slidePrev();
		}
	  };
  
	  return { mySwiper, swiperOptions, langString, nextSlide, prevSlide };
	},
  });
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
	display: flex;
    justify-content: center;
    width: 100%;
	overflow: hidden;
	.swiper-wrapper {
		padding: 60px 60px 0px;
		width: calc(100%);
		margin: -60px auto 0;

		@include media('tablet') {
			width: 100%;
		}
	}

	.swiper-slide {
		// fix inline styling from swiper resetting on click, styles set from swiperOptions
		width: calc(33.3333% - (30px * 2/3));
		// margin-right: 30px;
		height: auto;

		@include media('tablet') {
			width: calc(50% - (20px / 2));
			margin-right: 20px;
		}

		@include media('mobile') {
			width: 100%;
			margin-right: 15px;
		}

		::v-deep(.kard__banner) {
			padding-bottom: 32.78688525%;
			max-height: none;

			.bg {
				position: absolute;
				// width: 100%;
			}
		}
	}
}

.link-swiper {
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
		margin: 30px auto 0;

		@include media('mobile') {
			width: calc(#{$mobileWidth} - 10px);
		}
	}
}

.span-container {
	position: relative;
    padding: 0 70px;
	.swiper-button-prev,
	.swiper-button-next {
		height: calc(100% - 30px) !important;
		display: flex;
		background-image: none !important;
		width: 30px;
		align-items: center;
		opacity: 1;
		outline: none;
		z-index: 100;
		top: 0;
		svg {
			fill: $label-color;
			min-width: 30px;
			max-height: 45px
		}

		@include media('tablet') {
			display: none;
		}
		&::after {
			display: none;
		}
	}

	.swiper-button-disabled {
		opacity: 0.4;
	}

	.swiper-button-prev {
		left: -15px;
		transform: rotate(180deg);
	}

	.swiper-button-next {
		right: -15px;
	}

	.fade-before {
		background: $white;
		height: 100%;
		width: 45px;
		display: block;
		position: absolute;
		top: 0;
		left: 0px;
		z-index: 20;

		@include media('tablet') {
			display: none;
		}

		&--grey {
			background: $gray-concrete;
		}

		&--bluedark {
			background: $blue-dark;
		}
	}

	.fade-after {
		background: $white;
		height: 100%;
		width: 45px;
		display: block;
		position: absolute;
		top: 0;
		right: 0px;
		z-index: 20;

		@include media('tablet') {
			display: none;
		}

		&--grey {
			background: $gray-concrete;
		}

		&--bluedark {
			background: $blue-dark;
		}
	}
}
</style>
