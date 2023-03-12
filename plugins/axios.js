import * as constants from '@/core/constants'

import _ from 'lodash'

export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    // const token = store.state.auth.accessToken
    // if (token) {
    //   $axios.setToken(token, 'Bearer')
    // }
    //  Generate cancel token source
    const source = $axios.CancelToken.source()

    // Set cancel token on this request
    config.cancelToken = source.token

    // Add to vuex to make cancellation available from anywhere
    store.commit(constants.ADD_CANCEL_TOKEN, source)

    return config
  })

  $axios.onResponse((response) => {
    if (response.data || response.data !== 'undefined') {
      return response.data
    }
    return response
  })

  $axios.onError((error) => {
    /* const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } */
    store.dispatch(constants.CANCEL_PENDING_REQUESTS)
    if (_.get(error, 'response.data') && _.get(error, 'response.data.data')) {
      return Promise.reject(_.get(error, 'response.data.data', error.response.data))
    }
    return Promise.reject(error)
  })
}
