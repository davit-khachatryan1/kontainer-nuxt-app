<template>
    <div>
        <Index />
    </div>
</template>
<script setup>
const Index = defineAsyncComponent(() => import('~/pages/[lang]/register-contact.vue'));

definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
