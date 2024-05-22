// middleware/global.js
import { defineNuxtRouteMiddleware, useNuxtApp } from '#app';
import useStore from '@/store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore()

  if (process.server) return
  try {
    const data = await $fetch(`${window.location.origin}/api/global`, {
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