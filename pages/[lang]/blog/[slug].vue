<template>
	<div>
		<ContentSwitch :flexible="flexible" :type="type" />
	</div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import ContentSwitch from '~/components/organisms/content-switch/index.vue';
import { defineAsyncComponent } from 'vue';

const { api } = useNuxtApp();
const { meta } = useNuxtApp();

const nuxtApp = useNuxtApp();
const context = nuxtApp.vueContext;

const data = await nuxtApp.$myAppApi.getCollectionItem(context, 'blog');
</script>
