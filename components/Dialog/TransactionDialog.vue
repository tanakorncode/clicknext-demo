<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">แก้ไขจำนวนเงินฝาก</span>
      </v-card-title>
      <v-card-text>
        <DepositWithdrawForm ref="form" :amount.sync="amount">
          <template #header>
            <v-row v-if="item">
              <v-col md="12" lg="12" sm="12">
                <h4>ของวันที่ {{ item.datetime }}</h4>
                <h4>
                  จากอีเมล
                  <nuxt-link :to="`mailto:${item.email}`">
                    {{ item.email }}
                  </nuxt-link>
                </h4>
              </v-col>
            </v-row>
          </template>
          <template #actions>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn title="ยืนยัน"  :disabled="isDisabled" color="primary" @click="onSubmit"> ยืนยัน </v-btn>
              <v-btn title="ยกเลิก" color="error" @click="onCancel"> ยกเลิก </v-btn>
            </v-card-actions>
          </template>
        </DepositWithdrawForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { updateObject } from '@/utils'

export default {
  name: 'TransactionDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      dialog: false,
      amount: null,
      maxInput: 100000
    }
  },
  computed: {
    isDisabled() {
      return !this.amount || this.amount > this.maxInput
    },
  },
  watch: {
    show(isShow) {
      this.dialog = isShow
    },
    dialog(val) {
      this.$emit('change', val)
    },
    item(item) {
      if (item && this.show) {
        this.$nextTick(function () {
          this.$refs.form.amount = item.amount
        })
      }
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', updateObject(this.item, { amount: this.amount }))
    },
    onCancel() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
