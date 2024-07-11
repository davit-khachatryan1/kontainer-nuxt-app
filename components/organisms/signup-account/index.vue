<template>
  <section class="signup-account" :class="{ standalone: type === 'standalone' }">
    <template v-if="type === 'standalone'">
      <button class="form-close" @click.prevent="close">
        {{ langString("_close") }}
      </button>
    </template>
    <template v-if="type === 'standalone' && step === 2">
      <button class="form-go-back" @click.prevent="prev">
        {{ langString("_previous") }}
      </button>
    </template>
    <FormComponent :type="type" v-slot="{ errors, handleSubmit, resetForm, validate }">
      <transition name="form-step-animation" mode="out-in">
        <div>
          <slot name="teaser" v-if="step < 3" />
        </div>
      </transition>
      <slot>
        <template v-if="type === 'standalone'">
          <div class="signup-account__welcome">
            <h2>{{ langString("_signup_title") }}</h2>
            <p v-if="kontainerPackage">
              {{ subtitle }}
            </p>
            <h3 v-else>
              {{ subtitle }}
            </h3>
          </div>
          <div class="signup-account__info" v-if="!isFreeKontainer()">
            <div class="row">
              <div class="signup-account__info__specification">
                <h3 v-html="kontainerPackage.title" />
                <div
                  class="services"
                  v-html="kontainerPackage.services"
                  v-if="kontainerPackage.services"
                />
                <div class="services" v-if="kontainerPackage.features">
                  <ul>
                    <li
                      v-for="feature in kontainerPackage.features"
                      v-html="feature.name"
                    />
                  </ul>
                </div>
              </div>
              <div class="signup-account__info__pricing">
                <span class="currency" v-html="kontainerPackage.currency" />
                <span
                  :class="{
                    price: true,
                    extras:
                      store.extraStorage[kontainerPackage.slug] ||
                      store.extraUsers[kontainerPackage.slug],
                  }"
                  v-html="kontainerPackage.price"
                />
                <span class="monthly" v-html="kontainerPackage.per_month" />
              </div>
            </div>
            <div class="row extras" v-if="store.extraStorage[kontainerPackage.slug]">
              <div class="signup-account__info__specification">
                <h3>
                  {{ langString("_extra_storage") }}:
                  {{ store.extraStorage[kontainerPackage.slug].storage }}
                  {{ store.extraStorage[kontainerPackage.slug].storage_unit }}
                </h3>
              </div>
              <div class="signup-account__info__pricing">
                <span
                  class="currency"
                  v-html="store.extraStorage[kontainerPackage.slug].currency"
                />
                <span
                  class="price extras"
                  v-html="store.extraStorage[kontainerPackage.slug].price"
                />
                <span class="monthly" v-html="kontainerPackage.per_month" />
              </div>
            </div>
            <div class="row extras" v-if="store.extraUsers[kontainerPackage.slug]">
              <div class="signup-account__info__specification">
                <h3>
                  {{ langString("_extra_users") }}:
                  {{ store.extraUsers[kontainerPackage.slug].users }}
                </h3>
              </div>
              <div class="signup-account__info__pricing">
                <span
                  class="currency"
                  v-html="store.extraUsers[kontainerPackage.slug].currency"
                />
                <span
                  class="price extras"
                  v-html="store.extraUsers[kontainerPackage.slug].price"
                />
                <span class="monthly" v-html="kontainerPackage.per_month" />
              </div>
            </div>
            <div class="row extras" v-if="store.extraSKUs[kontainerPackage.slug]">
              <div class="signup-account__info__specification">
                <h3>
                  {{ langString("_extra_skus") }}:
                  {{ store.extraSKUs[kontainerPackage.slug].users }}
                </h3>
              </div>
              <div class="signup-account__info__pricing">
                <span
                  class="currency"
                  v-html="store.extraSKUs[kontainerPackage.slug].currency"
                />
                <span
                  class="price extras"
                  v-html="store.extraSKUs[kontainerPackage.slug].price"
                />
                <span class="monthly" v-html="kontainerPackage.per_month" />
              </div>
            </div>
            <div
              class="row extras totals"
              v-if="
                store.extraStorage[kontainerPackage.slug] ||
                store.extraUsers[kontainerPackage.slug] ||
                store.extraSKUs[kontainerPackage.slug]
              "
            >
              <div class="signup-account__info__specification">
                <h3>{{ langString("_total") }}</h3>
              </div>
              <div class="signup-account__info__pricing">
                <span class="currency" v-html="kontainerPackage.currency" />
                <span class="price" v-text="calculateTotals(kontainerPackage.slug)" />
                <span class="monthly" v-html="kontainerPackage.per_month" />
              </div>
            </div>
          </div>
        </template>
        <transition name="form-step-animation" mode="out-in">
          <div>
            <div v-if="step === 1" :key="step" class="form-step-active">
              <div class="fieldset">
                <template v-if="isFreeKontainer()">
                  <div class="columns" v-if="type === 'standalone'">
                    <div class="columns__item">
                      <Input
                        :key="'name'"
                        type="text"
                        name="name"
                        v-model="registration.name"
                        :rules="'required|alpha_spaces_dash'"
                        :placeholder="langString('_name')"
                        iconName="user"
                        iconComponent="IconUser"
                        :class="['form__element--gray']"
                        :required="true"
                      />
                      <Input
                        :key="'email'"
                        type="text"
                        name="email"
                        v-model="registration.email"
                        :rules="'required|email|business_email'"
                        :placeholder="langString('_e-mail')"
                        iconName="email"
                        iconComponent="IconEmail"
                        :class="['form__element--gray']"
                        :required="true"
                      />
                      <Input
                        :key="'company'"
                        type="text"
                        name="company"
                        v-model="registration.company"
                        :rules="'required'"
                        :placeholder="langString('_company')"
                        iconName="company"
                        iconComponent="IconCompany"
                        :class="['form__element--gray']"
                        :required="true"
                      />
                    </div>
                    <div class="columns__item columns__item--column">
                      <div
                        v-for="(paragraph, index) in extraTexts"
                        :key="index"
                        class="quote"
                      >
                        <div class="quote__icon">
                          <SmartImage
                            :class="'quoteicon'"
                            :image="paragraph.icon"
                            nocrop
                          />
                        </div>
                        <div class="quote__text" v-html="paragraph.text"></div>
                      </div>
                    </div>
                  </div>
                  <template v-else>
                    <Input
                      :key="'name'"
                      type="text"
                      name="name"
                      v-model="registration.name"
                      :rules="'required|alpha_spaces_dash'"
                      :placeholder="langString('_name')"
                      iconName="user"
                      iconComponent="IconUser"
                      :class="['form__element--gray']"
                    />
                    <Input
                      :key="'email'"
                      type="text"
                      name="email"
                      v-model="registration.email"
                      :rules="'required|email|business_email'"
                      :placeholder="langString('_e-mail')"
                      iconName="email"
                      iconComponent="IconEmail"
                      :class="['form__element--gray']"
                    />
                    <Input
                      :key="'company'"
                      type="text"
                      name="company"
                      v-model="registration.company"
                      :rules="'required'"
                      :placeholder="langString('_company')"
                      iconName="company"
                      iconComponent="IconCompany"
                      :class="['form__element--gray']"
                    />
                  </template>
                </template>
                <template v-else>
                  <div class="form__group">
                    <Input
                      :class="['kontainer-url', 'form__element--gray']"
                      :noIcon="true"
                      :hidePlaceholder="true"
                      :key="'url'"
                      type="text"
                      name="host"
                      v-model="registration.host"
                      :rules="'required'"
                      :errorMessage="hostError"
                      :domainAvailability="hostStatus"
                      :placeholder="langString('_URL')"
                    >
                      <slot>
                        <span class="prefix">https://</span>
                        <span class="suffix">.kontainer.com</span>
                      </slot>
                    </Input>
                  </div>
                  <div class="form__group">
                    <Input
                      :key="'name'"
                      type="text"
                      name="name"
                      v-model="registration.name"
                      :rules="'required|alpha_spaces_dash'"
                      :placeholder="langString('_name')"
                      iconName="user"
                      iconComponent="IconUser"
                      :class="['form__element--gray']"
                      :required="true"
                    />
                    <Input
                      :key="'email'"
                      type="text"
                      name="email"
                      v-model="registration.email"
                      :rules="'required|email|business_email'"
                      :placeholder="langString('_e-mail')"
                      iconName="email"
                      iconComponent="IconEmail"
                      :class="['form__element--gray']"
                      :required="true"
                    />
                  </div>
                </template>
                <div class="form__element" :key="'action'">
                  <Button
                    hasFunction="true"
                    @func="next(validate)"
                    icon="arrow"
                    :class="['btn--price', 'btn--price-free']"
                  >
                    <template v-if="btnSubmitText">{{ btnSubmitText }}</template>
                    <template v-else-if="isFreeKontainer()">{{
                      langString("_free_signup")
                    }}</template>
                    <template v-else>{{ langString("_next") }}</template>
                  </Button>
                </div>
              </div>
              <slot name="terms">
                <div
                  class="conditions"
                  v-html="
                    langString(
                      '_by_clicking_next_you_accept_the_<a href=\'#\'>terms_and_conditions</a>'
                    )
                  "
                />
              </slot>
            </div>
            <div v-if="step === 2" :key="step" class="form-step-active">
              <div class="fieldset">
                <template v-if="isFreeKontainer()">
                  <Input
                    :class="['kontainer-url', 'form__element--gray']"
                    :key="'url'"
                    type="text"
                    name="host"
                    v-model="registration.host"
                    :rules="'required'"
                    :noIcon="type !== 'block'"
                    :errorMessage="hostError"
                    :domainAvailability="hostStatus"
                    :placeholder="null"
                  >
                    <slot>
                      <span class="prefix">https://</span>
                      <span class="suffix">.kontainer.com</span>
                    </slot>
                  </Input>
                </template>
                <template v-else>
                  <h3 class="invoice-heading">Invoice info</h3>
                  <div class="form__group">
                    <Input
                      :key="'company'"
                      type="text"
                      name="company"
                      v-model="registration.company"
                      :rules="'required'"
                      :placeholder="langString('_company')"
                      iconName="company"
                      iconComponent="IconCompany"
                      :class="['form__element--gray']"
                      :required="true"
                    />
                    <Input
                      v-if="store.locale !== 'da'"
                      :key="'vat'"
                      type="text"
                      name="vat"
                      v-model="registration.vat"
                      :placeholder="langString('_vat_no')"
                      iconName="vat"
                      iconComponent="IconVat"
                      :class="['form__element--gray']"
                    />
                  </div>
                  <div class="form__group">
                    <div class="form__group__inline">
                      <div class="form__element form__element--gray styled-select">
                        <IconCountry class="country-icon"></IconCountry>
                        <VField
                          v-model="registration.country"
                          v-slot="{ field, errors: errorMessages }"
                          :rules="'required'"
                        >
                          <v-select
                            v-bind="field"
                            :class="{ error: errorMessages ? errorMessages[0] : '' }"
                            data-vv-name="country"
                            data-vv-value-path="mutableValue"
                            label="name"
                            :options="countries"
                            :placeholder="langString('_country')"
                          />
                          <div
                            v-if="errorMessages ? errorMessages[0] : ''"
                            class="error-message"
                          >
                            <span v-text="errorMessages ? errorMessages[0] : ''" />
                          </div>
                        </VField>
                      </div>
                      <Input
                        :key="'address'"
                        type="text"
                        name="address"
                        v-model="registration.address"
                        :rules="'required'"
                        :placeholder="langString('_address')"
                        iconName="address"
                        iconComponent="IconAddress"
                        :class="['form__element--gray']"
                        :required="true"
                      />
                    </div>
                    <div class="form__group__inline">
                      <Input
                        :key="'zip'"
                        type="text"
                        name="zip"
                        v-model="registration.zip"
                        :rules="'required'"
                        :placeholder="langString('_zip')"
                        iconName="zip"
                        iconComponent="IconZip"
                        :class="['form__element--gray']"
                        :required="true"
                      />
                      <Input
                        :key="'city'"
                        type="text"
                        name="city"
                        v-model="registration.city"
                        :rules="'required'"
                        :placeholder="langString('_city')"
                        iconName="city"
                        iconComponent="IconCity"
                        :class="['form__element--gray']"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="form__group">
                    <Input
                      :key="'phone'"
                      type="text"
                      name="phone"
                      v-model="registration.phone"
                      :placeholder="langString('_phone')"
                      iconName="phone"
                      iconComponent="IconPhone"
                      :class="['form__element--gray']"
                    />
                  </div>
                </template>
                <Button
                  hasFunction="true"
                  @func="submit(validate)"
                  :class="['btn--price', 'btn--price-free']"
                >
                  <template v-if="btnSubmitText">{{ btnSubmitText }}</template>
                  <template v-else>{{ langString("_sign_up") }}</template>
                </Button>
              </div>
            </div>
            <div v-if="step === 3" :key="step" class="form-step-active success">
              <div class="checkmark"></div>
              <h2>{{ langString("_Tillykke!_Din_Kontainer_er_nu_oprettet") }}</h2>
              <p>{{ langString("_Vi_har_sendt_dig_email_med_din_login_info") }}</p>
            </div>
          </div>
        </transition>
      </slot>
    </FormComponent>
  </section>
