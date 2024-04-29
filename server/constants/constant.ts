import { Router } from 'express';
import axios from 'axios';
const config = useRuntimeConfig();

export const envConfigs = {
	env: {
		...config.public
	}
}
export const myCache = new NodeCache({ stdTTL: 360000 });

const DEFAULT_LOCALE = "en";

import bodyParser from 'body-parser';
import NodeCache from 'node-cache';
const router = Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({
	extended: true,
}));

export const wpapi = axios.create({
	baseURL: envConfigs.env.apiUrl,
});

export const getUrlWithLangPrefix = (path: string, options: any) => {
	const { params: { lang = false } = {} } = options;
	const base = `/wp-json/${path}`;

	if (lang && lang !== DEFAULT_LOCALE) {
		return `/${lang}${base}`;
	}

	return base;
};

export const prepareCollection = (posts: any) => {
	const collection: any = [];
	Object.keys(posts).forEach((i) => {
		collection.push(preparePage(posts[i]));
	});
	return collection;
}

export const prepareCollectionFromArray = (posts: any) => {
	const collection = [];
	for (let i = 0; i < posts.length; i += 1) {
		collection.push(preparePage(posts[i]));
	}
	return collection;
}

export const prepareAcf = (data: any) => {
	const result: any = {};
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

export const normalizePost = (post: any) => {
	return {
		date: post.post_date,
		title: post.post_title,
		type: post.post_type,
		slug: post.slug || post.post_name,
	};
}

export const preparePage = (data: any) => {
	const acfData: any = data?.custom ? prepareAcf(data.custom) : null;
	const page: any = {
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
			page[i] = acfData[i] as any;
		});
	}
	return page;
}

export const prepareCategories = (items: any) => {
	const categories: any = {};
	for (let i = 0; i < items.length; i += 1) {
		const item = items[i];
		categories[item.id] = {
			slug: item.slug,
			name: item.name,
		};
	}
	return categories;
}

export const prepTaxonomy = (data = []) => {
	return data.map((item: any) => {
		return {
			id: item.id,
			name: item.name,
			slug: item.slug,
			parent: item.parent,
			description: item.description,
		};
	});
}