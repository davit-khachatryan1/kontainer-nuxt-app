<template>
	<div>
		<ContentSwitch :flexible="flexible" :type="type" />
	</div>
</template>

<script setup>
definePageMeta({
  middleware: ['lang', 'global', 'cleanup'],
  layout: false,
})
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import ContentSwitch from '~/components/organisms/content-switch/index.vue';

const flexible = ref([]);
const type = ref('');

const { $myAppApi } = useNuxtApp();

onMounted(async () => {
  // Assuming the context you need is available or constructed here
  // If context is derived from props or other sources, adjust accordingly
  const context = {}; // Construct or derive the needed context

  try {
    const data = await $myAppApi.getCollectionItem(context, 'news');
    // Assuming data structure includes { flexible: [], type: '' }, adjust based on actual structure
    flexible.value = data.flexible;
    type.value = data.type;
  } catch (error) {
    console.error('Error fetching collection item:', error);
  }
});
</script>
