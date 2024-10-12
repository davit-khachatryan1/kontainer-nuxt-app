<template>
  <div class="header">
    <nav class="content-grid-container nav">
      <div class="nav__left">
        <SmartLink class="nav__left__logo" type="page" slug="home" :ariaLabel="logoLabel">
          <IconLogoMark class="icon--logo-mark" />
          <IconLogoText class="icon--logo-text" />
        </SmartLink>
        <div v-for="(item, index) in menuItems" :key="index">
          <li :class="{ 'has-dropdown': item.children }" class="nav__right__menu-item">
            <template v-if="item.children">
              <span
                :class="[
                  'link',
                  'link-hover',
                  { 'nuxt-link-active': activeMenuParent === item.slug },
                ]"
              >
                <span v-html="item.title" />
              </span>
              <transition name="fade">
                <div
                  :class="[
                    'dropdown',
                    {
                      'has-first-only': item.box_image_1 && !item.box_image_2,
                    },
                    {
                      'has-both': item.box_image_1 && item.box_image_2,
                    },
                  ]"
                >
                  <ol>
                    <li
                      v-for="(sublink, index) in item.children"
                      :key="index"
                      :class="{ 'has-dropdown': sublink.children }"
                    >
                      <a
                        v-if="sublink.children"
                        :class="[
                          'link',
                          {
                            'nuxt-link-exact-active': activeMenuChild === sublink.slug,
                          },
                        ]"
                        v-html="sublink.title"
                      />

                      <SmartLink
                        v-else
                        class="link"
                        :type="sublink.type"
                        :slug="sublink.slug"
                        :url="sublink.url"
                        :class="[
                          {
                            'nuxt-link-exact-active': activeMenuChild === sublink.slug,
                          },
                        ]"
                      >
                        <SmartImage
                          v-if="sublink?.icon"
                          class="sub-icon"
                          :image="sublink?.icon"
                          :srcset="
                            sublink.icon.sizes.mobile_min &&
                            sublink.icon.sizes.mobile_sm &&
                            sublink.icon.sizes.mobile &&
                            sublink.icon.sizes.tablet_sm &&
                            sublink.icon.sizes.tablet
                              ? [
                                  sublink.icon.url + ' 1025w',
                                  sublink.icon.sizes.tablet + ' 1024w',
                                  sublink.icon.sizes.tablet_sm + ' 950w',
                                  sublink.icon.sizes.mobile + ' 768w',
                                  sublink.icon.sizes.mobile_sm + ' 567w',
                                  sublink.icon.sizes.mobile_min + ' 320w',
                                ]
                              : []
                          "
                          :sizes="
                            sublink.icon.sizes.mobile_min &&
                            sublink.icon.sizes.mobile_sm &&
                            sublink.icon.sizes.mobile &&
                            sublink.icon.sizes.tablet_sm &&
                            sublink.icon.sizes.tablet
                              ? [
                                  '(min-width: 1025px) 40vw',
                                  '(max-width: 1024px) 40vw',
                                  '(max-width: 950px) 40vw',
                                  '(max-width: 768px) 70vw',
                                  '(max-width: 567px) 70vw',
                                  '(max-width: 320px) 70vw',
                                ]
                              : ['sidekick_inline']
                          "
                          nocrop
                        />
                        <div class="info">
                          <span v-html="sublink.title" />
                          <p v-if="sublink?.sub_text" v-html="sublink.sub_text" />
                        </div>
                      </SmartLink>
                    </li>
                  </ol>
                  <div v-if="item.box_image_1 || item.box_image_2" class="first_line" />
                  <div
                    :class="[
                      'image_card',
                      { first_card: item.box_image_1 && item.box_image_2 },
                    ]"
                  >
                    <div v-if="item.box_image_1" class="main_card">
                      <SmartImage
                        v-if="item?.box_image_1"
                        class="box_image"
                        :image="item?.box_image_1"
                        :srcset="
                          item.box_image_1.sizes.mobile_min &&
                          item.box_image_1.sizes.mobile_sm &&
                          item.box_image_1.sizes.mobile &&
                          item.box_image_1.sizes.tablet_sm &&
                          item.box_image_1.sizes.tablet
                            ? [
                                item.box_image_1.url + ' 1025w',
                                item.box_image_1.sizes.tablet + ' 1024w',
                                item.box_image_1.sizes.tablet_sm + ' 950w',
                                item.box_image_1.sizes.mobile + ' 768w',
                                item.box_image_1.sizes.mobile_sm + ' 567w',
                                item.box_image_1.sizes.mobile_min + ' 320w',
                              ]
                            : []
                        "
                        :sizes="
                          item.box_image_1.sizes.mobile_min &&
                          item.box_image_1.sizes.mobile_sm &&
                          item.box_image_1.sizes.mobile &&
                          item.box_image_1.sizes.tablet_sm &&
                          item.box_image_1.sizes.tablet
                            ? [
                                '(min-width: 1025px) 40vw',
                                '(max-width: 1024px) 40vw',
                                '(max-width: 950px) 40vw',
                                '(max-width: 768px) 70vw',
                                '(max-width: 567px) 70vw',
                                '(max-width: 320px) 70vw',
                              ]
                            : ['sidekick_inline']
                        "
                        nocrop
                        @click="handleRedirect(item.box_page_link_1)"
                      />
                      <div class="card_info">
                        <span v-html="item.box_title_1" />
                        <p v-html="item.box_text_1" />
                        <span
                          @click="handleRedirect(item.box_page_link_1)"
                          :class="['link', 'link-hover', 'nuxt-link-active']"
                          >Read more</span
                        >
                      </div>
                    </div>
                  </div>
                  <div :class="['image_card']">
                    <div v-if="item.box_image_2" class="main_card">
                      <SmartImage
                        v-if="item?.box_image_2"
                        class="box_image"
                        :image="item?.box_image_2"
                        :srcset="
                          item.box_image_2.sizes.mobile_min &&
                          item.box_image_2.sizes.mobile_sm &&
                          item.box_image_2.sizes.mobile &&
                          item.box_image_2.sizes.tablet_sm &&
                          item.box_image_2.sizes.tablet
                            ? [
                                item.box_image_2.url + ' 1025w',
                                item.box_image_2.sizes.tablet + ' 1024w',
                                item.box_image_2.sizes.tablet_sm + ' 950w',
                                item.box_image_2.sizes.mobile + ' 768w',
                                item.box_image_2.sizes.mobile_sm + ' 567w',
                                item.box_image_2.sizes.mobile_min + ' 320w',
                              ]
                            : []
                        "
                        :sizes="
                          item.box_image_2.sizes.mobile_min &&
                          item.box_image_2.sizes.mobile_sm &&
                          item.box_image_2.sizes.mobile &&
                          item.box_image_2.sizes.tablet_sm &&
                          item.box_image_2.sizes.tablet
                            ? [
                                '(min-width: 1025px) 40vw',
                                '(max-width: 1024px) 40vw',
                                '(max-width: 950px) 40vw',
                                '(max-width: 768px) 70vw',
                                '(max-width: 567px) 70vw',
                                '(max-width: 320px) 70vw',
                              ]
                            : ['sidekick_inline']
                        "
                        nocrop
                        @click="handleRedirect(item.box_page_link_1)"
                      />
                      <div class="card_info">
                        <span v-html="item.box_title_2" />
                        <p v-html="item.box_text_2" />
                        <span :class="['link', 'link-hover', 'nuxt-link-active']"
                          >Read more</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </template>

            <SmartLink
              v-else
              class="link"
              :type="item.type"
              :slug="item.slug"
              :url="item.url"
            >
              <span v-html="item.title" />
            </SmartLink>
          </li>
        </div>
      </div>
      <div class="nav__right">
        <ol
          @mouseover="hoverMenu = true"
          @mouseleave="hoverMenu = false"
          :class="{ hover: hoverMenu }"
        >
          <li class="nav__right__ctas">
            <button-comp
              v-if="bookDemo.show"
              id="democlick"
              class="btn--cta"
              :link="bookDemo.link"
            >
              <span class="btn__text">{{ bookDemo.title }}</span>
            </button-comp>
            <button-comp
              id="trialclick"
              v-if="cta.link"
              :class="cta.class"
              :link="cta.link"
            >
              <span class="btn__text btn__text--long">{{ cta.title }}</span>
              <span class="btn__text btn__text--short">{{ cta.titleShort }}</span>
            </button-comp>
          </li>
          <li
            class="nav__right__language has-dropdown no-css-hover"
            @mouseenter="handleLangMenuHover"
            @mouseleave="handleLangMenuHover"
            @click="handleLangMenuClick"
          >
            <LanguageIcon class="globe" />
            <IconCaret class="has-dropdown__icon" />
            <transition name="fade">
              <LanguageSelect
                :class="{ show: showLanguageMenu }"
                class="dropdown"
                markup="list"
              />
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
import { ref, computed } from "vue";
import useStore from "@/store";
const SmartLink = defineAsyncComponent(() =>
  import("~/components/helper/smartlink/index.vue")
);
const SmartImage = defineAsyncComponent(() =>
  import("~/components/helper/smartimage/index.vue")
);
import { prepareWPObjectsToLinks } from "~/components/composables/prepareWPObjectsToLinks";
const LanguageSelect = defineAsyncComponent(() =>
  import("~/components/organisms/language-select/index.vue")
);
const ButtonComp = defineAsyncComponent(() =>
  import("~/components/atoms/button/index.vue")
);
const Hamburger = defineAsyncComponent(() =>
  import("~/components/atoms/hamburger/index.vue")
);
const IconCaret = defineAsyncComponent(() => import("~/assets/svg/caret-select.svg"));
const LanguageIcon = defineAsyncComponent(() => import("~/assets/svg/language.svg"));
const IconLogoText = defineAsyncComponent(() =>
  import("~/assets/svg/kontainer-logo-text.svg")
);
const IconLogoMark = defineAsyncComponent(() =>
  import("~/assets/svg/kontainer-logo-mark.svg")
);

