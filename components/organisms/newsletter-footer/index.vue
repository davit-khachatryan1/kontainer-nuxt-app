<template>
	<Form :class="{
		'js-cm-form': true,
		'hide-language': (step === 2),
	}" type="inline" action="https://kontainer.createsend.com/t/d/s/vhrjir/" method="post">
		<slot></slot>
		<transition name="form-step-animation" mode="out-in">
			<div>
				<div class="fieldset" v-if="step < 2">
					<slot name="footer-heading"></slot>
					<!-- <Input ref="email" name="email" type="text" :class="['js-cm-email-input', 'input-trigger']"
						v-model="newsletterInfo.email" v-validate="'required|email'"
						:valid="fields.email && fields.email.valid" :errorMessage="errors.first('email')"
						:placeholder="langString('_e-mail')" iconName="email" iconComponent="IconEmail"
						@click.native="step === 0 ? incrementStep() : ''" /> -->

					<!-- <transition name="fade">
						<Input name="name" type="text" v-model="newsletterInfo.name"
							v-validate="'required|alpha_spaces_dash'" :valid="fields.name && fields.name.valid"
							:errorMessage="errors.first('name')" :placeholder="langString('_name')" iconName="user"
							iconComponent="IconUser" v-if="step === 1" :key="0" />
					</transition> -->
					<transition name="fade">
						<div class="form__element" v-if="step === 1" :key="0">
							<Button hasFunction="true" @func="submit" :class="['js-cm-submit-button', 'button']">
								{{ langString('_sign_up') }}
							</Button>
						</div>
					</transition>
				</div>
				<div v-if="step === 2" :key="step" class="form__confirmation">
					<div class="checkmark"></div>
					<div class="form__confirmation__response">{{ langString('_thanks_for_signing_up_to_our_newsletter') }}
					</div>
				</div>
			</div>
		</transition>
	</Form>
</template>

<script>
import Button from '~/components/atoms/button/index.vue';
import Input from '~/components/atoms/input/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';
import Form from '~/components/molecules/form/index.vue';
import axios from '~/plugins/axios';
import qs from 'qs';
import langstring from '~/components/mixins/langstring';

export default {
	name: 'NewsletterSignup',
	mixins: [langstring],
	components: {
		Button,
		Input,
		Teaser,
		Form,
	},
	props: {
		data: { type: Object },
		type: { type: String },
	},
	computed: {},
	data() {
		return {
			transitionActive: false,
			newsletterInfo: {
				name: null,
				email: null,
			},
			step: 0,
		};
	},
	methods: {
		incrementStep() {
			if (!this.transitionActive) {
				this.step += 1;
				this.transitionActive = true;

				setTimeout(() => {
					this.transitionActive = false;
				}, 1000);
			}
		},
		cmCallback(data) {
			if (data.Status === 400) {
				console.warn(`Error: ${data.Message}`);
			} else {
				// 200
				console.warn(`Succes: ${data.Message}`);
			}
		},
		renameKeys(obj, newKeys) {
			const keyValues = Object.keys(obj).map((key) => {
				const newKey = newKeys[key] || key;
				return { [newKey]: obj[key] };
			});
			return Object.assign({}, ...keyValues);
		},
		submit() {
			this.$validator.validate().then((result) => {
				const newsletterData = this.newsletterInfo;
				const cmNames = { name: 'cm-name', email: 'cm-vhrjir-vhrjir' };
				const cmData = this.renameKeys(newsletterData, cmNames);

				if (result) {
					axios
						.post(
							'https://kontainer.createsend.com/t/d/s/vhrjir/?callback=cmCallback',
							qs.stringify(cmData),
						)
						.then((response) => {
							const responseJSON = JSON.parse(
								response.data.slice(11).slice(0, -1),
							);
							console.warn(responseJSON.Status);
							console.warn(response);

							if (responseJSON.Status === 200) {
								this.incrementStep();
								setTimeout(() => {
									this.step = 0;
									this.newsletterInfo.name = null;
									this.newsletterInfo.email = null;
								}, 3000);
							}
						})
						.catch((error) => {
							console.warn(error);
						});
				}
			});
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";

.fade {

	&-enter-active,
	&-leave-active {
		transition: opacity 0.5s;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}
}

.hide-language+.footer__middle__lang {
	display: none;
}

.signup-block {
	.checkmark::after {
		border-color: $white;
	}
}
</style>
