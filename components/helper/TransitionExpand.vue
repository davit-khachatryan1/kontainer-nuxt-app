<template>
  <Transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <slot />
  </Transition>
</template>

<script lang="ts" setup>
const enter = (element: any) => {
  const { width } = getComputedStyle(element);

  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const { height } = getComputedStyle(element);

  element.style.removeProperty("width");
  element.style.removeProperty("position");
  element.style.removeProperty("visibility");
  element.style.height = "0";

  getComputedStyle(element).height;

  setTimeout(() => {
    element.style.height = height;
  });
};

const leave = (element: any) => {
  const { height } = getComputedStyle(element);

  element.style.height = height;

  getComputedStyle(element).height;

  setTimeout(() => {
    element.style.height = "0";
  });
};

const afterEnter = (element: any) => {
  element.style.height = "auto";
};
</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
