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
const api = nuxtApp.$myAppApi;
const flexible = ref([]);
const posts = ref({ blog: [] });

onMounted(async () => {
  const context = {};
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

const store = useStore();
onMounted(() => {
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
});
</script>
