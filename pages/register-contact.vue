<template>
    <div>
        <Index />
    </div>
</template>
<script setup>
import Index from '~/pages/[lang]/register-contact.vue';
definePageMeta({
    middleware: ['lang', 'global', 'cleanup'],
    layout: false,
})
</script>