const hoverMenu = ref(false);
const showLanguageMenu = ref(false);

const store = useStore();
const nuxtApp = useNuxtApp();
const logoLabel = computed(() => store.pageOptions.logo_label);
const menuItems = computed(() => (store.menus ? store.menus.primary : []));
const cta = computed(() => ({
  title: store.pageOptions.navcta_title,
  titleShort: store.pageOptions.navcta_title_short,
  link: prepareWPObjectsToLinks(store.pageOptions.navcta),
  class: bookDemo.value.show ? "btn--grey" : "btn--cta",
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
  const currentMenuSlug = nuxtApp._route.params.slug;
  let activeParent = "";
  menuItems.value?.forEach((item) => {
    if (item.children) {
      item.children?.forEach((child) => {
        if (child.slug === currentMenuSlug) {
          activeParent = item.slug;
        }
      });
    }
  });
  return activeParent;
});

const activeMenuChild = computed(() => {
  const route = useRoute();
  return route.params.slug;
});
console.log(menuItems);

const activeMenuElement = computed(() => {
  let activeParent = "";
  menuItems.value?.forEach((item) => {
    if (item.children) {
      item.children?.forEach((child) => {
        if (child.slug === activeMenuChild.value) {
          activeParent = item;
        }
      });
    }
  });
  return activeParent;
});

function handleLangMenuHover(e) {
  const { type } = e;
  if (!window.matchMedia("(hover: none)").matches) {
    showLanguageMenu.value = type === "mouseenter";
  }
}

function handleRedirect(link) {
  window.open(link);
}

function handleLangMenuClick(e) {
  if (window.matchMedia("(hover: none)").matches) {
    showLanguageMenu.value = !showLanguageMenu.value;
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/import";

.nav .icon {
  @include media("desktop-1200") {
    display: none !important;
  }

  @include media("tablet") {
    display: inline-block !important;
  }

  @include media("mobile-sm") {
    display: none !important;
  }
}
</style>

<style scoped lang="scss">
@import "../../../assets/scss/import";

.header {
  width: 100%;
  position: fixed;
  z-index: z("header");
  background-color: $white;
  top: 0;

  .position-hamburger {
    z-index: z("offscreenToggle");
    position: fixed;
    top: (calc($desktopHeight / 2));
    transform: translate3d(50%, -50%, 0);

    @include media("desktop") {
      right: (calc($desktopMargin / 2));
    }

    @include media("desktop-1200") {
      right: (calc($tabletMargin / 2));
    }

    @include media("tablet") {
      right: (calc($tabletMargin / 2));
    }

    @include media("mobile-sm") {
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

  @include media("tablet") {
    flex-wrap: wrap;
    height: auto;
    min-height: 120px;
  }

  @include media("tablet-below") {
    flex-wrap: nowrap;
    height: 120px;
    min-height: unset;
    padding: 0;
  }

  @include media("mobile-sm") {
    height: 60px;
  }

  &__left {
    display: flex;
    align-items: center;
    &__logo {
      text-decoration: none;
      outline: none;
      position: relative;
      margin-right: 40px;

      .icon--logo-text {
        width: 200px;
        height: auto;

        @include media("mobile-sm") {
          display: none;
        }
      }

      .icon--logo-mark {
        display: none;
        width: 38px;

        @include media("mobile-sm") {
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

    @include media("tablet-below") {
      width: 100%;
    }

    @include media("mobile-sm") {
      margin-left: 20px;
      margin-right: 30px;
    }
  }

  ol {
    display: flex;
    align-items: center;

    @include media("tablet") {
      justify-self: flex-end;
      width: 100%;
    }

    li:hover > a:not(.btn),
    li:hover > span {
      color: #aeaeae;
    }
  }

  li {
    display: inline-block;

    a {
      transition: color 0.2s ease;
      width: max-content;
    }
  }

  .link {
    text-decoration: none;
    padding: 27px 19px;

    @include media("desktop-1400") {
      padding: 27px 12px;
    }

    @include media("desktop-1200") {
      padding: 27px 8px;
    }

    @include media("desktop-1100") {
      display: none;
    }
  }

  .link.nuxt-link-active {
    color: $label-color;
  }

  .nuxt-link-exact-active {
    &::before {
      width: 16px !important;
    }

    span {
      transform: translateX(26px);
      color: #aeaeae;
    }
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
      padding: 40px;
      filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.15));
      background: $white;
      position: absolute;
      top: 38px;
      display: flex;
      flex-direction: row;
      transition: all 0.3s $easeInOut;

      ol {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-auto-flow: column;
        column-gap: 60px;
      }

      .box_image {
        width: 220px;
        height: 130px;
        object-fit: cover;
      }

      & > li:hover a {
        color: #aeaeae;
      }

      &.active {
        display: block;
      }

      li {
        display: block;
      }

      .card_info {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        row-gap: 8px;
        span {
          text-transform: none;
          font-weight: 500;
          @include responsive-font(1.26vw, 12px, 14px, 14px);
          line-height: 20px;
        }

        p {
          text-transform: none;
          @extend %text-paragraph1;
          @include responsive-font(1.26vw, 10px, 12px, 14px);
          line-height: 20px;
        }
        .link-hover {
          padding: 0;
        }
      }

      .first_line {
        width: 3px;
        background: #c0a17c;
        display: flex;
        margin: 0 40px;
        opacity: 0.5;
      }

      .first_card {
        margin-right: 20px;
      }

      a {
        white-space: nowrap;
        color: $text-color;
        padding: 18px 0;
        display: flex;
        column-gap: 10px;
        line-height: 1;
        position: relative;
        align-items: center;

        .sub-icon {
          width: 30px;
          height: 30px;
        }
        &:has(.sub-icon) {
          &::before {
            display: none;
          }
        }
        &::before {
          transition: all 0.2s ease;
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background-color: $brand-green;
          position: absolute;
          left: 0;
          top: calc(50% - 1px);
        }

        .info {
          transition: transform 0.2s ease;
          display: block;
          p {
            margin-top: 4px;
            text-transform: none;
            @extend %text-paragraph1;
            @include responsive-font(1.26vw, 10px, 12px, 14px);
            line-height: normal;
          }
        }

        &.link.nuxt-link-active,
        &:hover {
          &::before {
            width: 16px;
          }
          .info {
            transform: translateX(26px);
          }
          &:has(.sub-icon) {
            .info {
              transform: translateX(5px);
            }
          }
        }
      }
    }

    .has-first-only {
      @include media("desktop-1400") {
        transform: translateX(-13%);
      }

      @include media("desktop-1200") {
        transform: translateX(-22%);
      }
    }

    .has-both {
      transform: translateX(-22%);
      @include media("desktop-1600") {
        transform: translateX(-30%);
      }

      @include media("desktop-1400") {
        transform: translateX(-36%);
        flex-wrap: wrap;
        justify-content: space-between;
        .first_line {
          width: 100%;
          height: 2px;
          margin: 20px 0 40px 0;
        }
        .image_card {
          width: 48%;
          margin: 0;
        }
      }

      @include media("desktop-1200") {
        transform: translateX(-43%);
      }
    }

    &:hover {
      .link-hover {
        &::after {
          content: "";
          background-color: $white;
          position: absolute;
          bottom: -37px;
          left: calc(50% - 11px);
          transform: rotate(45deg);
          z-index: 10;
          filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.15));
          padding: 0 !important;
        }
      }
    }
  }

  &__right__ctas {
    margin-left: 19px;
    white-space: nowrap;
    display: flex !important;

    @include media("desktop-1400") {
      margin-left: 12px;
    }

    @include media("tablet") {
      margin-left: auto;
    }

    @include media("mobile-sm") {
      width: 100%;
    }

    .btn {
      font-size: 12px;
      padding: 0 25px;
      height: 50px;
      line-height: 50px;

      @include media("desktop-1400") {
        font-size: 11px;
        letter-spacing: 2px;
        padding: 0 20px;
      }

      @include media("mobile-sm") {
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

        @include media("desktop-1400") {
          padding-left: 59px;
        }

        @include media("mobile") {
          display: none;
        }
      }

      &__text {
        &--long {
          @include media("desktop-1400") {
            display: none;
          }

          @include media("tablet") {
            display: inline-block;
          }
        }

        &--short {
          @include media("desktop-1400-ab") {
            display: none;
          }

          @include media("desktop-1400") {
            display: inline-block;
          }

          @include media("tablet") {
            display: none;
          }
        }
      }
    }
  }

  &__right__language {
    flex-shrink: 0;
    margin: 20px;

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
      font-size: 14px;
      transform: translate(calc(-50% + 10px), 20px);
      padding: 40px 30px !important;

      @include media("desktop-1200") {
        transform: translate(-60%, 20px);
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        left: 50%;
        height: 38px;
        top: -38px;
        transform: translateX(-50%);
      }

      &::after {
        left: calc(50% - 10px) !important;

        @include media("desktop-1200") {
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
