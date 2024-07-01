<template>
  <div>
    <Index />
  </div>
</template>
<script setup>
const Index = defineAsyncComponent(() => import("./[slug].vue"));

</script>
