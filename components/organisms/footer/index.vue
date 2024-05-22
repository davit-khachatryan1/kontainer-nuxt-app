<template>
	<ContentSection v-bind="sectionSettings" :padding="consts.SECTION_PADDING_BOTTOM_NONE">
		<footer class="footer">
			<div class="content-grid-container">
				<div class="footer__top">
					<div class="footer__content">
						<div class="span-container">
							<div class="footer__top__offices span4 span12--tablet span4--mobile">
								<h3><OfficesLogo /> {{officesHeadline}}</h3>

								<ul class="footer__top__offices-list">
									<li v-for="office in offices">
										<p>
											<strong>{{office.city}}</strong><br />
											{{office.address}}<br />
											{{office.phone}}
										</p>
									</li>
								</ul>

							</div>
							<div class="footer__top__linklists span8 span12--tablet span4--mobile">
								<div class="span-container">
									<LinkList v-if="footerMenus" :name="footerMenus[1].title" :links="footerMenus[1].links" class="span2 span3--tablet span2--mobile" />
									<LinkList v-if="footerMenus" :name="footerMenus[2].title" :links="footerMenus[2].links" class="span2 span3--tablet span2--mobile" />
									<div class="footer__top__linklists__mobile-break"></div>
									<LinkList v-if="footerMenus" :name="footerMenus[3].title" :links="footerMenus[3].links" class="span2 span3--tablet span2--mobile" />
									<LinkList v-if="footerMenus" :name="footerMenus[4].title" :links="footerMenus[4].links" class="span2 span3--tablet span2--mobile" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="footer__middle">
					<div class="footer__middle__content">
						<NewsletterSignup :class="'form--footer'" class="newsletter-footer">
							<div class="newsletter-footer--heading">
									{{langString('_newsletter_signup_title')}}
							</div>
						</NewsletterSignup>
						<div class="footer__middle__lang">
							<label for="language">
								{{langString('_footer_languagechooser_title')}}
							</label>
							<LanguageSelect class="footer__middle__lang__select" />
						</div>
						<div class="footer__middle__social">
							<span>
								{{langString('_footer_follow_text')}}
							</span>
							<PinElement :type="'2'" :socialPinSide="'2'" />
						</div>
					</div>
				</div>
				<div class="footer__bottom">
					<div class="footer__content">
						<div class="footer__bottom__badges">
							<a href="https://www.g2.com/products/kontainer/" title="Write a review of Kontainer on G2" target="_blank">
								<G2Badge />
							</a>
							<a href='https://www.capterra.com/reviews/143730/Kontainer?utm_source=vendor&utm_medium=badge&utm_campaign=capterra_reviews_badge' target="_blank">
								<CapterraBadge />
							</a>
						</div>
						<div class="footer__bottom__text">
							<ol class="legal-links" v-if="legalLinks">
								<li v-for="(link, index) in legalLinks" :key="index">
									<SmartLink v-bind="link.link">{{link.link.title}}</SmartLink>
								</li>
							</ol>
							<span class="copyright">{{legalText}}</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</ContentSection>
</template>

<script>
const LinkList = defineAsyncComponent(() => import('~/components/atoms/linklist/index.vue'));
const SmartLink = defineAsyncComponent(() => import('~/components/helper/smartlink/index.vue'));
import { prepareWPObjectsToLinks } from '~/components/composables/prepareWPObjectsToLinks';
const OfficesLogo = defineAsyncComponent(() => import('~/assets/svg/office.svg'));
const CapterraBadge = defineAsyncComponent(() => import('~/assets/svg/cap-4-5-stars.svg'));
const G2Badge = defineAsyncComponent(() => import('~/assets/svg/g2-5-stars.svg'));
const LanguageSelect = defineAsyncComponent(() => import('~/components/organisms/language-select/index.vue'));
const PinElement = defineAsyncComponent(() => import( '~/components/atoms/pin/index.vue'));
const NewsletterSignup = defineAsyncComponent(() => import('~/components/organisms/newsletter-footer/index.vue'));
const ContentSection = defineAsyncComponent(() => import('~/components/atoms/section/index.vue'));
import {
	SECTION_PADDING_BOTTOM_NONE,
} from '~/components/composables/section';

import { useLangString } from '~/components/composables/useLangString';
import useStore from '@/store'

