<template>
    <NuxtPage />
</template>

<script setup>
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
