<template>
	<section class="prices">
		<div class="content-grid-container">
			<div class="span-container">
				<div class="span12">
					<Teaser :class="['teaser--fluid', 'teaser--center', 'prices__title']" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />
					<div class="prices__switch">
						<div class="prices__switch__item text-button" :class="{'active': !listToggled}" @click="listToggled = false">{{data.prices_standard_text}}</div>
						<div class="prices__switch__divider">
							<input v-model="listToggled" type="checkbox" name="check" @click="toggleSwitch" :aria-label="data.prices_standard_text + ' / ' + data.prices_pro_text" />
							<div class="prices__switch__divider__visuals"></div>
						</div>
						<div class="prices__switch__item text-button" :class="{'active': listToggled}" @click="listToggled = true">{{data.prices_pro_text}}</div>
					</div>
					<div class="prices__kontainers">
						<div class="prices__kontainers__content" :class="{'active': !listToggled}">
							<Price v-for="(section, index) in data.prices_standard" :key="section.id" :data="section.price" :first="index" />
						</div>
						<div class="prices__kontainers__content" :class="{'active': listToggled}">
							<Price v-for="section in data.prices_pro" :key="section.id" :data="section.price" :class="['price--pro']" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Price from '~/components/molecules/price/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';

export default {
	name: 'PriceSection',
	components: {
		Price,
		Teaser,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	data: () => ({
    	listToggled: false
	}),
	methods: {
    toggleSwitch() {
        this.listToggled = !this.listToggled;
    },
},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.prices {
	padding: $section-inner-padding 0;

	$visuals: '';

	.content-grid-container {
		@include media('desktop-1400-ab') {
			margin: 0 auto;
			max-width: 1400px;
		}
	}

	.span12 {
		@include media('desktop-1400-ab') {
			margin: 0;
			width: 100%;
		}
	}

	&__title {
		margin-bottom: 60px;
	}

	&__switch {
		align-items: center;
		display: flex;
		justify-content: center;
		margin-bottom: 40px;

		&__item {
			cursor: pointer;
			opacity: 0.4;
			transition: opacity 0.2s ease;
			width: 50%;

			@include media('mobile-sm') {
				margin-bottom: 15px;
				white-space: pre-line;
				line-height: 30px;
				word-break: keep-all;
				height: 30px;
				overflow: hidden;
			}

			&:first-child {
				text-align: right;
			}

			&.active {
				opacity: 1;
			}
		}

		&__divider {
			border-radius: 15px;
			box-sizing: border-box;
			flex-shrink: 0;
			height: 30px;
			margin: 0 15px;
			overflow: hidden;
			padding: 3px;
			position: relative;
			width: 54px;

			@include media('mobile-sm') {
				margin-bottom: 15px;
			}

			&__visuals {
				$visuals: &;
			}

			input {
				cursor: pointer;
				height: 100%;
				left: 0;
				opacity: 0;
				position: absolute;
				top: 0;
				width: 100%;
				z-index: 3;

				+ #{$visuals} {
					&::before {
						background: $blue-dark;
						content: '';
						height: 100%;
						left: 0;
						position: absolute;
						top: 0;
						transition: background 0.3s ease;
						width: 100%;
						will-change: background;
						z-index: 1;
					}

					&::after {
						background: $white;
						border-radius: 50%;
						content: '';
						display: block;
						height: 24px;
						position: relative;
						transform: translate(0, 0);
						transition: transform 0.3s ease;
						width: 24px;
						will-change: transform;
						z-index: 2;
					}
				}

				&:checked {
					+ #{$visuals} {
						&::before {
							background: $yellow-dark;
						}

						&::after {
							transform: translate(100%, 0);
						}
					}
				}
			}
		}
	}

	&__kontainers {
		align-items: flex-start;
		display: flex;

		@include media('mobile-sm') {
			flex-direction: column;
			position: relative;
		}

		&__content {
			display: flex;
			flex-shrink: 0;
			transition: visibility 0.5s ease;
			visibility: hidden;
			width: 100%;

			@include media('tablet') {
				flex-wrap: wrap;
				justify-content: space-between;
			}

			&:first-child {
				@include media('mobile-sm') {
					position: absolute;
					top: 0;
				}
			}

			&:last-child {
				transform: translate(-100%, 0);

				@include media('mobile-sm') {
					transform: translate(0, 0);
				}
			}

			&.active {
				transition: visibility 0.5s 0.5s ease;
				visibility: visible;

				.price {
					opacity: 1;
					transform: translate(0, 0);

					@for $i from 1 through 4 {
						&:nth-child(#{$i}) {
							transition: border-color 0.3s ease,
								opacity 0.3s #{($i * 0.08) + 0.3}s ease,
								transform 0.3s #{($i * 0.08) + 0.3}s ease;
						}
					}
				}
			}
		}
	}
}
</style>

<!-- <docs>
```jsx
<PriceSection :data="{
	prices_standard: [
		{
			price: {
				custom: {
					title: 'Gratis Kontainer',
					storage: '1 GB',
					price: '0 DKK',
					services: '<ul><li>10 brugerkonti</li><li>Api adgang</li></ul>',
					per_month: '/ pr. md',
					btn_text: 'Kom igang',
				},
			},
		},
		{
			price: {
				custom: {
					title: 'Small Kontainer',
					storage: '5 GB',
					price: '95 DKK',
					services: '<ul><li>100 brugerkonti</li><li>Api adgang</li></ul>',
					per_month: '/ pr. md',
					btn_text: 'Kom igang',
				},
			},
		},
		{
			price: {
				custom: {
					title: 'Medium Kontainer',
					storage: '10 GB',
					price: '295 DKK',
					services: '<ul><li>250 brugerkonti</li><li>Api adgang</li></ul>',
					per_month: '/ pr. md',
					btn_text: 'Kom igang',
				},
			},
		},
	],
	prices_pro: [
		{
			price: {
				custom: {
					title: 'Business Kontainer',
					storage: '10 GB',
					price: '295 DKK',
					services: '<ul><li>250 brugerkonti</li><li>Api adgang</li></ul>',
					per_month: '/ pr. md',
					btn_text: 'Kom igang',
				},
			},
		},
		{
			price: {
				custom: {
					title: 'Plus Kontainer',
					storage: '25 GB',
					price: '395 DKK',
					services: '<ul><li>500 brugerkonti</li><li>Api adgang</li></ul>',
					per_month: '/ pr. md',
					btn_text: 'Kom igang',
				},
			},
		},
		{
			price: {
				custom: {
					title: 'Premium Kontainer',
					storage: '50 GB',
					price: '595 DKK',
					services: '<ul><li>1000 brugerkonti</li><li>Api adgang</li><li>Billedredigeringsværktøj</li><li>Billedkonverteringsmodul</li><li>Video- og lydkonvertering</li><li>Brugergruppe administration</li></ul>',
					per_month: '/ pr. md',
					btn_text: 'Kom igang',
				},
			},
		},
	],
}" />
```
</docs> -->
