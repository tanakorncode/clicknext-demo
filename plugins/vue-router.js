export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    store.dispatch('CANCEL_PENDING_REQUESTS')
    next()
  })
}
