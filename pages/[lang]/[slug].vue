<template>
  <div>
    <Error :error="error" v-if="error" />
    <ContentSwitch
      v-if="data?.flexible && !error"
      :flexible="data?.flexible"
      :loaded="loaded"
    />
    <NuxtLayout name="default" />
  </div>
</template>

<script setup>
import useStore from "@/store";
const route = useRoute();

const ContentSwitch = defineAsyncComponent(() =>
  import("~/components/organisms/content-switch/index.vue")
);

const Error = defineAsyncComponent(() => import("~/layouts/error.vue"));

const nuxtApp = useNuxtApp();
const flexible = ref(false);
const { data, pending, error } = await useAsyncData("fetchData", async () =>
  nuxtApp.$myAppApi.getPage(route.params.slug || "home")
);

const loaded = computed(() => !pending.value);

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
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

const enterTransition = () => {
  const store = useStore();
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
};
</script>
