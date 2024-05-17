<template>
  <section>
    <ContentSwitch :flexible="flexible" :kards="kards" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import useStore from '@/store';
import { useAsyncData } from '#app';
const ContentSwitch = defineAsyncComponent(() => import('~/components/organisms/content-switch/index.vue'));

import { useNuxtApp } from '#app';
const { $myAppApi } = useNuxtApp()
// Convert mixins to composables

const store = useStore();

// Fetching data with useAsyncData
const { data: collectionData, error, refresh } = useAsyncData('newsCollection', () => {
  return $myAppApi.getCollection('news'); // Adjust the API call according to your setup
});

const flexible = ref([]);

// Computed properties
const locale = computed(() => store.state.locale);

// Processing the data structure for `kards`
const kards = computed(() => {
  return flexible.value.map((layout, index) => {
    if (layout.acf_fc_layout === 'news_list') {
      const lastestNews = collectionData.value.news.map((o) => {
        // Adapt the structure as needed based on your actual data structure
        const newDataStructure = { resource: o };
        newDataStructure.resource.custom = {
          kard_info: newDataStructure.resource.kard_info,
          kard_image: newDataStructure.resource.kard_image,
        };
        return newDataStructure;
      });

      flexible.value[index] = { ...flexible.value[index], lastestNews };
    }
    return false;
  });
});

// Handle transition manually if needed
const transitionEnter = () => {
  store.commit('menuHide', true);
  setTimeout(() => {
    store.commit('menuHide', false);
  }, 10);
};
</script>

