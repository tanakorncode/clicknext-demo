// import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'
import Vue from 'vue'

export default function ({ app }) {
  Vue.component('v-text-field', VTextField)
  // Vue.use(VCurrencyField)
}
