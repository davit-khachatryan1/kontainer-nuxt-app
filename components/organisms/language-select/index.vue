<template>
  <label v-if="markup === 'select'">
    <InputSelect
      name="language"
      :type="1"
      :options="languageOptions"
      @change="languageSelect"
    />
  </label>
  <ul v-else-if="markup === 'list'">
    <li
      v-for="(lang, index) in languageOptions"
      @click="languageSelect(lang.value)"
      :key="index"
      v-intersect="{
        handler: () => loadIcon(lang.value),
        options: { rootMargin: '0px', threshold: 0.1 },
      }"
    >
      <component :is="iconComponent[lang.value.toUpperCase()] || 'div'"></component>
      <span :class="{ selected: lang.selected }">{{ lang.text }}</span>
    </li>
  </ul>
</template>

<script setup>
const router = useRouter();
import { ref, computed } from "vue";
import { defineAsyncComponent } from "vue";
import useStore from "@/store";
import { getLocalUrl } from "~/components/composables/getLocalUrl";

const InputSelect = defineAsyncComponent(() =>
  import("~/components/atoms/select/index.vue")
);

const iconComponent = ref({});

const loadIcon = async (lang) => {
  if (!iconComponent.value[lang.toUpperCase()]) {
    iconComponent.value[lang.toUpperCase()] = (
      await import(`~/assets/svg/flags/${lang}.svg?component`)
    ).default;
  }
};

const props = defineProps({
  markup: {
    type: String,
    default: "select",
    validator(value) {
      return ["select", "list"].includes(value);
    },
  },
});

const store = useStore();

const languageOptions = computed(() => [
  { value: "en", text: "English", selected: store.locale === "en" },
  { value: "da", text: "Dansk", selected: store.locale === "da" },
  { value: "de", text: "German", selected: store.locale === "de" },
]);

const languageSelect = (locale) => {
  if (typeof locale === "string") {
    const { pageInfo } = store;
    const link =
      getLocalUrl({
        locale,
        type: pageInfo.type,
        slug: pageInfo.slug ? pageInfo.translated[locale] : undefined,
      }) || "/";

    const date = new Date();
    const year = 365 * 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + year);
    const expires = date.toGMTString();
    document.cookie = `preferredLang=${locale}; expires=${expires}; path=/`;

    store.setLang(locale);
    router.push(`${link}`);
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/import";
.selected {
  pointer-events: none;
}
</style>
