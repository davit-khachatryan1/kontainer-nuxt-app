// plugins/swiper.js
import { defineNuxtPlugin } from '#app';
import { Swiper, SwiperSlide } from 'swiper/vue';
// import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default defineNuxtPlugin((nuxtApp) => {
  // SwiperCore.use([Navigation, Pagination]);

  nuxtApp.vueApp.component('Swiper', Swiper);
  nuxtApp.vueApp.component('SwiperSlide', SwiperSlide);
});
