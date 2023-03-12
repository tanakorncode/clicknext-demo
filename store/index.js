import * as constants from '@/core/constants'

// const cookieparser = process.server ? require('cookieparser') : undefined
// import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

export const state = () => ({
  authUser: null,
  cancelTokens: [],
})

export const mutations = {
  [constants.SET_USER](state, user) {
    state.authUser = user
  },
  [constants.ADD_CANCEL_TOKEN](state, token) {
    state.cancelTokens.push(token)
  },
  [constants.CLEAR_CANCEL_TOKENS](state) {
    state.cancelTokens = []
  },
  [constants.RESET_STORE]: (state) => {
    state.authUser = null
    state.token = null
  },
}

export const getters = {
  cancelTokens(state) {
    return state.cancelTokens
  },
  isLoggedIn: (state) => {
    return state.authUser !== null
  },
  email: (state) => {
    return _.get(state.authUser, 'email', '')
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit(constants.SET_USER, req.session.authUser)
    }
    // if (req && req.headers && req.headers.cookie) {
    //   const parsed = cookieparser.parse(req.headers.cookie)
    // }
  },

  logout({ commit }) {
    commit(constants.SET_USER, null)
  },

  [constants.CANCEL_PENDING_REQUESTS](context) {
    // Cancel all request where a token exists
    context.state.cancelTokens.forEach((request, i) => {
      if (request.cancel && typeof request.cancel === 'function') {
        request.cancel()
      }
    })

    // Reset the cancelTokens store
    context.commit(constants.CLEAR_CANCEL_TOKENS)
  },
}
