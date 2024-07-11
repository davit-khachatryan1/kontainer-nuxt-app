import axios, { type AxiosInstance } from 'axios';
const LOCALES = ['en', 'da', 'de'];
const DEFAULT_LOCALE = 'en';
const RESOURCE_TYPES = ['page', 'news'];
const BASE_ENDPOINTS: any = {
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
    baseURL: config.public.apiUrl,
    params: { per_page: 100 }
  });

  const resources = await getAllResources(wpapi);
  const routes = [...PRECONFIGURED_ROUTES, ...resources];
  const newRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    const element = routes[i];
    for (let j = 0; j < element.links.length; j++) {
      const link = element.links[j];
      newRoutes.push({
        url: link.url
      })
    }
    
  }
  return newRoutes;
});

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

async function getAllResources(wpapi: AxiosInstance) {
  return Promise.all(RESOURCE_TYPES.map(async (type) => {
    const endpoint = BASE_ENDPOINTS[type];
    const response = await wpapi.get(endpoint);
    return preparePathsFromData(response.data, type);
  })).then(res => res.flat());
}

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
