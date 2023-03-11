export default function ({ store, redirect, app, isDev }) {
  // If the user is authenticated redirect to home page
  if (store.getters.isLoggedIn) {
    return redirect(app.localePath('/'))
  }
}
