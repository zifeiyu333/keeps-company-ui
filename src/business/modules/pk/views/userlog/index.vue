<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header"></template>
        <d2-crud-x
                ref="d2Crud"
                @applyOk='handleApplyOk'
                @applyNo='handleApplyNo'
                v-bind="_crudProps"
                v-on="_crudListeners">
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <span slot="PaginationPrefixSlot" class="prefix" >
                <el-button v-permission="'pk:userlog:delete'" class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <span slot="PaginationPrefixSlot" class="prefix" >
                <el-button v-permission="'pk:userlog:delete'" class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <template slot="addTimeSlot" slot-scope="scope">
                {{scope.row['addTime'] * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
            </template>
            <template slot='addTimeFormSlot' slot-scope='scope'>
                {{scope.form.addTime * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
            </template>
        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
export default {
  name: 'PkUserLog',
  mixins: [d2CrudPlus.crud],
  data () {
    return {}
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      query.logType = 1
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.logId)
    },
    batchDelRequest (ids) {
      return api.DelObj(ids)
    },
    infoRequest (row) {
      return api.GetObj(row.logId)
    },
    handleApplyOk (index) {
      this.$confirm('确定发放该提现申请吗？', '发放', {
        type: 'warning'
      }).then(() => {
        return api.applyOkObj(index.row.logId).then(ret => {
          this.handleSearch()
        })
      }).then(() => {
      }).catch(() => {})
    },
    handleApplyNo (index) {
      this.$prompt('请输入拒绝原因', '拒绝', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        return api.applyNoObj(index.row.logId, value).then(ret => {
          this.handleSearch()
        })
      }).catch(() => {
      })
    }
  }
}
</script>
