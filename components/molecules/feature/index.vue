<template>
	<div class="feature">
		<div class="feature__icon">
			<NuxtImg loading="lazy" v-if="feature.icon && feature.icon.url" :src="feature.icon.url" :alt="feature.icon.alt" />
		</div>
		<h3 :class="titleStyle" v-html="feature.heading" />
		<div class="feature__subtitle" v-if="feature.subheading" v-html="feature.subheading" />
		<div class="feature__description" v-html="feature.description" />
		<div class="feature__button" v-if="hasButton">
			<template v-if="feature.button_type === 'caret'">
				<ButtonComponent :link="prepLink(feature.button_url)" :type="feature.button_type" :iconName="feature.button_type" :iconComponent="'IconCaret'">{{feature.button_text}}</ButtonComponent>
			</template>
			<template v-else>
				<ButtonComponent :link="prepLink(feature.button_url)" :type="feature.button_type">{{feature.button_text}}</ButtonComponent>
			</template>
		</div>
	</div>
</template>

<script>
const ButtonComponent = defineAsyncComponent(() => import('~/components/atoms/button/index.vue'));
import { usePrepLink } from '~/components/composables/usePrepLink';
export default {
	name: 'FeatureComponent',
	components: {
		ButtonComponent,
	},
	setup() {
		const { prepLink } = usePrepLink()
		return { prepLink };
  	},
	props: {
		feature: { type: Object },
	},
	computed: {
		hasButton() {
			return this.feature.button_text && this.feature.button_url;
		},
		titleStyle() {
			return this.feature.alternate_headline ? 'feature__alternate-title' : 'feature__title';
		}
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.feature {
	$title: '';
	$description: '';

	display: flex;
	flex-direction: column;
	margin: 0 1vw 60px;

	text-align: center;

	&__icon {
		width: 70px;
		height: 70px;
		margin: 0 auto 18px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	img {
		display: block;
		max-width: 70px;
		height: auto;
	}

	%title-shared {
		margin-bottom: 20px;

		a {
			text-decoration: none;
		}
	}

	&__title {
		$title: &;
		@extend %text-h4;
		@extend %title-shared;
		font-size: 22px;

		@include media('desktop-1440-ab') {
			@include responsive-font(1.6vw, 22px, 28px, 20px);
		}
	}

	&__alternate-title {
		$title: &;
		@extend %text-alternate-h4;
		@extend %title-shared;
	}

	&__subtitle {
		@extend %text-paragraph1;
		font-weight: $type-regular;
		margin: 20px 0;
		font-size: 14px;

		@include media('desktop-1440-ab') {
			@include responsive-font(1vw, 14px, 18px, 20px);
		}

		a {
			text-decoration: none;
		}
	}

	&__description {
		$description: &;
		@extend %text-paragraph3;
		font-size: 14px;

		@include media('desktop-1440-ab') {
			@include responsive-font(1vw, 14px, 18px, 20px);
		}

		a {
			text-decoration: none;
		}
	}

	&__button {
		flex: 1 1 auto;
		align-items: flex-end;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;

		margin-top: 25px;

		@include media('desktop-1440-ab') {
			@include responsive-font(1vw, 14px, 18px, 20px);
		}
	}

	&--single {
		align-items: center;
		margin-bottom: 0;
		padding: 0;

		#{$title} {
			@extend %text-h2;
			max-width: 600px;
			margin-top: 30px;
		}

		#{$description} {
			@extend %text-paragraph1;
			max-width: 800px;
		}
	}

	&--column {
		margin-bottom: 0;

		&:not(:first-of-type) {
			padding-top: 100px;

			@include media('mobile') {
				padding-top: 50px;
			}
		}

		&:not(:last-of-type) {
			position: relative;
			padding-bottom: 100px;

			@include media('mobile') {
				padding-bottom: 50px;
			}

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				width: 100vw;
				height: 1px;
				transform-origin: center;
				background-color: rgba($gray-dusty, 0.25);
			}

			&:nth-child(even) {
				&::after {
					transform: translateX(-50%) rotate(-2deg);
				}
			}

			&:nth-child(odd) {
				&::after {
					transform: translateX(-50%) rotate(2deg);
				}
			}
		}
	}
}
</style>

<!-- <docs>
```jsx
<div>
	<FeatureComponent :feature="{
		'icon': {
			'url': 'https://nextweb.kontainer.com/content//2018/06/touch.svg',
		},
		'heading': 'Sikker deling',
		'description': 'Never again send emails with heavy image attachments. Share files with whom you want and create a Public media gallery.',
		'button_text': 'Læs mere',
		'button_url': {
			'slug': 'pricing',
			'type': 'page',
			'title': 'Pricing',
		},
		'button_style': 'outline'
	}" />
</div>
```
</docs> -->
