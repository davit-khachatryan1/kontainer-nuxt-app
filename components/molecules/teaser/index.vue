<template>
	<div class="teaser">
		<div class="teaser__tagline" v-if="data.tagline" v-html="data.tagline" />

		<h1
			v-if="positionOnPage === 0 && data.heading"
			v-html="data.heading"
			:class="
				data.alternate_headline
					? 'teaser__heading-alternate'
					: 'teaser__heading'
			"
		/>
		<h2
			v-if="positionOnPage !== 0 && data.heading"
			v-html="data.heading"
			:class="
				data.alternate_headline
					? 'teaser__heading-alternate'
					: 'teaser__heading'
			"
		/>

		<slot></slot>
		<div class="teaser__text" v-if="data.text" v-html="data.text"></div>
		<div class="teaser__byline" v-if="data.byline" v-html="data.byline"></div>

		<div v-if="hero" :class="{ 'multiple-buttons': data.button_2_enable }">
			<Button
				hasFunction="true"
				@func="emitToParent(data.button_1.button_file)"
				:type="1"
				v-if="data.button_1.button_text && data.button_1.button_type === 'cta'"
				>{{ data.button_1.button_text }}</Button
			>
			<Button
				:link="prepareLink(data.button_1.button_url)"
				:type="data.button_1.button_type"
				v-else-if="data.button_1.button_text"
				>{{ data.button_1.button_text }}</Button
			>

			<Button
				:link="prepareLink(data.button_2.button_url)"
				:type="data.button_2.button_type"
				v-if="data.button_2.button_text && data.button_2_enable"
				>{{ data.button_2.button_text }}</Button
			>
		</div>
		<div v-if="sidekick && data.button_1">
			<Button
				hasFunction="true"
				@func="emitToParent(data.button_1.button_file)"
				:type="1"
				v-if="data.button_1.button_text && data.button_1.button_type === 'cta'"
				>{{ data.button_1.button_text }}</Button
			>
		</div>
		<template v-else>
			<Button
				:link="data.button_url"
				:target="data.button_url.target"
				:type="data.button_type"
				v-if="data.button_text"
				>{{ data.button_text }}</Button
			>
		</template>
	</div>
</template>

<script>
import Button from '~/components/atoms/button/index.vue';
import { prepareWPObjectsToLinks } from '~/components/helper/smartlink/index.vue';

