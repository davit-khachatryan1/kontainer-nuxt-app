<template>
  <div>
    <Error :error="error" v-if="error" />
    <ContentSwitch :flexible="flexible" v-else :loaded="loaded" />
    <NuxtLayout name="default" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});
import { onMounted, ref, watch } from "vue";
import useStore from "@/store";

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

const nuxtApp = useNuxtApp();
const flexible = ref(false);
const loaded = ref(false);
const error = ref(false);

const fetchPageData = async (slug) => {
  try {
    const data = await nuxtApp.$myAppApi.getPage(slug || "home");
    if (data) {
      nuxtApp.$useMeta(data);
      flexible.value = data.flexible || false;
    }
    error.value = false;
  } catch (err) {
    error.value = err;
  } finally {
    loaded.value = true;
  }
};

onMounted(() => {
  fetchPageData(nuxtApp._route.params.slug);
});

watch(
  () => nuxtApp._route.params.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      fetchPageData(newSlug);
    }
  }
);

watch(
  () => nuxtApp._route.params.lang,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      fetchPageData(nuxtApp._route.params.slug);
    }
  }
);

const enterTransition = () => {
  const store = useStore();
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
};

</script>
