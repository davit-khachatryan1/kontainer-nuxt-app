<template>
	<div
		:class="[
			'price',
			'price-type--' + data.custom.price_type,
			first === 0 ? 'price--free' : '',
			isHovered === 'over' && 'over',
			isHovered === 'out' && 'out'
		]"
		@mouseenter="priceActions(true)"
		@mouseleave="priceActions(false)"
		@click="linkClick"
	>
		<div class="price__title text-paragraph2">{{data.custom.title}}</div>
		<div class="price__size text-h1">{{data.custom.storage}} <span class="price__size__unit">{{data.custom.storage_unit}}</span></div>
		<div class="price__price text-h4"><span class="price__price__currency">{{data.custom.currency}}</span> {{data.custom.price}}</div>
		<div class="price__period text-paragraph3">{{data.custom.per_month}}</div>
		<div class="price__btn">
			<Button :link="{ url: registerUrl() }" :class="{'btn--price': first !== 0, 'btn--price-free': first === 0}">{{data.custom.btn_text}}<span class="price__btn__price"> - {{data.custom.currency + ' ' + data.custom.price}}</span></Button>
		</div>
		<Checklist :data="data.custom.services" />
		<div v-if="data.custom.pro_features" class="price__features">
			<span class="price__features__title">{{langString('_pro_features')}}</span>
			<Checklist :data="data.custom.pro_features" />
		</div>
		<div class="price__flag">
			<span class="price__flag__text">Pro</span>
		</div>
	</div>
</template>

<script>
import Button from '~/components/atoms/button/index.vue';
import Checklist from '~/components/atoms/checklist/index.vue';
import { useLangString } from '~/components/composables/useLangString';
import { DEFAULT_LOCALE } from '~/constants/styles';
import debounce from 'lodash/debounce';
import useStore from '@/store'

