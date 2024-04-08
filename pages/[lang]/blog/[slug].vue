<template>
	<div>
		<ContentSwitch :flexible="flexible" :type="type" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from '#app';
import ContentSwitch from '~/components/organisms/content-switch/index.vue';
const flexible = ref([]);
const nuxtApp = useNuxtApp();
const api = nuxtApp.$myAppApi;
definePageMeta({
	middleware: ['lang', 'global', 'cleanup'],
	layout: false,
})
onMounted(async () => {
	const context = {}; // Define or get your context
	const data = await api.getCollectionItem(context, 'blog');
	flexible.value = data?.flexible || [];
	posts.value = data?.posts || { blog: [] };
});
</script>
