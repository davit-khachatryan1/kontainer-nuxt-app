<template>
	<Form 
	v-slot="{ validate }"
	:class="{
		'form--inline': true,
		'js-cm-form': true,
		'hide-language': (step === 2),
	}" type="inline" action="https://kontainer.createsend.com/t/d/s/vhrjir/" method="post">
		<slot></slot>
		<transition name="form-step-animation" mode="out-in">
			<div>
				<div class="fieldset" v-if="step < 2">
					<slot name="footer-heading"></slot>
					<Input ref="email" type="text" name="email"
						v-model="newsletterInfo.email" :rules="'required|email'"
						:placeholder="langString('_e-mail')"
						iconName="email" iconComponent="IconEmail" 
						@click.native="step === 0 ? incrementStep() : ''"
					/>
					<transition name="fade">
						<Input type="text" name="name"
							v-model="newsletterInfo.name" :rules="'required|alpha_spaces_dash'"
							:placeholder="langString('_name')"
							iconName="user" iconComponent="IconUser" 
							v-if="step === 1" :key="0" 
						/>
					</transition>
					<transition name="fade">
						<div>
							<div class="form__element" v-if="step == 1" :key="0">
								<Button hasFunction="true" @func="submit(validate)" :class="['js-cm-submit-button', 'button']">
									{{ langString('_sign_up') }}
								</Button>
							</div>
						</div>
					</transition>
				</div>
				<div v-if="step == 2" :key="step" class="form__confirmation">
					<div class="checkmark"></div>
					<div class="form__confirmation__response">{{ langString('_thanks_for_signing_up_to_our_newsletter') }}
					</div>
				</div>
			</div>
		</transition>
	</Form>
</template>

<script>
const Button = defineAsyncComponent(() => import( '~/components/atoms/button/index.vue'));
const Input = defineAsyncComponent(() => import( '~/components/atoms/input/index.vue'));
const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));
const Form = defineAsyncComponent(() => import('~/components/molecules/form/index.vue'));
import qs from 'qs';
import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'NewsletterSignup',
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
	setup() {
		const { langString } = useLangString()
		return { langString };
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
		submit(validate) {

			validate().then((result) => {
				const newsletterData = this.newsletterInfo;
				const cmNames = { name: 'cm-name', email: 'cm-vhrjir-vhrjir' };
				const cmData = this.renameKeys(newsletterData, cmNames);

				if (result) {
					$fetch(
							'https://kontainer.createsend.com/t/d/s/vhrjir/?callback=cmCallback',
							{
								method: 'POST',
								body: qs.stringify(cmData)
							},
						)
						.then((response) => {
							const responseJSON = JSON.parse(
								response.slice(11).slice(0, -1),
							);
							console.warn(responseJSON.Status);

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
