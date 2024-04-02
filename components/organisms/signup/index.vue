<template>
	<section class="signup-block">
		<div class="content-grid-container">
			<div class="span-container">
				<div class="span12 span4--mobile">
					<div class="signup-block__inner">
						<SignupForm type="inline" v-if="data.acf_fc_layout === 'signup'">
							<div slot="teaser">
								<Teaser :data="{ heading: data.heading, text: data.subheading, alternate_headline: data.alternate_headline }" :class="'teaser--fluid'" :positionOnPage="positionOnPage" />
							</div>
							<div slot="terms" v-if="data.terms" class="signup-block__conditions" v-html="data.terms" />
						</SignupForm>

						<NewsletterSignup v-else-if="data.acf_fc_layout === 'newsletter'">
							<slot>
								<Teaser :data="{ heading: data.heading, text: data.subheading }" :class="'teaser--fluid'" :positionOnPage="positionOnPage" />
							</slot>
						</NewsletterSignup>
					</div>
					<div v-if="data.terms && data.acf_fc_layout === 'newsletter'" class="signup-block__conditions" v-html="data.terms" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Button from '~/components/atoms/button/index.vue';
import Input from '~/components/atoms/input/index.vue';
import SignupForm from '~/components/organisms/signup-account/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';
import NewsletterSignup from '~/components/organisms/newsletter/index.vue';
import langstring from '~/components/mixins/langstring.js';

export default {
	name: 'SignupBlock',
	mixins: [langstring],
	components: {
		Button,
		Input,
		SignupForm,
		Teaser,
		NewsletterSignup,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.signup-block {
	.teaser {
		&__text {
			&:last-child {
				margin-bottom: 2em;
			}
		}
	}
}
</style>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.signup-block {
	color: $white;
	margin-top: 20px;
	text-align: center;

	&__inner {
		@include media('desktop-1400-ab') {
			margin: 0 auto;
			max-width: 1050px;
		}
	}

	&__title {
		margin-bottom: 12px;
	}

	&__text {
		font-weight: 300;
		margin-bottom: 30px;
	}

	&__conditions {
		@extend %text-checklist;
		margin-top: 30px;
		opacity: 0.5;
	}

	&.test {
		padding: 50px 20px;
	}
}
</style>

<!-- <docs>
```jsx
<SignupBlock :data="{
	heading: 'Opret dig nu - Gratis i ubegrænset tid',
	subheading: 'Tager 2 minutter og Ingen kreditkort krævet, prøv alle features og programmet',
}"></SignupBlock>
```
</docs> -->
