<template>
  <v-card outlined>
    <v-card-title class="text-h5"> ประวัติรายการฝากถอน </v-card-title>
    <v-card-text>
      <v-card-title>
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        :search="search"
        :sort-by="['datetime']"
        :sort-desc="[true]"
        item-key="id"
      >
        <template #[`item.amount`]="{ item }">
          {{ item.amount | amountFormat }}
        </template>
        <template #[`item.status`]="{ item }">
          <v-chip small :color="item.status_color" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-show="item.is_show_edit"
                title="แก้ไข"
                nuxt
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="$emit('edit', item)"
              >
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>แก้ไข</span>
          </v-tooltip>

          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-show="item.is_show_del"
                title="ลบ"
                nuxt
                icon
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="$emit('delete', item)"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
            <span>ลบ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import numeral from 'numeral'

export default {
  name: 'TransactionTable',
  filters: {
    amountFormat(val) {
      if (!val) return 0
      return numeral(val).format('0,0')
    },
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    getColor(state) {
      if (state === 'withdraw') return 'red'
      else return 'green'
    },
  },
}
</script>

<style lang="scss" scoped></style>