</template>

<script setup>
import { useLangString } from "~/components/composables/useLangString";
import useStore from "@/store";
const router = useRouter();
// Define async components for lazy loading
const FormComponent = defineAsyncComponent(() =>
  import("~/components/molecules/form/index.vue")
);
const Button = defineAsyncComponent(() => import("~/components/atoms/button/index.vue"));
const Input = defineAsyncComponent(() => import("~/components/atoms/input/index.vue"));
const IconCountry = defineAsyncComponent(() => import("~/assets/svg/country.svg"));
const IconUser = defineAsyncComponent(() => import("~/assets/svg/user.svg"));
const IconEmail = defineAsyncComponent(() => import("~/assets/svg/email.svg"));
const IconCompany = defineAsyncComponent(() => import("~/assets/svg/company.svg"));
const IconVat = defineAsyncComponent(() => import("~/assets/svg/vat.svg"));
const IconAddress = defineAsyncComponent(() => import("~/assets/svg/address.svg"));
const IconZip = defineAsyncComponent(() => import("~/assets/svg/zip.svg"));
const IconCity = defineAsyncComponent(() => import("~/assets/svg/city.svg"));
const IconPhone = defineAsyncComponent(() => import("~/assets/svg/phone.svg"));
const SmartImage = defineAsyncComponent(() =>
  import("~/components/helper/smartimage/index.vue")
);

