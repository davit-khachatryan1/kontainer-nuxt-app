<template>
	<div class="employee span4 span4--tablet span4--mobile">
		<div class="employee__image-wrap">
			<smart-image :image="employee.custom.image" :sizes="['profile_thumb_large']"/>
		</div>
		<div class="employee__name">{{employee.title}}</div>
		<div class="employee__jobtitle">{{employee.custom.jobtitle}}</div>
		<div class="employee__contact">
			<div class="employee__contact__phone">
				<div class="info">Tel.</div>
				<div><a :href="`tel:${employee.custom.phone}`">{{employee.custom.phone}}</a></div>
			</div>
			<div class="employee__contact__mail">
				<div class="info">Mail.</div>
				<div><a :href="`mailto:${employee.custom.email}`">{{employee.custom.email}}</a></div>
			</div>
		</div>
	</div>
</template>

<script>
	import SmartImage from '~/components/helper/smartimage/index.vue';

	export default {
		name: 'index.vue',
		props: {
			employee: { type: Object },
		},
		components: {
			SmartImage
		}
	};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
	.employee {
		display: flex;
		flex-direction: column;
		margin-bottom: 60px;

		&__image-wrap {
			background: #ccc;
			height: 0;
			width: 100%;
			padding-bottom: 100%;
			position: relative;

			.bg {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}
		}

		&__name {
			margin-top: 22px;
			line-height: 32px;
			font-size: 24px;
			font-weight: 300;
		}

		&__jobtitle {
			font-size: 15px;
			line-height: 24px;
			font-weight: 300;
		}

		&__contact {
			margin-top: 20px;
			font-size: 15px;
			line-height: 26px;
			font-weight: 300;

			&__phone, &__mail {
				display: flex;

				.info {
					width: 50px;
				}

				a {
					text-decoration: none;
				}
			}
		}
	}
</style>
