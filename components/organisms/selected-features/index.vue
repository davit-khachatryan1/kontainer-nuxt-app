<template>
	<section class="selected-features content-grid-container">
		<div
			:class="data.alternate_headline ? 'heading-alternate' : 'heading'"
			v-html="data.heading"
		/>
		<div class="subheading" v-html="data.subheading" />

		<div class="selected-features-grid selected-features__container">
			<div
				v-for="(feature, index) in data.features"
				:key="index"
				class="feature-item span4 span6--tablet span4--mobile"
			>
				<div class="feature-item__icon">
					<img
						loading="lazy"
						:title="feature.custom.icon.title"
						:alt="feature.custom.icon.alt"
						:src="feature.custom.icon.url"
					/>
				</div>
				<div class="feature-item__text">
					<div class="feature-item__text__title">
						<span v-html="feature.title" />
						<div class="pro" v-if="feature.custom.pro_badge">PRO+</div>
					</div>
					<div class="feature-item__text__desc" v-html="feature.custom.intro" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import SmartImage from '~/components/helper/smartimage/index.vue';

export default {
	components: {
		SmartImage,
	},
	props: {
		data: { type: Object },
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.selected-features {
	padding-bottom: 70px;
	padding-top: 70px;
	&-grid {
		display: grid;
		width: inherit;
		justify-items: center;
		grid-template-columns: repeat(3, auto);
		@include media('tablet') {
			grid-template-columns: repeat(2, auto);
		}
		@include media('mobile') {
			grid-template-columns: repeat(1, auto);
		}
	}
	.heading {
		@extend %text-h1;
		text-align: center;
	}
	.heading-alternate {
		@extend %text-alternative-h1;
		margin-bottom: 15px;
		text-align: center;

		a {
			text-decoration: none;
		}
	}

	.subheading {
		text-align: center;
		@extend %text-h4;
		margin: 20px auto 0;
		max-width: 1000px;
	}

	&__container {
		margin-top: 80px;

		@include media('mobile') {
			margin-top: 40px;
		}

		.pro {
			color: $yellow-dark;
			background-color: $gray-concrete;
			display: inline-block;
			font-size: 10px;
			font-weight: 500;
			line-height: 11px;
			padding: 3px 6px;
			vertical-align: middle;
			margin-left: 12px;
		}

		.feature-item {
			display: flex;
			margin-bottom: 75px;

			@include media('mobile') {
				margin-bottom: 40px;
			}

			&__icon {
				flex: 13% 0 0;
				margin-right: 20px;
				margin-top: 8px;

				@include media('mobile') {
					flex: 11% 0 0;
				}

				@include media('mobile-sm') {
					flex: 17% 0 0;
				}

				img {
					display: block;
					min-width: 40px;
					max-width: 75px;
					width: 100%;
					height: auto;
				}
			}

			&__text {
				&__title {
					@extend %text-h4;

					@include media('mobile') {
						font-size: 18px;
					}
				}

				&__desc {
					@extend %text-feature-desc;
					margin-top: 5px;

					@include media('mobile-ab') {
						padding-right: 40px;
					}
				}
			}
		}
	}
}
</style>

<!-- <docs>
```jsx
<div>
</div>
```
</docs> -->
