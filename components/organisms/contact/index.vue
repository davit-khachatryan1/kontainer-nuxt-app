<template>
	<section class="contact-section">
		<div class="content-grid-container">
			<div class="span-container">
				<div v-if="sellingpointsVisible" class="span6 span6--tablet span4--mobile sellingpoints">
					<h2 v-if="data.signup_left.heading">{{data.signup_left.heading}}</h2>
					<SellingpointComponent v-for="(sellingpoint, index) in data.signup_left.sellingpoints" :key="index" :sellingpoint="sellingpoint" />
				</div>

				<div :class="[sellingpointsVisible ? 'span6 span6--tablet span4--mobile' : 'span12 span12--tablet span12--mobile']">
					<div class="form-container" :class="{'form-container--sent': isSent}">
						<template v-if="data.signup_right.content_type === 'html'">
							<CodeInserter :data="data.signup_right" />
						</template>
						<template v-else>
							<h1 v-if="data.signup_right.heading && positionOnPage === 0" v-html="data.signup_right.heading" />
							<h2 v-if="data.signup_right.heading && positionOnPage !== 0" v-html="data.signup_right.heading" />
							<div class="form-container__text" v-if="data.signup_right.text" v-html="data.signup_right.text"></div>
							<VForm>
								<slot>
									<InputComponent :key="'name'" type="text" name="name"
										:rules="'required|alpha_spaces_dash'"
										v-model="contact.name" 
										:placeholder="langString('_name')"
										iconName="user" iconComponent="IconUser" />
									<InputComponent :key="'email'" type="text" name="email"
										v-model="contact.email" :rules="'required|email'"
										:placeholder="langString('_e-mail')"
										iconName="email" iconComponent="IconEmail" />
									<InputSelect v-if="data.signup_right.wrapper.options_repeater.length" name="topic" :options="contact.subjects" v-on:change.native="contact.subjectSelected = $event.target.value" :labelAria="contact.subjectSelected" />
									<Textarea :key="'message'" name="message"
										v-model="contact.message" :rules="'required'"
										:placeholder="langString('_message')"
										class="contact-message"></Textarea>
									<ButtonComponent :hasFunction="true" @func="handleSubmit" :class="'btn--cta'">{{data.signup_right.submit_button_text}}</ButtonComponent>
								</slot>
							</VForm>
							<div class="contact-section__info" v-if="data.signup_right.info" v-html="data.signup_right.info" />
							<transition name="form-container__feedback-fade">
								<div class="form-container__feedback" v-if="isSent">
									<slot name="feedback">
										<h2>{{data.signup_right.success_title}}</h2>
										<p>{{data.signup_right.success_message}}</p>
									</slot>
								</div>
							</transition>
						</template>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import ButtonComponent from '~/components/atoms/button/index.vue';
import FormComponent from '~/components/molecules/form/index.vue';
import InputComponent from '~/components/atoms/input/index.vue';
import SellingpointComponent from '~/components/molecules/sellingpoint/index.vue';
import Textarea from '~/components/atoms/textarea/index.vue';
import InputSelect from '~/components/atoms/select/index.vue';
import CodeInserter from '~/components/organisms/code-inserter/index.vue';
import { useLangString } from '~/components/composables/useLangString';
import { usePrepLink } from '~/components/composables/usePrepLink';

