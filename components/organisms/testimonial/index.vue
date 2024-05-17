<template>
	<section class="testimonial" :class="[colorClass, beforeClass, afterClass]">
		<div :class="{'testimonial__image': true}">
			<smart-image
				v-if="srcSetPaths"
				class="testimonial__image__smart"
				:image="data.background_image"
				:srcset="srcSetPaths ?
					[
						data.background_image.sizes.full_width ? data.background_image.sizes.full_width + ' 1025w' : data.background_image.url + ' 1025w',
						data.background_image.sizes.tablet + ' 1024w',
						data.background_image.sizes.tablet_sm + ' 950w',
						data.background_image.sizes.mobile + ' 768w',
						data.background_image.sizes.mobile_sm + ' 567w',
						data.background_image.sizes.mobile_min + ' 320w',
					] : []"
				:sizes="srcSetPaths ? ['(min-width: 1025px) 100vw', '1024px', '950px', '768px', '567px', '320px'] : ['full_width']"
				nocrop
			/>
		</div>
		<div class="testimonial__overlay"></div>
		<div :class="{'content-grid-container': true, 'testimonial__container': true, 'animate-enter': !initAnimations}">
			<div class="testimonial__content">
				<template v-if="testimonial.quote">
					<h2 v-if="positionOnPage !== 0" :class="[{'testimonial__content__quote': true, 'animate-enter': !initAnimations}, quoteSize, alternateClass]" v-html="testimonial.quote" />
					<h1 v-if="positionOnPage === 0" :class="[{'testimonial__content__quote': true, 'animate-enter': !initAnimations}, quoteSize, alternateClass]" v-html="testimonial.quote" />
				</template>
				<div v-if="testimonial.by_line" :class="{'testimonial__content__byline': true, 'animate-enter': !initAnimations}">{{ // white-space - pre
					testimonial.by_line
				}}</div>
			</div>
		</div>
	</section>
</template>

<script>
import objectFitImages from 'object-fit-images';
const SmartImage = defineAsyncComponent(() => import('~/components/helper/smartimage/index.vue'));
import { useAnimateOnLoad } from '~/components/composables/useAnimateOnLoad';
import { useImgUrl } from '~/components/composables/useImgUrl';

