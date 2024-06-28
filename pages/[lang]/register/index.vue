<template>
  <div class="content-grid-container">
    <SignupAccount :type="'standalone'" />
  </div>
</template>

<script setup>
import useStore from "@/store";

const SignupAccount = defineAsyncComponent(() =>
  import("~/components/organisms/signup-account/index.vue")
);

const route = useRoute();
const nuxtApp = useNuxtApp();

const handleEnter = () => {
  const store = useStore();
  store.menuHide(true);
  setTimeout(() => {
    store.menuHide(false);
  }, 10);
};

const { data, error } = await useAsyncData("fetchData", async () =>
  nuxtApp.$myAppApi.getPage(route.params.slug || "Register")
);

const config = useRuntimeConfig();
useHead(() => {
  return {
    ...nuxtApp.$useMeta(data?.value, config.public.baseUrl),
  };
});
</script>

<style lang="scss">
@import "../../../assets/scss/import";

.modal-like {
  background: $white;
  height: 100vh;
  left: 0;
  overflow: auto;
  position: absolute;
  top: 0;
  transition-duration: 0.5s;
  transition-property: opacity, transform;
  transition-timing-function: ease;
  width: 100vw;
  z-index: 2000;

  .layout-enter &,
  .layout-leave-active & {
    opacity: 0;
    transform: scale(1.2);
  }
}

.layout-enter-active,
.layout-leave-active {
  animation: smokescreen 0.5s linear normal forwards;
}

.layout-enter,
.layout-leave-active {
  animation: smokescreen 0.5s linear normal forwards;
}
</style>
