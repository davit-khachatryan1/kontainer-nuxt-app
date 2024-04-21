<template>
	<div class="form__element" :key="keyName">
	  <label>
		<VField :name="name" :type="type" :pattern="pattern"
		 v-slot="{ field, errors }" :rules="rules">
		  <input
		    v-bind="field"
		    @input="field.onChange($event.target.value); $emit('update:modelValue', $event.target.value)"
		    @focus="focusCheck(true)"
		    @blur="focusCheck(false)"
		    @keyup="valueCheck"
		    :class="{
		      'form__element__input': true,
		      'form__element__input--no-icon': noIcon,
		      'form__element__input--hide': hidePlaceholder,
		      'error': errors.length > 0,
			  'focus': focused,
			  'filled': field.value,
		       'valid': !errors.length && field.value
		    }"
		  />
		<span
		  class="form__element__placeholder"
		  :class="{
			'form__element__placeholder--no-icon': noIcon,
			'form__element__placeholder--hide': hidePlaceholder
		  }"
		>
		  {{ placeholder }}
		</span>
		<component v-if="iconName" :class="['icon', 'icon--' + iconName]" :is="iconComponent" />
		<slot></slot>
		<transition name="fade">
		  <span
			class="error-message"
			:class="{'error-message--no-icon': noIcon}"
			v-if="errors?.length ? errors[0] : ''"
		  >
			{{ errors?.length ? errors[0] : '' }}
		  </span>
		</transition>
		<span v-if="required && !valid" class="form__element__required">*</span>
		<transition name="fade">
		  <span class="valid-input" v-if="domainAvailability || valid"></span>
		</transition>
		</VField>
	</label>
	</div>
  </template>

<script>
import IconUser from '~/assets/svg/user.svg';
import IconEmail from '~/assets/svg/email.svg';
import IconCompany from '~/assets/svg/company.svg';
import IconAddress from '~/assets/svg/address.svg';
import IconPhone from '~/assets/svg/phone.svg';
import IconCity from '~/assets/svg/city.svg';
import IconCountry from '~/assets/svg/country.svg';
import IconVat from '~/assets/svg/vat.svg';
import IconZip from '~/assets/svg/zip.svg';
import { useInputLabels } from '~/components/composables/useInputLabels';

export default {
	name: 'Input',
	props: [
		'type',
		'name',
		'placeholder',
		'iconName',
		'iconComponent',
		'modelValue',
		'noIcon',
		'hidePlaceholder',
		'keyName',
		'rules',
		'value',
		'errorMessage',
		'domainAvailability',
		'valid',
		'pattern',
		'required',
	],
	setup() {
		const { focused, hasValue, focusCheck, valueCheck } = useInputLabels()
		return { focused, hasValue, focusCheck, valueCheck };
  	},
	components: {
		IconUser,
		IconEmail,
		IconCompany,
		IconAddress,
		IconPhone,
		IconCity,
		IconCountry,
		IconVat,
		IconZip,
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
input::-ms-clear {
	display: none;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease-in;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.kontainer-url {
	input {
		&.focus,
		&.filled {
			+ span {
				transform: translate(0, 8px);
			}
		}
	}
}

.form {
	$element: '';

	&__element {
		position: relative;

		$element: &;

		.icon {
			left: 23px;
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
		}

		.error-message {
			position: absolute;
			left: 51px;
			bottom: -4px;
			@extend %text-input-placeholder;
			color: $errorColor;
			font-size: 10px;
			position: absolute;
			background: $white;
			padding: 0 5px;

			&--no-icon {
				left: 20px;
			}
		}

		&__placeholder {
			// $input-placeholder-selector: & !global;
			@extend %text-input-placeholder;
			color: $black;
			left: 56px;
			position: absolute;
			top: 0;
			transform: translate(0, 19px);
			transition: font-size 0.2s $easeOutCubic, opacity .2s $easeOutCubic, transform 0.2s $easeOutCubic;
			will-change: opacity, transform;

			pointer-events: none;

			&--no-icon {
				left: 20px;
			}

			&--hide {
				opacity: 1;
			}
		}

		&__required {
			position: absolute;
			right: 18px;
			top: 20px;
			font-size: 26px;
			font-weight: 200;
		}

		&__input {
			@extend %text-input;

			background: $white;
			border: 1px solid $gray-alto;
			border-radius: 0;
			box-sizing: border-box;
			height: 55px;
			outline: none;
			padding: 0 20px 0 55px;
			width: 100%;
			transition: border-color 0.2s ease-in;

			&.focus,
			&.filled {
				padding-top: 12px;

				+ .form__element__placeholder {
				 	font-size: 10px;
				 	transform: translate(0, 13px);
				 }
			}

			&--no-icon {
				padding-left: 20px;

				&.focus,
				&.filled {
					+ .form__element__placeholder {
						transform: translate(0, 8px);
					}
				}
			}

			&--hide {
				&.focus,
				&.filled {
					+ .form__element__placeholder {
						opacity: 0;
					}
				}
			}

			&:-webkit-autofill {
				-webkit-box-shadow: 0 0 0 30px $white inset;
			}

			&.error {
				border-color: $errorColor !important;
			}
		}

		&--gray {
			.error-message {
				background: transparent;
				display: block;
				position: absolute;

				&::before {
					background: $white;
					content: '';
					height: 6px;
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
				}

				span {
					position: relative;
				}
			}
		}
	}

	&--inline {
		#{$element} {
			flex-grow: 1;
			margin-right: 20px;

			@include media('tablet-sm') {
				width: calc(33.3% - 14px);
			}

			@include media('mobile') {
				margin: 0 0 20px;
				width: 100%;
			}

			&:nth-last-child(2) {
				@include media('tablet-sm') {
					margin-right: 0;
				}
			}

			&:last-child {
				flex-grow: 0;
				margin-right: 0;

				@include media('tablet-sm') {
					flex-grow: 1;
					margin-top: 20px;
					width: 100%;
				}

				@include media('mobile') {
					margin: 0;
				}
			}

			input {
				border-color: $blue-dark;
			}

			.btn {
				border-radius: 28px;
				font-weight: $type-regular;
				height: 55px;
				line-height: 55px;
				min-width: 200px;
				white-space: nowrap;
			}
		}

		.error-message {
			bottom: 2px !important;
		}
	}

	&--block {
		.kontainer-url {
			.valid-input {
				right: -35px;
			}

			input {
				&.focus,
				&.filled {
					+ span {
						transform: translate(0, 8px);
					}
				}
			}
		}

		input {
			transition: padding 0.2s $easeOutCubic;
			will-change: padding;

			&.focus,
			&.filled {
				padding-top: 12px;

				+ span {
					transform: translate(0, 12px);
				}
			}
		}
	}

	@include media('mobile') {
		&--standalone {
			.kontainer-url {
				.valid-input {
					right: -35px;
				}
			}
		}
	}
}

.valid-input {
	position: absolute;
	right: 5px;
	top: 18px;
	width: 20px;
	height: 20px;

	&::after {
		content: '';
		display: block;
		width: 6px;
		height: 12px;
		border: solid $black;
		border-width: 0 1px 1px 0;
		transform: rotate(45deg);
	}
}
</style>

<!-- <docs>
```jsx
<Input type="text" name="name" placeholder="Navn" iconName="user" iconComponent="IconUser" />
```
</docs> -->
