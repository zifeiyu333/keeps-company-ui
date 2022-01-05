<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header"></template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch">
                  <template slot="guishuUserSearchSlot" slot-scope="scope">
                    <el-form-item label="归属人编号">
                      <el-input v-model="scope.form['guishuUserCode']" placeholder="归属人编号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="归属人昵称">
                      <el-input v-model="scope.form['guishuNickname']" placeholder="归属人昵称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="归属人手机号">
                      <el-input v-model="scope.form['goodsTel']" placeholder="归属人手机号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-radio-group v-model="scope.form['status']" @change="statusChanged">
                        <el-radio-button type="primary" :value="-1" >全部</el-radio-button>
                        <el-radio-button v-for="(item) in statusList" :key="item.value" type="primary" :label="item.value">{{item.label}}</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </template>
                </crud-search>
                <el-button v-permission="'pk:goods:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <span slot="PaginationPrefixSlot" class="prefix" >
                <el-button v-permission="'pk:goods:delete'" class="square" size="mini" title="批量删除" @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <template slot="guishuNicknameSlot" slot-scope="scope" v-if="scope.row['guishuNickname']">
              昵称：{{scope.row['guishuNickname']}}<br/>
              <img :src="scope.row.guishuUserLogo"/><br/>
              支付号：{{scope.row['guishuAlipayId']}}
            </template>
            <template slot="paixuSlot" slot-scope="scope">
              <el-input-number v-model="scope.row['paixu']" :precision="0" :step="0" :max="99999999999" width="100px" @blur="blurPaixu(scope.row)"></el-input-number>
            </template>
        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
export default {
  name: 'PkGoods',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      statusList: [{ label: '仓库', value: 1 }, { label: '线上', value: 2 }, { label: '未售出', value: 3 }, { label: '已售出', value: 4 }]
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
      return api.DelObj(row.goodsId)
    },
    batchDelRequest (ids) {
      return api.DelObj(ids)
    },
    infoRequest (row) {
      return api.GetObj(row.goodsId)
    },
    blurPaixu (row) {
      return api.UpdateRowField(row.goodsCode, row.paixu, 'paixu')
    },
    statusChanged ($event) {
      this.crud.searchOptions.form.status = $event
      this.doRefresh()
    },
    doCellDataChange (event) {
      const row = event.row
      let value = 0
      if (row[event.key]) {
        value = 1
      }
      return api.UpdateRowField(row.goodsCode, value, event.key)
    }
  }
}
</script>