export default {
	name: 'Teaser',
	props: {
		data: { type: Object },
		positionOnPage: { type: Number, default: 99 },
		hero: { type: Boolean },
		sidekick: { type: Boolean },
	},
	components: {
		Button,
	},
	methods: {
		prepareLink(link) {
			return prepareWPObjectsToLinks(link);
		},
		emitToParent(url) {
			this.$emit('openVideoModal', url);
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.teaser {
	$heading: '';
	$text: '';
	$tagline: '';
	$byline: '';

	> * {
		opacity: 1;
		transform: translate(0, 0);

		@for $i from 1 through 5 {
			&:nth-child(#{$i}) {
				transition: opacity 0.2s #{($i * 0.1)}s $easeInOut,
					transform 0.2s #{($i * 0.1)}s $easeInOut, color 0.3s 0 ease;
			}
		}

		.animate-enter & {
			opacity: 0;
			transform: translate(0, -$transformAnimationDistance);
		}
	}

	&__tagline {
		$tagline: &;
		@extend %text-detail;
		margin-bottom: 20px;
		color: $label-color;

		@include media('desktop-1400-ab') {
			font-size: 16px;
			line-height: 16px;
		}

		a {
			text-decoration: none;
		}
	}

	&__heading {
		@extend %text-h1;
		margin-bottom: 15px;

		$heading: &;

		@include media('desktop-1400-ab') {
			font-size: 58px;
			line-height: 68px;
		}

		a {
			text-decoration: none;
		}
	}

	&__heading-alternate {
		@extend %text-alternative-h1;
		margin-bottom: 15px;

		a {
			text-decoration: none;
		}
	}

	&__text {
		@extend %text-paragraph1;
		margin-bottom: 34px;

		@include media('desktop-1400-ab') {
			font-size: 22px;
			line-height: 36px;
		}

		&:last-child {
			margin-bottom: 0;
		}

		$text: &;

		a {
			text-decoration: none;
			color: $brand-green;
			font-weight: 500;
		}

		ol,
		ul {
			list-style: inherit;
			padding-left: 22px;
		}
		ol {
			list-style-type: number;
		}

		blockquote {
			margin-left: 20px;
			font-style: italic;
		}
	}

	&__byline {
		$byline: &;
		@extend %text-paragraph2;
		font-weight: $type-regular;
		margin-bottom: 35px;

		&:last-child {
			margin-bottom: 0;
		}

		a {
			text-decoration: none;
		}
	}

	&--large {
		#{$heading} {
			@extend %text-hero;
			line-height: 1.1;
			margin-bottom: 0.5em;
			@include responsive-font(3.85vw, 30px, 62px, 55px);

			@media (max-height: 650px) {
				font-size: 36px;
			}

			@media (max-height: 800px) and (min-height: 600px) {
				font-size: 40px;
			}

			@media (min-aspect-ratio: 2/1) and (min-width: 1025px) and (min-height: 651px) {
				font-size: 6vh;
			}
		}

		#{$text} {
			@extend %text-paragraph1;
			@include responsive-font(1.4vw, 16px, 22px, 20px);
			line-height: 1.6;
			margin-bottom: 2em;

			@media (max-height: 650px) {
				font-size: 16px;
			}

			@media (min-aspect-ratio: 2/1) and (min-width: 1025px) and (min-height: 651px) {
				font-size: 2.5vh;
			}

			@media (max-height: 800px) {
				margin-bottom: 1rem;
			}
		}

		.btn {
			@extend %text-button-large;
			@include responsive-font(0.84vw, 12px, 16px, 14px);
			line-height: 1.4;
			height: auto;
			padding: 1.5em 4.5em;
			border-radius: 3em;

			@media (max-height: 650px) {
				font-size: 14px;
			}

			@include media('mobile-sm') {
				padding: 1.5em 1.5em;
			}
		}
	}

	&--fluid {
		#{$heading} {
			@extend %text-hero;
			line-height: 1.1;
			margin-bottom: 0.5em;
			@include responsive-font(3.45vw, 30px, 62px, 50px);
		}

		#{$text} {
			@extend %text-paragraph1;
			@include responsive-font(1.26vw, 14px, 22px, 18px);
			line-height: 1.6;
			margin-bottom: 2em;

			&:last-child {
				margin-bottom: 0;
			}
		}

		#{$tagline} {
			@extend %text-detail;
			@include responsive-font(0.9vw, 10px, 16px, 13px);
			margin-bottom: 1.5em;
		}

		#{$byline} {
			@extend %text-paragraph2;
			@include responsive-font(1.12vw, 14px, 20px, 16px);
			font-weight: $type-regular;
			margin-bottom: 2.18em;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.btn {
			@extend %text-button;
			@include responsive-font(0.84vw, 12px, 16px, 14px);
			line-height: 1.4;
			height: auto;
			padding: 1.5em 4.5em;
		}
	}

	&--center {
		text-align: center;
	}

	&.hero__right {
		@include media('tablet-sm-ab') {
			.btn,
			[class^='teaser'] {
				display: none;
			}
		}
	}

	.demo-teaser & {
		border-bottom: 1px solid $gray-alto2;
		margin-bottom: 30px;
		padding-bottom: 30px;

		&:last-child {
			border: 0;
			margin-bottom: 0;
			padding-bottom: 0;
		}
	}

	.multiple-buttons {
		.btn {
			padding: 1.5em 3em;

			&:first-child {
				margin: 0 20px 20px 0;
			}

			@media (max-height: 650px) {
				font-size: 11px;
				padding: 1.5em 2em;

				&:first-child {
					margin: 0 10px 20px 0;
				}
			}
		}
	}
}
</style>

<!-- <docs>
```jsx
<div class="demo-teaser">
<Teaser :data="{
	heading: 'Personlig support altid tilgængelig',
	manchet: 'Vi garanterer ipsum dolor sit amet, consectetur adipis cing elit sed do eiusmod tempor incididunt terer ipsum dolor sit amet, consectetu adipis',
	byline: 'Jesper Sandberg / CEO, Kontainer',
	button_url: '#',
	button_type: 3,
	button_text: 'Læs mere',
}" />
<Teaser :data="{
	heading: 'Organiser dine filer og billeder online',
	manchet: 'Kontainer er et online mediebibliotek der nemt lader dig organisere, arkivere og dele filer, billeder og videomateriale',
	button_url: '#',
	button_type: 3,
	button_text: 'Opret en gratis demo',
}" />
<Teaser :data="{
	tagline: 'Ingen bekymringer',
	heading: 'Hold dine billeder sikret',
	manchet: 'Leave your security-worries with us. Everything is backed up automatically and kept safe by Amazon - the biggest cloud provider in liro hexitum oktobu larem dor lire de.',
	button_url: '#',
	button_type: 2,
	button_text: 'Læs mere',
}" />
</div>
```
</docs> -->
