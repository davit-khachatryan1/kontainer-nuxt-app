<template>
  <button
    v-if="submit"
    :class="['btn', buttonTypeClassName, largeClassName]"
    type="submit"
  >
    <slot></slot>
    <div class="background"></div>
  </button>
  <button
    v-else-if="hasFunction"
    @click.prevent="$emit('func')"
    :class="['btn', buttonTypeClassName, largeClassName]"
    :target="setTarget"
    :type="submitForm ? 'submit' : ''"
  >
    <slot></slot>
    <component
      v-if="iconName"
      :class="['icon', 'icon--' + iconName]"
      :is="iconComponent[iconName] || 'div'"
      v-intersect="{
        handler: () => loadIcon(iconName),
        options: { rootMargin: '0px', threshold: 0.1 },
      }"
    />
    <div class="background"></div>
  </button>
  <smart-link
    v-else-if="hasContent || iconName"
    v-bind="link"
    :class="['btn', buttonTypeClassName, largeClassName]"
    :target="setTarget"
    :aria-label="ariaLabel"
  >
    <slot></slot>
    <component
      v-if="iconName"
      :class="['icon', 'icon--' + iconName]"
      :is="iconComponent[iconName] || 'div'"
      v-intersect="{
        handler: () => loadIcon(iconName),
        options: { rootMargin: '0px', threshold: 0.1 },
      }"
    />
    <div class="background"></div>
  </smart-link>
</template>

<script setup>
import { shallowRef, computed, defineAsyncComponent } from "vue";
import { useSlots, defineProps } from "vue";

const SmartLink = defineAsyncComponent(() => import("../../helper/smartlink/index.vue"));

const iconComponent = shallowRef({});

const iconNames = ["facebook", "linkedin", "twitter", "arrow", "caret"];

iconNames.forEach((icon) => {
  iconComponent.value[icon] = defineAsyncComponent(() =>
    import(`~/assets/svg/${icon}.svg`)
  );
});

const props = defineProps({
  hasFunction: { type: String },
  link: { type: Object },
  iconName: { type: String },
  type: {
    validator(value) {
      return [
        "default",
        "cta",
        "dark",
        "square",
        "caret",
        "social",
        "outline",
        "solid",
        "grey",
      ].includes(value);
    },
    default: "default",
  },
  large: { type: Boolean, default: false },
  submit: { type: Boolean },
  submitForm: { type: Boolean },
  ariaLabel: { type: String },
});

const slots = useSlots();

const buttonTypeClassName = computed(() => {
  switch (props.type) {
    case "cta":
      return "btn--cta";
    case "dark":
      return "btn--dark";
    case "square":
      return "btn--square";
    case "caret":
      return "btn--caret";
    case "social":
      return "btn--social";
    case "outline":
      return "btn--square";
    case "solid":
      return "btn--cta";
    case "grey":
      return "btn--grey";
    default:
      return "";
  }
});

const largeClassName = computed(() => {
  return props.large ? "btn--large" : "";
});

const setTarget = computed(() => {
  return props.type === "social" ? "_blank" : false;
});

const hasContent = computed(() => {
  return !!slots.default;
});

const loadIcon = async (iconName) => {
  if (!iconComponent.value[iconName]) {
    iconComponent.value[iconName] = (
      await import(`~/assets/svg/${iconName}.svg?component`)
    ).default;
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
button:focus {
  outline: 0;
}

.btn {
  @extend %text-button;
  display: inline-block;
  background: $brand-green;
  border: 1px solid $brand-green;
  border-radius: 28px;
  height: 55px;
  line-height: 55px;
  padding: 0 30px;
  color: $white;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s ease;
  overflow: hidden;

  @include media("mobile-sm") {
    width: 100%;
    vertical-align: middle;
    text-align: center;
  }

  .icon {
    display: inline-block;
    color: $white;
    margin-left: 10px;
    transition: color 0.3s ease;
  }

  &:hover {
    .icon {
      color: $label-color;
    }
  }

  &--large {
    @extend %text-button-large;
  }

  &--cta {
    background: $brand-green;
    border-color: $brand-green;
    color: $text-color;

    @include buttonShadowAndHover($brand-green, $white);

    .icon {
      color: $text-color;
    }

    &:hover {
      color: $brand-green;

      .icon {
        color: $brand-green;
      }
    }
  }

  &--grey {
    $grey-btn: $gray-concrete;
    background: $grey-btn;
    border-color: $grey-btn;
    color: $text-color;

    @include buttonShadowAndHover($grey-btn, $white, false, 2);

    &:hover {
      color: darken($gray-concrete, 55%);
    }
  }

  &--square {
    background: transparent;
    border: 1px solid $label-color;
    border-radius: 0;
    color: $label-color;

    @include buttonShadowAndHover(transparent, $label-color, true, 0);

    .icon {
      color: $label-color;
    }

    &:hover {
      color: $text-color;

      .icon {
        color: $text-color;
      }
    }
  }

  &--caret {
    position: relative;
    background: transparent;
    color: $brand-green;
    border: none;
    border-radius: 0;
    padding: 0;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    padding-left: 25px;

    .icon {
      color: $brand-green;
      position: absolute;
      left: 0;
      margin: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover {
      .icon {
        color: $brand-green;
      }
    }
  }

  &--social {
    align-items: center;
    background: transparent;
    border: 1px solid currentColor;
    border-radius: 0;
    border-color: $label-color;
    color: currentColor;
    display: inline-flex;
    height: 35px;
    justify-content: center;
    line-height: 35px;
    padding: 0;
    width: 35px;
    vertical-align: middle;
    color: $label-color;

    @include buttonShadowAndHover($white, $label-color, true, 0);

    .icon {
      color: currentColor;
      margin: 0;
    }

    &:hover {
      background: currentColor;
      color: $label-color;

      .icon {
        color: $white;
      }
    }

    &-white {
      color: $white;

      &:hover {
        color: $white;

        .icon {
          color: $black;
        }
      }
    }
  }

  &--price {
    background: $blue-dark;
    border-color: $blue-dark;
    color: $white;

    @include buttonShadowAndHover($blue-dark, $gray-concrete, false, 2);

    .icon {
      color: $white;
    }

    &:hover {
      color: $blue-dark;

      .icon {
        color: $blue-dark;
      }
    }

    &-free {
      @include buttonShadowAndHover($brand-green, $gray-concrete);
    }
  }

  .signup-block & {
    @include buttonShadowAndHover($brand-green, $blue-dark);
  }
}

.offcanvas {
  .btn--social {
    @include buttonShadowAndHover($text-color, $label-color, true);
  }

  .btn--cta {
    @include buttonShadowAndHover($brand-green, $text-color);
  }
}
.section--bg--grey .teaser {
  .btn--cta {
    @include buttonShadowAndHover($brand-green, $gray-concrete);
  }
}
</style>
