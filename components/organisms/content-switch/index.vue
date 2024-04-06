<template>
	<div>
		<template v-for="(block, index) in blocks">
			<CodeInserter
				v-if="block.layout === 'code-inserter'"
				:data="block.data"
				:positionOnPage="index"
				v-bind:key="index"
			/>

			<LandingPage
				v-else-if="block.layout === 'landing_page'"
				:data="block.data"
				v-bind:key="index + '111'"
			/>
			<AnimationBox
				v-else
				v-bind:key="index + '222'"
				v-bind="animationBoxData(block.data)"
				:nextSectionSlant="nextSectionSlant(blocks, index)"
			>
				<ContentSection
					v-bind="block.section"
					:data="block.data"
					:meta="metaInfo(index)"
					:class="
						block.layout === 'testimonial' && block.data.section_pin_label
							? 'section--pin-pad'
							: ''
					"
				>
					<SignupBlock
						v-if="block.layout === 'signup' || block.layout === 'newsletter'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Hero
						v-if="block.layout === 'hero'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Sidekick
						v-else-if="block.layout === 'sidekick'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<TestimonialBlock
						v-else-if="block.layout === 'testimonial'"
						:data="dataWithNextAngle(block.data, index)"
						:class="['testimonial--' + index]"
						:positionOnPage="index"
					/>
					<Logos
						v-else-if="block.data && block.layout === 'logos'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Prices
						v-else-if="block.layout === 'prices'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<PricesNew
						v-else-if="block.layout === 'prices_new'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<FeaturesBlock
						v-else-if="block.layout === 'features'"
						:data="block.data"
					/>
					<SignupSection
						v-else-if="block.layout === 'signup-section'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<NewsKards
						v-else-if="block.layout === 'news-kards'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<CaseKards
						v-else-if="block.layout === 'case-kards'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Whitelabels
						v-else-if="block.layout === 'whitelabels'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<WysiwygColumns
						v-else-if="block.layout === 'columns'"
						:data="block.data"
						:type="type"
					/>
					<ContactSection
						v-else-if="block.layout === 'contact'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Links
						v-else-if="block.layout === 'links'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Employees
						v-else-if="block.layout === 'employees_section'"
						:data="block.data"
						:positionOnPage="index"
					></Employees>
					<SelectedFeatures
						v-else-if="block.layout === 'selected_features'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<NewsList
						v-else-if="block.layout === 'news_list'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<BlogList
						v-else-if="block.layout === 'blog_list'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<LinksSwiper
						v-else-if="block.layout === 'link_swiper'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<QuoteSlider
						v-else-if="block.layout === 'quote_slider'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<Faq
						v-else-if="block.layout === 'faq'"
						:data="block.data"
						:positionOnPage="index"
					/>
					<div
						v-else-if="block.layout !== 'code-inserter'"
						class="content-grid-container"
					>
						Layout:
						<strong style="font-weight: 700">{{ block.layout }}</strong> (coming
						soon)<br />
						<div
							style="
								padding: 10px 10px 10px 5px;
								background: #333;
								color: #fff;
								font-size: 12px;
								line-height: 1.5;
								font-family: 'Monaco', mono;
							"
						>
							<pre style="max-height: 500px; overflow: auto">{{
								JSON.stringify(block.data, null, 2)
							}}</pre>
						</div>
					</div>
				</ContentSection>
			</AnimationBox>
		</template>

		<ContentSection
			v-if="empty"
			angleTyp="0"
			bg="grey"
			:pin="{ top: false, bottom: false }"
		>
			<div class="content-grid-container">Coming soon...</div>
		</ContentSection>
		<PageNav />
	</div>
</template>


<script>
import AnimationBox from '~/components/atoms/animationbox/index.vue';
import SignupBlock from '~/components/organisms/signup/index.vue';
import TestimonialBlock from '~/components/organisms/testimonial/index.vue';
import FeaturesBlock from '~/components/organisms/features/index.vue';
import ContentSection, { SECTION_ANGLE_NONE } from '~/components/atoms/section/index.vue';
import Hero from '~/components/organisms/hero/index.vue';
import Logos from '~/components/organisms/logos/index.vue';
import Prices from '~/components/organisms/prices/index.vue';
import PricesNew from '~/components/organisms/prices-new/index.vue';
import Sidekick from '~/components/organisms/sidekick/index.vue';
import SignupSection from '~/components/organisms/signup-section/index.vue';
import NewsKards from '~/components/organisms/news-kards/index.vue';
import CaseKards from '~/components/organisms/case-kards/index.vue';
import Whitelabels from '~/components/organisms/whitelabels/index.vue';
import WysiwygColumns from '~/components/organisms/wysiwyg-columns/index.vue';
import ContactSection from '~/components/organisms/contact/index.vue';
import Links from '~/components/organisms/links/index.vue';
import Employees from '~/components/organisms/employee-section/index.vue';
import SelectedFeatures from '~/components/organisms/selected-features/index.vue';
import NewsList from '~/components/organisms/news-list/index.vue';
import BlogList from '~/components/organisms/blog-list/index.vue';
import LinksSwiper from '~/components/organisms/links-swiper/index.vue';
import QuoteSlider from '~/components/organisms/quote-slider/index.vue';
import CodeInserter from '~/components/organisms/code-inserter/index.vue';
import LandingPage from '~/components/organisms/landing-page/index.vue';
import PageNav from '~/components/organisms/page-nav/index.vue';
import Faq from '~/components/organisms/faq/index.vue';

