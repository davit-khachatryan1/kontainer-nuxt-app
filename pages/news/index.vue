<template>
    <Index />
</template>
<script setup>
const Index = defineAsyncComponent(() => import('~/pages/[lang]/news/index.vue'));


</script>
