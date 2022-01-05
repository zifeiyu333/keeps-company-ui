<template>
  <div >
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @dialog-cancel="handleDialogCancel">
      <div slot="header">
         <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <!-- 同一个页面下 多个toolbar 需要设置storage名称，否则列设置保存会有冲突-->
        <crud-toolbar  :search.sync="crud.searchOptions.show"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                       storage="online"
                      @columns-filter-changed="handleColumnsFilterChanged"/>

      </div>
    </d2-crud-x>
  </div>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList } from './api'

/**
 * 子表格当成一个普通组件来被父表格引用
 */
export default {
  name: 'pkOnlineTable',
  mixins: [d2CrudPlus.crud],
  props: {
  },
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  created () {
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    async pageRequest (query) {
      const ret = await GetList(query)
      const list = ret.data
      ret.data = {
        current: 1,
        size: 10000,
        total: 100,
        records: list
      }
      return ret
    },
    addRequest (row) {
    },
    updateRequest (row) {
    },
    delRequest (row) {
    }
  }
}
</script>
