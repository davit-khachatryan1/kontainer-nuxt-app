<template>
	<nav>
		<OffcanvasDimmer />
		<div class="offcanvas" :class="[offcanvasStatus]" v-on:click.stop="onClick">
			<div class="offcanvas__content">
				<nav>
					<hamburger />
					<template v-for="menu in menus">
						<ol :class="['offcanvas__links', menu.style]">
							<li
								v-for="(link, index) in menu.links"
								:key="index"
								:class="{ 'has-dropdown': link.children }"
							>
								<template v-if="link.children">
									<span
										:class="{
											link: true,
											'dropdown-open': index === openMenuItem,
										}"
										@click="toggleSubmenu(index)"
									>
										<span v-html="link.title"></span
										><iconCaret class="has-dropdown__icon" />
									</span>
									<transition-expand>
										<div>
										<ol
											v-if="index === openMenuItem"
											:class="['dropdown', { active: index === openMenuItem }]"
										>
											<li
												v-for="(sublink, index) in link.children"
												:key="index"
												@click="closeMenu"
												:class="{ 'has-dropdown': sublink.children }"
											>
												<a
													v-if="sublink.children"
													:class="['link']"
													@click="toggleSubmenu(index)"
													v-html="sublink.title"
												/>

												<smart-link
													v-else
													class="link"
													:type="sublink.type"
													:slug="sublink.slug"
													:url="sublink.url"
												>
													<span @click="closeMenu" v-html="sublink.title" />
												</smart-link>
											</li>
										</ol>
										</div>
									</transition-expand>
								</template>

								<SmartLink
									v-else
									v-bind="link"
									:onActiveLinkClick="closeMenu"
									>{{ link.title }}</SmartLink
								>
							</li>
						</ol>
					</template>
					<Button
						v-if="bookDemo.show && bookDemo.title"
						:link="bookDemo.link"
						:type="bookDemo.type"
						large
						:iconComponent="ctaIcon.comp"
						:iconName="ctaIcon.name"
					>
						{{ bookDemo.title }}
					</Button>
					<Button
						v-else-if="cta.link"
						:link="cta.link"
						:type="cta.type"
						large
						:iconComponent="ctaIcon.comp"
						:iconName="ctaIcon.name"
					>
						{{ cta.title }}
					</Button>

					<div class="offcanvas__social">
						<Button
							v-for="(button, index) in social"
							:key="index"
							:link="{ url: button.link }"
							:type="4"
							:iconName="button.name"
							:iconComponent="button.comp"
							:ariaLabel="button.text"
						></Button>
					</div>

					<div class="offcanvas__language">
						<LanguageSelect />
					</div>
				</nav>
			</div>
		</div>
	</nav>
</template>

<script>

const SmartLink = defineAsyncComponent(() => import('~/components/helper/smartlink/index.vue'));
import { prepareWPObjectsToLinks } from '~/components/composables/prepareWPObjectsToLinks';

const TransitionExpand = defineAsyncComponent(() => import('~/components/helper/TransitionExpand.vue'));
const Button = defineAsyncComponent(() => import('~/components/atoms/button/index.vue'));
const LanguageSelect = defineAsyncComponent(() => import('~/components/organisms/language-select/index.vue'));
import iconCaret from '~/assets/svg/caret-select.svg';
const Hamburger = defineAsyncComponent(() => import('~/components/atoms/hamburger/index.vue'));
const OffcanvasDimmer = defineAsyncComponent(() => import('./dimmer.vue'));
import useStore from '@/store'
import {
	BUTTON_TYPE_CTA,
} from '~/constants/button'

