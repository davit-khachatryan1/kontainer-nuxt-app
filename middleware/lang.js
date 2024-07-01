import acceptLanguage from 'accept-language';
import useStore from '@/store';
import Cookies from "js-cookie";

const SUPPORTED_LOCALES = ['en', 'da', 'de'];
const DEFAULT_LOCALE = 'en';

export default defineNuxtRouteMiddleware((to, from) => {
	let locale = DEFAULT_LOCALE;
	const store = useStore();
	if (to.params.lang) {
		if (SUPPORTED_LOCALES.indexOf(to.params.lang) !== -1) {
			locale = to.params.lang;
		} else {
			to.params.slug = to.params.lang;
		}
	} else if (to.params.slug && SUPPORTED_LOCALES.indexOf(to.params.slug) !== -1) {
		to.params.lang = to.params.slug;
		locale = to.params.lang;
		to.params.slug = 'home';
	}

	const cookieLang = Cookies.get('preferredLang');
	let usedLang = cookieLang;
	if (process.server && !cookieLang) {
		acceptLanguage.languages(SUPPORTED_LOCALES);
		usedLang = acceptLanguage.get('accept-language') || DEFAULT_LOCALE;
	}

	if (cookieLang !== usedLang) {
		Cookies.set('preferredLang', usedLang, { path: '/' });
	}

	if (to.fullPath === '/' && usedLang && locale !== usedLang) {
		return window.location.pathname = `/${usedLang}`
	}

	to.params.lang = locale;
	store.setLang(locale);

	if (locale === DEFAULT_LOCALE && to.fullPath.startsWith(`/${DEFAULT_LOCALE}`)) {
		const newPath = to.fullPath.replace(new RegExp(`^/${DEFAULT_LOCALE}`), '');
		return window.location.pathname = newPath
	}

	return null;
});
