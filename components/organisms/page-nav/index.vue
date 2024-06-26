<template>
	<div class="header">
		<nav class="content-grid-container nav">
			<div class="nav__left">
				<smart-link class="nav__left__logo" type="page" slug="home" :ariaLabel="logoLabel">
					<IconLogoMark class="icon--logo-mark" />
					<IconLogoText class="icon--logo-text" />
				</smart-link>
			</div>
			<div class="nav__right">
				<ol @mouseover="hoverMenu = true" @mouseleave="hoverMenu = false" :class="{ hover: hoverMenu }">
					<li v-for="(item, index) in menuItems" :key="index" :class="{ 'has-dropdown': item.children }"
						class="nav__right__menu-item">
						<template v-if="item.children">
							<span :class="[
					'link',
					{ 'nuxt-link-active': activeMenuParent === item.slug },
				]">
								<span v-html="item.title" />
								<iconCaret class="has-dropdown__icon" />
							</span>
							<transition name="fade">
								<ol class="dropdown">
									<li v-for="(sublink, index) in item.children" :key="index"
										:class="{ 'has-dropdown': sublink.children }">
										<a v-if="sublink.children" :class="[
					'link',
					{
						'nuxt-link-exact-active':
							activeMenuParent === item.slug,
					},
				]" v-html="sublink.title" />

										<smart-link v-else class="link" :type="sublink.type" :slug="sublink.slug"
											:url="sublink.url">
											<span v-html="sublink.title" />
										</smart-link>
									</li>
								</ol>
							</transition>
						</template>

						<smart-link v-else class="link" :type="item.type" :slug="item.slug" :url="item.url">
							<span v-html="item.title" />
						</smart-link>
					</li>

					<li class="nav__right__ctas">
						<button-comp v-if="bookDemo.show" id="democlick" class="btn--cta" :link="bookDemo.link">
							<span class="btn__text">{{ bookDemo.title }}</span>
						</button-comp>
						<button-comp id="trialclick" v-if="cta.link" :class="cta.class" :link="cta.link">
							<span class="btn__text btn__text--long">{{ cta.title }}</span>
							<span class="btn__text btn__text--short">{{ cta.titleShort }}</span>
						</button-comp>
					</li>
					<li class="nav__right__language has-dropdown no-css-hover" @mouseenter="handleLangMenuHover"
						@mouseleave="handleLangMenuHover" @click="handleLangMenuClick">
						<LanguageIcon class="globe" />
						<iconCaret class="has-dropdown__icon" />
						<transition name="fade">
							<LanguageSelect :class="{ show: showLanguageMenu }" class="dropdown" markup="list" />
						</transition>
					</li>
					<li class="nav__right__menu-item">
						<hamburger />
					</li>
				</ol>
			</div>
		</nav>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import useStore from '@/store'; // Assuming you're using Vuex 4 for Nuxt 3
import { useNuxtApp } from '#app';
import forEach from 'lodash/forEach';
import SmartLink, { prepareWPObjectsToLinks } from '~/components/helper/smartlink/index.vue';
import LanguageSelect from '~/components/organisms/language-select/index.vue';
import ButtonComp from '~/components/atoms/button/index.vue';
import Hamburger from '~/components/atoms/hamburger/index.vue';
import iconCaret from '~/assets/svg/caret-select.svg';
import LanguageIcon from '~/assets/svg/language.svg';
import IconLogoText from '~/assets/svg/kontainer-logo-text.svg';
import IconLogoMark from '~/assets/svg/kontainer-logo-mark.svg';

// Refs for reactive state
const submenuOpen = ref(false);
const openMenuItem = ref(false);
const hoverMenu = ref(false);
const hoverSubmenu = ref(false);
const showLanguageMenu = ref(false);

const store = useStore(); // Use your Vuex store
const nuxtApp = useNuxtApp(); // Access Nuxt 3 app context

// Computed properties
const logoLabel = computed(() => store.pageOptions.logo_label);
const menuItems = computed(() => store.menus ? store.menus.primary : []);
const cta = computed(() => ({
  title: store.pageOptions.navcta_title,
  titleShort: store.pageOptions.navcta_title_short,
  link: prepareWPObjectsToLinks(store.pageOptions.navcta),
  class: bookDemo.value.show ? 'btn--grey' : 'btn--cta',
}));
const bookDemo = computed(() => ({
  title: store.pageOptions.book_demo_button,
  link: prepareWPObjectsToLinks(store.pageOptions.book_demo_url),
  show:
    store.pageOptions.nav_show_bookdemo &&
    store.pageOptions.book_demo_button &&
    store.pageOptions.book_demo_url,
}));

