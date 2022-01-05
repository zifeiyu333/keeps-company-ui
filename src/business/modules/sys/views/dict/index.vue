<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <d2-crud-x
                ref="d2Crud"
                size="mini"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @row-dblclick="handleCellDblclick"
        >
            <div slot="header" class="d2-mb-5">

            </div>

          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button v-permission="'sys:dict:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>

        </d2-crud-x>

    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
export default {
  name: 'Dict',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      dsScopeData: [],
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      list: [],
      listLoading: true,
      form: {},
      dialogPermissionVisible: false
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    handleCellDblclick (row, event) {
      this.$store.dispatch('d2admin/page/close', {
        tagName: 'sys-dict-data'
      })
      this.$router.push({
        name: 'sys-dict-data',
        query: {
          dictId: row.id
        }
      })
      // this.$store.dispatch('d2admin/page/open', {
      //   name: 'sys-dict-data',
      //   params: { dictId: row.id },
      //   query: { dictId: row.id }
      // })
    }
  }
}
</script>
