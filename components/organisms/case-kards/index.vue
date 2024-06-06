<template>
	<section class="case-kards">
		<div class="content-grid-container">
			<Teaser :class="'case-kards__teaser'" :data="data" v-if="data.heading || data.text" :positionOnPage="positionOnPage" />
			<div class="span-container">
				<KardComponent :class="['span6', 'span6--tablet', 'span4--mobile']" v-for="(kard, index) in data.resource_repeater" :key="index" :kard="kard" />
			</div>
			<div class="case-kards__actions">
				<ButtonComponent :link="prepLink('cases')" :type="'outline'">{{langString('_view_all_cases')}}</ButtonComponent>
			</div>
		</div>
	</section>
</template>

<script>
const Teaser = defineAsyncComponent(() => import( '~/components/molecules/teaser/index.vue'));
const KardComponent = defineAsyncComponent(() => import( '~/components/molecules/kard/index.vue'));
const ButtonComponent = defineAsyncComponent(() => import('~/components/atoms/button/index.vue'));

import useStore from '@/store';
import { usePrepLink } from '~/components/composables/usePrepLink';
import { useLangString } from '~/components/composables/useLangString';
import { prepareWPObjectsToLinks } from '~/components/composables/prepareWPObjectsToLinks';

export default {
	name: 'CaseKards',
	components: {
		Teaser,
		KardComponent,
		ButtonComponent,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	data() {
		return {
			lastestKards: [],
		};
	},
	setup() {
		const { prepLink } = usePrepLink()
		const { langString } = useLangString()
		return { langString, prepLink };
  	},
	created() {
		const store = useStore();
		if (this.data.fetch_resource_type === 'latest') {
			$fetch(`/api/content/list/cases?lang=${store.locale}`, {
					params: {
						per_page: '3',
						order: 'desc',
						orderby: 'date',
					},
				})
				.then((data) => {
					this.lastestKards = data;
				});
		}
	},
	methods: {
		prepLink(obj) {
			return prepareWPObjectsToLinks(obj);
		},
	},
	computed: {
		kards() {
			return this.data.fetch_resource_type === 'latest'
				? this.lastestKards.map((o) => {
					const newDataStructure = { resource: o };
					newDataStructure.resource.custom = {
						kard_info: newDataStructure.resource.kard_info,
						kard_image: newDataStructure.resource.kard_image,
					};
					delete newDataStructure.resource.kard_info;
					delete newDataStructure.resource.kard_image;
					return newDataStructure;
				})
				: this.data.resource_repeater;
		},
	},
};
</script>


<style scoped lang="scss">
@import "../../../assets/scss/import";
.case-kards {
	padding: $section-inner-padding 0;

	&__teaser {
		text-align: center;
		margin-bottom: 60px;
	}

	&__actions {
		margin-top: 60px;
		text-align: center;
	}
}
</style>

<!-- <docs>
```jsx
<CaseKards/ >
```
</docs> -->
