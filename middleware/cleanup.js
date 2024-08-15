// middleware/cleanup.js
export default defineNuxtRouteMiddleware((to, from) => {
	const params = to.params;

	if (params.error) {
		// In Nuxt 3, use `useError` composable to display an error page
		const { useError } = useNuxtApp();
		useError({ statusCode: 404, message: params.error });
		return abortNavigation(); // Prevents the navigation to the new route
	}
});
