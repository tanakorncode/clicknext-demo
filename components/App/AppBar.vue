<template>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="drawerToggle(!drawer)" />
    <v-btn icon @click.stop="miniVariantToggle(!miniVariant)">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
    <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn @click="onLogout" color="primary" small title="Logout">
      Logout
    </v-btn>
    <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppBar',
  computed: {
    ...mapState({
      clipped: (state) => state.setting.clipped,
      drawer: (state) => state.setting.drawer,
      miniVariant: (state) => state.setting.miniVariant,
      title: (state) => state.setting.title,
    }),
  },
  methods: {
    ...mapActions({
      drawerToggle: 'setting/drawerAction',
      miniVariantToggle: 'setting/miniVariantAction',
      logout: 'logout',
    }),
    async onLogout() {
      await this.$authService.logout()
      this.logout()
      this.$router.replace(this.localePath({ path: '/auth/login' }))
    },
  },
}
</script>

<style lang="scss" scoped></style>
