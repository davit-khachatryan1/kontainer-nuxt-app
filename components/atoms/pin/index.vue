<template>
	<div v-if="type !== '2'" :class="[pinTypeClassName, circleTypeClassName, strikethroughClassName]">
		<div v-if="hasLabel" class="pin__label">
			<slot></slot>
		</div>
	</div>
	<div v-else :class="[pinTypeClassName, socialPinSideClassName]">
		<Button v-for="(button, index) in social" :key="index" :type="4" :link="{ url: button.link }"
			:iconName="button.name" :iconComponent="button.comp" :ariaLabel="button.text"></Button>
	</div>
</template>

<script>
const Button = defineAsyncComponent(() => import('../button/index.vue'));

import useStore from '@/store'

const PIN_TYPE_VERTICAL = '0';
const PIN_TYPE_HORIZONTAL = '1';

const PIN_TYPE_SOCIAL = '2';
const PIN_CIRCLE_START = '1';
const PIN_CIRCLE_END = '2';

const SOCIAL_LEFT = '1';
const SOCIAL_RIGHT = '2';

export { PIN_TYPE_VERTICAL, PIN_TYPE_HORIZONTAL, PIN_TYPE_SOCIAL };

export default {
	name: 'PinElement',
	props: {
		type: {
			validator(value) {
				return (
					[PIN_TYPE_VERTICAL, PIN_TYPE_HORIZONTAL, PIN_TYPE_SOCIAL].indexOf(
						value,
					) !== -1
				);
			},
			default: PIN_TYPE_VERTICAL,
		},
		circlePosition: { type: String },
		socialPinSide: { type: String },
		strikethrough: { type: Boolean, default: false },
	},
	components: {
		Button,
	},
	computed: {
		pinTypeClassName() {
			// eslint-disable-next-line no-console
			switch (this.type) {
				case PIN_TYPE_VERTICAL:
					return 'pin pin--vertical';
				case PIN_TYPE_HORIZONTAL:
					return 'pin pin--horizontal';
				case PIN_TYPE_SOCIAL:
					return 'pin-social';
				default:
					return '';
			}
		},
		circleTypeClassName() {
			// eslint-disable-next-line no-console
			switch (this.circlePosition) {
				case PIN_CIRCLE_START:
					return 'pin--vertical--start';
				case PIN_CIRCLE_END:
					return 'pin--vertical--end';
				default:
					return '';
			}
		},
		socialPinSideClassName() {
			// eslint-disable-next-line no-console
			switch (this.socialPinSide) {
				case SOCIAL_LEFT:
					return 'pin-social--left';
				case SOCIAL_RIGHT:
					return 'pin-social--right';
				default:
					return '';
			}
		},
		hasLabel() {
			return !!this.$slots.default;
		},
		strikethroughClassName() {
			if (this.strikethrough) {
				return 'pin--vertical--strikethrough';
			}
			return '';
		},
		social() {
			const store = useStore();
			const data = [
				{
					link: store.pageOptions.facebook,
					name: 'facebook',
					comp: 'IconFacebook',
					text: store.pageOptions.facebook_text,
				},
				{
					link: store.pageOptions.linkedin,
					name: 'linkedin',
					comp: 'IconLinkedin',
					text: store.pageOptions.linkedin_text,
				},
				{
					link: store.pageOptions.twitter,
					name: 'twitter',
					comp: 'IconTwitter',
					text: store.pageOptions.twitter_text,
				},
			]
			return data;
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
$circleElement: '';
$circleDiameter: 9px;
$circleCenter: floor(calc($circleDiameter / 2));
$strokeDistance: 25px;

%stroke {
	position: relative;
	width: $pinLength;
	height: 1px;
	background-color: $label-color;

	@include media('mobile') {
		width: $pinLengthMobile;
	}
}

%circle {
	content: '';
	width: $circleDiameter;
	height: $circleDiameter;
	background-color: $label-color;
	border-radius: 50%;
	position: absolute;
	transform: translate(-#{$circleCenter}, -#{$circleCenter});
}

.pin {
	@extend %stroke;

	&::after {
		$circleElement: &;
		@extend %circle;
	}

	&--vertical {
		height: $pinLength;
		width: 1px;
		margin-left: auto;
		margin-right: auto;
		background: linear-gradient(180deg,
				$label-color,
				$label-color 50%,
				rgba($label-color, 0) 50%,
				rgba($label-color, 0));
		background-position: 0 0;
		background-size: 100% 200%;

		@include media('mobile') {
			height: $pinLengthMobile;
		}

		&--start {
			position: absolute;
			bottom: 0; //(calc($section-angle-height / 2));
			left: 50%;
			z-index: z(pinStart);

			&::after {
				content: none;
			}
		}

		&--end {
			position: absolute;
			top: -(calc($section-angle-height / 2));
			left: 50%;
			z-index: z(pinEnd);

			&::after {
				bottom: -#{$circleCenter};
			}
		}

		&--strikethrough {
			height: 100%;
			position: absolute;
			top: -(calc($section-angle-height / 2));
			left: 50%;
			z-index: z(pinStrike);
			width: 1px;

			&::after {
				content: none;
			}
		}
	}

	&--horizontal {
		&#{$circleElement} {
			right: -#{$circleCenter};
		}
	}

	&__label {
		@extend %text-pin-label;
		color: $label-color;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(-50%) translateY(-$pinLabelDistance + -5px);

		@include media('mobile-ab') {
			white-space: nowrap;
		}

		@include media('mobile') {
			width: 80vw;
		}
	}

	&-social {
		position: relative;

		.btn {
			opacity: 1;
			transform: translate(0, 0);
			width: 55px;
			padding: 0 10px;

			&:not(:last-child) {
				margin-right: 14px;
			}

			@for $i from 1 through 3 {
				&:nth-child(#{$i}) {
				}
			}

			.animate-enter & {
			}
		}

		&--left,
		&--right {
			&::before {
				@extend %stroke;
				content: '';
				position: absolute;
				left: -#{$strokeDistance};
				top: 50%;
				transform: translateX(-100%);
				transition: width 0.5s 0.6s $easeInOut;
				width: 20vw;
			}

			&::after {
				@extend %circle;
				left: -#{$strokeDistance};
				top: 50%;
				transform: scale(1) translate(-4px, -4px);
				transition: transform 0.3s 0.8s $easeInOut;
			}
		}

		&--right {
			display: inline-block;

			&::before {
				right: -#{$strokeDistance};
				left: auto;
				transform: translateX(100%);
			}

			&::after {
				content: none;
			}
		}
	}
}
</style>

<!-- <docs>
```jsx
<div>
	<div style="position: relative; height: 200px;background-color:#eee;">
		<PinElement type="0" circlePosition="1" />
	</div>
	<div style="position: relative; height: 200px;">
		<PinElement type="0" circlePosition="2" />
	</div>
	<div style="position: relative; height: 200px;background-color:#eee;">
		<PinElement strikethrough type="0" />
	</div>

	<PinElement type="2" socialPinSide="1">
		<Button :link="{ url: 'http://google.com' }" :type="4" iconName="facebook" iconComponent="IconFacebook"></Button>
		<Button :link="{ url: 'http://google.com' }" :type="4" iconName="linkedin" iconComponent="IconLinkedin"></Button>
		<Button :link="{ url: 'http://google.com' }" :type="4" iconName="twitter" iconComponent="IconTwitter"></Button>
	</PinElement>

	<br />
	<br />
	<br />

	<PinElement type="2" socialPinSide="2">
		<Button :link="{ url: 'http://google.com' }" :type="4" iconName="facebook" iconComponent="IconFacebook"></Button>
		<Button :link="{ url: 'http://google.com' }" :type="4" iconName="linkedin" iconComponent="IconLinkedin"></Button>
		<Button :link="{ url: 'http://google.com' }" :type="4" iconName="twitter" iconComponent="IconTwitter"></Button>
	</PinElement>
</div>
```
</docs> -->
