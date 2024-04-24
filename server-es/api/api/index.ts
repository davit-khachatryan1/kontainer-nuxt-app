

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