const store = useStore();
const { langString } = useLangString();
const btnSubmitText = ref("");
const props = defineProps({
  type: String,
  btnSubmitText: String,
});

const kontainerPackage = ref(null);
const step = ref(1);
const registration = ref({
  name: "",
  email: "",
  company: "",
  vat: "",
  address: "",
  zip: "",
  city: "",
  phone: "",
  host: "",
  country: null,
});
const hostStatus = ref(null);
const hostError = ref(null);
const countries = ref([
  {
    name: "Afghanistan",
    code: "AF",
  },
  {
    name: "Åland Islands",
    code: "AX",
  },
  {
    name: "Albania",
    code: "AL",
  },
  {
    name: "Algeria",
    code: "DZ",
  },
  {
    name: "American Samoa",
    code: "AS",
  },
  {
    name: "AndorrA",
    code: "AD",
  },
  {
    name: "Angola",
    code: "AO",
  },
  {
    name: "Anguilla",
    code: "AI",
  },
  {
    name: "Antarctica",
    code: "AQ",
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
  },
  {
    name: "Argentina",
    code: "AR",
  },
  {
    name: "Armenia",
    code: "AM",
  },
  {
    name: "Aruba",
    code: "AW",
  },
  {
    name: "Australia",
    code: "AU",
  },
  {
    name: "Austria",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    code: "AZ",
  },
  {
    name: "Bahamas",
    code: "BS",
  },
  {
    name: "Bahrain",
    code: "BH",
  },
  {
    name: "Bangladesh",
    code: "BD",
  },
  {
    name: "Barbados",
    code: "BB",
  },
  {
    name: "Belarus",
    code: "BY",
  },
  {
    name: "Belgium",
    code: "BE",
  },
  {
    name: "Belize",
    code: "BZ",
  },
  {
    name: "Benin",
    code: "BJ",
  },
  {
    name: "Bermuda",
    code: "BM",
  },
  {
    name: "Bhutan",
    code: "BT",
  },
  {
    name: "Bolivia",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    name: "Botswana",
    code: "BW",
  },
  {
    name: "Bouvet Island",
    code: "BV",
  },
  {
    name: "Brazil",
    code: "BR",
  },
  {
    name: "British Indian Ocean Territory",
    code: "IO",
  },
  {
    name: "Brunei Darussalam",
    code: "BN",
  },
  {
    name: "Bulgaria",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    code: "BF",
  },
  {
    name: "Burundi",
    code: "BI",
  },
  {
    name: "Cambodia",
    code: "KH",
  },
  {
    name: "Cameroon",
    code: "CM",
  },
  {
    name: "Canada",
    code: "CA",
  },
  {
    name: "Cape Verde",
    code: "CV",
  },
  {
    name: "Cayman Islands",
    code: "KY",
  },
  {
    name: "Central African Republic",
    code: "CF",
  },
  {
    name: "Chad",
    code: "TD",
  },
  {
    name: "Chile",
    code: "CL",
  },
  {
    name: "China",
    code: "CN",
  },
  {
    name: "Christmas Island",
    code: "CX",
  },
  {
    name: "Cocos (Keeling) Islands",
    code: "CC",
  },
  {
    name: "Colombia",
    code: "CO",
  },
  {
    name: "Comoros",
    code: "KM",
  },
  {
    name: "Congo",
    code: "CG",
  },
  {
    name: "Congo, The Democratic Republic of the",
    code: "CD",
  },
  {
    name: "Cook Islands",
    code: "CK",
  },
  {
    name: "Costa Rica",
    code: "CR",
  },
  {
    name: "Cote D'Ivoire",
    code: "CI",
  },
  {
    name: "Croatia",
    code: "HR",
  },
  {
    name: "Cuba",
    code: "CU",
  },
  {
    name: "Cyprus",
    code: "CY",
  },
  {
    name: "Czech Republic",
    code: "CZ",
  },
  {
    name: "Denmark",
    code: "DK",
  },
  {
    name: "Djibouti",
    code: "DJ",
  },
  {
    name: "Dominica",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    code: "DO",
  },
  {
    name: "Ecuador",
    code: "EC",
  },
  {
    name: "Egypt",
    code: "EG",
  },
  {
    name: "El Salvador",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
  },
  {
    name: "Eritrea",
    code: "ER",
  },
  {
    name: "Estonia",
    code: "EE",
  },
  {
    name: "Ethiopia",
    code: "ET",
  },
  {
    name: "Falkland Islands (Malvinas)",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    code: "FO",
  },
  {
    name: "Fiji",
    code: "FJ",
  },
  {
    name: "Finland",
    code: "FI",
  },
  {
    name: "France",
    code: "FR",
  },
  {
    name: "French Guiana",
    code: "GF",
  },
  {
    name: "French Polynesia",
    code: "PF",
  },
  {
    name: "French Southern Territories",
    code: "TF",
  },
  {
    name: "Gabon",
    code: "GA",
  },
  {
    name: "Gambia",
    code: "GM",
  },
  {
    name: "Georgia",
    code: "GE",
  },
  {
    name: "Germany",
    code: "DE",
  },
  {
    name: "Ghana",
    code: "GH",
  },
  {
    name: "Gibraltar",
    code: "GI",
  },
  {
    name: "Greece",
    code: "GR",
  },
  {
    name: "Greenland",
    code: "GL",
  },
  {
    name: "Grenada",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    code: "GP",
  },
  {
    name: "Guam",
    code: "GU",
  },
  {
    name: "Guatemala",
    code: "GT",
  },
  {
    name: "Guernsey",
    code: "GG",
  },
  {
    name: "Guinea",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
  },
  {
    name: "Guyana",
    code: "GY",
  },
  {
    name: "Haiti",
    code: "HT",
  },
  {
    name: "Heard Island and Mcdonald Islands",
    code: "HM",
  },
  {
    name: "Holy See (Vatican City State)",
    code: "VA",
  },
  {
    name: "Honduras",
    code: "HN",
  },
  {
    name: "Hong Kong",
    code: "HK",
  },
  {
    name: "Hungary",
    code: "HU",
  },
  {
    name: "Iceland",
    code: "IS",
  },
  {
    name: "India",
    code: "IN",
  },
  {
    name: "Indonesia",
    code: "ID",
  },
  {
    name: "Iran, Islamic Republic Of",
    code: "IR",
  },
  {
    name: "Iraq",
    code: "IQ",
  },
  {
    name: "Ireland",
    code: "IE",
  },
  {
    name: "Isle of Man",
    code: "IM",
  },
  {
    name: "Israel",
    code: "IL",
  },
  {
    name: "Italy",
    code: "IT",
  },
  {
    name: "Jamaica",
    code: "JM",
  },
  {
    name: "Japan",
    code: "JP",
  },
  {
    name: "Jersey",
    code: "JE",
  },
  {
    name: "Jordan",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    code: "KZ",
  },
  {
    name: "Kenya",
    code: "KE",
  },
  {
    name: "Kiribati",
    code: "KI",
  },
  {
    name: "Korea, Democratic People'S Republic of",
    code: "KP",
  },
  {
    name: "Korea, Republic of",
    code: "KR",
  },
  {
    name: "Kuwait",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
  },
  {
    name: "Lao People'S Democratic Republic",
    code: "LA",
  },
  {
    name: "Latvia",
    code: "LV",
  },
  {
    name: "Lebanon",
    code: "LB",
  },
  {
    name: "Lesotho",
    code: "LS",
  },
  {
    name: "Liberia",
    code: "LR",
  },
  {
    name: "Libyan Arab Jamahiriya",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    code: "LI",
  },
  {
    name: "Lithuania",
    code: "LT",
  },
  {
    name: "Luxembourg",
    code: "LU",
  },
  {
    name: "Macao",
    code: "MO",
  },
  {
    name: "Macedonia, The Former Yugoslav Republic of",
    code: "MK",
  },
  {
    name: "Madagascar",
    code: "MG",
  },
  {
    name: "Malawi",
    code: "MW",
  },
  {
    name: "Malaysia",
    code: "MY",
  },
  {
    name: "Maldives",
    code: "MV",
  },
  {
    name: "Mali",
    code: "ML",
  },
  {
    name: "Malta",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    code: "MH",
  },
  {
    name: "Martinique",
    code: "MQ",
  },
  {
    name: "Mauritania",
    code: "MR",
  },
  {
    name: "Mauritius",
    code: "MU",
  },
  {
    name: "Mayotte",
    code: "YT",
  },
  {
    name: "Mexico",
    code: "MX",
  },
  {
    name: "Micronesia, Federated States of",
    code: "FM",
  },
  {
    name: "Moldova, Republic of",
    code: "MD",
  },
  {
    name: "Monaco",
    code: "MC",
  },
  {
    name: "Mongolia",
    code: "MN",
  },
  {
    name: "Montserrat",
    code: "MS",
  },
  {
    name: "Morocco",
    code: "MA",
  },
  {
    name: "Mozambique",
    code: "MZ",
  },
  {
    name: "Myanmar",
    code: "MM",
  },
  {
    name: "Namibia",
    code: "NA",
  },
  {
    name: "Nauru",
    code: "NR",
  },
  {
    name: "Nepal",
    code: "NP",
  },
  {
    name: "Netherlands",
    code: "NL",
  },
  {
    name: "Netherlands Antilles",
    code: "AN",
  },
  {
    name: "New Caledonia",
    code: "NC",
  },
  {
    name: "New Zealand",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    code: "NI",
  },
  {
    name: "Niger",
    code: "NE",
  },
  {
    name: "Nigeria",
    code: "NG",
  },
  {
    name: "Niue",
    code: "NU",
  },
  {
    name: "Norfolk Island",
    code: "NF",
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
  },
  {
    name: "Norway",
    code: "NO",
  },
  {
    name: "Oman",
    code: "OM",
  },
  {
    name: "Pakistan",
    code: "PK",
  },
  {
    name: "Palau",
    code: "PW",
  },
  {
    name: "Palestinian Territory, Occupied",
    code: "PS",
  },
  {
    name: "Panama",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    code: "PG",
  },
  {
    name: "Paraguay",
    code: "PY",
  },
  {
    name: "Peru",
    code: "PE",
  },
  {
    name: "Philippines",
    code: "PH",
  },
  {
    name: "Pitcairn",
    code: "PN",
  },
  {
    name: "Poland",
    code: "PL",
  },
  {
    name: "Portugal",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    code: "PR",
  },
  {
    name: "Qatar",
    code: "QA",
  },
  {
    name: "Reunion",
    code: "RE",
  },
  {
    name: "Romania",
    code: "RO",
  },
  {
    name: "Russian Federation",
    code: "RU",
  },
  {
    name: "RWANDA",
    code: "RW",
  },
  {
    name: "Saint Helena",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    code: "LC",
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    name: "Samoa",
    code: "WS",
  },
  {
    name: "San Marino",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
  },
  {
    name: "Senegal",
    code: "SN",
  },
  {
    name: "Serbia and Montenegro",
    code: "CS",
  },
  {
    name: "Seychelles",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    code: "SL",
  },
  {
    name: "Singapore",
    code: "SG",
  },
  {
    name: "Slovakia",
    code: "SK",
  },
  {
    name: "Slovenia",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    code: "SB",
  },
  {
    name: "Somalia",
    code: "SO",
  },
  {
    name: "South Africa",
    code: "ZA",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    code: "GS",
  },
  {
    name: "Spain",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    code: "LK",
  },
  {
    name: "Sudan",
    code: "SD",
  },
  {
    name: "Suriname",
    code: "SR",
  },
  {
    name: "Svalbard and Jan Mayen",
    code: "SJ",
  },
  {
    name: "Swaziland",
    code: "SZ",
  },
  {
    name: "Sweden",
    code: "SE",
  },
  {
    name: "Switzerland",
    code: "CH",
  },
  {
    name: "Syrian Arab Republic",
    code: "SY",
  },
  {
    name: "Taiwan, Province of China",
    code: "TW",
  },
  {
    name: "Tajikistan",
    code: "TJ",
  },
  {
    name: "Tanzania, United Republic of",
    code: "TZ",
  },
  {
    name: "Thailand",
    code: "TH",
  },
  {
    name: "Timor-Leste",
    code: "TL",
  },
  {
    name: "Togo",
    code: "TG",
  },
  {
    name: "Tokelau",
    code: "TK",
  },
  {
    name: "Tonga",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    code: "TT",
  },
  {
    name: "Tunisia",
    code: "TN",
  },
  {
    name: "Turkey",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC",
  },
  {
    name: "Tuvalu",
    code: "TV",
  },
  {
    name: "Uganda",
    code: "UG",
  },
  {
    name: "Ukraine",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
  },
  {
    name: "United Kingdom",
    code: "GB",
  },
  {
    name: "United States",
    code: "US",
  },
  {
    name: "United States Minor Outlying Islands",
    code: "UM",
  },
  {
    name: "Uruguay",
    code: "UY",
  },
  {
    name: "Uzbekistan",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    code: "VU",
  },
  {
    name: "Venezuela",
    code: "VE",
  },
  {
    name: "Viet Nam",
    code: "VN",
  },
  {
    name: "Virgin Islands, British",
    code: "VG",
  },
  {
    name: "Virgin Islands, U.S.",
    code: "VI",
  },
  {
    name: "Wallis and Futuna",
    code: "WF",
  },
  {
    name: "Western Sahara",
    code: "EH",
  },
  {
    name: "Yemen",
    code: "YE",
  },
  {
    name: "Zambia",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
  },
]);

