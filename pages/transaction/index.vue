<template>
  <v-row>
    <v-col cols="12">
      <client-only>
        <template #placeholder>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </template>
        <TransactionTable
          :loading="loading"
          :headers="headers"
          :items="itemList"
          @edit="onEdit"
          @delete="onDelete"
        />
      </client-only>

      <TransactionDialog
        :show="dialog"
        :item="edititem"
        @change="(show) => (dialog = show)"
        @submit="onSubmit"
      />
    </v-col>
  </v-row>
</template>

<script>
import Swal from 'sweetalert2'
import numeral from 'numeral'
import { mapGetters, mapActions } from 'vuex'
import * as transaction from '@/core/constants/transaction'
import { updateObject, alertSuccess, getColor } from '@/utils'

export default {
  name: 'TransactionIndex',
  middleware: 'auth',

  data() {
    return {
      loading: false,
      search: '',
      headers: [
        {
          text: 'Datetime',
          align: 'start',
          value: 'datetime',
        },
        {
          text: 'Amount',
          align: 'end',
          value: 'amount',
        },
        {
          text: 'Status',
          align: 'end',
          value: 'status',
        },
        {
          text: 'Email',
          align: 'start',
          value: 'email',
        },
        {
          text: 'Actions',
          align: 'end',
          value: 'actions',
          sortable: false,
        },
      ],
      dialog: false,
      edititem: null, // รายการที่แก้ไข
    }
  },
  head: {
    title: 'ประวัติรายการฝากถอน',
  },
  computed: {
    ...mapGetters({
      items: `${transaction.MODULE_NAME}/transactions`, // ยอดคงเหลือ
    }),
    /**
     * map items
     */
    itemList() {
      return this.items.map((item) => {
        return updateObject(item, {
          status_color: getColor(item.state),
          status: item.state === transaction.DEPOSIT_STATE ? 'ฝาก' : 'ถอน',
          is_show_edit: item.state === transaction.DEPOSIT_STATE,
          is_show_del: item.state === transaction.WITHDRAW_STAE,
        })
      })
    },
  },
  watch: {
    dialog(isShow) {
      // reset edititem when dialog not show
      if (!isShow) {
        this.edititem = null
      }
    },
  },
  beforeMount() {
    this.loading = true
  },
  mounted() {
    this.$nextTick(function () {
      this.loading = false
    })
  },
  methods: {
    alertSuccess,
    ...mapActions({
      updateItem: `${transaction.MODULE_NAME}/${transaction.UPDATE_ITEM_ACTION}`,
      removeItem: `${transaction.MODULE_NAME}/${transaction.REMOVE_ITEM_ACTION}`,
    }),
    /**
     * edit button action
     * @param {Object} item
     */
    onEdit(item) {
      this.dialog = !this.dialog
      this.edititem = item
    },
    /**
     * delete item from state
     * @param {Object} item
     */
    async onDelete(item) {
      const value = await Swal.fire({
        title: 'ยืนยันการลบ?',
        html: `<div>จำนวนเงินถอน ${numeral(item.amount).format('0,0')} บาท</div>
        <div>ของวันที่ ${item.datetime}</div>
        <div>จากอีเมล ${item.email}</div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      })

      if (value.isConfirmed) {
        this.removeItem(item)
        // show message
        this.alertSuccess('ลบรายการสำเร็จ')
      }
    },
    /**
     * update item to state
     * @param {Object} item
     */
    onSubmit(item) {
      this.updateItem(item) // send to state
      this.dialog = !this.dialog // hide dialog
      // show message
      this.alertSuccess('แก้ไขรายการสำเร็จ')
    },
  },
}
</script>

<style lang="scss" scoped></style>