export default {
	name: 'ContentSwitch',
	components: {
		AnimationBox,
		SignupBlock,
		TestimonialBlock,
		FeaturesBlock,
		ContentSection,
		Hero,
		Logos,
		Prices,
		PricesNew,
		Sidekick,
		SignupSection,
		NewsKards,
		CaseKards,
		Whitelabels,
		WysiwygColumns,
		ContactSection,
		Links,
		Employees,
		SelectedFeatures,
		NewsList,
		BlogList,
		LinksSwiper,
		QuoteSlider,
		CodeInserter,
		LandingPage,
		PageNav,
		Faq,
	},
	props: {
		flexible: {},
		type: {},
	},
	computed: {
		empty() {
			return !this.flexible || this.flexible.length === 0;
		},
		blocks() {
			const data = (this.flexible || []).map((block, index) => {
				const {
					acf_fc_layout,
					section_bg_color,
					section_tagline_color,
					section_top_angle,
					section_pin_label,
					section_pin_top,
					section_pin_bottom,
					section_padding_top,
					section_padding_bottom,
				} = block;

				return {
					layout: acf_fc_layout,
					section: {
						bg: section_bg_color || 'grey',
						taglineColor: section_tagline_color || 'brown',
						angleType: index === 0 ? SECTION_ANGLE_NONE : section_top_angle,
						pin: {
							label: section_pin_label,
							top: section_pin_top,
							bottom: section_pin_bottom,
						},
						sectionPaddingTop: section_padding_top,
						sectionPaddingBottom: section_padding_bottom,
					},
					data: block,
				};
			})
			return data;
		},
	},
	methods: {
		nextSectionSlant(blocks, index) {
			if (blocks[index + 1]) {
				return blocks[index + 1].section.angleType;
			}

			return SECTION_ANGLE_NONE;
		},
		animationBoxData(data = {}) {
			const {
				animating_box: enabled = false,
				animating_box_color: color = 'yellow',
				animating_box_alignment: alignment = 'left',
				animating_box_angle: angle = -40,
				animating_box_h_offset: horizontalOffset = 0,
				animating_box_v_offset_start: verticalOffsetStart = 0,
				animating_box_v_offset_stop: verticalOffsetStop = 0,
				animating_box_rotation: rotations = 1,
			} = data;

			return {
				enabled,
				color,
				alignment,
				angle: parseInt(angle, 10),
				horizontalOffset: parseInt(horizontalOffset, 10),
				verticalOffsetStart: parseInt(verticalOffsetStart, 10),
				verticalOffsetStop: parseInt(verticalOffsetStop, 10),
				rotations: parseFloat(rotations, 10),
			};
		},
		dataWithNextAngle(data, currentIndex) {
			return {
				...data,
				...this.afterAngle(currentIndex),
			};
		},
		afterAngle(currentIndex) {
			const nextBlock = this.blocks[currentIndex + 1];
			if (nextBlock) {
				return {
					section_bottom_angle: nextBlock.data.section_top_angle,
					section_bg_color_after: nextBlock.data.section_bg_color,
				};
			}

			return {
				section_bottom_angle: '1',
				section_bg_color_after: 'white',
			};
		},
		metaInfo(currentIndex) {
			const prevBlock = this.blocks[currentIndex - 1];
			const currentBlock = this.blocks[currentIndex];
			const nextBlock = this.blocks[currentIndex + 1];
			let pinBottomConnectsSameVisualElement = false;
			let pinTopConnectsSameVisualElement = false;

			if (
				currentBlock &&
				nextBlock &&
				currentBlock.data.section_bg_color ===
					nextBlock.data.section_bg_color &&
				currentBlock.data.section_pin_bottom &&
				currentBlock.section.pin.top !== 'pin_through' &&
				nextBlock.section.pin.top !== 'pin_through'
			) {
				pinBottomConnectsSameVisualElement = true;
			}

			if (
				currentBlock &&
				prevBlock &&
				currentBlock.data.section_bg_color ===
					prevBlock.data.section_bg_color &&
				currentBlock.data.section_pin_top &&
				currentBlock.section.pin.top !== 'pin_through' &&
				prevBlock.section.pin.top !== 'pin_through'
			) {
				pinTopConnectsSameVisualElement = true;
			}

			return {
				pinBottomConnectsSameVisualElement,
				pinTopConnectsSameVisualElement,
				nextBlock,
				currentBlock,
			};
		},
	},
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
a {
	color: currentColor;
}

.meetings-iframe-container iframe {
	min-width: unset !important;
}
section {
	&:not(.hero) {
		&:not(.testimonial) {
			// margin-top: 0;
			opacity: 1;
			transition: transform 0.4s 0.22s $easeInOut, opacity 0.2s 0.32s ease-in;

			.animate-enter & {
				transform: translateY(-$transformAnimationDistance);
				opacity: 0;
			}
		}
	}
}

.pin {
	&--vertical--start {
		transition: background-position 0.15s 0.15s linear;
	}

	&--vertical--end {
		transition: background-position 0.15s 0.3s linear;
	}

	&--vertical--start,
	&--vertical--end {
		background-position: 0 0;

		&::after {
			transition: opacity 0.15s 0.32s ease-in;
			opacity: 1;
		}

		.animate-enter & {
			background-position: 0 100%;

			&::after {
				opacity: 0;
			}
		}
	}
}

.animationbox:not(.animationbox ~ .animationbox) {
	padding-top: 120px;

	@include media('mobile-sm') {
		padding-top: 60px;
	}
}
</style>
