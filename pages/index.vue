<template>
    <div>
      <Index />
      <NuxtLayout name="default" />
    </div>
  </template>
  
  <script setup>
const Index = defineAsyncComponent(() => import('~/pages/[lang]/[slug].vue'));

  definePageMeta({
      middleware: ['lang', 'global', 'cleanup'],
      layout: false,
  });
  </script>
  