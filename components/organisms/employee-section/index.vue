<template>
	<section class="employees content-grid-container">
		<Teaser :class="'link-kards__teaser'" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />

		<div class="span-container employees__container">
			<EmployeeComponent v-for="(employee, index) in data.employees" :employee="employee" :key="index"/>
		</div>
	</section>
</template>

<script>
	import Teaser from '~/components/molecules/teaser/index.vue';
	import EmployeeComponent from '~/components/molecules/employee/index.vue';

	export default {
		name: 'index.vue',
		props: {
			data: { type: Object },
		},
		components: {
			EmployeeComponent,
			Teaser
		}
	};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
	.teaser {
		max-width: 1000px;
		margin: 0 auto 70px;
		text-align: center;

		@include media('mobile') {
			margin-bottom: 30px;
		}
	}

	.employees {
		padding-bottom: 70px;
		padding-top: 70px;

		&__title {
			width: 100%;
		}

		&__container {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
