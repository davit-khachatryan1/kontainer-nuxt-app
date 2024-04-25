// server/api/sitemap.js

import axios, { type AxiosInstance } from 'axios';
import flatten from 'lodash/flatten';
const LOCALES = ['en', 'da', 'de'];
const DEFAULT_LOCALE = 'en';
const RESOURCE_TYPES = ['page', 'news'];
const BASE_ENDPOINTS:any = {
	page: '/wp-json/wp/v2/pages/',
	news: '/wp-json/wp/v2/news/',
};
const PATH_PREFIXES: any = {
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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const wpapi = axios.create({
    baseURL: config.public.apiUrl,  // Using runtime config to get API base URL
    params: { per_page: 100 } // Set the max per_page limit for WordPress
  });

  const resources = await getAllResources(wpapi);
  const routes = [...PRECONFIGURED_ROUTES, ...resources];
  return routes;
});

// Define constants

// Function to generate paths from data
const preparePathsFromData = (data: any, resourceType: any) => {
  const excludedSlugs = resourceType === 'page' ? BANNED_SLUGS : [];
  const pathPrefix = PATH_PREFIXES[resourceType];

  return data.filter((page: any) => !excludedSlugs.includes(page.slug))
    .map((page: any) => ({
      url: `${pathPrefix}/${page.slug}`,
      links: LOCALES.map(locale => ({
        lang: locale,
        url: `${getLangPrefix(locale)}${pathPrefix}/${page.slug}`
      })).concat([{ lang: 'x-default', url: `${getLangPrefix(DEFAULT_LOCALE)}${pathPrefix}/${page.slug}` }])
    }));
};

// Utility to fetch all resources
async function getAllResources(wpapi: AxiosInstance) {
  return Promise.all(RESOURCE_TYPES.map(async (type) => {
    const endpoint = BASE_ENDPOINTS[type];
    const response = await wpapi.get(endpoint);
    return preparePathsFromData(response.data, type);
  })).then(flatten);
}

// Utility to handle language prefixes
const getLangPrefix = (locale: any, defaultPath = '') => locale === DEFAULT_LOCALE ? defaultPath : `/${locale}`;

const PRECONFIGURED_ROUTES = [
  {
    url: '/',
    links: LOCALES.map(locale => ({
      lang: locale,
      url: getLangPrefix(locale, '/')
    })).concat([{ lang: 'x-default', url: getLangPrefix(DEFAULT_LOCALE, '/') }])
  }
];
