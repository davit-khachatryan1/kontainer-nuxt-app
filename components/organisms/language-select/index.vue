<template>
	<label v-if="markup === 'select'">
		<InputSelect
			name="language"
			:type="1"
			:options="languageOptions"
			v-on:change="languageSelect"
		/>
	</label>
	<ul v-else-if="markup === 'list'">
		<li @click="languageSelect(lang.value)" v-for="(lang, index) in languageOptions" :key="index">
			<component :is="`Flag${lang.value.toUpperCase()}`"></component>
			<span :class="{'selected': lang.selected}">{{lang.text}}</span>
		</li>
	</ul>
</template>

<script>
const InputSelect = defineAsyncComponent(() => import('~/components/atoms/select/index.vue'));
import {SELECT_STYLE_LANGUAGE} from "~/constants/styles"

import FlagEN from '~/assets/svg/flags/en.svg';
import FlagDA from '~/assets/svg/flags/da.svg';
import FlagDE from '~/assets/svg/flags/de.svg';
import useStore from '@/store'
import { getLocalUrl } from '~/components/composables/getLocalUrl';

export default {
	components: {
		InputSelect,
		FlagEN,
		FlagDA,
		FlagDE,
	},
	props: {
		markup: {
			type: String,
			default: 'select',
			validator(value) {
				// The markup value must match one of these strings
				return ['select', 'list'].indexOf(value) !== -1;
			}
		},
	},
	computed: {
		chooseLang() {
			const store = useStore();
			return store.pageOptions.chooseLang;
		},
		SELECT_STYLE_LANGUAGE() {
			return SELECT_STYLE_LANGUAGE;
		},
		languageOptions() {
			const store = useStore();
			return [
				{
					value: 'en',
					text: 'English',
					selected: store.locale === 'en',
				},
				{
					value: 'da',
					text: 'Dansk',
					selected: store.locale === 'da',
				},
				{
					value: 'de',
					text: 'German',
					selected: store.locale === 'de',
				},
			];
		},
	},
	methods: {
		languageSelect(locale) {
			if(typeof locale == 'string'){
				const store = useStore();
				const { pageInfo } = store;
				const link = getLocalUrl({
					locale,
					type: pageInfo.type,
					slug: pageInfo.slug ? pageInfo.translated[locale] : undefined,
				}) || '/';
				
				const date = new Date();
				const year = 365 * 24 * 60 * 60 * 1000;
				date.setTime(date.getTime() + year);
				const expires = date.toGMTString();
				document.cookie = `preferredLang=${locale}; expires=${expires}; path=/`;

				store.setLang(locale);
				this.$router.push(`${link}`);
			}
		},
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.selected {
	pointer-events: none;
}
</style>