export default {
	name: 'Price',
	props: {
		data: { type: Object },
		first: { type: Number },
	},
	data: () => {
		return {
			isHovered: false,
			animationRunning: false,
		};
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	components: {
		Button,
		Checklist,
	},
	methods: {
		registerUrl() {
			const store = useStore();
			const langPrefix =
				DEFAULT_LOCALE !== store.locale
					? `/${store.locale}`
					: '';

			if (this.data.custom.price === '0') {
				return `${langPrefix}/register`;
			}

			return `${langPrefix}/register?kontainer=${this.data.slug}`;
		},
		priceActions(enter) {
			// const price = this.$el;
			const overOut = enter ? 'over' : 'out';
			const isChanging = this.isHovered !== overOut;

			if (!isChanging) {
				return;
			}

			if (!this.animationRunning) {
				this.isHovered = overOut;
				this.animationRunning = true;
			}

			if (typeof this.priceActionCleanup !== 'function') {
				this.priceActionCleanup = debounce((state) => {
					this.isHovered = state;
					this.animationRunning = false;
					this.timer = false;
				}, 400);
			}

			this.priceActionCleanup(overOut);
		},
		linkClick() {
			this.$el.querySelector('.btn').click();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.demo-price {
	display: flex;

	.price {
		opacity: 1;
		transform: translate(0, 0);
	}
}

.price {
	background: $white;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	margin-right: 30px;
	opacity: 0;
	overflow: hidden;
	padding: 50px;
	text-align: center;
	transform: translate(0, 20px);
	width: 100%;
	will-change: border-color, opacity, transform;
	z-index: 0;

	$flag: '';
	$button: '';

	@include media('desktop-1400') {
		padding: 50px 35px;
	}

	@include media('desktop-1200') {
		padding: 50px 25px;
		margin-right: 20px;
	}

	@include media('tablet') {
		padding: 50px;
		margin-right: 0;
		width: calc(50% - 15px);
	}

	@include media('mobile-sm') {
		margin-bottom: 30px;
		width: 100%;
	}

	&:nth-child(-n + 2) {
		@include media('tablet') {
			margin-bottom: 30px;
		}
	}

	&:last-child {
		margin-right: 0;
	}

	@for $i from 1 through 4 {
		&:nth-child(#{$i}) {
			transition: border-color 0.3s $easeInOut,
				opacity 0.3s #{$i * 0.04}s $easeInOut,
				transform 0.3s #{$i * 0.04}s $easeInOut;
		}
	}

	&__title {
		font-weight: $type-light;
		margin-bottom: 24px;
	}

	&__size {
		line-height: 1;
		margin-bottom: 5px;

		@include media('desktop-1400') {
			&__unit {
				font-size: 0.6em;
			}
		}

		@include media('desktop-1200') {
			font-size: 40px;
		}
	}
	&__price {
	}
	&__period {
		color: $gray-alto2;
		font-weight: $type-light;
		margin-bottom: 15px;
	}

	&__btn {
		margin: 0 -10px 20px;

		@include media('desktop-1200') {
			margin: 0 0 20px;
		}

		@include media('tablet') {
			margin: 0 -10px 20px;
		}

		.btn {
			$button: &;
			box-sizing: border-box;
			font-size: 12px;
			font-weight: $type-regular;
			height: 45px;
			line-height: 45px;
			padding: 0;
			width: 100%;
		}

		&__price {
			display: none;

			@include media('desktop-1600-ab') {
				display: inline;
			}
		}
	}

	&-type {
		&--standard {
			#{$button} {
				transition: color 40ms ease 0.185s;

				.background::after {
					transition-delay: 0.185s;
					transition-duration: 40ms;
				}
			}
		}

		&--pro {
			#{$button} {
				transition: color 40ms ease 0.132s;

				.background::after {
					transition-delay: 0.132s;
					transition-duration: 40ms;
				}
			}
		}
	}

	&__features {
		border-top: 1px solid $gray-alto;
		margin: 20px -10px -10px;
		padding: 20px 10px 0;
		text-align: left;

		&__title {
			@extend %text-link;
			color: $gray-gunpowder;
			display: block;
			margin-bottom: 10px;
		}
	}

	&__flag {
		@extend %text-button;
		border-bottom: 45px solid $yellow-dark;
		border-left: 45px solid transparent;
		border-right: 45px solid transparent;
		display: none;
		height: 0;
		left: -29px;
		letter-spacing: 1px;
		position: absolute;
		top: -6px;
		transform: rotate(-45deg);
		width: 0;

		$flag: &;

		&__text {
			position: absolute;
			transform: translate(-50%, 22px);
		}
	}

	&::before {
		border: 10px solid $gray-concrete;
		box-sizing: border-box;
		content: '';
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: -1;
	}

	&::after {
		background: $gray-concrete;
		content: '';
		display: block;
		height: 100%;
		left: 0;
		padding: 10px 0;
		position: absolute;
		top: -15px;
		transform: skewY(-4deg) translate(0, 100%);
		width: 102%;
		z-index: -2;
	}

	&.over,
	&.out {
		transition: opacity 0.4s linear;
	}

	&.over {
		opacity: 1;
		&::after {
			animation: skew-in 0.4s linear normal forwards;
		}

		&.price-type {
			&--standard {
				.btn {
					transition-delay: 0.15s;
					transition-duration: 50ms;

					.background {
						transition-delay: 0.15s;
						transition-duration: 50ms;

						&::after {
							transition-delay: 0.15s;
							transition-duration: 50ms;
						}
					}
				}
			}

			&--pro {
				.btn {
					transition-delay: 0.237s;

					.background {
						transition-delay: 0.237s;

						&::after {
							transition-delay: 0.237s;
						}
					}
				}
			}
		}
	}

	&.out {
		opacity: .8;
		&::after {
			animation: skew-out 0.4s linear normal forwards;
		}
	}

	&--free {
		&::before {
			border-color: $yellow-dark;
		}
	}

	&--pro {
		#{$flag} {
			display: block;
		}
	}
}
</style>

<!-- <docs>
```jsx
<div class="demo-price">
	<Price :data="{
		custom: {
			title: 'Gratis Kontainer',
			storage: '1 GB',
			price: '0 DKK',
			services: '<ul><li>10 brugerkonti</li><li>Api adgang</li></ul>',
			per_month: '/ pr. md',
			btn_text: 'Kom igang',
		},
	}" />
	<Price :data="{
		custom: {
			title: 'Small Kontainer',
			storage: '5 GB',
			price: '95 DKK',
			services: '<ul><li>100 brugerkonti</li><li>Api adgang</li></ul>',
			per_month: '/ pr. md',
			btn_text: 'Kom igang',
		},
	}" />
	<Price :data="{
		custom: {
			title: 'Medium Kontainer',
			storage: '10 GB',
			price: '295 DKK',
			services: '<ul><li>250 brugerkonti</li><li>Api adgang</li></ul>',
			per_month: '/ pr. md',
			btn_text: 'Kom igang',
		},
	}" />
</div>
```
</docs> -->
