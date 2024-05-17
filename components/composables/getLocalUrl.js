const RESSOURCE_TYPES = ['news', 'cases', 'blog'];
import { DEFAULT_LOCALE } from '~/constants/styles';

const fixTrailingSlash = (url) => {
	if (url === '/') {
		return url;
	}

	return url.replace(/\/$/, '');
};

const getLocalePrefix = (locale) => {
	return locale === DEFAULT_LOCALE || !locale ? '/' : `/${locale}/`;
};

export const getLocalUrl = (link, stateLocale) => {
    const localePrefix = getLocalePrefix(link.locale || stateLocale);
    if (link.type && !link.slug && RESSOURCE_TYPES.indexOf(link.type) !== -1) {
        link.slug = link.type;
        link.type = 'page';
    }

    if (link.slug && link.type !== 'custom') {
        if (link.type === 'page' && link.slug === 'home') {
            return fixTrailingSlash(localePrefix);
        }

        const resourceType =
            link.type === 'page' || RESSOURCE_TYPES.indexOf(link.slug) !== -1
                ? ''
                : `${link.type}/`;

        return fixTrailingSlash(`${localePrefix}${resourceType}${link.slug}`);
    }

    if (typeof link.url === 'string') {
        if (link.url.indexOf(link.baseUrl) === 0) {
            return fixTrailingSlash(link.url.replace(link.baseUrl, ''));
        }

        if (link.url.indexOf('register') !== -1) {
            return fixTrailingSlash(link.url.replace(link.baseUrl, ''));
        }

        return false;
    }

    return fixTrailingSlash(`${localePrefix}`);
};