const subtitle = computed(() => {
  if (kontainerPackage.value) {
    return langString("_signup_subtitle").replace(
      "{{name}}",
      kontainerPackage.value.title
    );
  } else if (freeSubtitle.value) {
    return freeSubtitle.value;
  }
  return "";
});

const freeSubtitle = computed(() => {
  return langString("_signup_subtitle_free");
});

const extraTexts = computed(() => {
  return store.pageOptions.texts;
});

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    const later = () => {
      clearTimeout(timeout);
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const prev = () => {
  step.value -= 1;
};

const next = (validate) => {
  validate().then((result) => {
    if (result) {
      checkDomainAvailability();
      step.value += 1;
    }
  });
};

const close = () => {
  if (window.history.length) {
    router.go(-1);
  }
  router.push("/");
};

const isFreeKontainer = () => {
  if (kontainerPackage.value && kontainerPackage.value.price === "0") {
    return true;
  } else if (kontainerPackage.value && kontainerPackage.value.price !== "0") {
    return false;
  }
  return true;
};

const submit = (validate) => {
  const config = useRuntimeConfig();

  validate().then((result) => {
    const { locale } = store;
    const {
      name,
      email,
      company,
      vat,
      address,
      zip,
      city,
      country,
      phone,
      host,
    } = registration.value;
    const basicRegistration = {
      name,
      email,
      company,
      host,
      type: "free",
      locale,
    };
    let registrationData = basicRegistration;
    if (!isFreeKontainer()) {
      const { price, currency, package_id: type } = kontainerPackage.value;

      registrationData = {
        ...basicRegistration,
        company,
        vat,
        address,
        zip,
        city,
        country,
        phone,
        price,
        currency,
        type,
      };

      if (store.extraStorage) {
        registrationData = {
          ...registrationData,
          extraStorage: store.extraStorage,
        };
      }

      if (store.extraUsers) {
        registrationData = {
          ...registrationData,
          extraUsers: store.extraUsers,
        };
      }

      if (store.extraSKUs) {
        registrationData = {
          ...registrationData,
          extraSKUs: store.extraSKUs,
        };
      }
    }

    if (result) {
      addToHubSpot(registrationData);
      const formData = new FormData();
      for (const key in registrationData) {
        if (registrationData.hasOwnProperty(key)) {
          formData.append(key, registrationData[key]);
        }
      }
      $fetch(`${config.public.appUrl}/api/signup`, {
        method: "POST",
        body: formData,
      })
        .then(() => {
          success();
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  });
};

const addToHubSpot = (registrationData) => {
  var data = {
    fields: [
      {
        name: "email",
        value: registrationData.email,
      },
      {
        name: "firstname",
        value: registrationData.name,
      },
      {
        name: "company",
        value: registrationData.company,
      },
    ],
  };

  var formId = "eea3070f-905b-443b-b280-aea7210d3a46";
  if (registrationData.locale === "en") {
    formId = "a9fb2408-534b-4ecc-9ac8-c5a3a63326ba";
  } else if (registrationData.locale === "de") {
    formId = "60bb0ed2-1ff2-4640-833a-7fcae7bfb389";
  }

  var hutk = document.cookie.replace(
    /(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (hutk) {
    data.context = {
      hutk: hutk,
      pageUri: `www.kontainer.com/${registrationData.locale}/register`,
      pageName: "Register modal",
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  $fetch(`https://api.hsforms.com/submissions/v3/integration/submit/25539371/${formId}`, {
    method: "POST",
    body: data,
    config,
  });
};

const success = () => {
  router.push({
    path: `/${store.locale}/signup-done`,
  });
};

const checkDomainAvailability = async () => {
  const config = useRuntimeConfig();

  let domain;
  if (registration.value.host) {
    domain = registration.value.host.toLowerCase();
  } else if (registration.value.company) {
    domain = registration.value.company.toLowerCase();
  } else {
    domain = registration.value.name.replace(/\s+/g, "-").toLowerCase();
  }

  try {
    const { error } = await useFetch(`${config.public.appUrl}/api/signup/availability`, {
      params: {
        clientHost: domain,
      },
    });

    if (error.value) {
      throw error.value;
    }

    registration.value.host = domain;
    hostStatus.value = true;

    setTimeout(() => {
      hostError.value = null;
    }, 2000);
  } catch (error) {
    const oldDomain = domain;
    const urlSuggestion = error.data?.suggestion;
    hostStatus.value = false;
    registration.value.host = urlSuggestion;

    if (!hostError.value && urlSuggestion) {
      hostError.value = `${oldDomain} ${langString("_is_taken_how_about_this?")}`;
    }
  }
};

const getKontainerPackage = (slug) => {
  let stored_packageInfo = store.packageInfo;
  if (stored_packageInfo && stored_packageInfo.package_id === slug) {
    kontainerPackage.value = stored_packageInfo;
    store.packageInfo = {};
  }
};

const calculateTotals = (slug) => {
  const kontainerPrice = parseInt(kontainerPackage.value.price, 10);
  const storagePrice = store.extraStorage[slug]
    ? parseInt(store.extraStorage[slug].price, 10)
    : 0;
  const usersPrice = store.extraUsers[slug]
    ? parseInt(store.extraUsers[slug].price, 10)
    : 0;
  const skuPrice = store.extraSKUs[slug] ? parseInt(store.extraSKUs[slug].price, 10) : 0;
  return kontainerPrice + storagePrice + usersPrice + skuPrice;
};

const setCountryDenmark = () => {
  registration.value.country = {
    name: "Denmark",
    code: "DK",
  };
};

const nuxtApp = useNuxtApp();

if (nuxtApp._route.query.kontainer) {
  getKontainerPackage(nuxtApp._route.query.kontainer); // check url containing ?kontainer=slug
} else {
  getKontainerPackage("free");
}

isFreeKontainer();

if (store.locale === "da") {
  setCountryDenmark();
}

const debouncedUrlCheck = debounce(checkDomainAvailability, 500);

watch(
  () => registration.value.host,
  (host) => {
    const regex = /[^a-z0-9-]+/;
    if (registration.value.host != host && host && regex.test(host)) {
      registration.value.host = host
        .toLowerCase()
        .replace("æ", "ae")
        .replace("ø", "oe")
        .replace("å", "aa")
        .replace(regex, "");
    }

    hostStatus.value = false;
    debouncedUrlCheck();
  }
);

watch(
  () => step.value,
  (step) => {
    if (step === 3) {
      setTimeout(() => {
        step.value = 1;
      }, 4000);
    }
  }
);
</script>

<style lang="scss">
@import "../../../assets/scss/import";

.kontainer-url .form__element__input {
  &.filled,
  &.focus {
    padding-top: 0;
  }
}

.services {
  ul li {
    display: inline;

    &:not(:last-child)::after {
      content: ", ";
    }
  }
}

.conditions {
  a {
    color: $brand-green;
    font-weight: 500;
  }
}

.form-step-animation {
  &-leave-active {
    transition: all 300ms ease-out;
  }

  &-enter-active {
    transition: all 500ms ease-out;

    .form__group {
      transition: all 300ms ease-out;

      &:nth-child(2) {
        transition-delay: 100ms;
      }

      &:nth-child(3) {
        transition-delay: 200ms;
      }
    }
  }

  &-leave-to {
    opacity: 0;
  }

  &-enter {
    .form__group {
      transform: translateX(50px);
      opacity: 0;
    }
  }
}

.form--block {
  .terms {
    margin-top: 20px;
  }

  .btn--price-free {
    @include buttonShadowAndHover($brand-green, $white);
  }
}

.checkmark {
  width: 80px;
  height: 80px;
  padding-left: 20px;
  margin: 0 auto 30px;

  &::after {
    content: "";
    display: block;
    width: 36px;
    height: 62px;
    border: solid #000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}
</style>

<style lang="scss" scoped>
@import "../../../assets/scss/import";

h2 {
  font-size: 30px;
  line-height: 60px;
  font-weight: 400;
}

p {
  @extend %text-paragraph3;
}

button {
  min-width: 100%;
  cursor: pointer;

  @include media("mobile-ab") {
    margin: 30px 0 10px;
    min-width: 300px;
  }

  &:focus {
    outline: 0;
  }
}

.input-animation {
  &-enter,
  &-leave-to {
    transform: translateX(50px);
    opacity: 0;
    transition: all 1s ease 0.3s;
  }

  &-enter-active,
  &-leave-active {
    transform: translate(0);
    opacity: 1;
  }
}

$formElement: "";

.form-close {
  position: absolute;
  top: 30px;
  right: 35px;
  height: 40px;
  width: 40px;
  min-width: 0;
  text-indent: -9999px;
  margin: 0;
  border: 0;
  display: block;
  background-color: transparent;

  @include media("mobile") {
    position: absolute;
  }

  &::before,
  &::after {
    content: "";
    height: 2px;
    width: 20px;
    background-color: $black;
    opacity: 0.7;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform: translateX(-50%) rotate(45deg);
  }

  &::after {
    transform: translateX(-50%) rotate(-45deg);
  }
}

.form {
  position: relative;

  &--block {
    max-width: 400px;
    margin: 0 auto 20px auto;

    .fieldset {
      margin-top: 50px;
    }

    .kontainer-url {
      input {
        padding: 0 110px 0 55px;
      }
    }

    .suffix,
    .prefix {
      opacity: 0.5;
      font-size: 0.8em;
    }

    .prefix {
      left: 52px;
    }

    .suffix {
      right: 96px;
    }
  }

  &--standalone {
    position: static;
    margin: 0 auto;
    padding: 80px 170px;

    @include media("desktop-1200") {
      padding: 80px 120px;
    }

    @include media("tablet") {
      padding: 80px 80px;
    }

    @include media("mobile") {
      padding: 50px;

      .form__element__input--no-icon {
        padding-left: 55px;
      }

      .kontainer-url {
        input {
          padding: 0 110px 0 55px;
        }
      }

      .suffix,
      .prefix {
        opacity: 0.5;
        font-size: 0.8em;
      }

      .prefix {
        left: 52px;
      }

      .suffix {
        right: 96px;
      }
    }

    @include media("mobile-sm") {
      padding: 20px 20px 30px;
    }

    .fieldset {
      &--small {
        margin: 0 auto;
        max-width: 350px;
      }
    }
  }

  &--inline {
    .form-step-active {
      width: 100%;
    }

    .kontainer-url {
      max-width: 330px;
      margin-right: 140px;
      margin-left: 60px;
    }

    @include media("mobile-ab") {
      .fieldset {
        display: flex;
        justify-content: center;
      }

      button {
        margin: 0;
      }
    }

    .success .checkmark::after {
      border-color: $white;
    }
  }

  &__element {
    $formElement: &;
    transform: translateX(50px);
    opacity: 0;
    transition: all 1s ease 0.3s;
    margin-bottom: 20px;
  }

  &__group {
    margin-bottom: 30px;

    .form__element {
      margin-bottom: 10px;
    }

    &__inline {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      @include media("mobile") {
        flex-direction: column;
        margin-bottom: 0;
      }

      .form__element {
        width: calc(50% - 11px);
        margin: 0;

        @include media("mobile") {
          width: 100%;
          margin-bottom: 10px;
        }
      }

      .styled-select {
        position: relative;
        z-index: 2;

        .error-message {
          background-color: transparent;
        }

        .country-icon {
          position: absolute;
          left: 22px;
          top: calc(50% - 8px);
          z-index: 3;
        }
      }

      ::v-deep(.dropdown) {
        &.error {
          border-color: $errorColor;

          .dropdown-toggle {
            border-color: $errorColor;
          }
        }

        .dropdown-toggle {
          background-color: $white;
          height: 55px;
          border-radius: 0;
          padding-left: 47px;
        }

        .dropdown-menu {
          border-radius: 0;
          @extend %text-input;
        }

        input[type="search"] {
          @extend %text-input;
        }

        .open-indicator:before {
          border-width: 1px 1px 0 0;
          border-color: $black;
        }

        .vs__actions {
          padding-right: 15px;
        }

        .clear {
          display: none;
        }

        &.single.open .selected-tag {
          top: calc(50% - 2px);
          transform: translateY(-50%);
        }
      }
    }
  }

  &-step-active {
    .form__element {
      transform: translate(0);
      opacity: 1;
    }
  }

  .invoice-heading {
    @extend %text-manchet;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 30px;
    text-align: left;
  }

  &__progress {
    display: flex;
    border: 1px solid $gray-alto;
    margin: 40px 0 20px;

    &__step {
      padding: 10px;
      font-size: 12px;
      flex: 1 1 0;

      &:not(:last-child) {
        border-right: 1px solid $gray-alto;
      }

      &.active,
      &.completed {
        font-weight: 500;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          height: 2px;
          width: 100%;
          left: 0;
          bottom: 0;
          background-color: $yellow-dark;
        }
      }

      &.completed {
        cursor: pointer;
      }
    }
  }
}

.signup-account {
  &__welcome {
    margin-bottom: 50px;

    h3 {
      @extend %text-paragraph1;
    }
  }

  &__info {
    border-color: $gray-alto2;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
    margin-bottom: 50px;
    padding: 20px 0;
    text-align: left;

    .row {
      display: flex;
      align-items: flex-start;
      align-content: flex-start;

      &.extras {
        margin-top: 20px;
      }

      &.totals {
        padding-top: 20px;
        border-top: 1px solid $gray-alto2;

        h3 {
          margin-bottom: 0;
          margin-top: 10px;
        }
      }
    }

    &__specification {
      flex: 1;
      padding-right: 20px;

      h3 {
        @extend %text-manchet;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 14px;
      }

      .services {
        font-size: 12px;
        line-height: 1.3;
      }
    }

    &__pricing {
      display: flex;

      .price {
        font-size: 40px;
        line-height: 40px;
        margin: 0 12px;

        &.extras {
          font-size: 25px;
          line-height: 25px;
        }
      }

      .currency,
      .monthly {
        font-size: 12px;
        line-height: 20px;
        opacity: 0.5;
        align-self: flex-start;
      }

      .monthly {
        align-self: flex-end;
      }
    }
  }

  &.standalone {
    background-color: $gray-concrete;
    margin: 75px auto;
    max-width: 1050px;
    position: relative;

    @include media("mobile-sm") {
      background: none;
    }
  }
}

.form-go-back {
  position: absolute;
  top: 32px;
  left: 35px;

  width: 40px;
  height: 40px;
  min-width: 0;

  display: block;
  border: none;

  margin: 0;
  padding: 0;

  // transform: rotate(-135deg);

  text-indent: -9999px;
  opacity: 0.7;
  background-color: transparent;

  @include media("mobile") {
    position: absolute;
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    background-color: transparent;
    vertical-align: middle;
    border-color: $black;
    box-sizing: border-box;
    width: 11px;
    height: 11px;
    border-width: 2px 0 0 2px;
    border-style: solid;
    min-width: 0;

    transform: translate3d(10px, 20px, 0) rotate(-45deg);
    transform-origin: 0 0;
  }

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 1px;
    top: -1px;
    height: 2px;
    width: 20px;
    background-color: $black;

    transform: translate3d(10px, 20px, 0) rotate(0deg);
    transform-origin: 0 0;
  }
}

.success {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);

  h2 {
    @extend %text-h2;
    margin-bottom: 20px;
  }

  p {
    @extend %text-paragraph1;
  }
}

.conditions {
  margin-top: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
}

.prefix,
.suffix {
  @extend %text-paragraph3;
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translate(-100%, -50%);
}

.suffix {
  left: auto;
  right: -10px;
  transform: translate(100%, -50%);
}

.columns {
  display: flex;

  @include media("tablet") {
    flex-direction: column-reverse;
  }

  @include media("mobile") {
    margin-bottom: 20px;
  }

  &__item {
    margin-right: 50px;
    width: calc(50% - 25px);

    @include media("tablet") {
      margin-right: 0;
      width: 100%;
    }

    &:last-child {
      margin-right: 0;
    }

    &--column {
      @include media("tablet") {
        align-items: center;
        display: flex;
        flex-direction: column;
      }

      @include media("mobile-sm") {
        align-items: flex-start;
      }
    }
  }
}

.quote {
  align-items: center;
  display: flex;
  margin-bottom: 30px;

  &__icon {
    margin-right: 23px;
    width: 32px;

    ::v-deep(.bg) {
      .quoteicon img {
        width: 100%;
      }
    }
  }

  &__text {
    @extend %text-h4;
    font-size: 20px;
    text-align: left;

    @include media("mobile-sm") {
      font-size: 16px;
    }
  }
}
</style>

<!-- <docs>
```jsx
<div>
</div>
```
</docs> -->