export default {
	name: 'OffcanvasMenu',
	components: {
		OffcanvasDimmer,
		SmartLink,
		Button,
		LanguageSelect,
		iconCaret,
		TransitionExpand,
		Hamburger,
	},
	data() {
		return {
			ctaIcon: { comp: 'IconArrow', name: 'arrow' },
			openMenuItem: null,
			hoverMenu: false,
		};
	},
	computed: {
		offcanvasStatus() {
			return this.isOpen ? 'open' : 'close';
		},
		isOpen() {
			const store = useStore();
			return store.menuOpen;
		},
		isShown() {
			const store = useStore();
			return !store.menuHide;
		},
		menus() {
			const store = useStore();
			if (
				store.menus &&
				Object.keys(store.menus).length
			) {
				return [
					{
						style: 'offcanvas__links--primary',
						links: store.menus.primary,
					},
					{
						style: 'offcanvas__links--secondary',
						links: prepareWPObjectsToLinks(
							store.pageOptions.offcanvas1_links,
						),
					},
					{
						style: 'offcanvas__links--secondary',
						links: prepareWPObjectsToLinks(
							store.pageOptions.offcanvas2_links,
						),
					},
				];
			}
			return '';
		},
		cta() {
			const store = useStore();
			return {
				title: store.pageOptions.offcanvas_cta_title,
				type: BUTTON_TYPE_CTA,
				link: prepareWPObjectsToLinks(
					store.pageOptions.offcanvas_cta,
				),
			};
		},
		bookDemo() {
			const store = useStore();
			return {
				title: store.pageOptions.book_demo_button,
				link: prepareWPObjectsToLinks(store.pageOptions.book_demo_url),
				show:
					store.pageOptions.offcanvas_show_bookdemo &&
					store.pageOptions.book_demo_button &&
					store.pageOptions.book_demo_url,
				type: BUTTON_TYPE_CTA,
			};
		},
		social() {
			const store = useStore();
			return [
				{
					link: store.pageOptions.facebook,
					name: 'facebook',
					comp: 'IconFacebook',
					text: store.pageOptions.facebook_text,
				},
				{
					link: store.pageOptions.linkedin,
					name: 'linkedin',
					comp: 'IconLinkedin',
					text: store.pageOptions.linkedin_text,
				},
				{
					link: store.pageOptions.twitter,
					name: 'twitter',
					comp: 'IconTwitter',
					text: store.pageOptions.twitter_text,
				},
			];
		},
	},
	methods: {
		onClick() {},
		closeMenu() {
			const store = useStore();
			store.closeMenu();
		},
		toggleSubmenu(index) {
			this.openMenuItem === index
				? (this.openMenuItem = null)
				: (this.openMenuItem = index);
		},
	},
	watch: {
		isOpen(open, closed) {
			if (closed) {
				this.openMenuItem = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/import";
@keyframes closingSkew {
	0% {
		transform: skewX(4deg) translateZ(0);
	}

	40% {
		transform: skewX(4deg) translateZ(0);
	}

	60% {
		transform: skewX(10deg) translateZ(0);
	}

	100% {
		transform: skewX(10deg) translateZ(0);
	}
}

@keyframes openingSkew {
	0% {
		transform: skewX(10deg) translateZ(0);
	}

	40% {
		transform: skewX(10deg) translateZ(0);
	}

	100% {
		transform: skewX(4deg) translateZ(0);
	}
}

.hamburger {
	margin-left: auto;
}

.offcanvas {
	height: 100%;
	position: fixed;
	right: 0;
	top: 0;
	transform: translate3d(140%, 0, 0);
	transition: transform 0.4s $easeInOut, background 1ms linear 0.4s;
	width: 350px;
	will-change: transform;
	z-index: z(offcanvas);

	@include media('mobile') {
		max-width: calc(100% - 20px);
	}

	$content: '';

	&__links {
		&--primary {
			@extend %text-navigation-offcanvas;
			margin-bottom: 40px;

			a,
			span {
				font-weight: 100;
			}
		}

		&--secondary {
			@extend %text-paragraph2;
			margin-bottom: 30px;
		}

		a,
		span {
			color: currentColor;
			text-decoration: none;
		}

		li a,
		li span {
			transition: opacity 0.3s ease;

			&:hover {
				opacity: 0.7;
			}
		}
		li li{
			font-size: 18px;
		}
	}

	&__social {
		display: flex;
		flex-direction: row;
		margin-bottom: 15px;

		.btn {
			margin-right: 15px;
		}
	}

	&__language {
		display: inline-block;

		.input-select {
			padding-left: 0 !important;
		}
	}

	.btn {
		margin-top: 40px;
	}

	&::before {
		background: $text-color;
		content: '';
		display: block;
		height: 100%;
		left: -140px;
		position: absolute;
		top: 0;
		transform: skewX(10deg) translateZ(0);
		transform-origin: top left;
		//transition: transform .3s ease;
		width: 200%;
		will-change: transform;
		z-index: -1;
	}

	&__content {
		color: $label-color;
		opacity: 0;
		position: relative;
		transition: opacity 0s 0.4s;

		height: 100%;
		padding: 85px 50px 0 0;
		overflow-y: auto;

		@include media('mobile') {
			padding-left: 10px;
		}

		$content: &;

		ul {
			li {
				margin-bottom: 20px;
			}
		}

		&::after {
			background: linear-gradient(
				180deg,
				rgba($text-color, 0),
				$text-color 50%,
				$text-color
			);
			background-position: 0 100%;
			background-size: 100% 200%;
			content: '';
			display: block;
			height: 100%;
			left: 0;
			opacity: 1;
			position: absolute;
			top: 0;
			transition: background-position 1s 0.2s $easeInOut,
				opacity 0.8s 0.4s $easeInOut, visibility 0.8s;
			visibility: visible;
			width: 100%;
		}
	}

	&.open {
		transform: translate3d(0, 0, 0);
		background: $blue-dark;

		&::before {
			animation: openingSkew 0.6s $easeInOut;
			transform: skewX(4deg) translateZ(0);
		}

		#{$content} {
			opacity: 1;

			&::after {
				background-position: 0 0;
				opacity: 0;
				visibility: hidden;
			}
		}
	}

	.dropdown-open {
		.offcanvas__links {
			&--primary > li:not(.has-dropdown) > a {
				opacity: 0.25;
			}
		}

		.has-dropdown__icon {
			transform: scale(1.45) rotate(180deg);
		}
	}

	&.close {
		transform: translate3d(160%, 0, 0);
		transition: transform 0.4s 0.3s $easeInOut;

		&::before {
			animation: closingSkew 0.5s $easeInOut;
			transform: skewX(10deg) translateZ(0);
		}

		#{$content} {
			opacity: 0;
			transition: opacity 0s 0.2s;

			&::after {
				background-position: 0 100%;
				opacity: 1;
				transition: background-position 0.2s $easeInOut, opacity 0.2s $easeInOut,
					visibility 0.2s;
				visibility: visible;
			}
		}
	}

	.has-dropdown {
		position: relative;
		cursor: pointer;

		.link {
			display: block;
		}

		&__icon {
			position: absolute;
			right: 13px;
			top: 22px;
			transform: scale(1.45);
			transition: transform 0.3s ease;
		}
	}
	.dropdown.active {
		padding-left: 10px;
		font-size: 22px;
	}
}
</style>

<!-- <docs>
```jsx
<OffcanvasMenu></OffcanvasMenu>
```
</docs> -->
