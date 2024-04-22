// middleware/global.js
import { defineNuxtRouteMiddleware, useNuxtApp } from '#app';
import useStore from '@/store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore()
  const nuxtApp = useNuxtApp();
  // Assuming `$axios` has been injected into the app context
  // and Vuex store is available as `nuxtApp.$store` in your setup.
  try {
    const {data}  = await nuxtApp.$api.get('api/global', {
      params: {
        lang: to.params.lang,
        cache: 1, // Note for removal in 2025
      },
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    });


    store.setPageOptions(data.options);
    store.setMenus(data.menus);
    store.setCategories(data.categories);
  } catch (e) {
    console.warn('Could not get global options', e);
  }
});