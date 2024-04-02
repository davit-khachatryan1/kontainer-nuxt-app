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
        lang: store.locale,
        cache: 1, // Note for removal in 2025
      },
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    });

    console.log(data);

    store.setPageOptions(data.options);
    console.log('data.menus');
    console.log(data.menus, 'data.menus');
    console.log('data.menus');
    store.setMenus(data.menus);
    store.setCategories(data.categories);
  } catch (e) {
    console.warn('Could not get global options', e);
  }
});