export const state = () => ({
  clipped: false,
  drawer: false,
  fixed: false,
  menus: [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/',
    },
    {
      icon: 'mdi-file-document-edit-outline',
      title: 'Deposit/withdraw',
      to: '/deposit-withdraw',
    },
    {
      icon: 'mdi-list-box-outline',
      title: 'Transaction',
      to: '/transaction',
    },
  ],
  miniVariant: false,
  right: true,
  rightDrawer: false,
  title: 'Clicknext',
})

export const getters = {
  miniSidebarState: (state) => state.miniVariant
}

export const mutations = {
  clippedCommit(state, data) {
    state.clipped = data
  },
  drawerCommit(state, data) {
    state.drawer = data
  },
  fixedCommit(state, data) {
    state.fixed = data
  },
  menusCommit(state, data) {
    state.menus = data
  },
  miniVariantCommit(state, data) {
    state.miniVariant = data
  },
  rightCommit(state, data) {
    state.right = data
  },
  rightDrawerCommit(state, data) {
    state.rightDrawer = data
  },
}

export const actions = {
  clippedAction(context, payload) {
    context.commit('clippedCommit', payload)
  },
  drawerAction(context, payload) {
    context.commit('drawerCommit', payload)
  },
  fixedAction(context, payload) {
    context.commit('fixedCommit', payload)
  },
  menusAction(context, payload) {
    context.commit('menusCommit', payload)
  },
  miniVariantAction(context, payload) {
    context.commit('miniVariantCommit', payload)
  },
  rightAction(context, payload) {
    context.commit('rightCommit', payload)
  },
  rightDrawerAction(context, payload) {
    context.commit('rightDrawerCommit', payload)
  },
}
