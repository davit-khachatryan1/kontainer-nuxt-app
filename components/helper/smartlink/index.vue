<template>
	<nuxt-link :to="localUrl" v-if="localUrl" v-on:click.native="onClick" :aria-label="ariaLabel">
		<slot></slot>
	</nuxt-link>
	<a v-else :href="externalUrl" :target="linkTarget" v-on:click="onClick" :aria-label="ariaLabel" rel="noopener">
		<slot></slot>
	</a>
</template>


<script>
import { getLocalUrl } from '~/components/composables/getLocalUrl';

const getExternalUrl = (link, url) => {
	if (link.url) {
		return link.url;
	}

	return '#';
};


export default {
	name: 'SmartLink',
	props: ['url', 'type', 'slug', 'target', 'onActiveLinkClick', 'ariaLabel', 'locale'],
	computed: {
		baseUrl() {
			const config = useRuntimeConfig();
			return config.public.siteUrl;
		},
		linkTarget() {
			return this.target || '_self';
		},
		externalUrl() {
			return getExternalUrl(this);
		},
		localUrl() {
			const nuxtApp = useNuxtApp()
			return getLocalUrl(this, nuxtApp._route.params.lang);
		},
	},
	methods: {
		onClick(e) {
			if (
				e.target.classList.contains('nuxt-link-active') &&
				typeof this.onActiveLinkClick === 'function'
			) {
				this.onActiveLinkClick();
			}
		},
	},
};
</script>
