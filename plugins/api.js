import { defineNuxtPlugin } from '#app';
import useStore from "@/store"
import { useRoute } from 'vue-router';
class Api {
	constructor(connection) {
		this.connection = connection;
	}
	
	fetch(path, context, pageInfo) {
		const store = useStore()
		const route = useRoute()
		let requestPath = path;
		const params = {
			lang: route.params.lang,
		};

		if (route && route.query.preview) {
			requestPath += '/preview';
			params.key = route.query.previewkey;
		}

		return this.connection.get(`/api/content/${requestPath}`, { params: {
			...params, cache: 1 // remove cache: 1 in 2025
		} }).then(({ data }) => {
			const pageInfoProper = pageInfo;
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
		});
	}

	getHomepage(context) {
		return this.fetch('home', context, { type: 'page', slug: 'home' });
	}

	getCollection(context, collectionType = false) {
		const route = useRoute()

		return this.fetch(
			collectionType || route.params.page,
			context,
			{ type: collectionType || route.params.page }
		);
	}

	getTaxonomy(context, taxonomy = false) {
		const route = useRoute()
		return this.fetch(
			`taxonomy/${taxonomy}`,
			context,
			{ type: taxonomy || route.params.page }
		);
	}

	getPage(slug, context) {
		console.log("????????????????????????????????????????????????????????????????????????????????????????????", slug);
		return this.fetch(slug, context, { type: 'page', slug });
	}

	getCollectionItems(collectionType) {
		return this.fetch(
			`list/${collectionType}`,
			false,
			{ type: collectionType }
		);
	}

	getCollectionItem(context, collection = false) {
		const route = useRoute()
		const collectionType = collection || route.params.collection;
		return this.fetch(
			`${collectionType}/${route.params.slug}`,
			context,
			{ type: collectionType, slug: route.params.slug }
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
	const api = new Api(nuxtApp.$api);
	nuxtApp.provide('myAppApi', api); 
});
