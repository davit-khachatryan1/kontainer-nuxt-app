<template>
	<SmartLink v-if="(kard.resource && kard.resource.slug) || kard.link.slug"
		v-bind="prepLink(kard.resource || kard.link)" :class="['link', 'kard']">
		<div class="kard__banner">
			<SmartImage :image="kard.resource ? kard.resource.custom.kard_image.image : kard.image"
				:sizes="['resource_thumbnail']" nocrop />
			<template v-if="kard.resource && kard.resource.custom.kard_image.logo">
				<div class="kard__banner__overlay"></div>
				<SmartImage class="kard__banner__logo" :image="kard.resource.custom.kard_image.logo"
					:sizes="['resource_thumbnail']" nocrop />
			</template>
		</div>
		<div class="kard__info">
			<!-- <div class="kard__info__skew-elm"></div> -->
			<p class="kard__info__date" v-if="kard.resource && kard.resource.date && kard.resource.type === 'news'">
				{{ convertDate(kard.resource.date) }}
			</p>
			<h3 class="kard__info__title"
				v-if="(kard.resource && kard.resource.custom.kard_info.heading) || kard.heading">
				{{ kard.resource ? kard.resource.custom.kard_info.heading : kard.heading }}
			</h3>
			<div v-if="kard.resource ? kard.resource.custom.kard_info.excerpt : kard.description"
				class="kard__info__excerpt"
				v-html="kard.resource ? kard.resource.custom.kard_info.excerpt : kard.description" />
			<div class="kard__info__button">
				<div class="text">{{ langString('_learn_more', 'learn more') }}</div>
				<linkArrow />
			</div>
		</div>
	</SmartLink>
</template>

<script>
import SmartImage from '~/components/helper/smartimage/index.vue';
import preplink from '~/components/mixins/preplink.js';
import langstring from '~/components/mixins/langstring.js';
import imgurl from '~/components/mixins/imgurl.js';
import ButtonComponent from '~/components/atoms/button/index.vue';
import linkArrow from '~/assets/svg/link-arrow.svg';
import SmartLink from '../../helper/smartlink/index.vue';
import useStore from '@/store'


export default {
	name: 'kardInverted',
	mixins: [langstring, imgurl, preplink],
	components: {
		SmartLink,
		SmartImage,
		ButtonComponent,
		linkArrow,
	},
	props: {
		kard: { type: Object },
	},
	computed: {},
	methods: {
		convertDate(string) {
			const store = useStore();
			let format;
			const date = new Date(string);
			const options = {
				weekday: 'short',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			};
			if (store.locale === 'da') {
				format = 'da-DK';
			} else {
				format = 'en-US';
			}
			const dateString = date.toLocaleDateString(format, options);
			return dateString;
		},
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";

img {
	display: block;
	width: 100%;
	height: auto;
}

.kard {
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	margin-bottom: 30px;
	background-color: $white;
	text-decoration: none;
	transition: transform 0.2s ease-in, box-shadow 0.2s ease-in;
	box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);

	$banner: '';
	$info: '';
	$excerpt: '';
	$button: '';

	&__banner {
		position: relative;
		transition: transform 0.2s ease-in;
		max-height: 20vh;
		overflow: hidden;

		$banner: &;

		.kard:hover & {
			@include media('tablet-ab') {
				transform: scale(1.05, 1.05);
			}
		}

		::v-deep(img) {
			transition: opacity .3s .2s ease, transform .3s ease !important;
		}
		

		&__logo {
			position: absolute;
			z-index: z('default');
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 40%;
		}

		&__overlay {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
		}

		&::before {
			transition: height 0.2s ease-in, transform 0.2s ease-in;
			content: '';
			display: block;
			width: 102%;
			padding: 50px;
			background: $white;
			background-color: transparent;
			position: absolute;
			left: 0;
			bottom: -150px;
			transform: translate(-7.2%, -50%) rotate(-2deg);
			transform-origin: 0 0;
			background-color: $white;
			z-index: 1;

			@include media('mobile') {
				bottom: -130px;
			}
		}

		.kard:hover &::before {
			@include media('tablet-ab') {
				width: calc(102% + 7.2%);
				transform: translate(-7.2%, -50%) rotate(-4deg);
			}
		}
	}

	&__info {
		position: relative;
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		padding: 30px;
		transition: transform 0.2s ease-in;
		background: $white;

		$info: &;

		@include media('mobile') {
			padding: 20px;
		}

		.kard:hover & {
			@include media('tablet-ab') {
				transform: translateY(-10px);
			}
		}

		&__date {
			@extend %text-date;
			color: rgba($black, 0.5);
			letter-spacing: 1px;
			margin-bottom: 12px;
			z-index: 1;
		}

		&__title {
			@extend %text-h3;
			margin-bottom: 10px;
			z-index: 1;
			font-weight: 500;
			font-size: 22px;
			line-height: 34px;

			@include media('mobile') {
				margin-bottom: 0;
			}
		}

		&__excerpt {
			$excerpt: &;

			@extend %text-paragraph3;
			flex: 1 1 auto;
			z-index: 1;

			@include media('mobile') {
				margin-bottom: 0;
			}
		}

		&__button {
			$button: &;

			position: absolute;
			bottom: 0;
			right: 0;
			height: 42px;
			display: inline-flex;
			background-color: $brand-green;
			padding: 0 10px;
			transition: border 0.12s ease-in, margin 0.2s ease-in, width 0.2s ease-in,
				transform 0.2s ease-in;
			align-items: center;
			z-index: 10;

			.text {
				text-align: right;
				max-width: 0px;
				opacity: 0;
				overflow: hidden;
				white-space: nowrap;
				transition: opacity .2s ease, max-width .2s ease, margin-right .2s ease;
				font-size: 12px;
				font-weight: 500;
				letter-spacing: 2.57px;
				text-transform: uppercase;
				margin-right: 0px;
			}

			svg {
				fill: $text-color;
			}
		}
	}

	&--link {
		#{$info} {
			padding-bottom: 30px;
		}
	}

	&:hover {
		cursor: pointer;
		z-index: 2;
		box-shadow: 0 5px 15px 0 rgba($black, 0);

		#{$banner} {
			::v-deep(.inlineimage) {
				transform: scale(1.2);
			}
		}

		#{$button} {
			.text {
				max-width: 200px;
				margin-right: 4px;
				opacity: 1;
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
