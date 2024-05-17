<template>
	<div class="default">
		<OffcanvasMenu />
		<nuxt />
		<div class="page-leave-overlay"/>
		<FooterComponent />
		<BookDemoModal />
	</div>
</template>

<script>
import PageNav from '~/components/organisms/page-nav';
import OffcanvasMenu from '~/components/molecules/offcanvas/index.vue';
import BookDemoModal from '~/components/molecules/book-demo';
import FooterComponent from '~/components/organisms/footer';

export default {
	components: {
		PageNav,
		OffcanvasMenu,
		BookDemoModal,
		FooterComponent,
	},
};
</script>

<style lang="scss" scoped>
.default {
	//overflow: hidden;
}
</style>
