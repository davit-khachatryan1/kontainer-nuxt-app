<template>
	<section :class="'signup-section'">
		<div class="content-grid-container">
			<div class="span-container">
				<div class="span6 span6--tablet span4--mobile sellingpoints">
					<h2 v-if="data.signup_left.heading">{{data.signup_left.heading}}</h2>
					<SellingpointComponent v-for="(sellingpoint, index) in data.signup_left.sellingpoints" :key="index" :sellingpoint="sellingpoint" />
				</div>
				<div class="span6 span6--tablet span4--mobile signup">
					<Parallax class="form-container">
						<SignupForm :type="'block'" :btn-submit-text="data.signup_right.submit_button_text">
							<template v-slot:teaser>
								<h2 v-if="data.signup_right.heading">{{data.signup_right.heading}}</h2>
								<p v-if="data.signup_right.text">{{data.signup_right.text}}</p>
							</template>
							<template v-slot:terms>
								<div class="terms" v-if="data.signup_right.terms" v-html="data.signup_right.terms" />
							</template>
						</SignupForm>
					</Parallax>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import ButtonComponent from '~/components/atoms/button/index.vue';
import SellingpointComponent from '~/components/molecules/sellingpoint/index.vue';
import FormComponent from '~/components/molecules/form/index.vue';
import InputComponent from '~/components/atoms/input/index.vue';
import SignupForm from '~/components/organisms/signup-account/index.vue';
import { useLangString } from '~/components/composables/useLangString';
import { usePrepLink } from '~/components/composables/usePrepLink';
import Parallax from '~/components/_nuclides/parallax/index.vue';

export default {
	name: 'SignupSection',
	components: {
		ButtonComponent,
		SellingpointComponent,
		FormComponent,
		InputComponent,
		SignupForm,
		Parallax,
	},
	setup() {
		const { prepLink } = usePrepLink()
		const { langString } = useLangString()
		return { langString, prepLink };
  	},
	props: {
		data: { type: Object },
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.signup {
	.signup-account {
		padding: 50px;
		background: $white;

		@include media('mobile') {
			padding-left: 0;
			padding-right: 0;
			background: transparent;
		}
	}

	.form--block {
		margin-bottom: 0;
	}
}
</style>

<style scoped lang="scss">
@import "../../../assets/scss/import";
$margin: 50px;
$boxWidth: 550px;

h2 {
	@extend %text-h2;
	margin-bottom: 8px;
}

.span-container {
	align-items: center;
	justify-content: center;
}

.signup {
	padding: $section-inner-padding 0;
	max-width: $boxWidth;
	padding-left: $margin;

	@include media('tablet') {
		padding-top: 0;
		padding-left: 0;
		margin-bottom: 80px;
	}

	@include media('mobile') {
		padding-left: 0;
		margin-bottom: 0;
	}
}

.form-container {
	text-align: center;
	position: relative;
	background: $white;

	@include media('mobile-ab') {
		@include inner-shadow('bottom');
	}

	@include media('tablet') {
		transform: none !important;
		background: transparent;
	}

	@include media('mobile') {
		top: 0 !important;
	}

	form {
		margin: $margin * 0.5 0;
	}

	p {
		@extend %text-paragraph1;
	}

	.form__element:last-of-type {
		margin-bottom: $margin * 0.75;
	}
}

.sellingpoints {
	max-width: $boxWidth;

	@include media('mobile-ab') {
		padding-right: $margin;
	}

	@include media('mobile') {
		display: none;
	}

	h2 {
		text-align: center;
		margin-bottom: $margin;
	}
}
</style>

<style lang="scss">
@import "../../../assets/scss/import";
.terms,
.terms a {
	@extend %text-footer-legal;
	font-size: 13px;
	color: rgba($black, 0.5);

	@include media('mobile') {
		color: $black;
	}
}

.terms a {
	color: $brand-green;
	font-weight: 500;
}
</style>

<!-- <docs>
```jsx
<SignupSection/ >
```
</docs> -->