export default {
	name: 'ContactSection',
	components: {
		ButtonComponent,
		FormComponent,
		InputComponent,
		SellingpointComponent,
		Textarea,
		InputSelect,
		CodeInserter,
	},
	setup() {
		const { prepLink } = usePrepLink()
		const { langString } = useLangString()
		return { langString, prepLink };
  	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	data() {
		return {
			sellingpointsVisible: this.data.signup_left.heading || this.data.signup_left.sellingpoints,
			contact: {
				name: '',
				email: '',
				subjects: [
					{
						value: '-1',
						text: this.langString('_topic'),
						selected: true,
						disabled: true,
					},
				],
				subjectSelected: '',
				message: '',
			},
			isSent: false,
		};
	},
	methods: {
		addError(key, val) {
			this[`${key}Error`] = val;
			setTimeout(() => {
				this[`${key}Error`] = '';
			}, 5000);
		},
		handleSubmit() {
			if (this.contact.name === '') {
				this.addError('name', 'Dette felt skal udfyldes');
				return;
			}
			if (this.contact.email === '') {
				this.addError('email', 'Dette felt skal udfyldes');
				return;
			}
			if (this.contact.message === '') {
				this.addError('message', 'Dette felt skal udfyldes');
				return;
			}
			$fetch('/api/sendmessage', {
				method: 'POST',
				body: {

					name: this.contact.name,
					email: this.contact.email,
					topic: this.contact.subjectSelected,
					message: this.contact.message,
				}
				})
				.then(() => {
					this.isSent = true;
				})
				.catch(() => {
					console.warn('Contact form failed');
					// What to do on error
				});
		},
	},
	mounted() {
		if (this.data.signup_right.wrapper.options_repeater) {
			for (let i = 0; i < this.data.signup_right.wrapper.options_repeater.length; i += 1) {
				const newOption = {
					value: this.data.signup_right.wrapper.options_repeater[i].value,
					text: this.data.signup_right.wrapper.options_repeater[i].text,
				};
				this.contact.subjects.push(newOption);
			}

			this.contact.subjectSelected = this.contact.subjects[0].text;
		}
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
$margin: 50px;
$boxWidth: 550px;

@include media('mobile-ab') {
	.contact-section {
		margin-top: calc(#{-$section-angle-height} - 100px);
		margin-bottom: -$section-angle-height;
	}
}

.span-container {
	justify-content: center;
}

h1,
h2 {
	@extend %text-h2;
	margin-bottom: 8px;
}

.sellingpoints {
	align-self: center;
	max-width: $boxWidth;
	z-index: z('default');

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

	a {
		text-decoration: none;
	}
}

.form-address {
	align-items: center;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 100%;
	justify-content: center;

	&__icon {
		margin-bottom: 20px;
		text-align: center;

		img {
			height: auto;
			max-width: 50%;
		}
	}

	&__title {
		font-weight: $type-regular;
		margin-bottom: 12px;

		a {
			text-decoration: none;
		}
	}
}

.form-container {
	$sent: #{&}--sent;

	position: relative;
	z-index: z('default');
	text-align: center;
	max-width: 560px;
	margin: 0 auto;

	@include media('mobile-ab') {
		box-shadow: $shadow-block;
		background-color: $white;
		padding: 60px;
	}

	h1,
	h2 {
		@extend %text-h2;

		a {
			text-decoration: none;
		}
	}

	&__text {
		@extend %text-paragraph3;
		margin: 10px auto 30px;

		@include media('mobile-ab') {
			width: 80%;
		}

		a {
			text-decoration: none;
		}
	}

	.btn {
		margin: 10px 0 35px;
	}

	form {
		#{$sent} & {
			opacity: 0;
		}
	}

	&__feedback {
		align-items: center;
		background: $white;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		left: 0;
		padding: 60px;
		position: absolute;
		right: 0;
		top: 0;

		&-fade-enter-active,
		&-fade-leave-active {
			transition: all 0.3s;
		}

		&-fade-enter,
		&-fade-leave-to {
			opacity: 0;
		}
	}
}
</style>

<style lang="scss">
@import "../../../assets/scss/import";

.contact-section {
	&__info {
		font-size: 14px;

		a {
			color: $brand-green;
			font-weight: 500;
		}
	}

	.contact-message {
		textarea+span {
			background-color: transparent;
			width: auto;
		}
	}
}
</style>

<!-- <docs>
```jsx
<ContactSection/ >
```
</docs> -->
