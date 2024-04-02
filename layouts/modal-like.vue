<template>
	<div>
		<div class="modal-like">
			<nuxt/>
		</div>
		<CookieNotification />
	</div>
</template>

<script>
import CookieNotification from '~/components/atoms/cookienotification/index.vue';

export default {
	components: {
		CookieNotification,
	},
	props: ['modal-like'],
};
</script>

<style scoped lang="scss">
</style>
