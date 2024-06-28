// middleware/global.js
import { defineNuxtRouteMiddleware, useNuxtApp } from '#app';
import useStore from '@/store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore()
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig()
  console.log(config.public.baseUrl);
  try {
    const { data } = await nuxtApp.$api.get(config.public.baseUrl + '/api/global', {
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