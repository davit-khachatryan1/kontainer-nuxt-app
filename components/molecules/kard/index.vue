<template>
	<smart-link v-if="(kard.resource && kard.resource.slug) || kard.link.slug" v-bind="prepLink(kard.resource || kard.link)" :class="['link', 'kard']">
		<div class="kard__banner">
			<smart-image
				:image="kard.resource ? kard.resource.custom.kard_image.image : kard.image"
				:sizes="['resource_thumbnail']"
				nocrop
			/>
			<template v-if="kard.resource && kard.resource.custom.kard_image.logo">
				<div class="kard__banner__overlay"></div>
				<smart-image
					class="kard__banner__logo"
					:image="kard.resource.custom.kard_image.logo"
					:sizes="['resource_thumbnail']"
					nocrop
				/>
			</template>
		</div>
		<div class="kard__info">
			<p class="kard__info__date" v-if="kard.resource && kard.resource.date && kard.resource.type === 'news'">
				{{convertDate(kard.resource.date)}}
			</p>
			<h3 class="kard__info__title" v-if="(kard.resource && kard.resource.custom.kard_info.heading) || kard.heading">
				{{kard.resource ? kard.resource.custom.kard_info.heading : kard.heading}}
			</h3>
			<div
				v-if="kard.resource ? kard.resource.custom.kard_info.excerpt : kard.description"
				class="kard__info__excerpt"
				v-html="kard.resource ? kard.resource.custom.kard_info.excerpt : kard.description"
			/>
		</div>
		<div class="kard__button">
			<ButtonComponent :link="prepLink(kard.resource || kard.link)" :type="'outline'">{{langString('_read_more', 'read more')}}</ButtonComponent>
		</div>
	</smart-link>
</template>

<script>
const SmartImage = defineAsyncComponent(() => import('~/components/helper/smartimage/index.vue'));
const ButtonComponent = defineAsyncComponent(() => import('~/components/atoms/button/index.vue'));
const SmartLink = defineAsyncComponent(() => import('../../helper/smartlink/index.vue'));
import useStore from '@/store'
import { usePrepLink } from '~/components/composables/usePrepLink';
import { useImgUrl } from '~/components/composables/useImgUrl';
import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'NewsKardComponent',
	setup() {
		const { prepLink } = usePrepLink()
		const { imgUrl } = useImgUrl()
		const { langString } = useLangString()
		return { langString, imgUrl, prepLink };
  	},
	components: {
		SmartLink,
		SmartImage,
		ButtonComponent,
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
	@include inner-shadow('bottom');
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	margin-bottom: 30px;
	background-color: $white;
	text-decoration: none;

	$banner: '';
	$info: '';
	$excerpt: '';
	$button: '';

	&::before {
		box-shadow: 0 11px 55px 12px rgba($black, 0);
	}

	&__banner {
		position: relative;
		transition: transform 0.2s ease-in;
		max-height: 300px;
		overflow: hidden;

		$banner: &;

		.kard:hover & {
			@include media('tablet-ab') {
				transform: scale(1.05, 1.05);
			}
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
	}

	&__info {
		position: relative;
		overflow: hidden;
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 30px 30px 85px;
		transition: transform 0.2s ease-in;

		$info: &;

		@include media('mobile') {
			padding: 20px;
		}

		.kard:hover & {
			@include media('tablet-ab') {
				transform: translateY(-10px);
			}
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
			top: 50px;
			transform: translate(-7.2%, -50%) rotate(-2deg);
			transform-origin: 0 0;
			background-color: $white;

			@include media('mobile') {
				top: 30px;
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
		padding: 30px 30px 85px;
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
			margin-bottom: 20px;
			z-index: 1;

			@include media('mobile') {
				margin-bottom: 0;
			}
		}

		&__excerpt {
			$excerpt: &;

			@extend %text-paragraph3;
			flex: 1 1 auto;
			margin-bottom: 20px;
			z-index: 1;

			@include media('mobile') {
				margin-bottom: 0;
			}
		}
	}

	&__button {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		margin-bottom: 30px;
		display: inline-block;
		border-radius: 28px;
		border: 0px solid $yellow-dark;
		padding: 0 30px;
		transition: border 0.12s ease-in, margin 0.2s ease-in, width 0.2s ease-in,
			transform 0.2s ease-in;
		$button: &;

		@include media('mobile') {
			display: none;
		}

		.btn {
			border-radius: 28px;
		}
	}

	&--link {
		#{$info} {
			padding-bottom: 30px;
		}

		#{$button} {
			display: none;
		}
	}

	&:hover {
		cursor: pointer;

		&::before {
			box-shadow: 0 11px 55px 12px rgba($black, .16);
		}

		#{$banner} {
			::v-deep(.inlineimage) {
				transform: scale(1.2);
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
