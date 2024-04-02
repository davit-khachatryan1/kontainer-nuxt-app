<template>
	<section>
		<ContentSwitch :flexible="flexible" :kards="kards" />
	</section>
</template>

<script>
import find from 'lodash/find';
import api from '~/plugins/api';
import meta from '~/plugins/meta';
import ContentSwitch from '~/components/organisms/content-switch/index.vue';
import useStore from '@/store'

export default {
	mixins: [meta],
	components: {
		ContentSwitch,
	},
	async setup(context) {
		return api.getCollection(context, 'blog');
	},
	computed: {
		kards() {
			find(this.flexible, (layout, index) => {
				if (layout.acf_fc_layout === 'blog_list') {
					const lastestNews = this.posts.blog.map((o) => {
						// hack for different data structure
						const newDataStructure = { resource: o };
						newDataStructure.resource.custom = {
							kard_info: newDataStructure.resource.kard_info,
							kard_image: newDataStructure.resource.kard_image,
						};
						return newDataStructure;
					});

					this.flexible[index] = { ...this.flexible[index], lastestNews };
				}
				return false;
			});
		},
	},
	transition: {
		enter() {
			const store = useStore();
			store.menuHide(true);
			setTimeout(() => {
				store.menuHide(false);
			}, 10);
		},
	},
};
</script>
