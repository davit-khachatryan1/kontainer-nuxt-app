<template>
	<transition name="reveal">
		<div v-if="bookDemo.url && bookDemo.show" class="book-demo">
			<div class="book-demo__inner">
				<iframe @load="iframeLoaded = true" :class="{ 'loaded': iframeLoaded }" :src="bookDemo.url"></iframe>
				<IconLoader class="book-demo__loader" />
				<button class="book-demo__close" @click="store.toggleBookDemo()">Close</button>
			</div>
		</div>
	</transition>
</template>

<script>
const IconLoader = defineAsyncComponent(() => import('~/assets/svg/loader.svg'));

import useStore from '@/store'

export default {
	name: 'bookDemo',
	components: {
		IconLoader
	},
	data: () => {
		const store = useStore();

		return {
			iframeLoaded: false,
			store
		}
	},
	computed: {
		bookDemo() {
			const store = useStore();
			return {
				show: store.bookDemoOpen,
				url: store.pageOptions.book_demo_url,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";

.book-demo {
	height: 100vh;
	width: 100vw;
	max-height: -webkit-fill-available;
	position: fixed;
	top: 0;
	left: 0;
	z-index: z('bookDemoModal');
	background-color: rgba(#000, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;

	&__inner {
		width: 95%;
		height: 95%;
		max-height: 800px;
		max-width: 1200px;
		background: $white;
		position: relative;

		@include media('tablet') {
			max-height: 900px;
		}

		@include media('(max-width: 683px)') {
			padding-top: 50px; //make sure close button is visible!
			width: calc(100% - 20px);
			height: calc(100% - 50px);
		}
	}

	iframe {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 200ms;
		position: relative;
		z-index: 1;

		@include media('(max-width: 683px)') {
			border-top: 1px solid #eee;
		}

		&.loaded {
			opacity: 1;
		}
	}

	&__loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 75px;
		height: 75px;
	}

	&__close {
		position: absolute;
		right: 10px;
		top: 5px;
		cursor: pointer;
		height: 40px;
		width: 40px;
		min-width: 0;
		text-indent: -9999px;
		margin: 0;
		border: 0;
		display: block;
		background-color: transparent;
		z-index: 2;

		&::before,
		&::after {
			content: '';
			height: 2px;
			width: 20px;
			background-color: rgba($black, 0.7);
			position: absolute;
			top: 50%;
			left: 50%;
			transform-origin: center;
			transform: translateX(-50%) rotate(45deg);
		}

		&::after {
			transform: translateX(-50%) rotate(-45deg);
		}
	}
}

.reveal-enter-active,
.reveal-leave-active {
	transition: opacity .2s, transform .3s;
	transition-timing-function: ease;
}

.reveal-enter,
.reveal-leave-to {
	opacity: 0;
	transform: scale(1.05);
}
</style>
