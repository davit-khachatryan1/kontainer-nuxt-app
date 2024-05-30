<template>
  <section>
    <ContentSwitch :flexible="flexible" :kards="kards" />
    <NuxtLayout name="default" />
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});
import { ref, onMounted } from "vue";
import useStore from "@/store";
const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

const { $myAppApi, $useMeta } = useNuxtApp();

const store = useStore();

const flexible = ref([]);

onMounted(async () => {
  try {
    const data = await $myAppApi.getCollection({}, "news");
    flexible.value = data.flexible;
    $useMeta(data);

    return flexible.value.map((layout, index) => {
      if (layout.acf_fc_layout === "news_list") {
        const lastestNews = data.posts.news.map((o) => {
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
  } catch (error) {
    console.error("Error fetching collection item:", error);
  }
});

const transitionEnter = () => {
  store.commit("menuHide", true);
  setTimeout(() => {
    store.commit("menuHide", false);
  }, 10);
};
</script>
