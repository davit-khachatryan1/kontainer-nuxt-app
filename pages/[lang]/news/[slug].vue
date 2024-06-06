<template>
  <div>
    <Error v-if="error" :error="error" />
    <ContentSwitch v-else :flexible="flexible" :type="type"  :loaded="loaded" />
    <NuxtLayout name="default" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["lang", "global", "cleanup"],
  layout: false,
});
import { ref, onMounted } from "vue";
const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);
const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

const flexible = ref([]);
const type = ref("");
const error = ref();
const loaded = ref(false);

const { $myAppApi, $useMeta } = useNuxtApp();

onMounted(async () => {
  const context = {};

  try {
    const data = await $myAppApi.getCollectionItem(context, "news");
    flexible.value = data.flexible;
    type.value = data?.type;
    $useMeta(data);
    error.value = false;
  } catch (err) {
    error.value = err;
    console.error("Error fetching collection item:", err);
  } finally {
    loaded.value = true;
  }
});
</script>
