<template>
  <v-app dark>
    <AppMenu />
    <AppBar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "MainLayout",
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      fixed: (state) => state.setting.fixed,
    }),
  },
}
</script>
