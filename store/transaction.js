import * as transaction from '@/core/constants/transaction'

import _ from 'lodash'
import moment from 'moment'
import { set } from 'vue'
import { updateObject } from '@/utils'
import { v4 as uuidv4 } from 'uuid'

moment.locale('th')

const sumTotalAmount = (items, state) => {
  return _.sumBy(_.filter(items, (v) => v.state === state), 'amount')
}

export const state = () => ({
  items: []
})

export const getters = {
  // ยอดฝากคงเหลือ
  totalDepositAmount: (state) => {
    const totalDeposit = sumTotalAmount(state.items, transaction.DEPOSIT_STATE) // รวมยอดฝาก
    const totalWithdraw = sumTotalAmount(state.items, transaction.WITHDRAW_STAE) // รวมยอดถอน
    return totalDeposit - totalWithdraw
  },
  transactions: (state) => state.items
}

export const mutations = {
  [transaction.ADD_ITEM_COMMIT](state, data) {
    if (Array.isArray(data)) {
      state.items.push(...data)
    } else {
      state.items.push(data)
    }
  },
  [transaction.REMOVE_ITEM_COMMIT](state, delitem) {
    const index = _.findIndex(state.items, (item) => item.id === delitem.id)
    state.items.splice(index, 1)
  },
  [transaction.UPDATE_ITEM_COMMIT](state, updated) {
    const index = _.findIndex(state.items, (item) => item.id === updated.id)
    if (state.items[index]) {
      set(state.items, index, updated)
    }
  },
}

export const actions = {
  [transaction.ADD_ITEM_ACTION]({ commit, rootState }, payload) {
    const item = {
      id: uuidv4(),
      datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
      email: rootState.authUser.email
    }
    commit(transaction.ADD_ITEM_COMMIT, updateObject(item, payload))
  },
  [transaction.REMOVE_ITEM_ACTION](context, payload) {
    context.commit(transaction.REMOVE_ITEM_COMMIT, payload)
  },
  [transaction.UPDATE_ITEM_ACTION](context, payload) {
    context.commit(transaction.UPDATE_ITEM_COMMIT, payload)
  },
}
