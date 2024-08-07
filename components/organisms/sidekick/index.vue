<template>
	<section
		:class="[
			'sidekick',
			'sidekick--padding--' + data.padding,
			'sidekick--margin--' + data.margin,
		]"
	>
		<div class="content-grid-container">
			<div class="span-container">
				<div
					:class="['span6 span6--tablet span4--mobile', sidekick.content_type]"
					v-for="(sidekick, index) in [data.sidekick_left, data.sidekick_right]"
					:key="index"
				>
					<template v-if="sidekick.content_type === 'text'">
						<SmartFlash>
							<Teaser
								sidekick
								:data="sidekick"
								:class="'teaser--fluid'"
								:positionOnPage="positionOnPage"
								@openVideoModal="openVideoModal"
							/>
						</SmartFlash>
					</template>
					<template v-else-if="sidekick.content_type === 'html'">
						<CodeInserter :data="sidekick" :positionOnPage="positionOnPage" />
					</template>

					<Parallax
						v-else-if="sidekick.content_type === 'image_inline'"
						:class="[
							dropshadowClass(sidekick.dropshadow, 'bottom'),
							{ loaded: loaded },
							'inlineimage-container',
						]"
						v-in-view="
							(e) => {
								setLoaded(e);
							}
						"
					>
						<smart-image
							v-if="sidekick.image_inline.sizes"
							:image="sidekick.image_inline"
							:srcset="
								sidekick.image_inline.sizes.mobile_min &&
								sidekick.image_inline.sizes.mobile_sm &&
								sidekick.image_inline.sizes.mobile &&
								sidekick.image_inline.sizes.tablet_sm &&
								sidekick.image_inline.sizes.tablet
									? [
											sidekick.image_inline.sizes.default
												? sidekick.image_inline.sizes.default + ' 1025w'
												: sidekick.image_inline.url + ' 1025w',
											sidekick.image_inline.sizes.tablet + ' 1024w',
											sidekick.image_inline.sizes.tablet_sm + ' 950w',
											sidekick.image_inline.sizes.mobile + ' 768w',
											sidekick.image_inline.sizes.mobile_sm + ' 567w',
											sidekick.image_inline.sizes.mobile_min + ' 320w',
									  ]
									: []
							"
							:sizes="
								sidekick.image_inline.sizes.mobile_min &&
								sidekick.image_inline.sizes.mobile_sm &&
								sidekick.image_inline.sizes.mobile &&
								sidekick.image_inline.sizes.tablet_sm &&
								sidekick.image_inline.sizes.tablet
									? [
											'(min-width: 1025px) 40vw',
											'(max-width: 1024px) 40vw',
											'(max-width: 950px) 40vw',
											'(max-width: 768px) 70vw',
											'(max-width: 567px) 70vw',
											'(max-width: 320px) 70vw',
									  ]
									: ['sidekick_inline']
							"
							nocrop
							:style="`padding-bottom: ${
								(sidekick.image_inline.sizes['mobile_sm-height'] /
									sidekick.image_inline.sizes['mobile_sm-width']) *
								100
							}%`"
							class="bg-aspectratio"
						/>
					</Parallax>
					<Parallax
						v-else
						:class="[
							'media-container',
							'media-container--' + `${sidekickSide(index)}`,
							dropshadowClass(sidekick.dropshadow, sidekickSide(index)),
							{ loaded: loaded },
						]"
						v-in-view="
							(e) => {
								setLoaded(e);
							}
						"
					>
						<smart-image
							v-if="sidekick.image.sizes && sidekick.content_type === 'image'"
							:image="sidekick.image"
							:srcset="
								sidekick.image.sizes.mobile_min &&
								sidekick.image.sizes.mobile_sm &&
								sidekick.image.sizes.mobile &&
								sidekick.image.sizes.tablet_sm &&
								sidekick.image.sizes.tablet
									? [
											sidekick.image.url + ' 1025w',
											sidekick.image.sizes.tablet + ' 1024w',
											sidekick.image.sizes.tablet_sm + ' 950w',
											sidekick.image.sizes.mobile + ' 768w',
											sidekick.image.sizes.mobile_sm + ' 567w',
											sidekick.image.sizes.mobile_min + ' 320w',
									  ]
									: []
							"
							:sizes="
								sidekick.image.sizes.mobile_min &&
								sidekick.image.sizes.mobile_sm &&
								sidekick.image.sizes.mobile &&
								sidekick.image.sizes.tablet_sm &&
								sidekick.image.sizes.tablet
									? [
											'(min-width: 1025px) 40vw',
											'(max-width: 1024px) 40vw',
											'(max-width: 950px) 40vw',
											'(max-width: 768px) 70vw',
											'(max-width: 567px) 70vw',
											'(max-width: 320px) 70vw',
									  ]
									: ['sidekick_inline']
							"
							nocrop
							:style="`padding-bottom: ${
								(sidekick.image.sizes['sidekick_inline-height'] /
									sidekick.image.sizes['sidekick_inline-width']) *
								100
							}%`"
							class="bg-aspectratio"
						/>
						<template v-else>
							<video
								v-if="sidekick.video.url"
								v-lazy-load-video="sidekick.video.url"
								playsinline
								muted
								loop
								autoplay
								width="754"
								height="705"
							></video>
							<smart-image
								v-if="sidekick.fallback_image"
								:image="sidekick.fallback_image"
								:srcset="
									sidekick.fallback_image.sizes.mobile_min &&
									sidekick.fallback_image.sizes.mobile_sm &&
									sidekick.fallback_image.sizes.mobile &&
									sidekick.fallback_image.sizes.tablet_sm &&
									sidekick.fallback_image.sizes.tablet
										? [
												sidekick.fallback_image.url + ' 1025w',
												sidekick.fallback_image.sizes.tablet + ' 1024w',
												sidekick.fallback_image.sizes.tablet_sm + ' 950w',
												sidekick.fallback_image.sizes.mobile + ' 768w',
												sidekick.fallback_image.sizes.mobile_sm + ' 567w',
												sidekick.fallback_image.sizes.mobile_min + ' 320w',
										  ]
										: []
								"
								:sizes="
									sidekick.fallback_image.sizes.mobile_min &&
									sidekick.fallback_image.sizes.mobile_sm &&
									sidekick.fallback_image.sizes.mobile &&
									sidekick.fallback_image.sizes.tablet_sm &&
									sidekick.fallback_image.sizes.tablet
										? [
												'(min-width: 1025px) 40vw',
												'(max-width: 1024px) 40vw',
												'(max-width: 950px) 40vw',
												'(max-width: 768px) 70vw',
												'(max-width: 567px) 70vw',
												'(max-width: 320px) 70vw',
										  ]
										: ['sidekick_inline']
								"
								nocrop
							/>
						</template>
					</Parallax>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div>
				<div
					class="video-modal"
					v-if="videoModalActive"
					@click.prevent="closeVideoModal"
				>
					<button class="video-modal__close" @click.prevent="closeVideoModal">
						close
					</button>
					<video
						playsinline
						controls
						autoplay
						ref="videoplayer"
						width="700"
						height="400"
						@keyup.esc="closeVideoModal"
						tabindex="0"
						v-lazy-load-video="videoModalFile"
					>
					</video>
				</div>
			</div>
		</transition>
	</section>
</template>

<script>
const SmartImage = defineAsyncComponent(() => import( '~/components/helper/smartimage/index.vue'));
const Button = defineAsyncComponent(() => import( '~/components/atoms/button/index.vue'));
const Parallax = defineAsyncComponent(() => import( '~/components/_nuclides/parallax/index.vue'));
const PinElement = defineAsyncComponent(() => import( '~/components/atoms/pin/index.vue'));
const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));
import { useImgUrl } from '~/components/composables/useImgUrl';
const SmartFlash = defineAsyncComponent(() => import('~/components/helper/smartFlash/index.vue'));
const CodeInserter = defineAsyncComponent(() => import('~/components/organisms/code-inserter/index.vue'));
const LaptopMockup = defineAsyncComponent(() => import('~/assets/svg/hero-laptop.svg'));
const LaptopMockupShadow = defineAsyncComponent(() => import('~/assets/svg/hero-laptop-shadow.svg'));

export default {
	name: 'Sidekick',
	data() {
		return {
			inView: false,
			loaded: false,
			videoModalActive: false,
		};
	},
	setup() {
		const { imgUrl } = useImgUrl()
		return { imgUrl };
  	},
	components: {
		SmartImage,
		Button,
		PinElement,
		Parallax,
		Teaser,
		SmartFlash,
		CodeInserter,
		LaptopMockup,
		LaptopMockupShadow,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	computed: {},
	methods: {
		setLoaded(e) {
			if (e) {
				this.loaded = e;
			}
		},
		sidekickSide(index) {
			if (index === 0) {
				return 'left';
			}
			return 'right';
		},
		dropshadowClass(dropshadow, type) {
			if (dropshadow) {
				return `box-shadow box-shadow--${type}`;
			}
			return '';
		},
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
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
$margins: (
	desktop: $desktopMargin,
	tablet: $tabletMargin,
	mobile: $mobileMargin,
);

.sidekick {
	&--padding {
		&--top {
			padding-top: $section-inner-padding;
		}

		&--bottom {
			padding-bottom: $section-inner-padding;
		}

		&--both {
			padding: $section-inner-padding 0;
		}

		&--none {
			padding: $section-inner-padding * 0.5 0;
		}
	}

	&--margin {
		&--minus-top {
			margin-top: -$section-inner-padding !important;
		}

		&--minus-bottom {
			margin-bottom: -$section-inner-padding !important;
		}
	}

	@include media('mobile') {
		padding: 30px 0;
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
}


.span-container {
	@include media('mobile-ab') {
		align-items: center;
		justify-content: space-between;
	}
	@include media('mobile') {
		.text + div:not(.text) {
			order: -1;
		}

		.text {
			margin-bottom: 30px;
		}

		flex-direction: column-reverse;
	}
}

.media-container {
	position: relative;
	width: 100%;
	max-width: 750px;
	max-width: inherit;

	@include media('desktop') {
		width: calc(50vw - #{$desktopMargin} - 1.00694vw);
	}

	@include media('tablet') {
		position: relative !important;
		top: 0 !important;
	}

	@include media('mobile') {
		width: calc(100vw - #{$mobileMargin});
	}

	@include media('desktop-1800') {
		&--right {
			@each $display, $margin in $margins {
				@include media($display) {
					left: $margin;
				}
			}

			@include media('mobile') {
				left: 0;
			}
		}

		&--left {
			@each $display, $margin in $margins {
				@include media($display) {
					left: -#{$margin};
				}
			}
		}
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		position: relative;
		top: 50%;
	}
}

.video {
	.media-container {
		padding-bottom: 55.25%;
		overflow: hidden;
	}

	video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		z-index: z('sidekickVideo');
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: z('sidekickImage');
	}
}

.image_inline {
	@include media('mobile') {
		margin-bottom: 30px;
	}

	img {
		display: block;
		max-width: 100%;
		height: auto;
	}

	@include media('mobile-ab') {
		&.span6:first-child {
			padding-right: 2vw;
		}

		&.span6:last-child {
			padding-left: 2vw;
		}
	}
}

.inlineimage-container {
	width: 100%;
}

.box-shadow {
	display: inline-block;

	&::before {
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	&--right {
		@include inner-shadow('right');
	}
	&--left {
		@include inner-shadow('left');
	}
	&--bottom {
		@include inner-shadow('bottom');
	}
	&.loaded {
		&::before {
			opacity: 1;
		}
	}
}
</style>

<!-- <docs>
```jsx
<Sidekick/ >
```
</docs> -->
