<template>
	<section :class="['hero']">
		<div class="content-grid-container">
			<div class="span-container">
				<div class="span6 span6--tablet hide--tablet-sm">
					<Teaser hero :data="data.hero_left" :class="['teaser--large']" :positionOnPage="positionOnPage"
						@openVideoModal="openVideoModal" />
				</div>
				<div class="span6 span6--tablet span4--mobile">
					<Teaser hero :data="data.hero_left" :class="['teaser--large', 'hero__right']"
						@openVideoModal="openVideoModal">
						<slot>
							<div class="media-container">
								<div class="hero-video" v-if="videoUrl || video_url">
									<smart-image class="hero-video__placeholder force-dynamic-height"
										:image="data.hero_right.fallback_image" :srcset="srcSetPaths
			? [
				data.hero_right.fallback_image.url + ' 1025w',
				data.hero_right.fallback_image.sizes.tablet +
				' 1024w',
				data.hero_right.fallback_image.sizes.tablet_sm +
				' 950w',
				data.hero_right.fallback_image.sizes.mobile +
				' 768w',
				data.hero_right.fallback_image.sizes.mobile_sm +
				' 567w',
				data.hero_right.fallback_image.sizes.mobile_min +
				' 320w',
			]
			: []
		" :sizes="srcSetPaths
			? [
				'(min-width: 1025px) 40vw',
				'(max-width: 1024px) 40vw',
				'(max-width: 950px) 40vw',
				'(max-width: 768px) 70vw',
				'(max-width: 567px) 70vw',
				'(max-width: 320px) 70vw',
			]
			: ['sidekick']
		" nocrop />
									<video v-if="videoUrl" class="js-hero-video" :src="videoUrl" width="1280"
										height="720" playsinline muted loop autoplay></video>
									<div class="video-url-container" v-if="video_url">
										<iframe class="js-hero-video" :src="video_url + '?controls=0'"
											title="YouTube video player" frameborder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowfullscreen></iframe>
									</div>
								</div>
								<smart-image v-else class="hero-image" :image="data.hero_right.fallback_image" :srcset="srcSetPaths
			? [
				data.hero_right.fallback_image.url + ' 1025w',
				data.hero_right.fallback_image.sizes.tablet +
				' 1024w',
				data.hero_right.fallback_image.sizes.tablet_sm +
				' 950w',
				data.hero_right.fallback_image.sizes.mobile + ' 768w',
				data.hero_right.fallback_image.sizes.mobile_sm +
				' 567w',
				data.hero_right.fallback_image.sizes.mobile_min +
				' 320w',
			]
			: []
		" :sizes="srcSetPaths
			? [
				'(min-width: 1025px) 40vw',
				'(max-width: 1024px) 40vw',
				'(max-width: 950px) 40vw',
				'(max-width: 768px) 70vw',
				'(max-width: 567px) 70vw',
				'(max-width: 320px) 70vw',
			]
			: ['sidekick']
		" nocrop />
							</div>
						</slot>
					</Teaser>
				</div>
			</div>
			<div v-if="data.hero_left.show_badges" class="badges">
				<a href="https://www.g2.com/products/kontainer/" title="Write a review of Kontainer on G2"
					target="_blank">
					<G2Logo class="logo" />
					<Rating5Star class="rating" />
				</a>

				<a href="https://www.capterra.com/reviews/143730/Kontainer?utm_source=vendor&utm_medium=badge&utm_campaign=capterra_reviews_badge"
					target="_blank">
					<CapterraLogo class="logo" />
					<Rating45Star class="rating" />
				</a>
			</div>
			<PinElement v-if="data.show_social" :type="'2'" :socialPinSide="'1'"
				:class="{ 'animate-enter': !initAnimations }" />
		</div>

		<transition name="fade">
			<div>
				<div class="video-modal" v-if="videoModalActive" @click.prevent="closeVideoModal">
					<button class="video-modal__close" @click.prevent="closeVideoModal">
						close
					</button>
					<video playsinline controls autoplay ref="videoplayer" width="1280" height="720"
					@keyup.esc="closeVideoModal" tabindex="0">
					<source :src="videoModalFile" type="video/mp4" />
					</video>
				</div>
			</div>
		</transition>
	</section>
</template>

<script>
import SmartImage from '~/components/helper/smartimage/index.vue';
import Button from '~/components/atoms/button/index.vue';
import PinElement from '~/components/atoms/pin/index.vue';
import LaptopMockup from '~/assets/svg/hero-laptop.svg';
import LaptopMockupShadow from '~/assets/svg/hero-laptop-shadow.svg';
import Teaser from '~/components/molecules/teaser/index.vue';
import CapterraLogo from '~/assets/svg/capterra-logo.svg';
import Rating45Star from '~/assets/svg/4-5-stars.svg';
import G2Logo from '~/assets/svg/g2-logo.svg';
import Rating5Star from '~/assets/svg/5-stars.svg';
import { useAnimateOnLoad } from '~/components/composables/useAnimateOnLoad';
import { useImgUrl } from '~/components/composables/useImgUrl';

