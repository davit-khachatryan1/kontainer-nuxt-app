import { defineNuxtPlugin } from 'nuxt/app';
import { Field, Form, ErrorMessage, configure, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, loadLocaleFromURL } from '@vee-validate/i18n';

export default defineNuxtPlugin((nuxtApp) => {
  defineRule('required', required);
  defineRule('email', email);
  defineRule('alpha_spaces_dash', (value) => {
    return /^[- a-zA-ZÀ-ÿ]+$/.test(value);
  });
  defineRule('business_email', (value) => {
    const blackList = ['gmail', 'yahoo', 'msn', 'icloud', 'hotmail', 'live', 'outlook', 'exchange'];
    return !blackList.some((domain) => value.includes(`@${domain}.`));
  });

  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: (field) => `${field.name} is required`,
          email: (field) => 'The e-mail must be valid',
          alpha_spaces: (field) => `${field.name} is not valid`,
          alpha_spaces_dash: (field) => `${field.name} is not valid`,
          business_email: () => 'This must be a business e-mail address',
        },
        names:  {
          'name': 'Name',
          'cm-name': 'Name',
          'host': 'URL',
          'email': 'E-mail',
          'cm-vhrjir-vhrjir': 'E-mail',
          'company': 'Company',
          'vat': 'VAT number',
          'address': 'Address',
          'zip': 'zip',
          'city': 'City',
          'phone': 'Phone number',
        },
      },
      da: {
        messages: {
          required: (field) => `${field.name} er påkrævet`,
          email: (field) => 'E-mailen skal være gyldig',
          alpha_spaces: (field) => `${field.name} er ugyldigt`,
          alpha_spaces_dash: (field) => `${field.name} er ugyldigt`,
          business_email: () => 'Dette skal være en business e-mail adresse',
        },
        names: {
          'name': 'Navn',
          'cm-name': 'Navn',
          'host': 'URL',
          'email': 'E-mail',
          'cm-vhrjir-vhrjir': 'E-mail',
          'company': 'Firma',
          'vat': 'CVR nummer',
          'address': 'Adresse',
          'zip': 'Postnr',
          'city': 'By',
          'phone': 'Telefonnummer',
        },
      },
      // Define other locales here
    }),
  });
  nuxtApp.vueApp.component('VField', Field);
  nuxtApp.vueApp.component('VForm', Form);
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage);

  // console.log(store.locale);
  // loadLocaleFromURL(`/path/to/locales/${store.locale}.json`);
});
