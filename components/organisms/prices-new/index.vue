<template>
	<section class="pricespage">
		<div class="content-grid-container">
			<div class="span-container">
				<div class="">
					<Teaser
						:class="['teaser--fluid', 'teaser--center', 'pricespage__title']"
						:data="data"
						v-if="data.heading || data.text"
						:positionOnPage="positionOnPage"
					/>
					<template v-if="tableLayout === 'desktop'">
						<table class="prices">
							<thead>
								<tr class="head">
									<th class="head__cell">
										<img
											class="container-icon"
											src="~/assets/images/icon-server.png"
											alt=""
										/>
									</th>
									<th
										v-for="(column, index) in data.prices"
										class="head__cell"
										:key="index"
									>
										<h3 v-text="column.title" />
										<Button
											v-if="column.contact_us_cta"
											class="btn"
											:link="{ url: registerContactUrl(column.slug) }"
											:type="1"
											>{{ langString('_contact_account_cta') }}</Button
										>
										<template v-else>
											<h2>{{ column.price }},-</h2>
											<p v-text="column.per_month" />
										</template>
										<div class="badge" v-if="column.popular">
											<IconBookmark />
										</div>
									</th>
								</tr>
							</thead>
							<tr class="row" v-if="has_users">
								<td class="row__cell">
									{{ langString('_user_accounts') }}
								</td>
								<td
									class="row__cell"
									v-for="(column, index) in data.prices"
									:key="index"
								>
									{{ column.users }}
								</td>
							</tr>
							<tr class="row">
								<td class="row__cell">{{ langString('_storage') }}</td>
								<td
									class="row__cell row--storage"
									v-for="(column, index) in data.prices"
									:key="index"
								>
									{{ column.storage }} {{ column.storage_unit }}
								</td>
							</tr>
							<tr
								class="row"
								v-for="(row, index) in data.table.body"
								:key="index"
								:class="{
									'row--divider': row[0].c.substring(0, 2) === '--',
								}"
							>
								<td
									class="row__cell"
									v-for="(feature, index) in row"
									:key="index"
									v-html="format_cell(feature)"
								></td>
							</tr>
							<tr class="row" v-if="has_extra_users">
								<td class="row__cell"></td>
								<td
									class="row--options"
									v-for="(column, index) in data.prices"
									:key="index"
								>
									<div
										v-if="column.extra_users"
										:class="{
											dropdown: true,
											open: activeDropdown === `users[${index}]`,
										}"
										@click="toggleDropdown(`users[${index}]`)"
									>
										<div class="dropdown__trigger">
											{{ langString('_extra_users') }}
											<span class="chevron"></span>
										</div>
										<ul class="dropdown__list">
											<li
												v-for="(option, index) in column.extra_users"
												:key="index"
											>
												<a
													@click.prevent="addUsers(option, column.slug, $event)"
													>{{ option.users }} users (+{{ option.price }},-
													{{ option.currency }})</a
												>
											</li>
										</ul>
									</div>
								</td>
							</tr>
							<tr class="row" v-if="has_extra_storage">
								<td class=""></td>
								<td
									class="row--options"
									v-for="(column, index) in data.prices"
									:key="index"
								>
									<div
										v-if="column.extra_storage"
										:class="{
											dropdown: true,
											open: activeDropdown === `storage[${index}]`,
										}"
										@click="toggleDropdown(`storage[${index}]`)"
									>
										<div class="dropdown__trigger">
											{{ langString('_extra_storage') }}
											<span class="chevron"></span>
										</div>
										<ul class="dropdown__list">
											<li
												v-for="(option, index) in column.extra_storage"
												:key="index"
											>
												<a
													@click.prevent="
														addStorage(option, column.slug, $event)
													"
													>{{ option.storage }} {{ option.storage_unit }} (+{{
														option.price
													}},- {{ option.currency }})</a
												>
											</li>
											<li class="other" v-if="column.contact">
												<SmartLink :link="column.contact.url">{{
													column.contact.title
												}}</SmartLink>
											</li>
										</ul>
									</div>
								</td>
							</tr>
							<tr v-if="has_extra_skus" class="row">
								<td class=""></td>
								<td
									class="row--options"
									v-for="(column, index) in data.prices"
									:key="index"
								>
									<div
										v-if="column.extra_skus"
										:class="{
											dropdown: true,
											open: activeDropdown === `skus[${index}]`,
										}"
										@click="toggleDropdown(`skus[${index}]`)"
									>
										<div class="dropdown__trigger">
											{{ langString('_extra_skus') }}
											<span class="chevron"></span>
										</div>
										<ul class="dropdown__list">
											<li
												v-for="(option, index) in column.extra_skus"
												:key="index"
											>
												<a @click.prevent="addSKUs(option, column.slug, $event)"
													>{{ option.skus }} (+{{ option.price }},-
													{{ option.currency }})</a
												>
											</li>
											<li class="other" v-if="column.contact">
												<SmartLink :link="column.contact.url">{{
													column.contact.title
												}}</SmartLink>
											</li>
										</ul>
									</div>
								</td>
							</tr>
						</table>
					</template>

					<template v-if="tableLayout === 'mobile'">
						<div
							class="prices__table-mobile-container"
							v-for="(column, index) in data.prices"
							:key="index"
						>
							<table class="prices">
								<thead>
									<tr class="head">
										<th class="head__cell">
											<img
												class="container-icon"
												src="~/assets/images/icon-server.png"
												alt=""
											/>
										</th>
										<th class="head__cell">
											<h3 v-text="column.title" />
											<Button
												v-if="column.contact_us_cta"
												class="btn"
												:link="{ url: registerContactUrl(column.slug) }"
												:type="1"
												>{{ langString('_contact_account_cta') }}</Button
											>
											<template v-else>
												<h2>{{ column.price }},-</h2>
												<p v-text="column.per_month" />
											</template>
											<div class="badge" v-if="column.popular">
												<IconBookmark />
											</div>
										</th>
									</tr>
								</thead>

								<tbody>
									<tr class="row" v-if="!data.hide_useraccounts">
										<td class="row__cell">
											{{ langString('_user_accounts') }}
										</td>
										<td class="row__cell">
											{{ column.users }}
										</td>
									</tr>
									<tr class="row" v-if="!data.hide_storage">
										<td class="row__cell">{{ langString('_storage') }}</td>
										<td class="row__cell row--storage">
											{{ column.storage }} {{ column.storage_unit }}
										</td>
									</tr>
									<template v-if="activeFullList === `expand[${index}]`">
										<tr
											class="row"
											v-for="(row, rindex) in data.table.body"
											:key="rindex"
											:class="{
												'row--divider': row[0].c.substring(0, 2) === '--',
											}"
										>
											<td class="row__cell" v-html="format_cell(row[0])"></td>
											<td
												class="row__cell"
												v-html="format_cell(row[index + 1])"
											></td>
										</tr>
									</template>
								</tbody>
							</table>
							<div>
								<div
									:class="{
										'row--expander': true,
										open: activeFullList === `expand[${index}]`,
									}"
									@click="toggleFullList(`expand[${index}]`)"
								>
									<span v-if="activeFullList === `expand[${index}]`">{{
										langString('_close_price_list_-')
									}}</span>
									<span v-else>{{ langString('_expand_price_list_+') }}</span>
								</div>
								<div
									class="prices__table__column prices__table__column--options"
									v-if="activeFullList === `expand[${index}]`"
								>
									<div v-if="has_extra_users && column.extra_users">
										<div
											:class="{
												dropdown: true,
												open: activeDropdown === `users[${index}]`,
											}"
											@click="toggleDropdown(`users[${index}]`)"
										>
											<div class="dropdown__trigger">
												{{ langString('_extra_users') }}
												<span class="chevron"></span>
											</div>
											<ul class="dropdown__list">
												<li
													v-for="(option, index) in column.extra_users"
													:key="index"
												>
													<a
														@click.prevent="
															addUsers(option, column.slug, $event)
														"
														>{{ option.users }} users (+{{ option.price }},-
														{{ option.currency }})</a
													>
												</li>
											</ul>
										</div>
									</div>
									<div v-if="has_extra_storage && column.extra_storage">
										<div
											:class="{
												dropdown: true,
												open: activeDropdown === `storage[${index}]`,
											}"
											@click="toggleDropdown(`storage[${index}]`)"
										>
											<div class="dropdown__trigger">
												{{ langString('_extra_storage') }}
												<span class="chevron"></span>
											</div>
											<ul class="dropdown__list">
												<li
													v-for="(option, index) in column.extra_storage"
													:key="index"
												>
													<a
														@click.prevent="
															addStorage(option, column.slug, $event)
														"
														>{{ option.storage }} {{ option.storage_unit }} (+{{
															option.price
														}},- {{ option.currency }})</a
													>
												</li>
											</ul>
										</div>
									</div>
									<div v-if="has_extra_skus && column.extra_skus">
										<div
											:class="{
												dropdown: true,
												open: activeDropdown === `skus[${index}]`,
											}"
											@click="toggleDropdown(`skus[${index}]`)"
										>
											<div class="dropdown__trigger">
												{{ langString('_extra_skus') }}
												<span class="chevron"></span>
											</div>
											<ul class="dropdown__list">
												<li
													v-for="(option, index) in column.extra_skus"
													:key="index"
												>
													<a
														@click.prevent="
															addSKUs(option, column.slug, $event)
														"
														>{{ option.skus }} (+{{ option.price }},-
														{{ option.currency }})</a
													>
												</li>
											</ul>
										</div>
									</div>
									<div class="row row--cta js-cta" v-if="!column.hide_button">
										<Button
											v-if="column.contact_us_cta"
											class="btn"
											:link="{ url: registerContactUrl(column.slug) }"
											:type="1"
											>{{ langString('_contact_account_cta') }}</Button
										>
										<Button
											v-else
											hasFunction="yes"
											@func="registerUrl(column)"
											:type="1"
											iconName="arrow"
											iconComponent="IconArrow"
											>{{ column.btn_text }}</Button
										>
									</div>
									<div class="row" v-if="column.contact">
										<SmartLink :link="column.contact.url">{{
											column.contact.title
										}}</SmartLink>
									</div>
								</div>
							</div>
						</div>
						<div class="package-switcher" v-if="activeFullList">
							<ul>
								<li
									v-for="(column, index) in data.prices"
									:key="index"
									:class="{ active: activeFullList === `expand[${index}]` }"
								>
									<span @click="toggleFullList(`expand[${index}]`)">{{
										column.title
									}}</span>
								</li>
							</ul>
						</div>
					</template>

					<div
						class="pricespage__footnote"
						v-if="data.footnote"
						v-html="data.footnote"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import forEach from 'lodash/forEach';
