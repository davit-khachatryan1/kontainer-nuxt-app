<template>
	<div :class="['whitelabel', 'layout--'+whitelabel.featured_layout]">
		<Teaser :class="'whitelabel__info'" :data="whitelabel" />

		<smart-image
			class="whitelabel__logo"
			v-if="whitelabel.resource.custom.kard_image.logo"
			:image="whitelabel.resource.custom.kard_image.logo"
			nocrop
		/>
		<div class="whitelabel__image whitelabel__image--1">
			<Parallax>
				<div class="whitelabel__image__shadow"></div>
				<div class="whitelabel__image__browser-bar"></div>
				<div class="whitelabel__image__browser-body">
					<smart-image
						:image="whitelabel.resource.custom.featured_image_1"
						nocrop
					/>
				</div>
			</Parallax>
		</div>
		<div class="whitelabel__image whitelabel__image--2">
			<Parallax :speed=".8">
				<div class="whitelabel__image__shadow"></div>
				<div class="whitelabel__image__browser-bar"></div>
				<div class="whitelabel__image__browser-body">
					<smart-image
						:image="whitelabel.resource.custom.featured_image_2"
						nocrop
					/>
				</div>
			</Parallax>
		</div>
	</div>
</template>

<script>
import SmartImage from '~/components/helper/smartimage/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';
import { useImgUrl } from '~/components/composables/useImgUrl';

import Parallax from '~/components/_nuclides/parallax/index.vue';

export default {
	name: 'WhitelabelComponent',
	components: {
		SmartImage,
		Teaser,
		Parallax,
	},
	setup() {
		const { imgUrl } = useImgUrl()
		return { imgUrl };
  	},
	props: {
		whitelabel: { type: Object },
	},
	computed: {},
	methods: {},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
$imgWidth: 40vw;

img {
	display: block;
	width: 100%;
	height: auto;
	object-fit: cover;
}

.whitelabel {
	$logo: '';
	$img1: '';
	$img2: '';
	$teaser: '';
	$topbarHeight: 40px;

	position: relative;

	@include media('mobile-ab') {
		padding-bottom: 55vw;
	}

	&__info {
		$teaser: &;
		position: absolute;
		width: $imgWidth * 0.85;

		@include media('mobile') {
			position: relative;
			width: 100%;
			margin-bottom: 20px;
		}
	}

	&__image {
		position: absolute;
		width: $imgWidth;
		max-height: 80vh;

		@include media('mobile') {
			position: relative;
			width: $imgWidth * 1.25;
		}

		&__shadow {
			@include inner-shadow;
			width: $imgWidth;
			max-height: 80vh;
		}

		&__browser {
			&-body {
				border-radius: 0 0 6px 6px;
				overflow: hidden;
			}

			&-bar {
				position: relative;
				height: $topbarHeight;
				border-radius: 6px 6px 0 0;
				overflow: hidden;

				@include media('tablet-sm') {
					height: $topbarHeight * 0.5;
				}

				@include media('mobile') {
					display: none;
				}

				&::before {
					content: '';
					height: 100%;
					width: 100%;
					background-color: $gray-alto;
					position: absolute;
					top: 0;
					left: 0;
				}

				&::after {
					content: '';
					position: absolute;
					height: $topbarHeight * 0.5;
					width: calc(100% - #{$topbarHeight * 2});
					top: $topbarHeight * 0.25;
					right: $topbarHeight * 0.25;
					z-index: z('default');
					background-color: $white;
					border-radius: 2px;

					@include media('tablet-sm') {
						height: $topbarHeight * 0.25;
						top: $topbarHeight * 0.125;
						right: $topbarHeight * 0.125;
					}
				}
			}
		}

		&--1 {
			$img1: &;
		}

		&--2 {
			$img2: &;

			@include media('mobile') {
				position: absolute;
				bottom: -20px;
				right: 0;
			}
		}
	}

	&__logo {
		$logo: &;
		position: absolute;
		max-width: 10vw;

		@include media('mobile') {
			position: absolute;
			bottom: -20px;
			left: 0;
			z-index: 3;
		}
	}

	@include media('mobile-ab') {
		&.layout {
			&--1 {
				#{$teaser} {
					top: 5vw;
					left: 0;
				}

				#{$logo} {
					right: 5vw;
					bottom: 10vh;
				}

				#{$img1} {
					right: 0;
					top: 0;
					z-index: z('whitelabelImg');
				}

				#{$img2} {
					right: 20vw;
					bottom: 0;
					z-index: z('default');
				}
			}

			&--2 {
				#{$teaser} {
					top: 6vw;
					right: 0;
				}

				#{$logo} {
					left: 5vw;
					bottom: 10vh;
				}

				#{$img1} {
					left: 0;
					top: 0;
					z-index: z('default');
				}

				#{$img2} {
					left: 30vw;
					bottom: 0;
					z-index: z('whitelabelImg');
				}
			}

			&--3 {
				#{$teaser} {
					top: 7vw;
					left: 0;
				}

				#{$logo} {
					left: 45vw;
					top: 0;
				}

				#{$img1} {
					right: 0;
					top: 5vw;
					z-index: z('whitelabelImg');
				}

				#{$img2} {
					left: 10vw;
					bottom: 0;
					z-index: z('default');
				}
			}
		}
	}
}
</style>

<style lang="scss">
@import "../../../assets/scss/import";
.whitelabel {
	&__info {
		.teaser {
			&__heading {
				@include responsive-font(2vw, 24px, 44px, 34px);
				font-weight: $type-light;
				line-height: 1.2;
			}

			&__text {
				@include responsive-font(1.1vw, 15px, 24px, 18px);
				line-height: 1.5;
			}
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