const activeMenuParent = computed(() => {
  const currentMenuSlug = nuxtApp._route.params.slug; // Use $route.params for route params
  let activeParent = '';
  forEach(menuItems.value, (item) => {
    if (item.children) {
      forEach(item.children, (child) => {
        if (child.slug === currentMenuSlug) {
          activeParent = item.slug;
        }
      });
    }
  });
  return activeParent;
});

// Methods
function handleLangMenuHover(e) {
  const { type } = e;
  if (!window.matchMedia('(hover: none)').matches) {
    // hover available, show or hide menu based on mouseovers
    showLanguageMenu.value = type === 'mouseenter';
  }
}

function handleLangMenuClick(e) {
  if (window.matchMedia('(hover: none)').matches) {
    // hover unavailable, open on click instead
    showLanguageMenu.value = !showLanguageMenu.value;
  }
}
</script>

<!-- 
<template>
	<div class="header">
		<nav class="content-grid-container nav">
			<div class="nav__left">
				<SmartLink class="nav__left__logo" type="page" slug="home" :ariaLabel="logoLabel">
					<IconLogoMark class="icon--logo-mark" />
					<IconLogoText class="icon--logo-text" />
				</SmartLink>
			</div>
			<div class="nav__right">
				<ol @mouseover="hoverMenu = true" @mouseleave="hoverMenu = false" :class="{ hover: hoverMenu }">
					<li v-for="(item, index) in menuItems" :key="index" :class="{ 'has-dropdown': item.children }"
						class="nav__right__menu-item">
						<template v-if="item.children">
							<span :class="['link', { 'nuxt-link-active': activeMenuParent === item.slug }]">
								<span v-html="item.title" />
								<IconCaret class="has-dropdown__icon" />
							</span>
							<transition name="fade">
								<ol class="dropdown" v-if="hoverMenu">
									<li v-for="(sublink, index) in item.children" :key="index"
										:class="{ 'has-dropdown': sublink.children }">
										<a v-if="sublink.children" :class="['link', { 'nuxt-link-exact-active': activeMenuParent === item.slug }]" v-html="sublink.title" />
										<SmartLink v-else class="link" :type="sublink.type" :slug="sublink.slug" :url="sublink.url">
											<span v-html="sublink.title" />
										</SmartLink>
									</li>
								</ol>
							</transition>
						</template>
						<SmartLink v-else class="link" :type="item.type" :slug="item.slug" :url="item.url">
							<span v-html="item.title" />
						</SmartLink>
					</li>
					<li class="nav__right__ctas">
						<ButtonComp v-if="bookDemo.show" id="democlick" class="btn--cta" :link="bookDemo.link">
							<span class="btn__text">{{ bookDemo.title }}</span>
						</ButtonComp>
						<ButtonComp id="trialclick" v-if="cta.link" :class="cta.class" :link="cta.link">
							<span class="btn__text btn__text--long">{{ cta.title }}</span>
							<span class="btn__text btn__text--short">{{ cta.titleShort }}</span>
						</ButtonComp>
					</li>
					<li class="nav__right__language has-dropdown no-css-hover" @mouseenter="toggleLanguageMenu" @mouseleave="toggleLanguageMenu" @click="toggleLanguageMenu">
						<LanguageIcon class="globe" />
						<IconCaret class="has-dropdown__icon" />
						<transition name="fade">
							<LanguageSelect v-if="showLanguageMenu" class="dropdown" markup="list" />
						</transition>
					</li>
					<li class="nav__right__menu-item">
						<Hamburger />
					</li>
				</ol>
			</div>
		</nav>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useStore, useRoute } from 'vuex';
import forEach from 'lodash/forEach';
import SmartLink from '~/components/helper/smartlink/index.vue';
import LanguageSelect from '~/components/organisms/language-select/index.vue';
import ButtonComp from '~/components/atoms/button/index.vue';
import Hamburger from '~/components/atoms/hamburger/index.vue';
import IconCaret from '~/assets/svg/caret-select.svg';
import LanguageIcon from '~/assets/svg/language.svg';
import IconLogoText from '~/assets/svg/kontainer-logo-text.svg';
import IconLogoMark from '~/assets/svg/kontainer-logo-mark.svg';

