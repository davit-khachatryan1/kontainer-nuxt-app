<template>
  <div class="currency">
    <div class="selected">
      <div>
        <span class="short-name">({{ activeCurrency.short_name }}) </span>
        <span class="long-name">{{ activeCurrency.name }}</span>
      </div>
      <IconCaret />
    </div>
    <div class="dropdown-block">
      <div class="dropdown">
        <div
          v-for="(lang, index) in Object.values(currencyOptions)"
          :key="index"
          @click="changeValue(lang)"
        >
          <div :class="{ 'dropdown-selected': lang.selected == activeCurrency.selected }">
            <span class="short-name">({{ lang.short_name }}) </span>
            <span class="long-name">{{ lang.name }}</span>
          </div>
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

const props = defineProps({
  setActiveCurrency: Function,
});

const currencyOptions = computed(() => DEFAULT_CURRENCIES);

const activeCurrency = ref(currencyOptions.value[store.locale]);

const changeValue = (currency) => {
  activeCurrency.value = currency;
  props.setActiveCurrency(currency);
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";

.dropdown-block {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  width: 100%;
  display: none;

  .dropdown {
    box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
    padding: 20px;
    width: 100%;
    display: flex;
    height: max-content;
    flex-direction: column;
    row-gap: 20px;
    div {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    transition: 1s;
  }
}
.selected {
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
  padding: 18px 24px;
  align-items: center;
  background: #ffffff;
  width: max-content;
}
.short-name {
  font-weight: 300;
}
.long-name {
  font-weight: 500;
}

.dropdown-selected {
  color: #00f595;
  &::after {
    content: "";
    display: block;
    width: 5px;
    height: 11px;
    border: 1px solid #00f595;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-left: 13px;
    margin-bottom: 4px;
  }
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
