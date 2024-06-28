<template>
  <div>
    <Error v-if="error" :error="error" />
    <ContentSwitch v-else :flexible="flexible" :type="type" :loaded="loaded" />
    <NuxtLayout name="default" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);
const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

const nuxtApp = useNuxtApp();

const { data, pending, error } = await useAsyncData("fetchData", async () =>
  nuxtApp.$myAppApi.getCollectionItem({}, "news")
);

const flexible = computed(() => data.value?.flexible || []);
const type = computed(() => data.value?.type || "");
const loaded = computed(() => !pending.value);

useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value),
  };
});
</script>
