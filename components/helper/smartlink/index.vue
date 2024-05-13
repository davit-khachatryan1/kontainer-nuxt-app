<template>
	<nuxt-link :to="localUrl" v-if="localUrl" v-on:click.native="onClick" :aria-label="ariaLabel">
		<slot></slot>
	</nuxt-link>
	<a v-else :href="externalUrl" :target="linkTarget" v-on:click="onClick" :aria-label="ariaLabel" rel="noopener">
		<slot></slot>
	</a>
</template>


<script>
import { DEFAULT_LOCALE } from '~/constants/styles';
import useStore from '@/store'

const RESSOURCE_TYPES = ['news', 'cases', 'blog'];

const getLocalePrefix = (locale) => {
	return locale === DEFAULT_LOCALE || !locale ? '/' : `/${locale}/`;
};

const prepareWPObjectsToLinks = (obj) => {
	if (!obj) {
		return { url: '#' };
	}

	if (Array.isArray(obj)) {
		return obj.map((currentObj) => {
			return {
				slug: currentObj.link.slug,
				title: currentObj.link.post_title,
				type: currentObj.link.post_type,
			};
		});
	}

	if (obj.slug || obj.post_title || obj.post_type || obj.type || obj.title) {
		return {
			slug: obj.slug,
			title: obj.post_title || obj.title,
			type: obj.post_type || obj.type,
		};
	}

	if (obj.url) {
		return obj;
	}

	return { url: '#' };
};

const getExternalUrl = (link, url) => {
	if (link.url) {
		return link.url;
	}

	return '#';
};

const fixTrailingSlash = (url) => {
	if (url === '/') {
		return url;
	}

	return url.replace(/\/$/, '');
};

const getLocalUrl = (link, stateLocale) => {
	const localePrefix = getLocalePrefix(link.locale || stateLocale);
	if (link.type && !link.slug && RESSOURCE_TYPES.indexOf(link.type) !== -1) {
		link.slug = link.type;
		link.type = 'page';
	}

	if (link.slug && link.type !== 'custom') {
		if (link.type === 'page' && link.slug === 'home') {
			return fixTrailingSlash(localePrefix);
		}

		const resourceType =
			link.type === 'page' || RESSOURCE_TYPES.indexOf(link.slug) !== -1
				? ''
				: `${link.type}/`;

		return fixTrailingSlash(`${localePrefix}${resourceType}${link.slug}`);
	}

	if (typeof link.url === 'string') {
		if (link.url.indexOf(link.baseUrl) === 0) {
			return fixTrailingSlash(link.url.replace(link.baseUrl, ''));
		}

		if (link.url.indexOf('register') !== -1) {
			return fixTrailingSlash(link.url.replace(link.baseUrl, ''));
		}

		return false;
	}

	return fixTrailingSlash(`${localePrefix}`);
};

export { getLocalePrefix, getLocalUrl, prepareWPObjectsToLinks };

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
			const store = useStore();
			return getLocalUrl(this, store.locale);
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
