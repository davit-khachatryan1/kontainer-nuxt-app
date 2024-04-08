<template>
  <section>
    <ContentSwitch :flexible="flexible" :kards="kards" />
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useNuxtApp } from "#app";
import ContentSwitch from "~/components/organisms/content-switch/index.vue";
import { useStore } from "@/store";
import lodash from "lodash";

const nuxtApp = useNuxtApp();
const { api } = nuxtApp.$config;

// Assuming `flexible` and `posts` are part of the data fetched from the API
const flexible = ref([]);
const posts = ref({ news: [] });

onMounted(async () => {
  // Assuming `getCollection` is a function that takes a context and a string identifier
  // Adjust this call to match your actual API function and its expected parameters
  const data = await api.getCollection("news");
  flexible.value = data.flexible;
  posts.value = { news: data.posts };
});

const kards = ref([]);

// Watch for changes in `flexible` and update `kards` accordingly
watch(flexible, (newValue) => {
  newValue.forEach((layout, index) => {
    if (layout.acf_fc_layout === "news_list") {
      const latestNews = posts.value.news.map((o) => {
        return {
          resource: {
            ...o,
            custom: {
              kard_info: o.kard_info,
              kard_image: o.kard_image,
            },
          },
        };
      });
      flexible.value[index] = { ...flexible.value[index], latestNews };
    }
  });
  kards.value = lodash.cloneDeep(flexible.value); // Use lodash to deep clone and trigger reactivity
});

// Transition logic adapted for Vue 3
const store = useStore();
onMounted(() => {
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
});
</script>
