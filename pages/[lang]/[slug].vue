<template>
    <ContentSwitch :flexible="flexible" />
  </template>
  
  <script setup>
  definePageMeta({
      middleware: ['lang', 'global', 'cleanup'],
      layout: false,
  })
  import { onMounted, ref } from 'vue';
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
  console.log(nuxtApp);
  
  // Example of an onMounted lifecycle hook
  onMounted(async () => {
    try {
      // Assuming nuxtApp.$myAppApi.getPage returns a promise that resolves with your page data
      const data = await nuxtApp.$myAppApi.getPage(nuxtApp._route.params.slug || 'home').catch((e) => {
        console.error(e, "Error fetching page data");
        // Handle error
      });
      if (data) {
        flexible.value = data.flexible || false; // Modify according to the actual structure of 'data'
      }
    } catch (error) {
      console.error(error, "Error during onMounted");
    }
  });
  
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
  