<template>
	<section class="signup-account" ref="signupAccount">
		<button class="form-close" :key="'close'" @click="close">{{ langString('_close') }}</button>
		<FormComponent :type="type" ref="form" :style="{ minHeight: height }">
			<slot>
				<transition name="form-step-animation" mode="out-in">
					<div>
						<div v-if="step === 1" :key="step" class="form-step-active">
							<div class="fieldset">
								<div class="form__group">
									<h2>{{ langString('_contact_account_modal_title') }}</h2>
									<p>{{ langString('_contact_account_modal_desc') }}</p>
								</div>
								<div class="form__group">
									<Input :key="'name'" type="text" name="name" v-model="registration.name"
										v-validate="'required|alpha_spaces_dash'"
										:valid="fields.name && fields.name.valid" :errorMessage="errors.first('name')"
										:placeholder="langString('_name')" iconName="user" iconComponent="IconUser"
										:class="['form__element--gray']" :required="true" />
									<Input :key="'company'" type="text" name="company" v-model="registration.company"
										:errorMessage="errors.first('company')" :placeholder="langString('_company')"
										iconName="company" iconComponent="IconCompany"
										:class="['form__element--gray']" />
									<Input :key="'email'" type="text" name="email" v-model="registration.email"
										v-validate="'required|email'" :valid="fields.email && fields.email.valid"
										:errorMessage="errors.first('email')" :placeholder="langString('_e-mail')"
										iconName="email" iconComponent="IconEmail" :class="['form__element--gray']"
										:required="true" />
									<Textarea :key="'message'" name="message" v-model="registration.message"
										:errorMessage="errors.first('message')"
										:valid="fields.message && fields.message.valid"
										:placeholder="langString('_contact_account_modal_message')"
										class="contact-message"></Textarea>
								</div>
							</div>

							<div class="form__element" :key="'action'">
								<Button hasFunction="true" @func="submit" icon="arrow"
									:class="['btn--price', 'btn--price-free']">
									<template>{{ langString('_contact_account_modal_send') }}</template>
								</Button>
							</div>

							<slot name="terms">
								<div class="conditions"
									v-html="langString('_by_clicking_next_you_accept_the_<a href=\'#\'>terms_and_conditions</a>')" />
							</slot>
						</div>
						<div v-if="step === 2" :key="step" class="form-step-active success">
							<div>
								<h2>{{ langString('_contact_account_modal_receipt_title') }}</h2>
								<p>{{ langString('_contact_account_modal_receipt_desc') }}</p>
							</div>
						</div>
					</div>
				</transition>
			</slot>
		</FormComponent>
	</section>
</template>

<script>
import FormComponent from '~/components/molecules/form/index.vue';
import Button from '~/components/atoms/button/index.vue';
import Input from '~/components/atoms/input/index.vue';
import axios from '~/plugins/axios';
import { useLangString } from '~/components/composables/useLangString';
import SmartImage from '~/components/helper/smartimage/index.vue';
import Textarea from '~/components/atoms/textarea/index.vue';
import useStore from '@/store'
import { useRoute } from 'vue-router'

