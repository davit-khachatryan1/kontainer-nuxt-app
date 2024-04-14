<template>
    <Index />
    <NuxtLayout name="default" />
</template>
<script setup>
import Index from '~/pages/[lang]/[slug].vue';
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
