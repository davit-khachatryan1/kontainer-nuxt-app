<template lang="html">
	<div class="cookie" v-if="!checkCookies && !cookiesAllowed">
		<SmartLink v-bind="policyUrl" class="cookie__text" v-if="store.pageOptions._cookienotice_text">
			{{store.pageOptions._cookienotice_text}}
		</SmartLink>
		<div class="cookie__btn" v-if="store.pageOptions._cookienotice_accept" @click="allowCookies()">
			{{store.pageOptions._cookienotice_accept}}
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import SmartLink, { prepareWPObjectsToLinks } from '~/components/helper/smartlink/index.vue';
import useStore from '@/store'
import Cookies from "js-cookie"

export default {
	components: {
		SmartLink
	},
	data() {
		const store = useStore()
		return {
			cookiesAllowed: false,
			store
		};
	},
	methods: {
		allowCookies() {
			Cookies.set('allowCookies', true);
			this.cookiesAllowed = true;
			// window.trackByDefault = true;
		},
			},
	computed: {
		checkCookies() {
			return Cookies.get('allowCookies') || false;
		},
		policyUrl() {
			const store = useStore();
			return prepareWPObjectsToLinks(store.pageOptions._cookienotice_link);
		}
	},
	created() {
		if (process.browser) {
			window.trackByDefault = true;
		}
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.cookie {
	font-weight: $type-light;
	font-size: 14px;
	line-height: 1.45;
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	min-height: 40px;
	padding: 7px 20px;

	background-color: $blue-dark;
	color: $white;

	z-index: 9999999999; // chatio has some crazy high z-index
	display: flex;
	align-items: center;
	justify-content: center;

	&__text {
		text-decoration: none;
		padding: 0;

		color: $white;
	}
	&__btn {
		background: $brand-green;
		border-color: $brand-green;
		color: $text-color;
		border-radius: 28px;
		padding: 5px 10px;
		font-size: 12px;
		font-weight: 500;

		margin-left: 30px;
		cursor: pointer;

		display: flex;
		align-items: center;
	}
}
</style>
