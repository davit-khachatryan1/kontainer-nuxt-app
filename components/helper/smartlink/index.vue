<template>
  <nuxt-link
    :to="localUrl"
    v-if="localUrl"
    v-on:click.native="onClick"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </nuxt-link>
  <a
    v-else
    :href="externalUrl"
    :target="linkTarget"
    v-on:click="onClick"
    :aria-label="ariaLabel"
    rel="noopener"
  >
    <slot></slot>
  </a>
</template>

<script>
import { getLocalUrl } from "~/components/composables/getLocalUrl";

const getExternalUrl = (link, url) => {
  if (link.url) {
    return link.url;
  }

  return "#";
};

export default {
  name: "SmartLink",
  props: ["url", "type", "slug", "target", "onActiveLinkClick", "ariaLabel", "locale"],
  computed: {
    baseUrl() {
      const config = useRuntimeConfig();
      return config.public.siteUrl;
    },
    linkTarget() {
      return this.target || "_self";
    },
    externalUrl() {
      return getExternalUrl(this);
    },
    localUrl() {
      const nuxtApp = useNuxtApp();
      return getLocalUrl(this, nuxtApp._route.params.lang);
    },
  },
  methods: {
    onClick() {
      const route = useRoute();
      const nuxtApp = useNuxtApp();
      const local = getLocalUrl(this, nuxtApp._route.params.lang);
      const externalUrl = getExternalUrl(this);
      if (local && local != route.path) {
        window.scrollTo({ top: 0 });
      } else if (externalUrl && externalUrl != "#" && externalUrl != route.path) {
        window.scrollTo({ top: 0 });
      }
      if (typeof this.onActiveLinkClick === "function") {
        this.onActiveLinkClick();
      }
    },
  },
};
</script>
