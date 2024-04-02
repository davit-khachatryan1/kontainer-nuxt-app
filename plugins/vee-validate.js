// plugins/vee-validate.js
import { defineNuxtPlugin } from '#app';
import { Form as VeeForm, Field as VeeField, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import da from '@vee-validate/i18n/dist/locale/da.json';

// Custom rules
defineRule('alpha_spaces_dash', (value) => {
  return /^[- a-zA-ZÀ-ÿ]+$/.test(value) || 'This field is not valid';
});

defineRule('business_email', (value) => {
  const blackList = ['gmail', 'yahoo', 'msn', 'icloud', 'hotmail', 'live', 'outlook', 'exchange'];
  return !blackList.some(domain => value.includes(`@${domain}.`)) || 'This must be a business email address';
});

// Standard rules
defineRule('required', required);
defineRule('email', email);

// Localization
configure({
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
        required: '{field} is required',
        email: 'The e-mail must be valid',
        alpha_spaces_dash: '{field} is not valid',
        business_email: 'This must be a business e-mail address',
      },
      names: {
        email: 'E-mail',
        name: 'Name',
        // Add more field names here
      },
    },
    da: {
      messages: {
        ...da.messages,
        required: '{field} er påkrævet',
        email: 'E-mailen skal være gyldig',
        alpha_spaces_dash: '{field} er ugyldigt',
        business_email: 'Dette skal være en business e-mail adresse',
      },
      names: {
        email: 'E-mail',
        name: 'Navn',
        // Add more field names here
      },
    },
  }),
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VeeForm', VeeForm);
  nuxtApp.vueApp.component('VeeField', VeeField);
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage);

  setLocale('en'); // Set the default locale or make it dynamic
});
