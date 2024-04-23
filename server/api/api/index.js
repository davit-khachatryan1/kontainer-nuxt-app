import { Router } from 'express';
import axios from 'axios';
import apicache from 'apicache';
import redis from 'redis';
import qs from 'qs';
import config from '~/config';

export const envConfigs = {
	env: {
		...config
	}
}

const DEFAULT_LOCALE = "en";

import bodyParser from 'body-parser';
const router = Router();

const redisOptions = process.env.REDIS_DB ? { db: process.env.REDIS_DB } : {};

const redisClient = redis.createClient(redisOptions);
const cacheOptions = {
	headers: { 'cache-control': 'no-cache' },
	defaultDuration: '100 hours',
};
if (1 || process.env.NODE_ENV === 'production') {
	cacheOptions.redisClient = redisClient;
}
const cache = apicache.options(cacheOptions).middleware;

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({
	extended: true,
}));

console.log(envConfigs.env.apiUrl, 'envConfigs.env.apiUrlenvConfigs.env.apiUrlenvConfigs.env.apiUrl');
const wpapi = axios.create({
	baseURL: envConfigs.env.apiUrl,
});

const getUrlWithLangPrefix = (path, options) => {
	const { params: { lang = false } = {} } = options;
	const base = `/wp-json/${path}`;

	if (lang && lang !== DEFAULT_LOCALE) {
		return `/${lang}${base}`;
	}

	return base;
};

console.log(envConfigs.env.apiUrl);

router.get('/global', cache('10 minutes'), (req, res, next) => {
	const axiosOptions = { params: { ...req.query } };
	const optionsUrl = getUrlWithLangPrefix('kustom/options', axiosOptions);
	const menuPrimaryUrl = getUrlWithLangPrefix('kustom/menu/primary', axiosOptions);
	const categoriesUrl = getUrlWithLangPrefix('wp/v2/categories', axiosOptions);
	axios
		.all([
			wpapi.get(optionsUrl, axiosOptions),
			wpapi.get(menuPrimaryUrl, axiosOptions),
			wpapi.get(categoriesUrl, axiosOptions),
		])
		// eslint-disable-next-line max-params
		.then(axios.spread((options, primary, categories) => {
			res.json({
				options: prepareAcf(options.data),
				menus: {
					primary: primary.data,
				},
				categories: prepareCategories(categories.data),
			});
		}))
		.catch((e) => {
			console.log(e);
			res.status(404).send('Could not get global options');
		});
});

router.post('/sendmessage', (req, res, next) => {
	const contactUrl = getUrlWithLangPrefix('kustom/contactform', req.body);
	wpapi
		.post(contactUrl, req.body)
		.then((response) => {
			res.json({ success: true });
		})
		.catch((e) => {
			res.status(400).send('Something went wrong');
		});
});

router.post('/signupcontactform', (req, res, next) => {
	const contactUrl = getUrlWithLangPrefix('kustom/signupcontactform', req.body);
	wpapi
		.post(contactUrl, req.body)
		.then((response) => {
			res.json({ success: true });
		})
		.catch((e) => {
			res.status(400).send('Something went wrong');
		});
});

router.get('/search/:q', (req, res, next) => {
	const axiosOptions = { params: { ...req.query } };
	const searchUrl = getUrlWithLangPrefix(`kustom/search/${req.params.q}`, axiosOptions);

	wpapi
		.get(searchUrl, axiosOptions)
		.then((response) => {
			res.json(prepareCollection(response.data));
		})
		.catch((e) => {
			res.status(404).send('Not found');
		});
});

router.get('/content/home', cache('10 minutes'), (req, res, next) => {
	const axiosOptions = { params: { ...req.query } };
	const frontpageUrl = getUrlWithLangPrefix('kustom/frontpage', axiosOptions);

	wpapi
		.get(frontpageUrl, axiosOptions)
		.then((response) => {
			const pagesUrl = getUrlWithLangPrefix(`wp/v2/pages/${response.data}`, axiosOptions);
			wpapi
				.get(pagesUrl, axiosOptions)
				.then((pageresponse) => {
					const pageData = preparePage(pageresponse.data);
					res.json(pageData);
				})
				.catch((e) => {
					console.warn('Frontpage died 2', e);
					res.status(404).send('Not found');
				});
		})
		.catch((e) => {
			console.warn('Frontpage died');
			res.status(404).send('Not found');
		});
});

