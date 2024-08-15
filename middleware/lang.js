import acceptLanguage from 'accept-language';
import useStore from '@/store'
import Cookies from "js-cookie"
import { useRouter} from 'vue-router';
const SUPPORTED_LOCALES = ['en', 'da', 'de'];
const DEFAULT_LOCALE = 'en';
export default defineNuxtRouteMiddleware((to, from) => {
	const router = useRouter();
	let locale = DEFAULT_LOCALE;
	const store = useStore()
	if (to.params.lang) {
		if (SUPPORTED_LOCALES.indexOf(to.params.lang) !== -1) {
			locale = to.params.lang;
		} else {
			// eslint-disable-next-line no-console
			// context.params.error = { message: 'Page not found', statusCode: 404 };
			to.params.slug = to.params.lang;
		}
	} else if (to.params.slug && SUPPORTED_LOCALES.indexOf(to.params.slug) !== -1) {
		to.params.lang = to.params.slug;
		locale = to.params.lang;
		to.params.slug = 'home';
	}


	// eslint-disable-next-line no-console
	// console.log(Object.keys(context));
	// set preferered lang if SSR and language isn't already saved
	const cookieLang = Cookies.get('preferredLang');
		let usedLang = cookieLang;
	if (process.server && !cookieLang) {
		acceptLanguage.languages(SUPPORTED_LOCALES);
		usedLang = acceptLanguage.get('accept-language') || DEFAULT_LOCALE;
	}

	if (cookieLang !== usedLang) {
		Cookies.set('preferredLang', usedLang, { path: '/' });
	}
	
	// if visiting homepage and a preferred language is saved redirect to language-home
	if (to.fullPath === '/' && usedLang && locale !== usedLang) {
		return router.push(`/${usedLang}`, {replace: true})
	}
	
	// override lang param
	to.params.lang = locale;
	store.setLang(to.params.lang);
	
	if (locale === DEFAULT_LOCALE && to.fullPath.indexOf(`/${DEFAULT_LOCALE}`) === 0) {
		const toReplace = `^/${DEFAULT_LOCALE}`;
		const re = new RegExp(toReplace);
		return router.push(to.fullPath.replace(re, ''), {replace: true})
	}

	return null;
});