const store = useStore();
const route = useRoute();

const hoverMenu = ref(false);
const showLanguageMenu = ref(false);

const toggleLanguageMenu = (event) => {
  const eventType = event.type;
  if (window.matchMedia('(hover: none)').matches) {
    showLanguageMenu.value = !showLanguageMenu.value;
  } else {
    showLanguageMenu.value = eventType === 'mouseenter';
  }
};

const logoLabel = computed(() => store.state.pageOptions.logo_label);
const menuItems = computed(() => store.state.menus ? store.state.menus.primary : []);

const activeMenuParent = computed(() => {
  let activeParent = '';
  forEach(menuItems.value, (item) => {
    if (item.children) {
      forEach(item.children, (child) => {
        if (child.slug === route.params.slug) {
          activeParent = item.slug;
        }
      });
    }
  });
  return activeParent;
});

const cta = computed(() => ({
  title: store.state.pageOptions.navcta_title,
  titleShort: store.state.pageOptions.navcta_title_short,
  link: store.state.pageOptions.navcta,
  class: bookDemo.value.show ? 'btn--grey' : 'btn--cta',
}));

const bookDemo = computed(() => ({
  title: store.state.pageOptions.book_demo_button,
  link: store.state.pageOptions.book_demo_url,
  show: store.state.pageOptions.nav_show_bookdemo && store.state.pageOptions.book_demo_button && store.state.pageOptions.book_demo_url,
}));
</script>
 -->


<style lang="scss">
@import "../../../assets/scss/import";

.nav .icon {
	@include media('desktop-1200') {
		display: none !important;
	}

	@include media('tablet') {
		display: inline-block !important;
	}

	@include media('mobile-sm') {
		display: none !important;
	}
}
</style>

<style scoped lang="scss">
@import "../../../assets/scss/import";

.header {
	width: 100%;
	position: fixed;
	z-index: z('header');
	background-color: $white;
	top: 0;

	.position-hamburger {
		z-index: z('offscreenToggle');
		position: fixed;
		top: (calc($desktopHeight / 2));
		transform: translate3d(50%, -50%, 0);

		@include media('desktop') {
			right: (calc($desktopMargin / 2));
		}

		@include media('desktop-1200') {
			right: (calc($tabletMargin / 2));
		}

		@include media('tablet') {
			right: (calc($tabletMargin / 2));
		}

		@include media('mobile-sm') {
			top: (calc($mobileHeight / 2));
			transform: translate3d(0, -50%, 0);
		}
	}
}

