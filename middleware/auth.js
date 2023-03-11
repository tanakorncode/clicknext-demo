export default function ({ store, error, app, redirect }) {
  if (!store.getters.isLoggedIn) {
    return redirect(app.localePath('/auth/login'))
    // error({
    //   message: 'You are not connected',
    //   statusCode: 403
    // })
  }
}
