import { getLocalUrl } from '~/components/composables/getLocalUrl';
import { DEFAULT_LOCALE } from '~/constants/styles';

// plugins/global-head.js
export default defineNuxtPlugin((nuxtApp) => {
	// Access Nuxt 3 app instance, router, etc., as needed
	nuxtApp.vueApp.mixin({
		head() {
			let title = this.yoast_title || this.title;
			title = title.replace('&amp;', '&');

			const meta = [];
			if (this.yoast_meta) {
				this.yoast_meta.forEach((el) => {
					meta.push({
						hid: el.name || el.property,
						name: el.name || el.property,
						content: el.content,
					});
				});
			}

			let script = [];
			if (this.yoast_json_ld) {
				const structuredData = this.yoast_json_ld[0];
				script.push({ type: 'application/ld+json', hid: 'ldjson-schema', json: structuredData });
			}

			const link = [];
			if (this.translated) {
				this.translated?.forEach((slug, lang) => {
					const linkObject = {
						locale: lang,
						slug,
						type: this.type,
						url: this.url,
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
					if (nuxtApp.$i18n.locale === lang) { // Adapt based on i18n setup
						link.push({
							rel: 'canonical',
							href: siteUrl + getLocalUrl(linkObject)
						});
					}
				});
			}

			return {
				title,
				meta,
				link,
				script: script.map(s => ({ ...s, json: s.json ? JSON.stringify(s.json) : undefined })),
			};
		},
	});
});
