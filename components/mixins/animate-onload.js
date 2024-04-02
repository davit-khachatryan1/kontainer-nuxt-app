export default {
	data: () => {
		return {
			initAnimations: false,
		};
	},

	created() {
		setTimeout(() => {
			this.initAnimations = true;
		}, 0);
	},
};
