<template>
  <div>
    <Error v-if="error" :error="error" />
    <ContentSwitch v-else :flexible="flexible" :type="type" :loaded="loaded" />
    <NuxtLayout name="default" />
  </div>
</template>

<script setup>

const route = useRoute();

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);
const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

const nuxtApp = useNuxtApp();

const { data, pending, error, refresh } = await useAsyncData("fetchData", async () =>
  nuxtApp.$myAppApi.getCollectionItem({}, "news")
);

const flexible = computed(() => data.value?.flexible || []);
const type = computed(() => data.value?.type || "");
const loaded = computed(() => !pending.value);

onMounted(async () => {
  await refresh();
  flexible.value = data.value?.flexible || false;
});

watch(
  () => [route.params.slug, route.params.lang],
  async ([newSlug, newLang], [oldSlug, oldLang]) => {
    if (newSlug !== oldSlug || newLang !== oldLang) {
      await refresh();
      flexible.value = data.value?.flexible || false;
    }
  }
);

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
});
</script>
