<template>
  <div>
    <Index />
  </div>
</template>

<script setup>
const Index = defineAsyncComponent(() => import("~/pages/[lang]/[slug].vue"));

</script>
