<template>
    <Index />
</template>
<script setup>
const Index = defineAsyncComponent(() => import('~/pages/[lang]/blog/[slug].vue'));

definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
