<template>
  <div class="icons">
    <div
      v-for="svg in items"
      :key="svg.name"
      v-intersect="{
        handler: () => loadIcon(svg.name),
        options: { rootMargin: '0px', threshold: 0.1 },
      }"
    >
      <component
        :class="['icon', 'icon--' + svg.name]"
        :is="iconComponent[svg.name] || 'div'"
      />
    </div>
  </div>
</template>

<script setup>
const iconComponent = ref({});

const items = ref([
  { name: "address" },
  { name: "caret" },
  { name: "caret-input" },
  { name: "caret-select" },
  { name: "company" },
  { name: "email" },
  { name: "home" },
  { name: "password" },
  { name: "phone" },
  { name: "tick" },
  { name: "tick-thin" },
  { name: "user" },
  { name: "arrow" },
  { name: "create" },
  { name: "facebook" },
  { name: "linkedin" },
  { name: "twitter" },
  { name: "logo-text" },
  { name: "logo-robot" },
]);

const loadIcon = async (name) => {
  if (!iconComponent.value[name]) {
    iconComponent.value[name] = (
      await import(`~/assets/svg/${name}.svg?component`)
    ).default;
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/import";
.icons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  .icon {
    margin: 15px;
    outline: 1px solid turquoise;
  }
}
</style>

<!-- <docs>
```jsx
<Icons />
```
</docs> -->
