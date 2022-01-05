<template>
  <div >
    <div>当前选择会员：<span class="current_selected"><el-tag>{{nickName}}</el-tag><el-tag>{{userCode}}</el-tag></span></div>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
    >
      <div slot="header">
        <!-- 同一个页面下 多个toolbar 需要设置storage名称，否则列设置保存会有冲突-->
        <crud-toolbar  :search.sync="crud.searchOptions.show"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                       storage="walletBillTable"
                      @columns-filter-changed="handleColumnsFilterChanged"/>

      </div>
      <template slot="addTimeSlot" slot-scope="scope">
          {{scope.row['addTime'] * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
      </template>
      <template slot='addTimeFormSlot' slot-scope='scope'>
          {{scope.form.addTime * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
      </template>
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
  name: 'walletBillTable',
  mixins: [d2CrudPlus.crud],
  props: {
    nickName: {
      required: false
    },
    userCode: {
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
        if (newVal && newVal !== oldVal) {
          this.crud.searchOptions.form.userCode = newVal
          this.doRefresh()
        }
      },
      deep: true
    }
  },
  created () {
  },
  methods: {
    getCrudOptions () {
      this.crud.searchOptions.form.userCode = this.userCode
      return crudOptions
    },
    pageRequest (query) {
      return GetList(query)
    }
  }
}
</script>