const postTypes = envConfigs.env.postTypes;

function prepareCollection(posts) {
	const collection = [];
	Object.keys(posts).forEach((i) => {
		collection.push(preparePage(posts[i]));
	});
	return collection;
}

function prepareCollectionFromArray(posts) {
	const collection = [];
	for (let i = 0; i < posts.length; i += 1) {
		collection.push(preparePage(posts[i]));
	}
	return collection;
}

function prepareAcf(data) {
	const result = {};
	if (typeof data === 'object') {
		Object.keys(data).forEach((i) => {
			let field = data[i];
			if (Array.isArray(field) && field.length) {
				if (field[0].ID) {
					field = field.map(normalizePost);
				} else {
					field = field.map(prepareAcf);
				}
			}
			result[i] = field;
		});
	}
	return result;
}

function normalizePost(post) {
	return {
		date: post.post_date,
		title: post.post_title,
		type: post.post_type,
		slug: post.slug || post.post_name,
	};
}

function preparePage(data) {
	const acfData = data.custom ? prepareAcf(data.custom) : null;
	const page = {
		id: data.id,
		title: data.title,
		slug: data.slug,
		date: data.date,
		type: data.type,
		categories: data.categories || [],
		translated: data.translated,
		taxonomies: data.taxonomies,
		yoast_title: data.yoast_title,
		yoast_meta: data.yoast_meta,
		yoast_json_ld: data.yoast_json_ld,
	};
	if (acfData) {
		Object.keys(acfData).forEach((i) => {
			page[i] = acfData[i];
		});
	}
	return page;
}

function prepareCategories(items) {
	const categories = {};
	for (let i = 0; i < items.length; i += 1) {
		const item = items[i];
		categories[item.id] = {
			slug: item.slug,
			name: item.name,
		};
	}
	return categories;
}

router.get('/content/:collection/preview', (req, res, next) => {
	const { collection } = req.params;
	const postType = postTypes[collection];
	const { key } = req.query;
	const axiosOptions = { params: { ...req.query } };

	if (postType) {
		// eslint-disable-next-line no-console
		console.log('Getting collection archive', postType);

		const pagesUrl = getUrlWithLangPrefix('wp/v2/pages', axiosOptions);
		const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

		axios
			.all([
				wpapi.get(pagesUrl, { params: { ...req.query, slug: collection } }),
				wpapi.get(postTypeUrl, axiosOptions),
			])
			.then(axios.spread((page, posts) => {
				const pagedata = preparePage(page.data[0]);
				pagedata.posts = { [collection]: prepareCollection(posts.data) };
				res.json(pagedata);
			}))
			.catch((e) => {
				res.status(404).send('Not found');
			});
	} else {
		const pageCollectionUrl = getUrlWithLangPrefix(`wp/v2/pages/${collection}/`, axiosOptions);
		wpapi.get(pageCollectionUrl, {
			params: {
				...req.query,
				preview: true,
				previewkey: key,
			}
		})
			.then((response) => {
				res.json(preparePage(response.data));
			})
			.catch((e) => {
				res.status(404).send('Not found');
			});
	}
});

function prepTaxonomy(data = []) {
	return data.map((item) => {
		return {
			id: item.id,
			name: item.name,
			slug: item.slug,
			parent: item.parent,
			description: item.description,
		};
	});
}

router.get('/content/taxonomy/:taxonomy', cache('10 minutes'), (req, res, next) => {
	const { taxonomy } = req.params;
	const axiosOptions = { params: req.query };
	const taxonomyUrl = getUrlWithLangPrefix(`wp/v2/${taxonomy}`, axiosOptions);

	wpapi
		.get(taxonomyUrl, { params: { ...req.query } })
		.then((response) => {
			res.json(prepTaxonomy(response.data));
		})
		.catch((e) => {
			res.status(404).send('Not found');
		});
});

