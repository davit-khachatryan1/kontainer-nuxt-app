<template>
	<div class="default">
		<OffcanvasMenu />
		<nuxt />
		<div class="page-leave-overlay"></div>
		<FooterComponent />
		<BookDemoModal />
		<CookieNotification />
	</div>
</template>

<script>
import PageNav from '~/components/organisms/page-nav';
import OffcanvasMenu from '~/components/molecules/offcanvas/index.vue';
import BookDemoModal from '~/components/molecules/book-demo';
import FooterComponent from '~/components/organisms/footer';
import CookieNotification from '~/components/atoms/cookienotification';

export default {
	components: {
		PageNav,
		OffcanvasMenu,
		BookDemoModal,
		FooterComponent,
		CookieNotification,
	},
};
</script>

<style lang="scss" scoped>
.default {
	overflow: hidden;
}
</style>
