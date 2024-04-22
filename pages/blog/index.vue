<template>
    <Index />
</template>
<script setup>
import Index from '~/pages/[lang]/blog/index.vue';
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})

</script>
