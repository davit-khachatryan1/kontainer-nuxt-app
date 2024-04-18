// import { ref } from 'vue';

// export function useInputLabels(initialValue) {
//   const focused = ref(false);
//   const hasValue = ref(initialValue !== '');

//   const focusCheck = (isFocused) => {
//     focused.value = isFocused;
//   };

//   const valueCheck = (event) => {
//     hasValue.value = !!event.target.value;
//   };

//   return { focused, hasValue, focusCheck, valueCheck };
// }

import { ref, computed, watch } from 'vue';

export function useInputLabels(props) {
  const focused = ref(false);
  const hasValue = computed(() => props?.value?.length > 0);

  const focusCheck = (isFocused) => {
    focused.value = isFocused;
  };

  const valueCheck = () => {
    hasValue.value = props?.value?.length > 0;
  };

  const inputClasses = computed(() => ({
    'form__element__input': true,
    'form__element__input--no-icon': props.noIcon,
    'form__element__input--hide': props.hidePlaceholder,
    'focus': focused.value,
    'filled': hasValue.value,
    'error': !!props.errorMessage,
    'valid': props.valid,
  }));

  const placeholderClasses = computed(() => ({
    'form__element__placeholder--no-icon': props.noIcon,
    'form__element__placeholder--hide': props.hidePlaceholder,
  }));

  return {
    focused, hasValue, focusCheck, valueCheck, inputClasses, placeholderClasses
  };
}
