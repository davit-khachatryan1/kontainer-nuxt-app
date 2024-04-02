<template>
	<section class="logos" :class="rowsCount">
		<div class="content-grid-container">
			<Teaser
				:data="data"
				v-if="data.heading || data.text"
				:positionOnPage="positionOnPage"
			/>
			<div class="logo-grid center">
				<div v-for="logo in data.logos_repeater" :class="['logos__item']">
					<SmartLink
						v-bind="logo.logo_link"
						:target="'_blank'"
						v-if="!!logo.logo_link"
					>
						<NuxtImg
							loading="lazy"
							:title="logo.logo_title"
							:src="logo.logo_img.url"
							:alt="logo.logo_img.alt"
						/>
					</SmartLink>
					<NuxtImg
						loading="lazy"
						width="150"
						:height="150 / logo.logo_img.ratio"
						:title="logo.logo_title"
						:src="logo.logo_img.url"
						:alt="logo.logo_img.alt"
						v-else
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import objectFitImages from 'object-fit-images';
import SmartLink from '~/components/helper/smartlink/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';

export default {
	name: 'Logos',
	components: {
		SmartLink,
		Teaser,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	computed: {
		rowsCount() {
			const logosCount = Object.keys(this.data.logos_repeater).length;
			const rows = logosCount / this.data.logos_per_row;
			if (rows === 1) {
				return 'single-row';
			}
			return '';
		},
		mounted: () => {
			objectFitImages();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.center {
	align-items: center;
	justify-content: center;
}
.logos {
	text-align: center;
	padding: 70px 0;
	.logo-grid {
		display: grid;
		width: inherit;
		max-width: inherit;
		justify-items: center;
		grid-template-columns: repeat(6, auto);
		@include media('tablet') {
			grid-template-columns: repeat(4, auto);
		}
		@include media('mobile') {
			grid-template-columns: repeat(2, auto);
		}
	}

	&__item {
		align-items: center;
		display: flex;
		justify-content: center;
		margin: 0 1.2vw;

		img {
			width: 100%;
			height: auto;
			position: relative;
			padding: 25px 15px;
		}

		a {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	margin-top: calc(#{$section-padding-top-negative});
	&.single-row {
		@include media('tablet') {
			.logos__item {
				&:nth-child(n + 5) {
					display: none;
				}
			}
		}
		@include media('mobile-ab') {
			margin: calc(#{$section-padding-top-negative} + 20px) 0
				$section-padding-bottom-negative;
		}
		@include media('mobile') {
			margin: $section-padding-top-mobile-negative 0 0;
			.logos__item {
				&:nth-child(n) {
					display: flex;
				}
			}
		}
	}

	.teaser {
		max-width: 1000px;
		margin: 70px auto;
		@include media('mobile') {
			margin-bottom: 30px;
		}
	}
}
</style>
<!-- <docs>
```jsx
<Logos :data="{
	logos_per_row: '4',
	logos_repeater: [
		{
			logo_title: 'Sony',
			logo_img: {
				id: 57,
				title: 'alka',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/alka.png',
				alt: '',
			},
			},
			{
			logo_title: 'Georg Jensen',
			logo_img: {
				id: '61',
				title: 'georgjensen',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/georgjensen.png',
				alt: '',
			},
			},
			{
			logo_title: 'Universal',
			logo_img: {
				id: 70,
				title: 'universal',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/universal.png',
				alt: '',
			},
			},
			{
			logo_title: 'Lån & Spar',
			logo_img: {
				id: 64,
				title: 'laanogspar',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/laanogspar.png',
				alt: '',
			},
			},
			{
			logo_title: 'Tryg',
			logo_img: {
				id: 69,
				title: 'tryg',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/tryg.png',
				alt: '',
			},
			},
			{
			logo_title: 'Vipp',
			logo_img: {
				id: 71,
				title: 'vipp',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/vipp.png',
				alt: '',
			},
			},
			{
			logo_title: 'Alka',
			logo_img: {
				id: 57,
				title: 'alka',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/alka.png',
				alt: '',
			},
			},
			{
			logo_title: 'Ellos',
			logo_img: {
				id: 60,
				title: 'ellos',
				url: 'http://kontainer-api.test/wp-content/uploads/2018/06/ellos.png',
				alt: '',
			},
			},
	]
}" />
```
</docs> -->
