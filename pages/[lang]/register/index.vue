<template>
	<div class="content-grid-container">
		<SignupAccount :type="'standalone'"></SignupAccount>
	</div>
</template>

<script>
import meta from '~/plugins/meta';
import SignupAccount from '~/components/organisms/signup-account/index.vue';
import useStore from '@/store'
import { useNuxtApp } from '#app';

export default {
	layout: 'modal-like',
	transition: {
		name: 'fade',
		enter() {
			const store = useStore();
			store.menuHide(true);
			setTimeout(() => {
				store.menuHide(false);
			}, 10);
		},
	},
	data() {
		return {
			previousRoute: null,
		};
	},
	components: {
		SignupAccount,
	},
	mixins: [meta],
	async setup(context) {
		const nuxtApp = useNuxtApp()
		return await nuxtApp.$myAppApi.getPage(nuxtApp._route.params.slug || 'Register', context)
			.catch((e) => {
				console.log(e, "e");
				// context.error({ statusCode: 404, message: 'Page not found' });
			});
	},
	computed: {
	},
};
</script>

<!-- <style lang="scss">
.modal-like {
	background: $white;
	height: 100vh;
	left: 0;
	overflow: auto;
	position: absolute;
	top: 0;
	transition-duration: .5s;
	transition-property: opacity, transform;
	transition-timing-function: ease;
	width: 100vw;
	z-index: 2000;

	.layout-enter &, .layout-leave-active & {
		opacity: 0;
		transform: scale(1.2);
	}
}

.layout-enter-active, .layout-leave-active {
	animation: smokescreen 0.5s linear normal forwards;
}

.layout-enter, .layout-leave-active {
	animation: smokescreen 0.5s linear normal forwards;
}
</style> -->
