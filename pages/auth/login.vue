<template>
  <v-row>
    <v-col cols="12">
      <client-only>
        <Login :form="form" :submitted="submitted" :error="error" @submit="login" />
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import * as constants from '@/core/constants'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      submitted: false,
      error: null
    }
  },
  watch: {
    submitted(val) {
      this.error = val ? null : this.error
    }
  },
  methods: {
    /**
     * Login
     * @param {String} email
     * @param {String} password
     */
    async login(form) {
      const _this = this
      try {
        _this.submitted = true
        const user = await _this.$authService.login(form)
        _this.setUser(user)
        _this.submitted = false
        _this.$router.push(_this.localePath({ path: '/' }))
      } catch (e) {
        _this.error = e.message
        _this.submitted = false
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    },
    ...mapMutations({
      setUser: constants.SET_USER
    })
  },
}
</script>
