<template>
    <Index />
</template>
<script setup>
import Index from '~/pages/[lang]/blog/[slug].vue';
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