export default {
	name: 'Hero',
	setup() {
		const { initAnimations } = useAnimateOnLoad()
		const { imgUrl } = useImgUrl()
		return { initAnimations, imgUrl };
  	},
	components: {
		SmartImage,
		Button,
		PinElement,
		LaptopMockup,
		LaptopMockupShadow,
		Teaser,
		CapterraLogo,
		Rating45Star,
		G2Logo,
		Rating5Star,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	data() {
		return {
			srcSetPaths:
				this.data.hero_right.fallback_image.sizes.mobile_min &&
				this.data.hero_right.fallback_image.sizes.mobile_sm &&
				this.data.hero_right.fallback_image.sizes.mobile &&
				this.data.hero_right.fallback_image.sizes.tablet_sm &&
				this.data.hero_right.fallback_image.sizes.tablet,
			videoModalFile: '',
			videoModalActive: false,
			autoplayed: '',
		};
	},
	methods: {
		openVideoModal(videoUrl) {
			this.videoModalFile = videoUrl;
			this.videoModalActive = true;
			setTimeout(() => {
				const media = this.$refs.videoplayer;
				media.focus();
			}, 0);
		},
		closeVideoModal() {
			this.videoModalActive = false;
		},
	},
	computed: {
		videoUrl() {
			return this.data.hero_right.video.url;
		},
		video_url() {
			return this.data.hero_right.video_url;
		},
	},
	mounted: () => {
		// const video = document.querySelector('.js-hero-video');
		// if (video) {
		// 	video.addEventListener('loadeddata', () => {
		// 		if (video.readyState >= 3) {
		// 			video.style.visibility = 'visible';
		// 			video.play();
		// 		}
		// 	});
		// }
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";

.hero {
	position: relative;

	@include media('tablet-sm') {
		text-align: center;
		padding-bottom: 50px;
	}

	.span-container {
		margin-top: -$section-angle-height;
		align-items: center;
		justify-content: space-between;
		padding-top: 20px;
		padding-bottom: 40px;

		@media (max-aspect-ratio: 2/1) and (min-width: 1025px) {
			margin-top: -$section-angle-height * 0.5;
		}

		@media (max-aspect-ratio: 5/4) and (min-width: 1025px) {
			height: auto;
		}

		@include media('tablet') {
			margin-bottom: $section-angle-height;

			padding-top: 20px;
			padding-bottom: 20px;
		}

		@include media('tablet-sm') {
			&>.span6:last-child {
				width: 100%;
			}
		}
	}

	.pin-social {
		margin-top: 20px;
		position: absolute;

		@include media('mobile') {
			display: none;
		}
	}

	::v-deep(.teaser__tagline) {
		opacity: 1;

		@media (max-height: 800px) and (min-height: 600px) {
			margin-bottom: 5px;
		}
	}

	.badges {
		position: relative;
		display: flex;
		flex-direction: row;
		margin-top: 1rem 0 2rem;

		a:first-child {
			padding-right: 2rem;
			border-right: 1px solid #cccccc;
		}

		a:last-child {
			padding-left: 2rem;
		}

		.logo {
			width: 40px;
			height: 40px;
			margin-right: 20px;
		}

		.rating {
			height: 40px;
		}

		@include media('desktop-1200') {
			a:first-child {
				padding-right: 1rem;
			}

			a:last-child {
				padding-left: 1rem;
			}

			a svg {
				width: 180px;
			}
		}

		@include media('tablet-sm') {
			flex-direction: column;
			padding: 1rem 0;

			a:first-child,
			a:last-child {
				border: none;
				padding: 1rem 0;
			}

			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 50%;
				width: 200vw;
				transform: translateX(-50%);
				border-bottom: 1px solid rgba($gray-dusty, 0.15);
			}

			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 200vw;
				transform: translateX(-50%);
				border-bottom: 1px solid rgba($gray-dusty, 0.15);
			}
		}

		@media (max-height: 800px) {
			margin-top: 0;

			svg {
				width: 150px;
			}
		}
	}
}

.media-container {
	position: relative;
	transform-origin: right center;

	max-width: inherit;

	@include media('tablet-sm') {
		width: 70vw;
		margin: 20px auto;
	}

	@include media('mobile') {
		width: 80vw;
	}

	.hero-video {
		position: relative;
		overflow: hidden;
		z-index: z('heroLaptopVideoOuter');
		background-size: contain;

		iframe {
			position: relative;
			z-index: z('heroLaptopVideo');
			width: 100%;
			min-height: inherit;
		}

		.video-url-container,
		video {
			position: relative;
			z-index: z('heroLaptopVideo');
			width: 100%;
			height: auto;
			min-height: 20.51406vw; // 16/9 format height to width of .span6
			max-height: 75vh;
			visibility: visible;
		}

		&__placeholder {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: z('heroLaptopImage');
			object-fit: cover;
			transform: scale(1);

			.animate-enter & {
				transform: scale(1.2);
			}
		}
	}

	.hero-image {
		display: flex;
		align-items: center;
	}
}

.video-modal {
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	z-index: z('videoModal');
	background-color: $white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	video {
		width: 90%;
		max-width: 100%;
		height: auto;
		outline: none;
	}

	&__close {
		position: fixed;
		top: 30px;
		right: 35px;
		height: 40px;
		width: 40px;
		min-width: 0;
		text-indent: -9999px;
		margin: 0;
		border: 0;
		display: block;
		background-color: transparent;
		cursor: pointer;

		&::before,
		&::after {
			content: '';
			height: 2px;
			width: 20px;
			background-color: $black;
			opacity: 0.7;
			position: absolute;
			top: 50%;
			left: 50%;
			transform-origin: center;
			transform: translateX(-50%) rotate(45deg);
		}

		&::after {
			transform: translateX(-50%) rotate(-45deg);
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, transform 0.4s;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: scale(1.1);
}
</style>

<!-- <docs>
```jsx
<Hero/ >
```
</docs> -->
