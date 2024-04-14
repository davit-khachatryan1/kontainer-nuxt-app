import { ref, onMounted } from 'vue';

export function useAnimateOnLoad() {
  const initAnimations = ref(false);

  onMounted(() => {
    setTimeout(() => {
      initAnimations.value = true;
    }, 0);
  });

  return { initAnimations };
}