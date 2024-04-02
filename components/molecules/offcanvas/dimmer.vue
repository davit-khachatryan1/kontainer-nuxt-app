<template>
	<transition name="fade">
		<div v-if="isOpen" class="dimmer" v-on:click="closeMenu"></div>
	</transition>
</template>

<script>
import useStore from '@/store'
export default {
	name: 'OffcanvasDimmer',
	components: {},
	computed: {
		isOpen() {
			const store = useStore();
			return store.menuOpen;
		},
	},
	methods: {
		closeMenu() {
			const store = useStore();
			store.closeMenu();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
.dimmer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	background: rgba(#000, 0.5);
	z-index: z(offcanvasDimmer);
}

.fade-enter-active {
	transition: opacity 400ms $easeInOut;
}

.fade-leave-active {
	transition: opacity 500ms 200ms $easeInOut;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
