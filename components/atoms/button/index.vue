<template>
	<button
		v-if="submit"
		:class="['btn', buttonTypeClassName, largeClassName]"
		type="submit"
	>
		<slot></slot>
		<div class="background"></div>
	</button>
	<button
		v-else-if="hasFunction"
		@click.prevent="$emit('func')"
		:class="['btn', buttonTypeClassName, largeClassName]"
		:target="setTarget"
		:type="submitForm ? 'submit' : ''"
	>
		<slot></slot>
		<component v-if="iconName" :class="['icon', 'icon--' + iconName]" :is="iconComponent" />
		<div class="background"></div>
	</button>

	<smart-link
		v-else-if="(hasContent || iconName)"
		v-bind="link"
		:class="['btn', buttonTypeClassName, largeClassName]"
		:target="setTarget"
		:aria-label="ariaLabel"
	>
		<slot></slot>
		<component v-if="iconName" :class="['icon', 'icon--' + iconName]" :is="iconComponent" />
		<div class="background"></div>
	</smart-link>
</template>

<script>
import IconFacebook from '~/assets/svg/facebook.svg';
import IconLinkedin from '~/assets/svg/linkedin.svg';
import IconTwitter from '~/assets/svg/twitter.svg';
import IconArrow from '~/assets/svg/arrow.svg';
import IconCaret from '~/assets/svg/caret.svg';
const SmartLink = defineAsyncComponent(() => import('../../helper/smartlink/index.vue'));


import {
	BUTTON_TYPE_DEFAULT,
	BUTTON_TYPE_CTA,
	BUTTON_TYPE_DARK,
	BUTTON_TYPE_SQUARE,
	BUTTON_TYPE_CARET,
	BUTTON_TYPE_SOCIAL,
	BUTTON_TYPE_OUTLINE,
	BUTTON_TYPE_SOLID,
	BUTTON_TYPE_GREY,
} from '~/constants/button'

