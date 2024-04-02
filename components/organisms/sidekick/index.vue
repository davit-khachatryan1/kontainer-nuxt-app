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
								:src="sidekick.video.url"
								playsinline
								muted
								loop
								autoplay
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
					width="1280"
					height="720"
					@keyup.esc="closeVideoModal"
					tabindex="0"
				>
					<source :src="videoModalFile" type="video/mp4" />
				</video>
			</div>
		</transition>
	</section>
</template>

<script>
import SmartImage from '~/components/helper/smartimage';
import Button from '~/components/atoms/button/index.vue';
import Parallax from '~/components/_nuclides/parallax/index.vue';
import PinElement from '~/components/atoms/pin/index.vue';
import LaptopMockup from '~/assets/svg/hero-laptop.svg';
import LaptopMockupShadow from '~/assets/svg/hero-laptop-shadow.svg';
import Teaser from '~/components/molecules/teaser/index.vue';
import imgurl from '~/components/mixins/imgurl.js';
import SmartFlash from '~/components/helper/smartFlash/index.vue';
import CodeInserter from '~/components/organisms/code-inserter/index.vue';

export default {
	name: 'Sidekick',
	mixins: [imgurl],
	data() {
		return {
			inView: false,
			loaded: false,
			videoModalActive: false,
		};
	},
	components: {
		SmartImage,
		Button,
		PinElement,
		LaptopMockup,
		LaptopMockupShadow,
		Parallax,
		Teaser,
		SmartFlash,
		CodeInserter,
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
		// stack media over text
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
		padding-bottom: 55.25%; // add correct aspect ratio
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
			// image on left side
			padding-right: 2vw; // temp approximation
		}

		&.span6:last-child {
			// image on right side
			padding-left: 2vw; // temp approximation
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
