import * as constants from '@/core/constants'

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    store.dispatch(constants.CANCEL_PENDING_REQUESTS)
    next()
  })
}
