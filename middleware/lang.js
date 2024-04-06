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


/* eslint-enable */



// import { defineNuxtRouteMiddleware, useNuxtApp, navigateTo, useCookie } from '#app';
// import acceptLanguage from 'accept-language';
// import { DEFAULT_LOCALE , SUPPORTED_LOCALES} from '~/constants/styles';


// export default defineNuxtRouteMiddleware((to) => {
//   const { $http } = useNuxtApp();
//   const preferredLangCookie = useCookie('preferredLang');
//   let locale = DEFAULT_LOCALE;

//   console.log('useNuxtApp().ssrContext');
//   console.log(useNuxtApp().ssrContext);
//   console.log('useNuxtApp().ssrContext');
//   acceptLanguage.languages(SUPPORTED_LOCALES);
//   const browserLocale = acceptLanguage.get(useNuxtApp().ssrContext?.req.headers['accept-language']) || DEFAULT_LOCALE;
  
//   if (to.params.lang && SUPPORTED_LOCALES.includes(to.params.lang)) {
//     locale = to.params.lang;
//   } else if (to.params.slug && SUPPORTED_LOCALES.includes(to.params.slug)) {
//     to.params.lang = to.params.slug;
//     locale = to.params.lang;
//     to.params.slug = 'home';
//   } else if (!preferredLangCookie.value && process.server) {
//     preferredLangCookie.value = browserLocale;
//   }

//   if (preferredLangCookie.value !== locale) {
//     preferredLangCookie.value = locale;
//   }

//   if (to.path === '/' && preferredLangCookie.value && locale !== preferredLangCookie.value) {
//     return navigateTo(`/${preferredLangCookie.value}`);
//   }

//   // Assuming you have a Vuex store to commit the locale
//   // Note: With Nuxt 3, consider using Pinia or composables for state management.
//   useNuxtApp().$pinia.state.value.locale = locale;

//   if (locale === DEFAULT_LOCALE && to.path.startsWith(`/${DEFAULT_LOCALE}`)) {
//     const newPath = to.path.replace(new RegExp(`^/${DEFAULT_LOCALE}`), '');
//     return navigateTo(newPath || '/');
//   }
// });
