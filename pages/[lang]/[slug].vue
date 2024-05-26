<template>
  <div>
    <Error :error="error" v-if="error" />
    <ContentSwitch :flexible="flexible" v-else />
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
// Import components
const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

// Import and use mixin as a composable if possible
// Since mixins are not directly supported in <script setup>, consider converting `meta` to a composable if it's not already.
// import useMeta from '~/composables/useMeta';
// useMeta(); // This is an example of how you might use a converted mixin.

const nuxtApp = useNuxtApp();
const flexible = ref(false); // Assuming `flexible` is a property from your data
const error = ref(false); // Assuming `flexible` is a property from your data

// Example of an onMounted lifecycle hook
const fetchPageData = async (slug) => {
  try {
    const data = await nuxtApp.$myAppApi.getPage(slug || "home");
    if (data) {
      nuxtApp.$useMeta(data);
      flexible.value = data.flexible || false; // Modify according to the actual structure of 'data'
    }
  } catch (err) {
    error.value = err;
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

// Watchers, Computed, and other Composition API features can be directly used here.
</script>
