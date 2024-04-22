<template>
    <div>
        <Index />
        <NuxtLayout name="default" />
    </div>
</template>
<script setup>
import Index from './[slug].vue'
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
