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
            v-else-if="block.layout === 'hero'"
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
          <FeaturesBlock v-else-if="block.layout === 'features'" :data="block.data" />
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
            <strong style="font-weight: 700">{{ block.layout }}</strong> (coming soon)<br />
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
      v-if="empty && loaded"
      angleTyp="0"
      bg="grey"
      :pin="{ top: false, bottom: false }"
    >
      <div class="content-grid-container">Coming soon...</div>
    </ContentSection>
    <PageNav />
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from "vue";
const AnimationBox = defineAsyncComponent(() =>
  import("~/components/atoms/animationbox/index.vue")
);
const SignupBlock = defineAsyncComponent(() =>
  import("~/components/organisms/signup/index.vue")
);
const TestimonialBlock = defineAsyncComponent(() =>
  import("~/components/organisms/testimonial/index.vue")
);
const FeaturesBlock = defineAsyncComponent(() =>
  import("~/components/organisms/features/index.vue")
);
const ContentSection = defineAsyncComponent(() =>
  import("~/components/atoms/section/index.vue")
);
import { SECTION_ANGLE_NONE } from "~/components/composables/section";
const Hero = defineAsyncComponent(() => import("~/components/organisms/hero/index.vue"));
const Logos = defineAsyncComponent(() =>
  import("~/components/organisms/logos/index.vue")
);
const Prices = defineAsyncComponent(() =>
  import("~/components/organisms/prices/index.vue")
);
const PricesNew = defineAsyncComponent(() =>
  import("~/components/organisms/prices-new/index.vue")
);
const Sidekick = defineAsyncComponent(() =>
  import("~/components/organisms/sidekick/index.vue")
);
const SignupSection = defineAsyncComponent(() =>
  import("~/components/organisms/signup-section/index.vue")
);
const NewsKards = defineAsyncComponent(() =>
  import("~/components/organisms/news-kards/index.vue")
);
const CaseKards = defineAsyncComponent(() =>
  import("~/components/organisms/case-kards/index.vue")
);
const Whitelabels = defineAsyncComponent(() =>
  import("~/components/organisms/whitelabels/index.vue")
);
const WysiwygColumns = defineAsyncComponent(() =>
  import("~/components/organisms/wysiwyg-columns/index.vue")
);
const ContactSection = defineAsyncComponent(() =>
  import("~/components/organisms/contact/index.vue")
);
const Links = defineAsyncComponent(() =>
  import("~/components/organisms/links/index.vue")
);
const Employees = defineAsyncComponent(() =>
  import("~/components/organisms/employee-section/index.vue")
);
const SelectedFeatures = defineAsyncComponent(() =>
  import("~/components/organisms/selected-features/index.vue")
);
const NewsList = defineAsyncComponent(() =>
  import("~/components/organisms/news-list/index.vue")
);
const BlogList = defineAsyncComponent(() =>
  import("~/components/organisms/blog-list/index.vue")
);
const LinksSwiper = defineAsyncComponent(() =>
  import("~/components/organisms/links-swiper/index.vue")
);
const QuoteSlider = defineAsyncComponent(() =>
  import("~/components/organisms/quote-slider/index.vue")
);
const CodeInserter = defineAsyncComponent(() =>
  import("~/components/organisms/code-inserter/index.vue")
);
const LandingPage = defineAsyncComponent(() =>
  import("~/components/organisms/landing-page/index.vue")
);
const PageNav = defineAsyncComponent(() =>
  import("~/components/organisms/page-nav/index.vue")
);
const Faq = defineAsyncComponent(() => import("~/components/organisms/faq/index.vue"));

const props = defineProps({
  flexible: Array | Boolean,
  type: String,
  loaded: Boolean
});

const empty = computed(() => {
  return !props.flexible || props.flexible.length === 0;
});

const loaded = computed(() => {
  return props.loaded;
});
const blocks = computed(() =>
  (props.flexible || []).map((block, index) => {
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
        bg: section_bg_color || "grey",
        taglineColor: section_tagline_color || "brown",
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
);

function nextSectionSlant(index) {
  const blockArray = blocks.value;
  if (blockArray[index + 1]) {
    return blockArray[index + 1].section.angleType;
  }
  return SECTION_ANGLE_NONE;
}

function animationBoxData(data = {}) {
  const {
    animating_box: enabled = false,
    animating_box_color: color = "yellow",
    animating_box_alignment: alignment = "left",
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
}
function afterAngle(currentIndex) {
  const nextBlock = blocks[currentIndex + 1];
  if (nextBlock) {
    return {
      section_bottom_angle: nextBlock.data.section_top_angle,
      section_bg_color_after: nextBlock.data.section_bg_color,
    };
  }

  return {
    section_bottom_angle: "1",
    section_bg_color_after: "white",
  };
}

function metaInfo(currentIndex) {
  const prevBlock = blocks[currentIndex - 1];
  const currentBlock = blocks[currentIndex];
  const nextBlock = blocks[currentIndex + 1];
  let pinBottomConnectsSameVisualElement = false;
  let pinTopConnectsSameVisualElement = false;

  if (
    currentBlock &&
    nextBlock &&
    currentBlock.data.section_bg_color === nextBlock.data.section_bg_color &&
    currentBlock.data.section_pin_bottom &&
    currentBlock.section.pin.top !== "pin_through" &&
    nextBlock.section.pin.top !== "pin_through"
  ) {
    pinBottomConnectsSameVisualElement = true;
  }

  if (
    currentBlock &&
    prevBlock &&
    currentBlock.data.section_bg_color === prevBlock.data.section_bg_color &&
    currentBlock.data.section_pin_top &&
    currentBlock.section.pin.top !== "pin_through" &&
    prevBlock.section.pin.top !== "pin_through"
  ) {
    pinTopConnectsSameVisualElement = true;
  }

  return {
    pinBottomConnectsSameVisualElement,
    pinTopConnectsSameVisualElement,
    nextBlock,
    currentBlock,
  };
}
function dataWithNextAngle(data, currentIndex) {
  return {
    ...data,
    ...afterAngle(currentIndex),
  };
}
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
      .animate-enter & {
      }
    }
  }
}

.pin {
  &--vertical--start {
  }

  &--vertical--end {
  }

  &--vertical--start,
  &--vertical--end {
    &::after {
    }

    .animate-enter & {
      &::after {
      }
    }
  }
}

.animationbox:not(.animationbox ~ .animationbox) {
  padding-top: 120px;

  @include media("mobile-sm") {
    padding-top: 60px;
  }
}
</style>