.nav {
	@extend %text-navigation;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 120px;
	position: relative;

	@include media('tablet') {
		flex-wrap: wrap;
		height: auto;
		min-height: 120px;
	}

	@include media('tablet-below') {
		flex-wrap: nowrap;
		height: 120px;
		min-height: unset;
		padding: 0;
	}

	@include media('mobile-sm') {
		height: 60px;
	}

	&__left {
		&__logo {
			text-decoration: none;
			outline: none;
			position: relative;

			.icon--logo-text {
				width: 200px;
				height: auto;

				@include media('mobile-sm') {
					display: none;
				}
			}

			.icon--logo-mark {
				display: none;
				width: 38px;

				@include media('mobile-sm') {
					display: block;
				}
			}
		}
	}

	&__right {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		@include media('tablet-below') {
			width: 100%;
		}

		@include media('mobile-sm') {
			margin-left: 20px;
			margin-right: 30px;
		}
	}

	ol {
		display: flex;
		align-items: center;

		@include media('tablet') {
			justify-self: flex-end;
			width: 100%;
		}

		li:hover>a:not(.btn),
		li:hover>span {
			color: #aeaeae;
		}
	}

	li {
		display: inline-block;

		a {
			transition: color 0.2s ease;
		}
	}

	.link {
		text-decoration: none;
		padding: 27px 19px;

		@include media('desktop-1400') {
			padding: 27px 12px;
		}

		@include media('desktop-1200') {
			display: none;
		}
	}

	.link.nuxt-link-active {
		color: $label-color;
	}

	.has-dropdown {
		position: relative;
		cursor: pointer;

		&__icon {
			position: absolute;
			left: calc(50% - 5px);
			bottom: -15px;
			color: $text-color;
			height: 6px;
			width: 12px;
			transition: opacity 0.15s ease;
		}

		&.open .has-dropdown__icon {
			opacity: 0;
		}

		&:hover:not(.no-css-hover) {
			.has-dropdown__icon {
				opacity: 0;
			}

			.dropdown {
				visibility: visible;
				opacity: 1;
			}
		}

		.dropdown {
			visibility: hidden;
			opacity: 0;
			padding: 40px 20px;
			filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.15));
			background: $white;
			position: absolute;
			top: 38px;
			flex-direction: column;
			align-items: flex-start;
			transition: all 0.3s $easeInOut;

			&::after {
				content: '';
				height: 22px;
				width: 22px;
				background-color: $white;
				position: absolute;
				top: -11px;
				left: 52px;
				transform: rotate(45deg);
			}

			&>li:hover a {
				color: #aeaeae;
			}

			&.active {
				display: block;
			}

			li {
				display: block;
			}

			a {
				white-space: nowrap;
				color: $text-color;
				padding: 18px 20px;
				display: block;
				line-height: 1;
				position: relative;

				&::before {
					transition: all 0.2s ease;
					content: '';
					display: block;
					width: 0;
					height: 2px;
					background-color: $brand-green;
					position: absolute;
					left: 20px;
					top: calc(50% - 1px);
				}

				span {
					transition: transform 0.2s ease;
					display: block;
				}

				&.link.nuxt-link-active,
				&:hover {
					&::before {
						width: 16px;
					}

					span {
						transform: translateX(26px);
					}
				}
			}
		}
	}

	&__right__ctas {
		// li
		margin-left: 19px;
		white-space: nowrap;
		display: flex !important;

		@include media('desktop-1400') {
			margin-left: 12px;
		}

		@include media('tablet') {
			margin-left: auto;
		}

		@include media('mobile-sm') {
			width: 100%;
		}

		.btn {
			font-size: 12px;
			padding: 0 25px;
			height: 50px;
			line-height: 50px;

			@include media('desktop-1400') {
				font-size: 11px;
				letter-spacing: 2px;
				padding: 0 20px;
			}

			@include media('mobile-sm') {
				font-size: 9px;
				height: 38px;
				line-height: 38px;
				width: 100%;
			}

			&--cta {
				z-index: 1;
				position: relative;
			}

			&--grey {
				margin-left: -45px;
				padding-left: 64px;

				@include media('desktop-1400') {
					padding-left: 59px;
				}

				@include media('mobile') {
					display: none;
				}
			}

			&__text {
				&--long {
					@include media('desktop-1400') {
						display: none;
					}

					@include media('tablet') {
						display: inline-block;
					}
				}

				&--short {
					@include media('desktop-1400-ab') {
						display: none;
					}

					@include media('desktop-1400') {
						display: inline-block;
					}

					@include media('tablet') {
						display: none;
					}
				}
			}
		}
	}

	&__right__language {
		// li
		flex-shrink: 0;
		margin: 20px;

		/* 	@include media('desktop-1200') {
			margin-right: calc(0px - #{$tabletMargin} / 2 + 30px);
		}

		@include media('mobile-sm') {
			margin-right: 0;
			margin-left: 20px;
		} */

		svg {
			display: block;

			&.globe {
				width: 20px;
				height: auto;
			}

			&.has-dropdown__icon {
				bottom: -11px;
				left: calc(50% - 6px);
			}
		}

		.dropdown {
			// ul
			font-size: 14px;
			transform: translate(calc(-50% + 10px), 20px);
			padding: 40px 30px !important;

			@include media('desktop-1200') {
				transform: translate(-60%, 20px);
			}

			&::before {
				// for hover
				content: '';
				position: absolute;
				width: 100%;
				left: 50%;
				height: 38px;
				top: -38px;
				transform: translateX(-50%);
			}

			&::after {
				left: calc(50% - 10px) !important;

				@include media('desktop-1200') {
					left: 60% !important;
				}
			}

			&.show {
				visibility: visible;
				opacity: 1;
			}

			::v-deep(li) {
				display: flex;
				align-items: center;

				&:not(:first-child) {
					margin-top: 30px;
				}

				svg {
					margin-right: 19px;
				}

				span {
					&:not(.selected) {
						color: #acacac;
					}
				}
			}
		}
	}
}
</style>