export default {
	components: {
		LanguageSelect,
		OfficesLogo,
		CapterraBadge,
		G2Badge,
		LinkList,
		SmartLink,
		ContentSection,
		PinElement,
		NewsletterSignup,
	},
	setup() {
		const { langString } = useLangString()
		return { langString };
  	},
	computed: {
		consts() {
			return {
				SECTION_PADDING_BOTTOM_NONE,
			};
		},
		footerMenus() {
			const store = useStore();
			if (
				store.pageOptions &&
				store.pageOptions.column1_links &&
				store.pageOptions.column2_links &&
				store.pageOptions.column3_links &&
				store.pageOptions.column4_links
			) {
				return {
					1: {
						title: store.pageOptions.column1_title,
						links: prepareWPObjectsToLinks(
							store.pageOptions.column1_links,
						),
					},
					2: {
						title: store.pageOptions.column2_title,
						links: prepareWPObjectsToLinks(
							store.pageOptions.column2_links,
						),
					},
					3: {
						title: store.pageOptions.column3_title,
						links: prepareWPObjectsToLinks(
							store.pageOptions.column3_links,
						),
					},
					4: {
						title: store.pageOptions.column4_title,
						links: prepareWPObjectsToLinks(
							store.pageOptions.column4_links,
						),
					},
				};
			}

			return false;
		},

		offices() {
			const store = useStore();
			return store.pageOptions.offices || [];
		},

		officesHeadline() {
			const store = useStore();
			return store.pageOptions.offices_headline || '';
		},

		legalLinks() {
			const store = useStore();
			if (store.pageOptions.legalLinks && Object.keys(store.pageOptions.legalLinks).length) {
				return store.pageOptions.legalLinks;
			}
			return false;
		},

		legalText() {
			return `Copyright ${new Date().getFullYear()} Kontainer All rights reserved.`;
		},
		sectionSettings() {
			return {
				bg: 'white',
				angleType: '2',
				pin: {
					label: '',
					top: '',
					bottom: '',
				},
			};
		},
	},
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.footer {
	$desktopMargin: 60px;
	$desktopMarginSmall: 30px;
	$mobileMargin: 30px;

	display: flex;
	flex-direction: column;
	overflow: hidden;
	color: $black;

	@include media('tablet') {
		margin-top: -30px;
	}

	&__top,
	&__bottom {
		.footer__content {
			display: flex;
			flex-direction: row;
			width: 100%;

			@include media('tablet', 'mobile') {
				flex-direction: column;
			}
		}
	}

	&__top {
		display: flex;
		padding: 0 0 $desktopMarginSmall;

		@include media('mobile') {
			padding: 0;
		}

		&__offices {
			display: flex;
			flex-direction: column;
			@include media('tablet') {
				padding-bottom: $desktopMargin;
				margin-bottom: $desktopMargin;
				position: relative;

				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 200vw;
					transform: translateX(-50%);
					border-bottom: 1px solid rgba($label-color, 0.15);
				}
			}

			@include media('mobile') {
				padding-bottom: $mobileMargin;
				margin-bottom: $mobileMargin;
			}

			h3 {
				@extend %text-h3;
				display: flex;
				margin-bottom: 30px;
				align-items: center;

				svg {
					margin-right: 10px;
				}
			}

			&-list {
				@include media('tablet') {
					display: flex;
				}

				@include media('mobile') {
					display: block;
				}

				li {
					&:first-child {
						margin-bottom: 30px;

						@include media('tablet') {
							margin: 0 100px 0 0;
						}

						@include media('mobile') {
								margin: 0 0 30px;
						}
					}
				}

				p {
					@extend %text-footer-link;
				}

				strong {
					@extend %text-footer-title;
				}
			}
		}

		&__linklists {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			::v-deep(a){
				&:hover {
					color: #aeaeae;
				}
			}

			&__mobile-break {
				@include media('mobile') {
					width: 100%;
					padding: 0 0 30px;
					position: relative;

					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 50%;
						width: 200vw;
						transform: translateX(-50%);
						border-bottom: 1px solid rgba($label-color, 0.15);
					}
				}
			}
		}

		.footer__content {
			width: 100%;
		}

		.span-container {
			justify-content: space-between;
			width: 100%;
		}
	}

	&__middle {
		position: relative;
		border-top: 1px solid transparent;
		border-bottom: 1px solid transparent;
		padding: 20px 0;

		@include media('tablet-sm') {
			padding: 20px 0 0;
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: -1px;
			left: 50%;
			width: 200vw;
			transform: translateX(-50%);
			border-bottom: 1px solid rgba($label-color, 0.15);
		}

		&:after {
			top: auto;
			bottom: -1px;
		}

		&__content {
			@include media('tablet-sm-ab') {
				height: 55px;
				width: calc(100% - 145px);
				overflow: hidden;
			}

			@include media('tablet-sm') {
				height: auto;
				display: flex;
				flex-direction: column;
			}

			.newsletter-footer {
				order: 2;

				@include media('tablet-sm') {
					margin: 30px 0 30px;
				}

				@include media('mobile') {
					margin: 30px 0 10px;
				}
			}
		}

		label {
			margin-right: 10px;
		}

		&__lang {
			@extend %text-paragraph2;

			display: inline-flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			order: 3;
			padding-left: 45px;

			@include media('tablet-sm') {
				justify-content: flex-start;
				padding: 10px 0 0;
			}

			.form__element {
				display: inline-block;
			}

			&:before {
				content: '';
				position: absolute;
				left: -1px;
				top: 50%;
				height: 30px;
				transform: translateY(-50%);
				border-left: 2px solid rgba($label-color, 0.15);

				@include media('tablet-sm') {
					display: none;
				}
			}

			&:after {
				content: '';
				position: absolute;
				top: -1px;
				left: 50%;
				width: 200vw;
				transform: translateX(-50%);
				border-top: 1px solid rgba($gray-dusty, 0.15);

				@include media('tablet-sm-ab') {
					display: none;
				}
			}
		}

		&__social {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
			position: relative;
			align-items: center;
			order: 1;

			@include media('tablet-sm-ab') {
				position: absolute;
				top: 30px;
				right: 0;
			}

			&:after {
				content: '';
				position: absolute;
				bottom: -1px;
				left: 50%;
				width: 200vw;
				transform: translateX(-50%);
				border-bottom: 1px solid rgba($gray-dusty, 0.15);

				@include media('tablet-sm-ab') {
					display: none;
				}
			}

			span {
				@extend %text-paragraph3;

				@include media('tablet-sm-ab') {
					display: none;
				}
			}
		}
	}

	&__bottom {
		padding: $desktopMarginSmall 0;

		&__badges {
			@include media('tablet') {
				padding-bottom: $mobileMargin;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 200vw;
					transform: translateX(-50%);
					border-bottom: 1px solid rgba($label-color, 0.15);
				}
			}

			@include media('mobile') {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			a {
				margin-right: 34px;

				@include media('mobile') {
					margin: 0 0 25px;

					&:last-child {
						margin: 0;
					}
				}
			}
		}

		&__text {
			@extend %text-footer-legal;

			@include media('tablet') {
				padding-top: $mobileMargin;
				display: flex;
				flex-direction: column;
			}

			.copyright {
				margin-left: 15px;

				@include media('tablet') {
					margin: 10px 0 0;
				}
			}
		}
	}
}

