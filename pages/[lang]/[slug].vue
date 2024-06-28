<template>
  <div>
    <Error :error="error" v-if="error" />
    <ContentSwitch
      v-if="flexible && !pending && !error"
      :flexible="flexible"
      :loaded="loaded"
    />
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
const { data, pending, error, refresh } = await useAsyncData("fetchData", async () =>
  nuxtApp.$myAppApi.getPage(nuxtApp._route.params.slug || "home")
);

onMounted(async () => {
  flexible.value = data.value?.flexible || false;
});

const loaded = computed(() => !pending.value);

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
});

watch(
  () => [nuxtApp._route.params.slug, nuxtApp._route.params.lang],
  ([newSlug, newLang], [oldSlug, oldLang]) => {
    if (newSlug !== oldSlug || newLang !== oldLang) {
      refresh();
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