import { DEFAULT_LOCALE } from '~/constants/styles';
import SmartLink from '~/components/helper/smartlink/index.vue';
import langstring from '~/components/mixins/langstring';
import getClosest from '~/components/mixins/getclosest';
import Button from '~/components/atoms/button/index.vue';
import Teaser from '~/components/molecules/teaser/index.vue';
import IconBookmark from '~/assets/svg/bookmark.svg';
import useStore from '@/store'

export default {
	name: 'PriceSection',
	mixins: [getClosest, langstring],
	components: {
		Teaser,
		Button,
		SmartLink,
		IconBookmark,
	},
	props: {
		data: { type: Object },
		positionOnPage: { type: Number },
	},
	data: () => {
		return {
			pricingTableHeadPosition: 0,
			pricingTableHeight: 0,
			pricingTableCtaPosition: 0,
			scrollPos: 0,
			features: [],
			featuresFlat: [],
			activeDropdown: false,
			activeFullList: false,
			windowWidth: 0,
			tableLayout: null,
			mobileTablePositions: [],
		};
	},

	computed: {
		has_users() {
			return this.data.prices.some((p) => !!p.users);
		},
		has_extra_users() {
			return this.data.prices.some((p) => !!p.extra_users);
		},

		has_extra_storage() {
			return this.data.prices.some((p) => !!p.extra_storage);
		},

		has_extra_skus() {
			return this.data.prices.some((p) => !!p.extra_skus);
		},
	},

	methods: {
		formatToReadable(val) {
			if (val.substring(0, 2) === '--') return val.substring(2);
			return val;
		},

		format_cell(item) {
			if (item.c.toLowerCase() === 'v') {
				return '<span class="tick"></span>';
			} else if (item.c.indexOf('##') === 0) {
				return `<span class="row--bold"><b>${item.c.substring(2)}</b></span>`;
			} else if (item.c.indexOf('--') === 0) {
				return `<span class="row--bold"><b>${item.c.substring(2)}</b></span>`;
			} else if (item.c.length > 0) {
				return `<span>${item.c}</span>`;
			}
			return '<span v-else>&nbsp;</span>';
		},

		/* eslint-disable */
		toggleDropdown(el) {
			!this.activeDropdown || this.activeDropdown !== el
				? (this.activeDropdown = el)
				: (this.activeDropdown = false);
		},
		toggleFullList(el) {
			!this.activeFullList || this.activeFullList !== el
				? (this.activeFullList = el)
				: (this.activeFullList = false);
			const index = el.replace(/(^.*\[|\].*$)/g, '');
			const tablePosition = this.mobileTablePositions[index];
			window.scrollTo(0, tablePosition);
		},
		registerUrl(packageInfo) {
			const store = useStore();
			store.setPackageInfo(packageInfo);
			const langPrefix =
				DEFAULT_LOCALE !== store.locale
					? `/${store.locale}`
					: '';
			//return `${langPrefix}/register?kontainer=${packageInfo.package_id}`;
			this.$router.push({
				path: langPrefix + '/register',
				query: { kontainer: packageInfo.package_id },
			});
		},
		registerContactUrl(slug) {
			const store = useStore();
			const langPrefix =
				DEFAULT_LOCALE !== store.locale
					? `/${store.locale}`
					: '';
			return `${langPrefix}/register-contact?kontainer=${slug}`;
		},
		setHeight(ref, sticky) {
			// const elements = this.$refs[ref];
			const elements = document.querySelectorAll(ref);
			const elementsHeight = [];
			forEach(elements, (el) => {
				elementsHeight.push(el.offsetHeight);
			});

			const highest = Math.max.apply(null, elementsHeight);
			forEach(elements, (el) => {
				if (sticky) {
					Object.assign(el.style, {
						height: `${highest}px`,
						width: `${el.getBoundingClientRect().width + 1}px`,
						top: '0px',
						left: `${el.getBoundingClientRect().left}px`,
						position: 'absolute',
					});
					this.$refs.table.style.paddingTop = `${highest}px`;
				} else {
					el.style.height = `${highest}px`;
				}
			});
		},
		getWindowWidth(event) {
			this.windowWidth = document.documentElement.clientWidth;

			this.windowWidth > 950
				? (this.tableLayout = 'desktop')
				: (this.tableLayout = 'mobile');
		},
		handleScroll(event) {
			this.scrollPos = window.scrollY;

			const tableHeaders = document.querySelectorAll('.js-tableheader');
			if (this.scrollPos + 120 > this.pricingTableHeadPosition) {
				forEach(tableHeaders, (tableHead) => {
					tableHead.classList.add('sticky', 'shrink');
				});
			} else {
				forEach(tableHeaders, (tableHead) => {
					tableHead.classList.remove('sticky', 'shrink');
				});
			}

			if (this.scrollPos > this.pricingTableCtaPosition - 100 - 120) {
				forEach(tableHeaders, (tableHead) => {
					tableHead.classList.add('hide');
				});
			} else {
				forEach(tableHeaders, (tableHead) => {
					tableHead.classList.remove('hide');
				});
			}
		},

		replaceSelectedDropdownValue(event) {
			const dropdownContainer = this.getClosest(event.target, '.dropdown');
			dropdownContainer.querySelector('.dropdown__trigger').innerText =
				event.target.innerText;
		},
		addStorage(extraStorage, slug, event) {
			const store = useStore();
			store.setExtraStorage({ slug, extraStorage });
			this.replaceSelectedDropdownValue(event);
		},
		addUsers(extraUsers, slug, event) {
			const store = useStore();
			store.setExtraUsers({ slug, extraUsers });
			this.replaceSelectedDropdownValue(event);
		},
		addSKUs(extraSKUs, slug, event) {
			const store = useStore();
			store.setExtraSKUs({ slug, extraSKUs });
			this.replaceSelectedDropdownValue(event);
		},
		getMobileTablePositions() {
			forEach(this.$refs['mobileTables'], (el) => {
				this.mobileTablePositions.push(
					el.getBoundingClientRect().top + 20 - 55 - 20,
				);
			});
		},
	},
	mounted() {
		const store = useStore();
		store.resetExtras();

		this.$nextTick(function () {
			window.addEventListener('resize', this.getWindowWidth);
			this.getWindowWidth();
			//this.getFeatures();
		});
	},
	updated() {
		setTimeout(() => {
			if (this.tableLayout === 'desktop') {
				const el = document.querySelector('.head');
				const observer = new IntersectionObserver(
					([e]) =>
						e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
					{ threshold: [1] },
				);

				if (el) observer.observe(el);
			}
		}, 50);
	},
	beforeDestroy() {
		if (this.tableLayout === 'desktop') {
			window.removeEventListener('scroll', this.handleScroll);
		}
		window.removeEventListener('resize', this.getWindowWidth);
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
$dividerColor: $gray-concrete;
$borderColor: $gray-concrete;
$grey: #c4c4c4;
$grey-feature: #5d6972;
$dark: #0e1029;
$dividerTextColor: #333333;
$bg: $gray-concrete;
$priceColor: #0e1029;
$priceTitleColor: #424354;
$pricePerMonthColor: #0e1029;

.prices {
	width: 100%;
	box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1);
	color: $grey-feature;
	background-color: $white;
	position: relative;
	border-collapse: separate;
	table-layout: fixed;

	&__table-mobile-container {
		background-color: $white;
		margin-bottom: 30px;
		font-size: 14px;
		table {
			.head__cell {
				width: 50%;
			}
		}
		.row {
			height: 50px !important;
		}
	}

	.row__cell,
	.head__cell {
		border: 1px solid #e2e6e5;
		border-width: 1px 0 0 1px;
		&:first-of-type {
			text-align: start;
			font-size: 14px;
			border-left-width: 0;
		}
	}
	.head {
		position: sticky;
		top: -2px;
		background: $white;

		&.is-pinned {
			z-index: 5;
			border-bottom: 1px solid #e2e6e5;
			.head__cell {
				padding: 130px 10px 10px;
				border-bottom: 1px solid #e2e6e5;

				h2 {
					font-size: 22px;
					line-height: 32px;
					margin-top: 0;
				}
				h3 {
					font-size: 16px;
					line-height: 18px;
				}
				p {
					font-size: 0.8em;
					margin-top: 0;
				}
			}

			.container-icon {
				top: 125px;
				left: calc(50% - 35px);
				height: 80px;
			}
			.badge {
				top: 115px;
			}
		}
		&__cell {
			position: relative;
			padding: 25px;
			h2 {
				transition: all 0.4s ease;
				color: $priceColor;
				font-size: 50px;
				font-weight: 200;
				line-height: 38px;
				margin-top: 16px;
				white-space: nowrap;
			}

			h3 {
				font-size: 22px;
				transition: all 0.4s ease;
				color: $priceTitleColor;
				font-weight: 500;
				line-height: 38px;
			}

			p {
				opacity: 0.5;
				color: $pricePerMonthColor;
				font-size: 15px;
				line-height: 17px;
				margin-top: 20px;
			}

			@include media('desktop-1400') {
				height: 150px;
				padding: 20px 10px;

				h2 {
					font-size: 40px;
					line-height: 30px;
					margin-top: 15px;
				}

				h3 {
					font-size: 18px;
					line-height: 30px;
				}

				p {
					font-size: 12px;
					line-height: 14px;
					margin-top: 16px;
				}
			}

			@include media('desktop-1200') {
				height: 120px;
				padding: 20px 10px;

				h2 {
					font-size: 35px;
					line-height: 27px;
					margin-top: 13px;
				}

				h3 {
					font-size: 16px;
					line-height: 27px;
				}

				p {
					font-size: 12px;
					line-height: 13px;
					margin-top: 14px;
				}
			}

			@include media('tablet') {
				height: 90px;
				padding: 10px;

				h2 {
					font-size: 30px;
					line-height: 23px;
					margin-top: 10px;
				}

				h3 {
					font-size: 14px;
					line-height: 23px;
				}

				p {
					font-size: 11px;
					line-height: 12px;
					margin-top: 13px;
				}
			}
		}
	}
	.row {
		height: 80px;
		background-color: $white;
		&__cell {
			position: relative;
			padding: 15px;
			vertical-align: middle;
			text-align: center;
		}
		&--divider {
			font-weight: 500;
			color: $dividerTextColor;
			font-size: 16px !important;
			background-color: $dividerColor;
			border-right-width: 0;
			position: relative;
			z-index: 2;
		}
		&--storage,
		&--bold {
			font-size: 22px;
			color: $dark;
			font-weight: 500;

			@include media('desktop-1200') {
				font-size: 18px;
			}

			@include media('tablet') {
				font-size: 16px;
			}
		}
		&--options {
			position: relative;
			border: 1px solid #e2e6e5;
			border-width: 1px 0 0 1px;
			height: 80px;
			max-height: 80px;
		}
	}

	.btn {
		margin: 10px auto 0;
		text-wrap: nowrap;

		@include media('desktop-1400') {
			font-size: 9px;
			height: 38px;
			line-height: 38px;
			margin: 10px auto 0;
		}
	}

	.container-icon {
		height: 180px;
		position: absolute;
		top: -10px;

		left: calc(50% - 80px);
		transition: height 0.4s ease;
		@include media('desktop-1400') {
			height: 150px;
			left: calc(50% - 70px);
		}

		@include media('desktop-1200') {
			height: 120px;
			left: calc(50% - 55px);
		}

		@include media('tablet') {
			height: 90px;
			left: calc(50% - 40px);
		}
	}

	.tick {
		display: inline-block;

		&::after {
			content: '';
			display: block;
			width: 5px;
			height: 11px;
			border: solid $brand-green;
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
		}
	}
	.badge {
		height: auto;
		width: 28px;
		position: absolute;
		right: 20px;
		top: 0;
		transition: width 0.25s ease;
		svg {
			width: 100%;
			height: 100%;
		}

		@include media('desktop-1400') {
			width: 20px;
		}
	}
}
.dropdown {
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	position: relative;
	cursor: pointer;
	padding: 15px;

	&__trigger {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__list {
		position: relative;
		z-index: 11;
		width: 100%;
		left: 0;
		top: 15px;
		max-height: 0;
		overflow: hidden;

		li {
			&:hover {
				opacity: 0.7;
			}
			a {
				display: block;
				padding: 15px 0;
				text-decoration: none;
				font-size: 14px;
				line-height: 1.6;
			}

			&.other {
				border-top: 1px solid $borderColor;

				a {
					text-decoration: underline;
				}
			}
		}
	}

	.chevron::before {
		content: '';
		border-style: solid;
		border-width: 1px 1px 0 0;
		display: inline-block;
		height: 0.45em;
		left: 0.15em;
		position: relative;
		top: 0.15em;
		transform: rotate(135deg);
		vertical-align: top;
		width: 0.45em;
		transition: all 0.3s ease;
		margin-left: 20px;
	}

	&.open {
		z-index: 2;
		box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1);
		width: 100%;
		transform: translateY(-2px);
		background-color: $white;
		position: absolute;
		top: 0px;
		.dropdown__list {
			border-top: 1px solid $borderColor;
			max-height: 1000px;
			transition: max-height 0.5s ease-in-out;
		}

		.chevron::before {
			transform: rotate(-45deg);
		}
	}
}
.row--expander {
	justify-content: center !important;
	background-color: $white;
	border: 1px solid #e2e6e5;
	border-width: 1px 0;
	cursor: pointer;
	z-index: 2;
	position: relative;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		font-size: 14px;
		padding: 0;
	}
}

.package-switcher {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	background-color: $white;
	width: 100%;
	height: 55px;

	ul {
		text-align: center;

		li {
			display: inline-block;
			padding: 5px 7px;
			// margin: 2px;
			margin: 15px 0;
			border-radius: 14px;
			border: 1px solid transparent;
			font-size: 12px;
			color: $grey;
			cursor: pointer;

			&.active {
				color: $blue;
				border-color: $blue;
			}
		}
	}
}

.pricespage {
	background-color: $bg;

	padding: $section-inner-padding 0;

	$visuals: '';

	.content-grid-container {
		@include media('desktop-1400-ab') {
			margin: 0 auto;
			max-width: 1400px;
		}
	}

	.span12 {
		@include media('desktop-1400-ab') {
			margin: 0;
			width: 100%;
		}

		@include media('tablet') {
			width: 100%;
		}
	}

	&__title {
		margin-bottom: 60px;
	}

	&__footnote {
		text-align: center;
		margin: 80px 0 50px;
	}
}
</style>
