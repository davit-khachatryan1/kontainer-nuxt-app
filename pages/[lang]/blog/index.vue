<template>
  <section>
    <ContentSwitch :flexible="flexible" :kards="kards" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);
import useStore from "@/store";
definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});
const nuxtApp = useNuxtApp();
const api = nuxtApp.$myAppApi; // Assuming your plugin is made available globally through Nuxt 3 plugins
const flexible = ref([]); // Assuming flexible is a prop or needs to be fetched
const posts = ref({ blog: [] });

// Simulating the async setup behavior with onMounted in Vue 3
onMounted(async () => {
  const context = {}; // Define or get your context
  const data = await api.getCollection(context, "blog");
  flexible.value = data?.flexible || [];
  posts.value = data?.posts || { blog: [] };
  nuxtApp.$useMeta(data);
});

const kards = computed(() => {
  return flexible.value
    .map((layout, index) => {
      if (layout.acf_fc_layout === "blog_list") {
        const lastestNews = posts.value.blog.map((o) => {
          // Adaptation for different data structure
          const newDataStructure = {
            resource: {
              ...o,
              custom: { kard_info: o.kard_info, kard_image: o.kard_image },
            },
          };
          return newDataStructure;
        });
        return { ...layout, lastestNews };
      }
      return layout;
    })
    .filter((layout) => layout.acf_fc_layout === "blog_list");
});

// Transition-related logic adapted for Vue 3
const store = useStore();
onMounted(() => {
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
});
</script>
