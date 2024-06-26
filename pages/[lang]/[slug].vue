<template>
  <div>
    <Error :error="error" v-if="error" />
    <ContentSwitch :flexible="flexible" v-else :loaded="loaded" />
    <NuxtLayout name="default" />
  </div>
</template>

<script setup>
import useStore from "@/store";

definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

const nuxtApp = useNuxtApp();
const flexible = ref(false);
const loaded = ref(false);
const error = ref(null);

const fetchPageData = async (slug) => {
  try {
    const data = await nuxtApp.$myAppApi.getPage(slug || "home");
    if (data) {
      // nuxtApp.$useMeta(data);
      flexible.value = data.flexible || false;
    }
    error.value = null;
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
  () => [nuxtApp._route.params.slug, nuxtApp._route.params.lang],
  ([newSlug, newLang], [oldSlug, oldLang]) => {
    if (newSlug !== oldSlug || newLang !== oldLang) {
      fetchPageData(newSlug);
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
