<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(onSubmit)">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Clicknext</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ValidationProvider name="Email" rules="required|email" v-slot="{ valid, errors }">
                <v-text-field
                  id="email"
                  prepend-icon="mdi-email"
                  name="email"
                  label="Email"
                  type="email"
                  :success="valid && form.email !== ''"
                  required
                  v-model="form.email"
                  :hide-details="!errors[0]"
                  :error-messages="errors"
                  class="mb-2"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="Password"
                rules="required|min:8"
                v-slot="{ valid, errors }"
              >
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  :error-messages="errors"
                  :success="valid && form.password !== ''"
                  required
                  v-model="form.password"
                  :hide-details="!errors[0]"
                  @click:append="show = !show"
                ></v-text-field>
              </ValidationProvider>

              <div v-if="error" style="color: red" class="mt-2 ml-3">
                {{ error }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" :loading="submitted" block color="primary"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </ValidationObserver>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Login',
  props: {
    form: {
      type: Object,
      require: true,
      default: () => {
        return {
          email: '',
          password: '',
        }
      },
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      show: false,
      emailErrorMsg: null,
      passwordErrorMsg: null,
    }
  },
  methods: {
    async onSubmit() {
      const _this = this
      // const email = await validate(_this.form.email, 'required|email')
      // if(!email.valid) {
      //   _this.emailErrorMsg = email.errors
      // }
      // const password = await validate(_this.form.password, 'required|min:8')
      // if(!password.valid) {
      //   _this.passwordErrorMsg = password.errors
      // }
      const isValid = await _this.$refs.form.validate()
      if (!isValid) return
      _this.$emit('submit', _this.form)
    },
  },
}
</script>

<style></style>
