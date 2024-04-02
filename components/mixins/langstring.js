import useStore from '@/store'

export default {
	methods: {
		langString(stringName, fallback) {
			const store = useStore()
			const globalOptions = store.pageOptions;
			const translation = globalOptions[stringName];

			if (translation === '' || translation === undefined) {
				if (fallback === undefined) {
					// fallback to string definition
					const stringCleaned = stringName.substr(1).replace(/_/g, ' '); // remove underscores
					return stringCleaned.charAt(0).toUpperCase() + stringCleaned.slice(1); // first char uppercase
				}
				// fallback to second parameter
				return fallback;
			}

			return translation;
		},
	},
};
