<template>
	<div v-bind:style="{ transform, transition }"
		:class="['smartflash', (inView ? 'in-view' : '')]"
		v-in-view="(e) => { inView = e }"
	>
		<slot></slot>
	</div>
</template>

<script>
/* eslint-disable no-mixed-operators */

export default {
	data() {
		return {
			inView: false,
			transform: `translateY(${this.distance}px)`,
			transition: `${this.ms}ms`,
		};
	},
	props: {
		ms: {
			default: 300,
			type: Number,
		},
		distance: {
			default: 20,
			type: Number,
		},
	},
};
</script>
<style scoped lang="scss">
@import "../../../assets/scss/import";
.smartflash {
	opacity: 0;
	transition: all 500ms ease-in;
	transform: translateY(20px);

	&.in-view {
		opacity: 1;
		transform: translateY(0) !important;
	}
}
</style>
