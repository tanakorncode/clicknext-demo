<template>
  <v-row>
    <v-col offset-md="3" md="6" lg="6" sm="12" class="mt-5">
      <v-card>
        <v-card-text>
          <DepositWithdrawForm ref="form" :amount.sync="amount">
            <template #header>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h4>{{ label }} {{ totalAmount | totalFormat }} บาท</h4>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!amount" color="green" @click="deposit()">
                  ฝาก
                </v-btn>
                <v-btn :disabled="!amount" color="error" @click="withdraw()">
                  ถอน
                </v-btn>
              </v-card-actions>
            </template>
          </DepositWithdrawForm>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { alertSuccess } from '@/utils'
import Swal from 'sweetalert2'
import numeral from 'numeral'
import * as transaction from '@/core/constants/transaction'

export default {
  name: 'DepositWithdraw',
  filters: {
    totalFormat(val) {
      if (!val) return 0
      return numeral(val).format('0,0')
    },
  },
  middleware: 'auth',
  data() {
    return {
      label: 'จำนวนเงินคงเหลือ',
      amount: null, // จำนวนเงิน
    }
  },
  head: {
    title: 'ฝาก-ถอน',
  },
  computed: {
    ...mapGetters({
      totalAmount: `${transaction.MODULE_NAME}/totalDepositAmount`, // ยอดคงเหลือ
    }),
    isWithdraw() {
      return this.amount <= this.totalAmount && this.totalAmount > 0
    },
  },
  mounted() {
    this.$nextTick(function () {
      // console.log(this.$refs.form.$refs.input.$refs.textfield)
    })
  },
  methods: {
    alertSuccess,
    ...mapActions({
      addItem: `${transaction.MODULE_NAME}/${transaction.ADD_ITEM_ACTION}`,
    }),
    /**
     * ฝาก
     */
    async deposit() {
      const _this = this
      const value = await Swal.fire({
        title: 'ยืนยันการฝาก-ถอน?',
        text: `จำนวนเงิน ${numeral(this.amount).format('0,0')} บาท`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        allowOutsideClick: false,
      })

      if (value.isConfirmed) {
        const item = {
          amount: _this.amount,
          state: 'deposit',
        }
        _this.addItem(item)
        _this.clearForm()
        _this.alertSuccess('ทำรายการฝากสำเร็จ')
      }
    },
    /**
     * ถอน
     */
    async withdraw() {
      const _this = this
      if (!_this.isWithdraw) {
        Swal.fire({
          title: 'ยอดคงเหลือไม่เพียงพอ?',
          text: `จำนวนเงินคงเหลือของคุณ ${numeral(this.totalAmount).format(
            '0,0'
          )} บาท`,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ปิด',
        })
        return
      }
      const value = await Swal.fire({
        title: 'ยืนยันการฝาก-ถอน?',
        text: `จำนวนเงิน ${numeral(this.amount).format('0,0')} บาท`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        allowOutsideClick: false,
      })

      if (value.isConfirmed) {
        const item = {
          amount: _this.amount,
          state: 'withdraw',
        }
        _this.addItem(item)
        _this.clearForm()
        _this.alertSuccess('ทำรายการถอนสำเร็จ')
      }
    },
    /**
     * Clear form
     */
    clearForm() {
      this.$refs.form.$refs.input.$refs.textfield.clearableCallback()
      this.$refs.form.$refs.input.$refs.textfield.resetValidation()
      this.$refs.form.$refs.form.reset()
    },
  },
}
</script>

<style>
.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
