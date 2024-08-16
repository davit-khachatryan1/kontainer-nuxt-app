<template>
  <div class="currency">
    <div
      class="selected"
      v-intersect="{
        handler: () => loadIcon(activeCurrency.selected),
        options: { rootMargin: '0px', threshold: 0.1 },
      }"
    >
      <component
        :is="iconComponent[activeCurrency.selected.toUpperCase()] || 'div'"
      ></component>
      <span>{{ activeCurrency.name }}</span>
      <IconCaret />
    </div>
    <div class="dropdown-block">
      <div class="particle" />
      <div class="dropdown">
        <div
          v-for="(lang, index) in Object.values(languageOptions)"
          :key="index"
          v-intersect="{
            handler: () => loadIcon(lang.selected),
            options: { rootMargin: '0px', threshold: 0.1 },
          }"
          @click="changeValue(lang)"
        >
          <component
            :is="iconComponent[lang.selected.toUpperCase()] || 'div'"
          ></component>
          <span>{{ lang.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useStore from "@/store";
const store = useStore();

import { defineAsyncComponent } from "vue";
import { DEFAULT_CURRENCIES } from "~/constants/styles";
const IconCaret = defineAsyncComponent(() => import("~/assets/svg/caret-select.svg"));

const iconComponent = ref({});

const loadIcon = async (lang) => {
  if (!iconComponent.value[lang.toUpperCase()]) {
    iconComponent.value[lang.toUpperCase()] = (
      await import(`~/assets/svg/flags/${lang}.svg?component`)
    ).default;
  }
};

const props = defineProps({
  setActiveCurrency: Function,
});

const languageOptions = computed(() => DEFAULT_CURRENCIES);

const activeCurrency = ref(languageOptions.value[store.locale]);

const changeValue = (currency) => {
  activeCurrency.value = currency;
  props.setActiveCurrency(currency);
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";

.dropdown-block {
  position: absolute;
  top: 100%;
  left: 6px;
  z-index: 10;
  display: none;

  .dropdown {
    box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
    padding: 20px;
    width: max-content;
    display: flex;
    height: max-content;
    flex-direction: column;
    row-gap: 10px;
    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    transition: 1s;
  }
  .particle {
    width: 20px;
    height: 20px;
    rotate: 45deg;
    background: #ffffff;
    margin-bottom: -10px;
    margin-left: calc(50% - 10px);
    margin-top: 10px;
    position: relative;
    box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
}
.selected {
  box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
  padding: 8px 16px;
  align-items: center;
  background: #ffffff;
  width: max-content;
}
.currency {
  width: max-content;
  height: max-content;
  position: relative;
  margin-bottom: 10px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    .dropdown-block {
      display: block;
    }
  }
}
</style>
