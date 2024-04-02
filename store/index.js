import { defineStore } from 'pinia'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '~/constants/styles';
const createStore = defineStore('websiteStore', {
	state: () => ({
		menus: {},
		categories: {},
		pageOptions: {},
		sliderItems: {},
		locales: SUPPORTED_LOCALES,
		locale: DEFAULT_LOCALE,
		menuOpen: false,
		bookDemoOpen: false,
		menuHide: false,
		pageInfo: {
			type: 'page',
			slug: 'home',
			translated: {},
		},
		inputSelect: {},
		extraStorage: {},
		extraUsers: {},
		extraSKUs: {},
		packageInfo: {}, // Save info when signing up on pricelist page
	}),
	actions: {
		setMenus(menus) {
			this.menus = menus;
		},
		setCategories(categories) {
			this.categories = categories;
		},
		setPageOptions(pageOptions) {
			this.pageOptions = pageOptions;
		},
		setSliderItems([key, items]) {
			this.sliderItems[key] = items;
		},
		setLang(locale) {
			if (this.locales.indexOf(locale) !== -1) {
				this.locale = locale;
			}
		},
		setInputSelect({ name, value }) {
			this.inputSelect[name] = value;
		},
		toggleMenu() {
			this.menuOpen = !this.menuOpen;
		},
		closeMenu() {
			this.menuOpen = false;
		},
		menuHide(hide) {
			this.menuHide = hide;
			if (hide) {
				this.menuOpen = false;
			}
		},
		toggleBookDemo() {
			this.bookDemoOpen = !this.bookDemoOpen;
		},
		savePageInfo(pageInfo) {
			this.pageInfo = pageInfo;
		},
		setExtraStorage({ slug, extraStorage }) {
			this.extraStorage[slug] = extraStorage;
		},
		setExtraUsers({ slug, extraUsers }) {
			this.extraUsers[slug] = extraUsers;
		},
		setExtraSKUs({ slug, extraSKUs }) {
			this.extraSKUs[slug] = extraSKUs;
		},
		resetExtras() {
			this.extraUsers = {};
			this.extraStorage = {};
			this.extraSKUs = {};
		},
		setPackageInfo(packageInfo) {
			this.packageInfo = packageInfo;
		},
	}
  })

export default createStore;
