import SecureLS from "secure-ls";
import createPersistedState from 'vuex-persistedstate'
const ls = new SecureLS({ isCompression: false });

export default ({ store }) => {
  let paths = ['auth', 'i18n', 'transaction']

  const settings = Object.keys(store.state.setting)
    .filter((k) => !['menus'].includes(k))
    .map((k) => `setting.${k}`)
  paths = paths.concat(settings)

  createPersistedState({
    key: 'nuxt-vuex',
    paths: paths,
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })(store)
}
