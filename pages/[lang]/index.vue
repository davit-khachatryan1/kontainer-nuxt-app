<template>
    <Index />
    <NuxtLayout name="default" />
</template>
<script setup>
import Index from './[slug].vue'
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
