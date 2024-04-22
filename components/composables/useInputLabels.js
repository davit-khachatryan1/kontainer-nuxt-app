import { ref } from 'vue';

export function useInputLabels(initialValue) {
  const focused = ref(false);
  const hasValue = ref(initialValue !== '');

  const focusCheck = (isFocused) => {
    focused.value = isFocused;
  };

  const valueCheck = (event) => {
    hasValue.value = !!event.target.value;
  };

  return { focused, hasValue, focusCheck, valueCheck };
}
