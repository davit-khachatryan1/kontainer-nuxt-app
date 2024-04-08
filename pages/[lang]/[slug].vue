<template>
  <ContentSwitch :flexible="flexible" />
</template>

<script setup>
definePageMeta({
  middleware: ['lang', 'global', 'cleanup'],
  layout: false,
})
import { onMounted, ref, watch } from 'vue';
import { useNuxtApp } from '#app';
import useStore from '@/store';

// Import components
import ContentSwitch from '~/components/organisms/content-switch/index.vue';

// Import and use mixin as a composable if possible
// Since mixins are not directly supported in <script setup>, consider converting `meta` to a composable if it's not already.
// import useMeta from '~/composables/useMeta'; 
// useMeta(); // This is an example of how you might use a converted mixin.

import meta from '~/plugins/meta'

const nuxtApp = useNuxtApp();
const flexible = ref(false); // Assuming `flexible` is a property from your data

// Example of an onMounted lifecycle hook
const fetchPageData = async (slug) => {
  try {
    const data = await nuxtApp.$myAppApi.getPage(slug || 'home');
    if (data) {
      flexible.value = data.flexible || false; // Modify according to the actual structure of 'data'
    }
  } catch (error) {
    console.error(error, "Error fetching page data");
  }
};

// Fetch data on mount for the initial slug
onMounted(() => {
  fetchPageData(nuxtApp._route.params.slug);
});

watch(() => nuxtApp._route.params.slug, (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    fetchPageData(newSlug);
  }
});
// watch(() => nuxtApp._route.params.lang, (newSlug, oldSlug) => {
//   if (newSlug !== oldSlug) {
//     fetchPageData(newSlug);
//   }
// });

// Transition enter function
const enterTransition = () => {
  const store = useStore();
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
};

// Watchers, Computed, and other Composition API features can be directly used here.
</script>

<style lang="scss">
/* Your styles here */
</style>