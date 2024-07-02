import { defineNuxtPlugin } from '#app';
import useStore from "@/store"
import { useRoute } from 'vue-router';
class Api {
	constructor(nuxtApp) {
		this.nuxtApp = nuxtApp;
	}

	async fetchData(path, context, pageInfo) {
		const store = useStore();
		const route = this.nuxtApp._route;
		let requestPath = path;
		const params = {
			lang: this.nuxtApp._route.params.lang,
		};

		if (route && route.query.preview) {
			requestPath += '/preview';
			params.key = route.query.previewkey;
		}

		const config = useRuntimeConfig()
		try {
			const { data } = await this.nuxtApp.$api.get(`${config.public.baseUrl}/api/content/${requestPath}`, {
				params: {
					...params,
					cache: 1 // remove cache: 1 in 2025
				}
			});

			const pageInfoProper = { ...pageInfo };
			if (data.translated && pageInfo.slug) {
				const untranslated = {};
				untranslated[route.params.lang] = pageInfo.slug;
				pageInfoProper.translated = {
					...data.translated,
					...untranslated,
				};
			}

			store.savePageInfo(pageInfoProper);
			return data;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}

	getHomepage(context) {
		return this.fetchData('home', context, { type: 'page', slug: 'home' });
	}

	getCollection(context, collectionType = false) {
		const route = useRoute()

		return this.fetchData(
			collectionType || route.params.page,
			context,
			{ type: collectionType || route.params.page }
		);
	}

	getTaxonomy(context, taxonomy = false) {
		const route = useRoute()
		return this.fetchData(
			`taxonomy/${taxonomy}`,
			context,
			{ type: taxonomy || route.params.page }
		);
	}

	getPage(slug, context) {
		return this.fetchData(slug, context, { type: 'page', slug });
	}

	getCollectionItems(collectionType) {
		return this.fetchData(
			`list/${collectionType}`,
			false,
			{ type: collectionType }
		);
	}

	getCollectionItem(context, collection = false) {
		const collectionType = collection || this.nuxtApp._route.params.collection;
		return this.fetchData(
			`${collectionType}/${this.nuxtApp._route.params.slug || ''}`,
			context,
			{ type: collectionType, slug: this.nuxtApp._route.params.slug }
		).catch((resError) => {
			const { error } = context;
			if (resError.response.statusText && resError.response.status) {
				error({ message: resError.response.statusText, statusCode: resError.response.status });
			} else {
				error({ message: 'Page not found', statusCode: 404 });
			}
		});
	}
}

export default defineNuxtPlugin(nuxtApp => {
	const api = new Api(nuxtApp);
	nuxtApp.provide('myAppApi', api);
});
