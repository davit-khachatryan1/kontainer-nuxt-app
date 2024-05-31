<template>
  <div>
    <Error v-if="error" :error="error" />
    <ContentSwitch :flexible="flexible" :type="type" v-else />
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

const { $myAppApi, $useMeta } = useNuxtApp();

onMounted(async () => {
  // Assuming the context you need is available or constructed here
  // If context is derived from props or other sources, adjust accordingly
  const context = {}; // Construct or derive the needed context

  try {
    const data = await $myAppApi.getCollectionItem(context, "news");
    // Assuming data structure includes { flexible: [], type: '' }, adjust based on actual structure
    flexible.value = data.flexible;
    type.value = data?.type;
    $useMeta(data);
    error.value = false;
  } catch (err) {
    error.value = err;
    console.error("Error fetching collection item:", err);
  }
});
</script>