.legal-links {
	margin-left: 30px;
	display: inline-block;

	a {
		text-decoration: none;
		color: $brand-green;
		position: relative;
		font-weight: 500;

		&:after {
			content: '';
			width: 100%;
			height: 1px;
			background: $brand-green;
			position: absolute;
			bottom: -1px;
			left: 0;
			transition: 0.1s;
		}
	}


	li {
		display: inline-block;

		+ li {
			&::before {
				content: '|';
				margin: 0 10px;
			}
		}
	}

	@include media('tablet') {
		margin-left: 0;
		li + li {
			&::before {
				content: '';
			}
		}
	}
	@include media('mobile') {
		li {
			display: block;
			+ li {
				&::before {
					margin: 0 0px;
				}
			}
		}
	}
}
</style>

<style lang="scss">
@import "../../../assets/scss/import";
.form--footer {
	@include media('mobile-ab') {
		width: auto;
		display: inline-flex;
	}

	.fieldset {
		position: relative;
		align-items: center;
		justify-content: center;
		padding-right: 45px;

		@include media('tablet-sm') {
			padding-right: 0;
		}
	}

	.form__element {
		.input-trigger {
		}

		@include media('tablet-sm') {
			width: calc(50% - (95px / 2));
		}

		@include media('mobile') {
			width: 100%;
		}

		&:last-child:not(.input-trigger) {
			@include media('tablet-sm') {
				margin-left: 20px;
			}

			@include media('mobile') {
				margin-left: 0;
			}
		}

		&:last-child {
			@include media('tablet-sm') {
				width: 55px;
				margin-top: 0;
			}

			@include media('mobile') {
				display: inline-flex;
				width: 100% !important;
				margin-left: 0 !important;
				margin-bottom: 20px;
			}
		}

		input {
			background-color: $gray-concrete;
			border-color: $gray-concrete;
			border-radius: 50px;
		}

		button.btn {
			text-indent: -9999px;
			width: 55px;
			min-width: 0;
			padding: 0;
			position: relative;

			@include media('mobile') {
				padding: 0 30px;
				min-width: auto;
				width: auto;
				text-indent: inherit;
			}

			@include media('mobile-sm') {
				margin-bottom: 0 !important;
				width: 100% !important;
				text-indent: 0 !important;
				vertical-align: middle;
				text-align: center;
			}

			&::before,
			&::after {
				content: '';
				height: 1px;
				width: 18px;
				position: absolute;
				top: 50%;
				right: 18px;
				background-color: $white;
				transform-origin: right;

				@include media('mobile') {
					display: none;
				}
			}

			&::before {
				transform: rotate(38deg);
			}

			&::after {
				transform: rotate(-38deg);
			}
		}

		.icon,
		span:not(.error-message) {
			color: $gray-dusty;
		}

		.error-message {
			background-color: $gray-concrete;
		}
	}

	.form__confirmation {
		display: flex;
		align-items: center;
		width: 100%;

		@include media('mobile') {
			margin-bottom: 20px;
		}

		&__response {
			font-size: 26px;
			font-weight: $type-light;
			margin-bottom: 0;

			@include media('tablet-sm') {
				font-size: 16px;
			}

			@include media('mobile') {
				font-size: 14px;
			}
		}
	}

	.newsletter-footer--heading {
		margin-right: 20px;
		white-space: nowrap;

		@include media('tablet-sm') {
			flex-basis: 100%;
			margin-bottom: 20px;
		}
	}

	.checkmark {
		height: 55px;
		width: 55px;
		margin: 0 25px 0 0;

		@include media('tablet-sm') {
			height: 30px;
			width: 30px;
			padding-left: 10px;
			margin: 0 15px 0 0;
		}

		&::after {
			width: 18px;
			height: 37px;

			@include media('tablet-sm') {
				width: calc(18px / 2);
				height: calc(37px / 2);
			}
		}
	}
}

