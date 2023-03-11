import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  let paths = ['auth', 'i18n', 'transaction']

  const settings = Object.keys(store.state.setting)
    .filter((k) => !['menus'].includes(k))
    .map((k) => `setting.${k}`)
  paths = paths.concat(settings)

  createPersistedState({
    key: 'nuxt-vuex',
    paths: paths,
  })(store)
}
