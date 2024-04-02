// plugins/vue-select.js
import { defineNuxtPlugin } from '#app';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'; // Ensure to import the CSS as necessary

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('v-select', vSelect);
});
