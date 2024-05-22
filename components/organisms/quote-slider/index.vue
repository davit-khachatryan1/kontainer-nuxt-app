<template>
	<section class="quote-slider" :class="{ disabled: data.disable_slider }">
	  <div class="content-grid-container">
		<Teaser :class="'quote_intro__teaser'" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />
		<div class="span-container">
		  <div class="swiper-button-prev">
			<NuxtImg loading="lazy" src="svg/arrow-big.svg"/>
		  </div>
		  <div class="my-swiper" ref="mySwiper">
			<div class="swiper-wrapper">
			  <div v-for="(entry, index) in data.quote_repeater" :key="index" class="swiper-slide" :class="{ with_link: entry.content.quote_link }">
				<div class="quote_slider__card">
				  <SmartLink v-if="entry.content.quote_link" :url="entry.content.quote_link.url" :target="entry.content.quote_link.target"></SmartLink>
				  <span class="quote_icon">
					<NuxtImg loading="lazy" src="svg/quote_icon.svg"/>
				  </span>
				  <div class="user_image">
					<NuxtImg :alt="entry.content.name" loading="lazy" v-if="entry.image" width="90" height="90" :src="entry.image.url" />
					<p v-else class="intitals">{{ entry.content.initials }}</p>
				  </div>
				  <p class="user_name">{{ entry.content.name }}</p>
				  <h3 class="user_quote" :class="entry.content.text_size" v-if="entry.content.quote" v-html="entry.content.quote"></h3>
				  <p class="user_position" v-if="entry.content.position">{{ entry.content.position }}</p>
				  <div class="user_rating">
					<template v-if="entry.content.rating === 'cap-5'">
						<NuxtImg loading="lazy" src="svg/cap-5-stars.svg"/>
					</template>
					<template v-else-if="entry.content.rating === 'cap-4-5'">
						<NuxtImg loading="lazy" src="svg/cap-4-5-stars.svg"/>
					</template>
					<template v-else-if="entry.content.rating === 'g2-5'">
						<NuxtImg loading="lazy" src="svg/g2-5-stars.svg"/>
					</template>
					<template v-else-if="entry.content.rating === 'g2-4-5'">
						<NuxtImg loading="lazy" src="svg/g2-4-5-stars.svg"/>
					</template>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		  <div class="swiper-button-next">
			<NuxtImg loading="lazy" src="svg/arrow-big.svg"/>
		  </div>
		</div>
	  </div>
	</section>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));
  import { useLangString } from '~/components/composables/useLangString';
  const SmartLink = defineAsyncComponent(() => import('~/components/helper/smartlink/index.vue'));
  
  export default defineComponent({
	name: 'QuoteSlider',
	components: {
	  Teaser,
	  SmartLink,
	},
	props: {
	  data: { type: Object, required: true },
	  positionOnPage: { type: Number, required: false },
	},
	setup(props, { emit }) {
	  const mySwiper = ref(null);
  
	  const swiperOptions = ref({
		allowSlidePrev: true,
		allowSlideNext: true,
		startSlide: 1,
		slidesPerView: 4,
		spaceBetween: 30,
		centeredSlides: false,
		watchOverflow: true,
		centerInsufficientSlides: true,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		breakpoints: {
		  2000: {
			startSlide: 1,
			slidesPerView: 3,
			spaceBetween: 25,
		  },
		  1300: {
			startSlide: 1,
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		  768: {
			startSlide: 1,
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		},
	  });
  
	  onMounted(() => {
		if (props.data.disable_slider) {
		  swiperOptions.value.watchOverflow = false;
		  swiperOptions.value.allowSlidePrev = false;
		  swiperOptions.value.allowSlideNext = false;
		}
		// Initialize Swiper here if necessary, using `mySwiper.value` and `swiperOptions.value`
	  });
  
	  const { langString } = useLangString()
	  
	  return {
		mySwiper,
		swiperOptions,
		langString
	  };
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

.quote-slider.disabled {
	.swiper-button-next,
	.swiper-button-prev {
		display: none;
	}

	.my-swiper {
		padding: 60px 0px;
		width: calc(100% - 0px);
		margin: -60px auto 0;
		@include media('tablet') {
			width: calc(100% - 90px);
		}
	}
}

.my-swiper {
	&.swiper-container {
		padding: 60px 60px;
		width: calc(100% - 30px);
		margin: -60px auto 0;

		@include media('tablet') {
			width: 100%;
		}
	}

	.swiper-slide {
		// fix inline styling from swiper resetting on click, styles set from swiperOptions
		width: calc(33.3333% - (30px * 2/3));
		margin-right: 30px;
		height: auto;

		height: 100%;
		border-radius: 15px;
		padding: 2rem 1rem;
		text-align: center;
		background: white;
		background: $gray-concrete;
		transition: background-color 0.15s ease;
		&.with_link {
			&:hover {
				background: darken($gray-concrete, 5%);
			}
		}

		@include media('tablet') {
			width: calc(50% - (20px / 2));
			margin-right: 20px;
		}

		@include media('mobile') {
			width: 100%;
			margin-right: 15px;
		}

	}
}


.quote_slider__card {

	a {
		display: block;
		height: 100%;
		position: absolute;
		left: 0;
		width: 100%;
		top: 0;
		cursor: pointer;
		z-index: 99;
	}

	.quote_icon {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		top: -25px;
		img {
			width: 60px;
		}
	}

	.user_image {
		position: relative;
		width: 90px;
		height: 90px;
		object-fit: cover;
		border-radius: 300px;
		overflow: hidden;
		background: white;
		margin: 20px auto 0px auto;

		img {
			width: 100%;
		}

		p {
			font-size: 2rem;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			opacity: .3;
		}
	}

	.user_name {

		position: absolute;
		padding: 4px 10px;
		background: $label-color;
		border-radius: 30px;
		text-align: center;
		margin-top: -10px;
		left: 50%;
		transform: translate(-50%);
		font-size: 0.8rem;
		color: white;
		z-index: 9;

	}

	.user_quote {
		max-width: 310px;
		margin: 0 auto;
		margin-top: 30px;
		@extend %text-h3;
		&.small {
			max-width: 420px;
			@extend %text-paragraph1;
		}

	}
	.user_position {
		@extend %text-paragraph3;
		color: #a6a6a6;
		font-weight: 500;
		margin-top: 8px;
	}

	.user_rating {
		margin-top: 15px;
		img {
			height: 23px;
		}
	}

}

.section--bg--grey {
	.swiper-slide {
		background: white;
		&.with_link {
			&:hover {
				background: darken(white, 2%);
			}
		}
	}
	.user_image {
		background: $gray-concrete;
	}
}

.quote_intro {
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
		max-width: 950px;
    	margin: 0 auto;
		margin-bottom: 60px;

		@include media('tablet') {
			margin-left: $section-inner-padding;
			margin-right: $section-inner-padding;
		}
	}
}

.span-container {
	position: relative;

	.swiper-button-prev, .swiper-button-next {
		height: calc(100% - 30px);
		display: flex;
		top: 0;
		background-image: none;
		width: 30px;
		align-items: center;
		opacity: 1;
		outline: none;

		img {
			fill: $label-color;
		}

		@include media('tablet') {
			display: none;
		}
	}

	.swiper-button-disabled {
		img {
			fill: #C4C4C4;
		}
	}

	.swiper-button-prev {
		left: -15px;
		transform: rotate(180deg);
	}

	.swiper-button-next {
		right: -15px;
	}


}
</style>
