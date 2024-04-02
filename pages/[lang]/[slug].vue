<template>
	<ContentSwitch :flexible="flexible" />
</template>

<script>
import meta from '~/plugins/meta';
import SmartLink from '~/components/helper/smartlink';

import IconAddress from '~/assets/svg/address.svg';
import ContentSection from '~/components/atoms/section';
import ContentSwitch from '~/components/organisms/content-switch/index.vue';
import useStore from '@/store'
import { useRoute } from 'vue-router';
import {useNuxtApp} from '#app'

export default {
	components: {
		SmartLink,
		IconAddress,
		ContentSection,
		ContentSwitch,
	},
	mixins: [meta],
	async setup(context) {
		const nuxtApp = useNuxtApp();
		const route = useRoute()
		const data = await nuxtApp.$myAppApi.getPage(route.params.slug || 'home', context).catch((e) => {
			console.log(e, "e");
			// context.error({ statusCode: 404, message: 'Page not found' });
		});
		return data
	},
	computed: {
	},
	transition: {
		enter() {
			const store = useStore();
			store.menuHide(true);
			setTimeout(() => {
				store.menuHide(false);
			}, 10);
		},
	},
};
</script>

<style lang="scss">
</style>