export default {
	components: {
		FormComponent,
		Button,
		Input,
		SmartImage,
		Textarea,
	},
	props: {
		data: { type: Object },
		type: { type: String },
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	/* eslint-disable */
	data() {
		return {
			registration: {
				name: '',
				email: '',
				company: '',
				message: '',
			},
			hostStatus: null,
			hostError: null,
			kontainerPackage: null,
			step: 1,
			height: null,
			closed: false,
		};
	},
	methods: {
		prev() {
			this.step -= 1;
		},
		next() {
			const dimentions = this.$refs.signupAccount.getBoundingClientRect();
			this.height = `${dimentions.height}px`;
			this.step += 1;
		},
		close() {
			if (!this.closed) {
				this.closed = true;

				if (window.history.length) {
					this.$router.go(-1);
				}

				this.$router.push('/');
			}
		},
		submit() {
			this.$validator.validate().then((result) => {
				if (result) {
					this.handleSubmit();
				}
			});
		},
		handleSubmit() {
			const route = useRoute()
			if (
				this.registration.name &&
				this.registration.email &&
				route.query.kontainer
			) {
				this.addToHubSpot(this.registration);
				axios
					.post('/api/signupcontactform', {
						name: this.registration.name,
						email: this.registration.email,
						company: this.registration.company,
						message: this.registration.message,
						package: route.query.kontainer,
					})
					.then(() => {
						this.success();
					})
					.catch(() => {
						console.warn('Contact form failed');
						// What to do on error
					});
			}
		},
		success() {
			this.next();

			setTimeout(() => {
				this.close();
			}, 5000);
		},

		addToHubSpot(registrationData) {
			const store = useStore();
			var data = {
				fields: [
					{
						name: "email",
						value: registrationData.email
					},
					{
						name: "firstname",
						value: registrationData.name
					},
					{
						name: "company",
						value: registrationData.company
					},
					{
						name: "message",
						value: registrationData.message
					}
				],
			}


			var formId = "483de21d-25d6-4642-aefa-74d87af073f9";
			if (store.locale === 'en') {
				formId = "39b4e5ba-4390-4df3-93ad-343fdb7cdd85";
			} else if (store.locale === 'de') {
				formId = "1750678b-b6ae-4c7d-a31a-e9f3b3e7d0d3";
			}

			var hutk = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // Get hubspot cookie
			if (hutk) {
				data.context = {
					hutk: hutk, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
					pageUri: `www.kontainer.com/${store.locale}/register`,
					pageName: "Register modal"
				}
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			axios.post(
				`https://api.hsforms.com/submissions/v3/integration/submit/25539371/${formId}`,
				data,
				config
			)
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";

.conditions {
	a {
		color: $brand-green;
		font-weight: 500;
	}
}

.form-step-active {
	max-width: 100%;
	width: 100%;
}

.form-step-animation {
	&-leave-active {
		transition: all 300ms ease-out;
	}

	&-enter-active {
		transition: all 500ms ease-out;
	}

	&-leave-to {
		opacity: 0;
	}

	&-enter {
		.form__group {
			transform: translateX(50px);
			opacity: 0;
		}
	}
}
</style>

<style lang="scss" scoped>
@import "../../../assets/scss/import";

button {
	min-width: 100%;
	cursor: pointer;

	@include media('mobile-ab') {
		margin: 30px 0 10px;
		min-width: 300px;
	}

	&:focus {
		outline: 0;
	}
}

.input-animation {

	&-enter,
	&-leave-to {
		transform: translateX(50px);
		opacity: 0;
		transition: all 1s ease 0.3s;
	}

	&-enter-active,
	&-leave-active {
		transform: translate(0);
		opacity: 1;
	}
}

.form-close {
	position: absolute;
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

	@include media('mobile-sm') {
		right: 0;
	}

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

.signup-account {
	background-color: $gray-concrete;
	margin: 75px auto;
	max-width: 1050px;
	position: relative;

	@include media('mobile-sm') {
		background-color: transparent;
		margin: 0 0 75px;
	}
}

.contact-message {
	::v-deep(textarea) {
		max-width: 100%;
		min-width: 100%;
		min-height: 100px;
	}

	::v-deep(textarea+span) {
		width: calc(100% - 2px);
	}
}

.form {
	display: flex;
	margin: 0 auto;
	padding: 120px 133px;
	align-items: center;
	justify-content: center;

	@include media('desktop-1200') {
		padding: 80px 120px;
	}

	@include media('tablet') {
		padding: 80px 80px;
	}

	@include media('mobile') {
		padding: 80px 50px 50px;
	}

	@include media('mobile-sm') {
		padding: 80px 0 0;
	}

	&__element {
		transform: translateX(50px);
		opacity: 0;
		transition: all 1s ease 0.3s;
		margin-bottom: 20px;
	}

	&-step-active {
		.form__element {
			transform: translate(0);
			opacity: 1;
		}
	}

	.fieldset {
		display: flex;
		justify-content: space-between;
		text-align: start;

		@include media('tablet-sm') {
			display: block;
		}
	}

	&__group {
		max-width: 50%;
		width: calc(100% - 20px);
		margin-bottom: 30px;

		&:nth-child(2) {
			max-width: calc(50% - 40px);
			;

			@include media('tablet-sm') {
				max-width: 100%;
			}
		}

		h2 {
			font-size: 32px;
			line-height: 42px;
			font-weight: 400;
		}

		p {
			@extend %text-paragraph3;
			margin-top: 30px;
			font-size: 18px;
			line-height: 26px;
		}

		@include media('tablet-sm') {
			width: 100%;
			max-width: 100%;
		}
	}
}

.form-go-back {
	position: absolute;
	top: 32px;
	left: 35px;

	width: 40px;
	height: 40px;
	min-width: 0;

	display: block;
	border: none;

	margin: 0;
	padding: 0;

	// transform: rotate(-135deg);

	text-indent: -9999px;
	opacity: 0.7;
	background-color: transparent;

	@include media('mobile') {
		position: absolute;
	}

	&::before {
		content: '';
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		background-color: transparent;
		vertical-align: middle;
		border-color: $black;
		box-sizing: border-box;
		width: 11px;
		height: 11px;
		border-width: 2px 0 0 2px;
		border-style: solid;
		min-width: 0;

		transform: translate3d(10px, 20px, 0) rotate(-45deg);
		transform-origin: 0 0;
	}

	&::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 1px;
		top: -1px;
		height: 2px;
		width: 20px;
		background-color: $black;

		transform: translate3d(10px, 20px, 0) rotate(0deg);
		transform-origin: 0 0;
	}
}

.success {
	h2 {
		@extend %text-h2;
		margin-bottom: 20px;
	}

	p {
		@extend %text-paragraph1;
	}
}

.conditions {
	margin-top: 40px;
	text-align: center;
	font-size: 14px;
	font-weight: 300;
}
</style>

<!-- <docs>
```jsx
<div>
</div>
```
</docs> -->