export default {
	name: 'TestimonialSection',
	components: {
		SmartImage,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	setup() {
		const { initAnimations } = useAnimateOnLoad()
		const { imgUrl } = useImgUrl()
		return { initAnimations, imgUrl };
  	},
	data() {
		return {
			srcSetPaths:
				this.data.background_image &&
				this.data.background_image.sizes.mobile_min &&
				this.data.background_image.sizes.mobile_sm &&
				this.data.background_image.sizes.mobile &&
				this.data.background_image.sizes.tablet_sm &&
				this.data.background_image.sizes.tablet,
		};
	},
	computed: {
		testimonial() {
			return this.data.testimonial;
		},
		alternateClass() {
			return this.testimonial.alternate_quote && 'testimonial__content__quote--alternate';
		},
		quoteSize() {
			switch (this.testimonial.quote_text_length) {
				case 'normal':
					return 'testimonial__content__quote--normal';
				case 'long':
					return 'testimonial__content__quote--long';
				case 'extra_long':
					return 'testimonial__content__quote--extra-long';
				default:
					return 'testimonial__content__quote--normal';
			}
		},
		colorClass() {
			switch (this.testimonial.color_contrast) {
				case 'black':
					return 'testimonial-black';
				case 'yellow':
					return 'testimonial--yellow';
				case 'white':
				default:
					return 'testimonial--white';
			}
		},
		beforeClass() {
			// if (this.first) {
			// 	return 'testimonial--before-none';
			// }

			/* eslint-disable camelcase */
			const { section_top_angle, section_bg_color } = this.data;
			const angleClasses = {
				1: 'testimonial--before-positive',
				2: 'testimonial--before-negative',
			};
			const colorClasses = {
				white: 'testimonial--before-positive',
				black: 'testimonial--before-black',
				bluedark: 'testimonial--before-bluedark',
				grey: 'testimonial--before-grey',
			};

			return `${angleClasses[section_top_angle]} ${
				colorClasses[section_bg_color]
			}`;
		},
		afterClass() {
			/* eslint-disable camelcase */
			const { section_bottom_angle, section_bg_color_after } = this.data;
			const angleClasses = {
				1: 'testimonial--after-positive',
				2: 'testimonial--after-negative',
			};
			const colorClasses = {
				white: 'testimonial--after-positive',
				black: 'testimonial--after-black',
				bluedark: 'testimonial--after-bluedark',
				grey: 'testimonial--after-grey',
				brown: 'testimonial--after-brown',
			};

			return `${angleClasses[section_bottom_angle]} ${
				colorClasses[section_bg_color_after]
			}`;
		},
	},
	mounted: () => {
		objectFitImages();
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.testimonial {
	text-align: center;

	position: relative;
	z-index: 1;

	background-position: center;
	background-size: cover;

	margin-top: $section-padding-top-negative;
	margin-bottom: $section-padding-bottom-negative;

	padding-top: calc(#{$pinLength} + #{calc(calc($section-angle-height / 2))});
	padding-bottom: $section-padding-bottom;

	$container: '';

	@include media('mobile') {
		margin-top: $section-padding-top-mobile-negative;
		margin-bottom: $section-padding-bottom-mobile-negative;

		padding-top: $section-padding-top-mobile;
		padding-bottom: $section-padding-bottom-mobile;
	}

	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		transform-origin: center;
		background: white;
		width: 100%;
		height: $section-angle-height;
		z-index: 5;

		// background-color: tomato !important;

		transform: skewY(3deg) translateY(-50%);
	}

	&--before {
		&-none::before {
			display: none;
		}

		&-negative::before {
			transform: skewY(-3deg) translateY(-50%);
		}

		&-bluedark::before {
			background-color: $blue-dark;
		}

		&-black::before {
			background-color: $black;
		}

		&-grey::before {
			background-color: $gray-concrete;
		}
	}

	&::after {
		top: auto;
		bottom: 0;

		transform: skewY(3deg) translateY(50%);
	}

	&--after {
		&-negative::after {
			transform: skewY(-3deg) translateY(50%);
		}

		&-bluedark::after {
			background-color: $blue-dark;
		}

		&-black::after {
			background-color: $black;
		}

		&-grey::after {
			background-color: $gray-concrete;
		}

		&-brown::after {
			background-color: $brown-light;
		}
	}

	&--white {
		color: $white;
	}

	&--black {
		color: $black;
	}

	&--yellow {
		color: $yellow;
	}

	&__overlay,
	&__image {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 0;
	}

	&__overlay {
		background: rgba($blue-dark, 0.5);
		// z-index: 0;
	}

	&__image {
		position: absolute;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			font-family: 'object-fit: cover;'; // object-fit polyfill IE property
		}

		&.animate-enter {
		}

		&__smart {
			height: 100%;
			> img {
				height: 100%!important;
			}
		}
	}



	&__container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 20vw;
		padding: 50px 0 0;
		transition: min-height 0.3s ease;
		position: relative;
		z-index: 1;

		$container: &;

		&.animate-enter {
			min-height: 5vw;
		}
	}

	&__content {
		display: block;
		justify-content: center;
		align-items: center;

		@include media('mobile-ab') {
			width: 1010px;
			max-width: 80%;
		}

		&__quote {
			@extend %text-quote;
			@include responsive-font(3.15vw, 24px, 50px, 45px);
			line-height: 1.4;
			transition: opacity 0.2s ease 0.1s, transform 0.3s $easeInOut 0.05s;

			&--long {
				@include responsive-font(3.15vw, 24px, 40px, 45px);
			}

			&--extra-long {
				@include responsive-font(3.15vw, 24px, 30px, 45px);
			}

			&--alternate {
				font-weight: $type-regular;
			}
		}

		&__byline {
			@extend %text-paragraph2;
			@include responsive-font(1.12vw, 15px, 20px, 16px);
			margin-top: 2.75em;
			transition: opacity 0.2s ease 0.16s, transform 0.3s $easeInOut 0.1s;
		}

		&__quote,
		&__byline {
			a {
				text-decoration: none;
			}

			&.animate-enter {
			}
		}
	}

	&--0 {
		#{$container} {
			min-height: unset;
		}

		.section--pin-pad & {
			padding-bottom: $section-padding-bottom-pin;

			@include media('mobile') {
				padding-bottom: $section-padding-bottom-mobile;
			}
		}

		&::before,
		&::after {
			z-index: 0;
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
