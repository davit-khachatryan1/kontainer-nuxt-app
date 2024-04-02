import axios from 'axios';
import flatten from 'lodash/flatten';

const LOCALES = ['en', 'da', 'de'];
const DEFAULT_LOCALE = 'en';
const RESOURCE_TYPES = ['page', 'news'];
const BASE_ENDPOINTS = {
	page: '/wp-json/wp/v2/pages/',
	news: '/wp-json/wp/v2/news/',
};
const PATH_PREFIXES = {
	page: '',
	news: '/news'
};
const BANNED_SLUGS = [
	'signup-alreadyactive',
	'signup-erroruser',
	'signup-done',
	'register',
	'complete',
	'home',
];
const getLangPrefix = (locale, defaultPath = '') => {
	return locale === DEFAULT_LOCALE ? defaultPath : `/${locale}`;
};
const PRECONFIGURED_ROUTES = [
	{
		url: '/',
		links: [
			...LOCALES.map((locale) => {
				return {
					lang: locale,
					url: getLangPrefix(locale, '/'),
				};
			}),
			{
				lang: 'x-default',
				url: getLangPrefix(DEFAULT_LOCALE, '/'),
			},
		],
	}
];

const ENABLE_DEBUG = false;
const debug = (...msg) => {
	ENABLE_DEBUG && console.warn('SITEMAP:', ...msg);
};

let wpapi = axios;

const preparePathsFromData = (data, excludedSlugs = [], pathPrefix = '') => {
	const routes = [];

	if (data) {
		data.forEach((page) => {
			if (page.slug && !excludedSlugs.includes(page.slug)) {
				const route = {
					url: `${pathPrefix}/${page.slug}`,
					links: [],
				};

				if (page.translated) {
					Object.keys(page.translated).forEach((locale) => {
						const langPrefix = getLangPrefix(locale);
						route.links.push({
							lang: locale,
							url: `${langPrefix}${pathPrefix}/${page.translated[locale]}`,
						});
					});
				}

				route.links.push({
					lang: 'x-default',
					url: `${getLangPrefix(DEFAULT_LOCALE)}${pathPrefix}/${page.slug}`,
				});

				routes.push(route);
			}
		});
	}

	return routes;
};


const getResource = (resourceType, excludedSlugs = []) => {
	const endpoint = BASE_ENDPOINTS[resourceType];
	const pathPrefix = PATH_PREFIXES[resourceType];

	return new Promise((resolve, reject) => {
		wpapi.get(endpoint).then((res) => {
			const pageCount = parseInt(res.headers['x-wp-totalpages'], 10);
			if (pageCount > 1) {
				// fetch rest of pages...
				debug('Fetching rest of pages...');

				const restOfPagesPromise = [];
				const restOfPagesPromiseHandler = (i) => (pageResolve) => {
					debug(`Fetching ${resourceType} #${i}`);
					wpapi.get(endpoint, { params: { page: i } }).then((pageResponse) => {
						// debug(pageResponse.data);
						return pageResolve(preparePathsFromData(pageResponse.data, excludedSlugs, pathPrefix));
					}).catch(() => {
						resolve([]);
					});
				};

				// eslint-disable-next-line no-plusplus
				for (let i = 2; i <= pageCount; i++) {
					restOfPagesPromise.push(new Promise(restOfPagesPromiseHandler(i)));
				}

				resolve(Promise.all(restOfPagesPromise).then((...restOfPages) => {
					// debug('restOfPages', restOfPages);
					return [
						...preparePathsFromData(res.data, excludedSlugs, pathPrefix),
						...flatten(flatten(restOfPages)),
					];
				}));
			} else {
				debug(`All '${resourceType}' fetched.`);
				resolve(preparePathsFromData(res.data, excludedSlugs, pathPrefix));
			}
		}).catch(() => {
			resolve([]);
		});
	});
};

module.exports = (apiUrl) => () => {
	wpapi = axios.create({
		baseURL: apiUrl,
	});

	// 100 is max per_page for Wordpress
	axios.defaults.params = { per_page: 100 };

	console.warn('sitemap', apiUrl);

	const routePromises = RESOURCE_TYPES.map((resourceType) => {
		return getResource(resourceType, resourceType === 'page' ? BANNED_SLUGS : []);
	});

	return Promise.all(routePromises).then((...allRoutes) => {
		const all = flatten(allRoutes);
		return flatten([
			...PRECONFIGURED_ROUTES,
			...all
		]);
	});
};
