<template>
  <section>
    <ContentSwitch :flexible="data.flexible" :kards="kards" v-if="!pending && !error" />
    <div v-if="pending">Loading...</div>
    <div v-if="error">Error loading data</div>
  </section>
</template>

<script setup>
import { defineAsyncComponent, computed } from "vue";
import { useAsyncData, useNuxtApp, useRoute } from "#imports";
import useStore from "@/store";

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});

const nuxtApp = useNuxtApp();
const route = useRoute();
const store = useStore();

const { data, pending, error, refresh } = await useAsyncData("fetchData", () =>
  nuxtApp.$myAppApi.getPage(route.params.slug || "home")
);

const kards = computed(() => {
  if (!data.value) return [];
  const flexible = data.value.flexible || [];
  const posts = data.value.posts || { blog: [] };
  return flexible
    .map((layout, index) => {
      if (layout.acf_fc_layout === "blog_list") {
        const latestNews = posts.blog.map((o) => {
          return {
            resource: {
              ...o,
              custom: { kard_info: o.kard_info, kard_image: o.kard_image },
            },
          };
        });
        return { ...layout, latestNews };
      }
      return layout;
    })
    .filter((layout) => layout.acf_fc_layout === "blog_list");
});

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
});

onMounted(() => {
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
});
</script>
