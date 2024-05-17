<template>
	<div
		:class="[
			'section--angle',
			sectionAngleClassName,
			sectionBgClassName,
			sectionTaglineClassName,
			sectionPaddingClassName,
			sectionStrikethrough,
			initAnimations ? '' : 'animate-enter',
			'padding-top-' + sectionPaddingTop,
			'padding-bottom-' + sectionPaddingBottom,
		]"
	>
		<PinElement
			v-if="pinTop && pinTop !== 'none'"
			type="0"
			:strikethrough="strikethrough"
			circlePosition="2"
			:class="pinTopEnhancedClass"
		/>
		<slot />
		<PinElement
			v-if="pinBottom && pinBottom !== 'none'"
			type="0"
			circlePosition="1"
			:class="pinBottomEnhancedClass"
		>
			{{ pinLabel }}
		</PinElement>
	</div>
</template>

<script>
const PinElement = defineAsyncComponent(() => import('../pin/index.vue'));
import { useAnimateOnLoad } from '~/components/composables/useAnimateOnLoad';
import { 
	SECTION_ANGLE_NONE,
	SECTION_ANGLE_POSITIVE,
	SECTION_ANGLE_NEGATIVE,
	SECTION_BG_COLOR_WHITE,
	SECTION_BG_COLOR_GREY,
	SECTION_BG_COLOR_DARKBLUE,
	SECTION_BG_COLOR_BROWN,
	SECTION_PADDING_DEFAULT,
	SECTION_PADDING_BOTTOM_NONE,
} from '~/components/composables/section';

export {
	
};

export default {
	name: 'ContentSection',
	components: {
		PinElement,
	},
	setup() {
		const { initAnimations } = useAnimateOnLoad()
		return { initAnimations };
  	},
	props: {
		angleType: {
			validator(value) {
				return (
					[
						SECTION_ANGLE_NONE,
						SECTION_ANGLE_POSITIVE,
						SECTION_ANGLE_NEGATIVE,
					].indexOf(value) !== -1
				);
			},
			default: SECTION_ANGLE_NONE,
		},
		padding: {
			validator(value) {
				return (
					[SECTION_PADDING_DEFAULT, SECTION_PADDING_BOTTOM_NONE].indexOf(
						value,
					) !== -1
				);
			},
			default: SECTION_PADDING_DEFAULT,
		},
		pin: { type: Object },
		bg: { type: String },
		taglineColor: { type: String },
		data: { type: Object },
		meta: { type: Object },
		sectionPaddingBottom: { type: String || Boolean },
		sectionPaddingTop: { type: String || Boolean },
	},
	methods: {
		metaHideClass(metaName) {
			if (this.meta[metaName]) {
				return 'hide--mobile';
			}

			return '';
		},
	},
	computed: {
		pinTopEnhancedClass() {
			return this.metaHideClass('pinTopConnectsSameVisualElement');
		},
		pinBottomEnhancedClass() {
			return this.metaHideClass('pinBottomConnectsSameVisualElement');
		},
		sectionAngleClassName() {
			// eslint-disable-next-line no-console
			switch (this.angleType) {
				case SECTION_ANGLE_POSITIVE:
					return 'section--angle--positive';
				case SECTION_ANGLE_NEGATIVE:
					return 'section--angle--negative';
				default:
					return '';
			}
		},
		sectionBgClassName() {
			// eslint-disable-next-line no-console
			switch (this.bg) {
				case SECTION_BG_COLOR_GREY:
					return 'section--bg--grey';
				case SECTION_BG_COLOR_DARKBLUE:
					return 'section--bg--bluedark';
				case SECTION_BG_COLOR_BROWN:
					return 'section--bg--brown';
				default:
					return '';
			}
		},
		sectionTaglineClassName() {
			// eslint-disable-next-line no-console
			switch (this.taglineColor) {
				case SECTION_BG_COLOR_BROWN:
					return 'section--tagline--brown';
				case SECTION_BG_COLOR_WHITE:
					return 'section--tagline--white';
				default:
					return '';
			}
		},
		sectionPaddingClassName() {
			// eslint-disable-next-line no-console
			switch (this.padding) {
				case SECTION_PADDING_BOTTOM_NONE:
					return 'section--padding-bottom-none';
				case SECTION_PADDING_DEFAULT:
				default:
					return '';
			}
		},
		sectionStrikethrough() {
			if (this.strikethrough) {
				return 'section--angle--strikethrough';
			}

			return '';
		},
		pinTop() {
			return this.pin.top;
		},
		pinBottom() {
			return this.pin.bottom;
		},
		pinLabel() {
			return this.pin.label;
		},
		strikethrough() {
			return this.pin.top === 'pin_through';
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
@include media('mobile') {
	.hide-mobile {
		display: none !important;
	}
}

.section {
	&--angle {
		position: relative;
		padding-top: $section-angle-height;
		padding-bottom: $section-padding-bottom;

		@include media('mobile') {
			padding-top: $section-padding-top-mobile;
			padding-bottom: $section-padding-bottom-mobile;
		}
		&.padding {
			&-top {
				&-less {
					padding-top: 2.5vw;
				}
				&-none {
					padding-top: 1vw;
				}
			}
			&-bottom {
				&-less {
					padding-bottom: 2.5vw;
				}
				&-none {
					padding-bottom: 1vw;
				}
			}
		}

		&::before {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			transform-origin: center;
			background: white;
			width: 100%;
			height: $section-angle-height;
		}

		&--positive {
			&::before {
				transform: skewY(3deg) translateY(-50%) translateY(1px); //prevent gap
			}
		}

		&--negative {
			&::before {
				transform: skewY(-3deg) translateY(-50%) translateY(1px); //prevent gap
			}
		}

		&--strikethrough {
			&::before {
				border: 0;
			}
		}
	}

	&--padding-bottom-none {
		padding-bottom: 0;

		@include media('mobile') {
			padding-bottom: 0;
		}
	}

	&--bg {
		&--grey {
			background-color: $gray-concrete;

			&:before {
				background-color: $gray-concrete;
				border: 0;
			}
		}

		&--bluedark {
			background-color: $blue-dark;
			color: $white;

			&:before {
				background-color: $blue-dark;
				border: 0;
			}
			.accordion__item {
				border-color: $gray-dusty;
			}
		}
		&--brown {
			background-color: $brown-light;

			&:before {
				background-color: $brown-light;
				border: 0;
			}
		}
	}
	&--tagline {
		&--white .teaser__tagline {
			color: $white;
		}
		&--brown .teaser__tagline {
			color: $label-color;
		}
	}
}
</style>

<!-- <docs>
```jsx
<div>
	<Section angleType="1" bg="grey" :pin="{
		label: 'Label',
		top: '',
		bottom: 'pin_start',
	}">
		<div class="container" style="position:relative;">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	</Section>

	<Section angleType="2" :pin="{
		label: '',
		top: 'pin_end',
		bottom: '',
	}">
		<div class="container" style="position:relative">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	</Section>

	<Section angleType="1" bg="grey">
		<div class="container" style="position:relative">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	</Section>

	<Section angleType="2">
		<div class="container" style="position:relative">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	</Section>
</div>
```
</docs> -->