router.get('/content/:collection', cache('10 minutes'), (req, res, next) => {
	const { collection } = req.params;
	const postType = postTypes[collection];
	const axiosOptions = { params: req.query };
	const pageUrl = getUrlWithLangPrefix('wp/v2/pages', axiosOptions);

	if (postType) {
		// eslint-disable-next-line no-console
		console.log('Getting collection archive', postType);

		const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

		axios
			.all([
				wpapi.get(pageUrl, { params: { ...req.query, slug: collection } }),
				wpapi.get(postTypeUrl, axiosOptions),
			])
			.then(axios.spread((page, posts) => {
				const pagedata = preparePage(page.data[0]);
				pagedata.posts = { [collection]: prepareCollection(posts.data) };
				res.json(pagedata);
			}))
			.catch((e) => {
				res.status(404).send('Not found');
			});
	} else {
		wpapi
			.get(pageUrl, { params: { ...req.query, slug: collection } })
			.then((response) => {
				res.json(preparePage(response.data[0]));
			})
			.catch((e) => {
				res.status(404).send('Not found');
			});
	}
});

router.get(
	'/content/list/:collection',
	cache('10 minutes'),
	(req, res, next) => {
		const { collection } = req.params;
		const postType = postTypes[collection];
		const axiosOptions = { params: req.query };
		const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

		wpapi
			.get(postTypeUrl, axiosOptions)
			.then((response) => {
				const result = prepareCollectionFromArray(response.data);
				res.json(result);
			})
			.catch((e) => {
				res.status(404).send('Not found');
			});
	},
);

router.get('/content/:collection/:slug/preview', (req, res, next) => {
	const { collection, slug } = req.params;
	const { key } = req.query;
	const postType = postTypes[collection];
	const axiosOptions = {
		params: {
			...req.query,
			preview: true,
			previewkey: key,
			slug,
		},
	};
	const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

	wpapi
		.get(postTypeUrl, axiosOptions)
		.then((response) => {
			res.json(preparePage(response.data[0]));
		})
		.catch((e) => {
			res.status(404).send('Not found');
		});
});

router.get(
	'/content/:collection/:slug',
	cache('10 minutes'),
	(req, res, next) => {
		const { collection, slug } = req.params;
		const postType = postTypes[collection];
		const axiosOptions = {
			params: {
				...req.query,
				slug,
			},
		};
		const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
		wpapi
			.get(postTypeUrl, axiosOptions)
			.then((response) => {
				res.json(preparePage(response.data[0]));
			})
			.catch((e) => {
				res.status(404).send('Not found');
			});
	},
);

router.get('/cache/index', (req, res) => {
	redisClient.keys('*', (err, keys) => {
		res.json(keys);
	});
});

router.get('/cache/reindex', (req, res, next) => {
	redisClient.keys('*', (err, keys) => {
		for (let i = 0; i < keys.length; i += 1) {
			deleteUrlFromCache(req, keys[i]);
		}
	});
	res.send('Cache cleared');
});

router.get('/cache/clear', (req, res, next) => {
	redisClient.keys('*', (err, keys) => {
		for (let i = 0; i < keys.length; i += 1) {
			redisClient.del(keys[i]);
		}
	});
	apicache.clear();
	res.send('Cache cleared');
});

function deleteUrlFromCache(req, url, deep = false, params = false) {
	let urlWithQS = url;
	if (params && params.lang) {
		urlWithQS = url + qs.stringify(params, { addQueryPrefix: true });
	}

	// eslint-disable-next-line no-console
	console.log('Deleting url from cache', urlWithQS);
	redisClient.del(urlWithQS);
	axios.get(`${req.protocol}://${req.get('host')}${url}`);

	if (deep) {
		redisClient.keys('*', (err, keys) => {
			for (let i = 0; i < keys.length; i += 1) {
				if (keys[i].indexOf(url) === 0) {
					deleteUrlFromCache(req, keys[i]);
				}
			}
		});
	}
}

router.post('/cache/clear', (req, res, next) => {
	const { slug, type, lang } = req.body;
	console.log('Clear cache, type:', type, ' slug:', slug, ' lang: ', lang); // eslint-disable-line no-console
	if (type === 'global') {
		deleteUrlFromCache(req, '/api/global', false, { lang });
		return res.send('options cleared');
	}
	let redisKey = '/api/content/';
	if (type !== 'page') {
		redisKey += postTypes[type] ? postTypes[type] : type;
		if (postTypes[type]) {
			deleteUrlFromCache(req, `/api/content/list/${postTypes[type]}`, true, { lang });
			deleteUrlFromCache(req, '/api/content/home', false, { lang });
			deleteUrlFromCache(req, redisKey, false, { lang });
		}
		if (slug) redisKey += '/';
	}
	redisKey += slug;
	deleteUrlFromCache(req, redisKey, false, { lang });
	res.send(redisKey);
});

export default router;
