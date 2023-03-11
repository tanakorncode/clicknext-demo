<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in menus"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppMenu',
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapState({
      clipped: (state) => state.setting.clipped,
      appDrawer: (state) => state.setting.drawer,
      miniVariant: (state) => state.setting.miniVariant,
      menus: (state) => state.setting.menus,
    }),
  },
  watch: {
    appDrawer(val) {
      this.drawer = val
    },
    drawer(val) {
      this.drawerToggle(val)
    }
  },
  methods: {
    ...mapActions({
      drawerToggle: 'setting/drawerAction',
      miniVariantToggle: 'setting/miniVariantAction',
      logout: 'logout',
    }),
  }
}
</script>

<style lang="scss" scoped></style>
