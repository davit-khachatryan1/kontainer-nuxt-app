<template>
	<FormComponenet class="js-cm-form form" type="inline" action="https://kontainer.createsend.com/t/d/s/vhrjir/" method="post"  v-slot="{ errors, handleSubmit, resetForm, validate }">
		<slot></slot>
		<transition name="form-step-animation" mode="out-in">
			<div>
				<div v-if="step === 1" :key="step">
					<div class="fieldset">
						<slot name="footer-heading"></slot>
						<Input name="name" type="text" v-model="newsletterInfo.name"
							:rules="'required|alpha_spaces_dash'"
							:placeholder="langString('_name')" iconName="user"
							iconComponent="IconUser" />
						<Input name="email" type="text" :class="['js-cm-email-input']" v-model="newsletterInfo.email"
							:rules="'required|email'" 
							:placeholder="langString('_e-mail')" iconName="email"
							iconComponent="IconEmail" />
						<div class="form__element">
							<Button hasFunction="true" @func="submit(validate)" :class="['js-cm-submit-button']">
								{{ langString('_sign_up_submit') }}
							</Button>
						</div>
					</div>
				</div>
				<div v-if="step === 2" :key="step" class="form__confirmation">
					<div class="checkmark"></div>
					<div class="form__confirmation__response">{{ langString('_thanks_for_signing_up_to_our_newsletter')
						}}
					</div>
				</div>
			</div>
		</transition>
	</FormComponenet>
</template>

<script>
import Button from '~/components/atoms/button/index.vue';
import Input from '~/components/atoms/input/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';
import FormComponenet from '~/components/molecules/form/index.vue';
import { useNuxtApp } from '#app';
import qs from 'qs';
import { useLangString } from '~/components/composables/useLangString';

export default {
	name: 'NewsletterSignup',
	components: {
		Button,
		Input,
		Teaser,
		FormComponenet,
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	props: {
		data: { type: Object },
		type: { type: String },
	},
	computed: {},
	data() {
		return {
			newsletterInfo: {
				name: null,
				email: null,
			},
			step: 1,
			errors: {
				name: '',
				email: '',
			},
		};
	},
	methods: {
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
		submit(validate) {
			const { $api: axios } = useNuxtApp()
			validate().then((result) => {
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
							if (responseJSON.Status === 200) {
								this.step += 1;
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

.signup-block {
	.checkmark::after {
		border-color: $white;
	}
}
</style>
