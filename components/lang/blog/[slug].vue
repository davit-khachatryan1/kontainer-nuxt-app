<template>
  <div>
    <ContentSwitch :flexible="data.flexible" :type="data.type" v-if="data" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useAsyncData, useNuxtApp } from "#imports";

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

const nuxtApp = useNuxtApp();
const api = nuxtApp.$myAppApi;

const { data, pending, error } = await useAsyncData("fetchData", async () => {
  api.getCollectionItem({}, "blog");
});

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
});
</script>