.form--footer {
	@include media('mobile-ab') {
		width: auto;
		max-width: 860px;
	}

	.fieldset {
		align-items: center;
		justify-content: center;
	}

	.form__element {
		@include media('tablet-sm') {
			&:last-child {
				width: 55px;
				margin: 0 0 0 20px;
			}
		}

		@include media('mobile') {
			width: calc(100% - 75px);

			&:last-child {
				margin-bottom: 20px;
			}
		}

		input {
			background-color: $gray-concrete;
			border-color: $gray-concrete !important;
			border-radius: 50px;
		}

		button.btn {
			text-indent: -9999px;
			width: 55px;
			min-width: 0;
			padding: 0;
			position: relative;

			&::before,
			&::after {
				content: '';
				height: 1px;
				width: 18px;
				position: absolute;
				top: 50%;
				right: 18px;
				background-color: $white;
				transform-origin: right;
			}

			&::before {
				transform: rotate(38deg);
			}

			&::after {
				transform: rotate(-38deg);
			}
		}

		.icon,
		span:not(.error-message) {
			color: $gray-dusty;
		}

		.error-message {
			background-color: $gray-concrete;
		}
	}

	.form__confirmation {
		display: flex;
		align-items: center;

		&__response {
			font-size: 26px;
			font-weight: $type-light;
		}
	}

	.newsletter-footer--heading {
		margin-right: 20px;
		align-items: center;
		display: flex;

		@include media('tablet-sm') {
			flex-basis: 100%;
			margin-bottom: 20px;
		}
	}

	.checkmark {
		height: 55px;
		width: 55px;
		margin: 0 25px;

		&::after {
			width: 18px;
			height: 37px;
		}
	}
}
</style>
