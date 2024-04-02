import { defineStore } from 'pinia'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '~/constants/styles';
const createContextStore = defineStore('websiteStore', {
	state: () => ({
		params: {
            lang: 'en',
            slug: null,
            error: null,
            page: null,
            collection: null,
        },
        query: {
            preview: null,
            previewkey: null
        },
        pageInfo: {
			type: 'page',
			slug: 'home',
			translated: {},
		},
	}),
  })

export default createContextStore;
