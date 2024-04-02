<template>
	<div>
		<ContentSwitch :flexible="flexible" :type="type" />
	</div>
</template>

<script>
import api from '~/plugins/api';
import meta from '~/plugins/meta';
import ContentSwitch from '~/components/organisms/content-switch/index.vue';
import useStore from '@/store'
import { useNuxtApp } from '#app';

export default {
	components: {
		ContentSwitch,
	},
	mixins: [meta],
	async setup(context) {
		const nuxtApp = useNuxtApp()
		return await nuxtApp.$myAppApi.getCollectionItem(context, 'blog');
	},
	computed: {
	},
};
</script>
