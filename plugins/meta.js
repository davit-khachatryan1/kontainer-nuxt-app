import { useHead } from '@vueuse/head';
import { getLocalUrl } from '~/components/composables/getLocalUrl';
import { DEFAULT_LOCALE } from '~/constants/styles';
import useStore from '@/store';

export default defineNuxtPlugin(nuxtApp => {
	const store = useStore()
	nuxtApp.provide('useMeta', (pageData) => {
		let title = pageData.yoast_title || pageData.title;
		title = title.replace('&amp;', '&');
		const meta = [];
		if (pageData.yoast_meta) {
			pageData.yoast_meta.forEach(el => {
				meta.push({
					hid: el.name ? el.name : el.property,
					name: el.name ? el.name : el.property,
					content: el.content,
				});
			});
		}

		let script = [];
		if (pageData.yoast_json_ld) {
			const structuredData = pageData.yoast_json_ld[0];
			script = [{ type: 'application/ld+json', hid: 'ldjson-schema', innerHTML: JSON.stringify(structuredData) }];
		}

		const link = [];
		if (pageData.translated) {
			for (const key in pageData.translated) {
				const lang = key;
				const slug = pageData.translated[key];
				const linkObject = {
					locale: lang,
					slug,
					type: pageData.type,
					url: pageData.url,
				};
				const siteUrl = useRuntimeConfig().public.siteUrl; // Using Nuxt 3 runtime config
				link.push({
					rel: 'alternate',
					hreflang: lang,
					href: siteUrl + getLocalUrl(linkObject)
				});

				if (lang === DEFAULT_LOCALE) {
					link.push({
						rel: 'alternate',
						hreflang: 'x-default',
						href: siteUrl + getLocalUrl(linkObject)
					});
				}

				// CANONICAL
				if (store.locale === lang) { // Adapt based on i18n setup
					link.push({
						rel: 'canonical',
						href: siteUrl + getLocalUrl(linkObject)
					});
				}
			};
		}

		useHead({
			htmlAttrs: { lang: nuxtApp._route.params.lang },
			title,
			meta,
			link,
			script,
		});
	});
});
