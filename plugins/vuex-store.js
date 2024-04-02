import { defineNuxtPlugin } from 'nuxt/app';

import { createPinia } from 'pinia';
import createStore from '~/store';

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  const store = createStore();
});