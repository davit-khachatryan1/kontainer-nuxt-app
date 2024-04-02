export default {
	data() {
		return {
			focused: false,
			hasValue: false,
		};
	},
	methods: {
		focusCheck(focused) {
			this.focused = focused;
		},

		valueCheck(event) {
			if (event.target.value) {
				this.hasValue = true;
			} else {
				this.hasValue = false;
			}
		},
	},
	created() {
		if (this.value) {
			this.hasValue = true;
		}
	},
	beforeUpdate() {
		if (this.value) {
			this.hasValue = true;
		}
	}
};