export default {
	name: 'Button',
	props: {
		hasFunction: { type: String },
		link: { type: Object },
		iconName: { type: String },
		iconComponent: { type: String },
		type: {
			validator(value) {
				return (
					[
						BUTTON_TYPE_DEFAULT,
						BUTTON_TYPE_CTA,
						BUTTON_TYPE_DARK,
						BUTTON_TYPE_SQUARE,
						BUTTON_TYPE_CARET,
						BUTTON_TYPE_SOCIAL,
						BUTTON_TYPE_OUTLINE,
						BUTTON_TYPE_SOLID,
						BUTTON_TYPE_GREY,
					].indexOf(value) !== -1
				);
			},
			default: BUTTON_TYPE_DEFAULT,
		},
		large: { type: Boolean, default: false },
		submit: { type: Boolean },
		submitForm: { type: Boolean },
		ariaLabel: { type: String },
	},
	components: {
		SmartLink,
		IconFacebook,
		IconLinkedin,
		IconTwitter,
		IconArrow,
		IconCaret,
	},
	computed: {
		buttonTypeClassName() {
			// eslint-disable-next-line no-console
			switch (this.type) {
				case BUTTON_TYPE_CTA:
					return 'btn--cta';
				case BUTTON_TYPE_DARK:
					return 'btn--dark';
				case BUTTON_TYPE_SQUARE:
					return 'btn--square';
				case BUTTON_TYPE_CARET:
					return 'btn--caret';
				case BUTTON_TYPE_SOCIAL:
					return 'btn--social';
				case BUTTON_TYPE_OUTLINE:
					return 'btn--square';
				case BUTTON_TYPE_SOLID:
					return 'btn--cta';
				case BUTTON_TYPE_GREY:
					return 'btn--grey';
				default:
					return '';
			}
		},
		largeClassName() {
			if (this.large) {
				return 'btn--large';
			}

			return '';
		},
		setTarget() {
			switch (this.type) {
				case BUTTON_TYPE_SOCIAL:
					return '_blank';
				default:
					return false;
			}
		},
		hasContent() {
			return this.$slots;
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
button:focus {
	outline: 0;
}

.btn {
	@extend %text-button;
	display: inline-block;
	background: $brand-green;
	border: 1px solid $brand-green;
	border-radius: 28px;
	height: 55px;
	line-height: 55px;
	padding: 0 30px;
	color: $white;
	text-decoration: none;
	text-transform: uppercase;
	cursor: pointer;
	transition: color 0.3s ease;
	overflow: hidden;

	@include media('mobile-sm') {
		width: 100%;
		vertical-align: middle;
		text-align: center;
	}

	.icon {
		display: inline-block;
		color: $white;
		margin-left: 10px;
		transition: color 0.3s ease;
	}

	&:hover {
		.icon {
			color: $label-color;
		}
	}

	&--large {
		@extend %text-button-large;
	}

	&--cta {
		background: $brand-green;
		border-color: $brand-green;
		color: $text-color;

		@include buttonShadowAndHover($brand-green, $white);

		.icon {
			color: $text-color;
		}

		&:hover {
			color: $brand-green;

			.icon {
				color: $brand-green;
			}
		}
	}

	&--grey {
		$grey-btn: $gray-concrete;
		background: $grey-btn;
		border-color: $grey-btn;
		color: $text-color;

		@include buttonShadowAndHover($grey-btn, $white, false, 2);

		&:hover {
			color: darken($gray-concrete, 55%);
		}
	}

	&--square {
		background: transparent;
		border: 1px solid $label-color;
		border-radius: 0;
		color: $label-color;

		@include buttonShadowAndHover(transparent, $label-color, true, 0);

		.icon {
			color: $label-color;
		}

		&:hover {
			color: $text-color;

			.icon {
				color: $text-color;
			}
		}
	}

	&--caret {
		position: relative;
		background: transparent;
		color: $brand-green;
		border: none;
		border-radius: 0;
		padding: 0;
		height: 22px;
		line-height: 22px;
		font-size: 12px;
		padding-left: 25px;

		.icon {
			color: $brand-green;
			position: absolute;
			left: 0;
			margin: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		&:hover {
			.icon {
				color: $brand-green;
			}
		}
	}

	&--social {
		align-items: center;
		background: transparent;
		border: 1px solid currentColor;
		border-radius: 0;
		border-color: $label-color;
		color: currentColor;
		display: inline-flex;
		height: 35px;
		justify-content: center;
		line-height: 35px;
		padding: 0;
		width: 35px;
		vertical-align: middle;
		color: $label-color;

		@include buttonShadowAndHover($white, $label-color, true, 0);

		.icon {
			color: currentColor;
			margin: 0;
		}

		&:hover {
			background: currentColor;
			color: $label-color;

			.icon {
				color: $white;
			}
		}

		&-white {
			color: $white;

			&:hover {
				color: $white;

				.icon {
					color: $black;
				}
			}
		}
	}

	&--price {
		background: $blue-dark;
		border-color: $blue-dark;
		color: $white;

		@include buttonShadowAndHover($blue-dark, $gray-concrete, false, 2);

		.icon {
			color: $white;
		}

		&:hover {
			color: $blue-dark;

			.icon {
				color: $blue-dark;
			}
		}

		&-free {
			@include buttonShadowAndHover($brand-green, $gray-concrete);
		}
	}

	.signup-block & {
		@include buttonShadowAndHover($brand-green, $blue-dark);
	}
}

.offcanvas {
	.btn--social {
		@include buttonShadowAndHover($text-color, $label-color, true);
	}

	.btn--cta {
		@include buttonShadowAndHover($brand-green, $text-color);
	}
}
.section--bg--grey .teaser {
	.btn--cta {
		@include buttonShadowAndHover($brand-green, $gray-concrete);
	}
}
</style>
<!-- <docs>
```jsx
<div>
<Button :link="{ url: 'http://google.com' }">Opret dig gratis</Button>
<Button :link="{ url: 'http://google.com' }" :type="1" icon="arrow">Kom i gang gratis</Button>
<Button :link="{ url: 'http://google.com' }" :type="2" >Kom i gang - 95 DKK</Button>
<br />
<Button :link="{ url: 'http://google.com' }" large>Opret dig gratis</Button>
<Button :link="{ url: 'http://google.com' }" large :type="1" icon="arrow">Kom i gang gratis</Button>
<Button :link="{ url: 'http://google.com' }" large :type="2" >Kom i gang - 95 DKK</Button>
<br /><br />
<Button :link="{ url: 'http://google.com' }" :type="3">Se flere cases</Button>
<br /><br />
<Button :link="{ url: 'http://google.com' }" :type="4" iconName="facebook" iconComponent="IconFacebook"></Button>
<Button :link="{ url: 'http://google.com' }" :type="4" iconName="linkedin" iconComponent="IconLinkedin"></Button>
<Button :link="{ url: 'http://google.com' }" :type="4" iconName="twitter" iconComponent="IconTwitter"></Button>
<br /><br />
<small>Use exported consts for TYPE.</small>
</div>
```
</docs> -->
