import { prepareWPObjectsToLinks } from '~/components/helper/smartlink/index.vue';

export default {
	methods: {
		prepLink(obj) {
			return prepareWPObjectsToLinks(obj);
		},
	},
};
