import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
	let api = axios.create({
		baseURL: 'http://localhost:3001/',
		headers: {
			common: {},
		},
	});
	return {
		provide: {
			api: api,
		},
	};
});