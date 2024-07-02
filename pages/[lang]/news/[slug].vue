<template>
  <div>
    <Error v-if="error" :error="error" />
    <ContentSwitch v-else :flexible="data?.flexible" :type="type" :loaded="loaded" />
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

const type = computed(() => data.value?.type || "");
const loaded = computed(() => !pending.value);

onMounted(async () => {
  await refresh();
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    refresh();
  }
);

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
});
</script>
