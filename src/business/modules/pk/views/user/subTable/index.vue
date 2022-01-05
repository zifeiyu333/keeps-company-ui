<template>
  <div >
    <div>会员：<span class="current_selected"><el-tag>{{userCode}}</el-tag><el-tag>{{nickName}}</el-tag></span></div>
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
                       storage="subTable"
                      @columns-filter-changed="handleColumnsFilterChanged"/>

      </div>
    </d2-crud-x>
  </div>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, GetTermList } from './api'

/**
 * 子表格当成一个普通组件来被父表格引用
 */
export default {
  name: 'userSubTable',
  mixins: [d2CrudPlus.crud],
  props: {
    nickName: {
      required: false
    },
    userCode: {
      required: false
    },
    queryType: {
      required: false
    }
  },
  data () {
    return {
    }
  },
  watch: {
    userCode: {
      handler (newVal, oldVal) {
        if (newVal && newVal !== oldVal && this.queryType === 1) {
          this.crud.searchOptions.form.userCode = newVal
          this.doRefresh()
        }
      },
      deep: true
    },
    queryType: {
      handler (newVal, oldVal) {
        if (newVal && newVal !== oldVal && this.queryType === 2) {
          this.crud.searchOptions.form.queryType = this.queryType
          this.doRefresh()
        }
      },
      deep: true
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    getCrudOptions () {
      this.crud.searchOptions.form.userCode = this.userCode
      return crudOptions(this)
    },
    pageRequest (query) {
      if (this.queryType === 1) {
        query.userCode = this.userCode
        return GetTermList(query)
      } else {
        query.userCode = ''
        return GetList(query)
      }
    },
    addRequest (row) {
    },
    updateRequest (row) {
    },
    delRequest (row) {
    },
    doCurrentChange (event) {
      this.$emit('selectData', event.userCode, event.nickName)
    }
  }
}
</script>
