import * as rules from 'vee-validate/dist/rules'

import { ValidationObserver, ValidationProvider, extend, localeChanged, localize } from 'vee-validate'

import Vue from 'vue'
import _ from 'lodash'
import { between } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import th from 'vee-validate/dist/locale/th.json'

export default function ({ app }) {
  Object.keys(rules).forEach((rule) => {
    extend(rule, {
      ..._.get(rules, [rule]), // copies rule configuration
      // message: app.i18n.locale === 'th' ? th.messages[rule] : en.messages[rule], // assign message
    })
  })

  localize({
    en: {
      messages: en.messages,
    },
    th: {
      messages: th.messages,
    },
  })
  localeChanged()
  localize(app.i18n.locale)

  extend('amount', {
    ...between,
    message: 'กรอกจำนวนเงินได้ไม่เกิน 100,000',
  })

  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)
}
