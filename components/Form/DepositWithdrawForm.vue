<template>
  <client-only>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <!-- <v-card>
        <v-card-text> </v-card-text>

      </v-card> -->
        <v-container>
          <slot name="header"></slot>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ valid, errors }"
                vid="amount"
                name="จำนวนเงิน*"
                rules="required|min:0|max:6|amount:0,100000"
              >
                <v-currency-field
                  ref="input"
                  v-model="amount"
                  label="จำนวนเงิน*"
                  :success="valid && !amount"
                  hint="กรอกจำนวนได้ไม่เกิน 100,000"
                  persistent-hint
                  :error-messages="errors"
                  placeholder="กรอกจำนวนเงิน"
                  dense
                  outlined
                  clearable
                  :maxlength="7"
                  class="inputPrice"
                  autofocus
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <slot name="actions"></slot>
        </v-container>
      </v-form>
    </ValidationObserver>
  </client-only>
</template>

<script>
export default {
  name: 'DepositWithdrawForm',
  data() {
    return {
      amount: null,
    }
  },
  watch: {
    amount(val) {
      this.$emit('update:amount', this.amount)
    },
  },
  methods: {
    async onSubmit() {
      await this.$refs.form.validate()
    },
  },
}
</script>

<style lang="scss" scoped></style>
