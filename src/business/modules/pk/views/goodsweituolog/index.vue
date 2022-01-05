<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header"></template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                @rest='handleRest'
                @weituo="handleWeituo"
                v-on="_crudListeners">
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  >
                  <template slot="buyTelSearchSlot" slot-scope="scope">
                    <el-form-item label="订单编号">
                      <el-input v-model="scope.form['weituoLogCode']" placeholder="订单编号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                      <el-input v-model="scope.form['goodsName']" placeholder="商品名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="卖家手机号/昵称">
                      <el-input v-model="scope.form['sellerNickName']" placeholder="卖家手机号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="买家手机号/昵称">
                      <el-input v-model="scope.form['buyNickName']" placeholder="买家手机号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-radio-group v-model="scope.form['status']" @change="statusChanged">
                        <el-radio-button type="primary" :value="-1" >全部</el-radio-button>
                        <el-radio-button v-for="(item) in statusList" :key="item.value" type="primary" :label="item.value">{{item.label}}</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </template>
                </crud-search>
                <el-button v-permission="'pk:goodsweituolog:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <span slot="PaginationPrefixSlot" class="prefix" >
                <el-button v-permission="'pk:goodsweituolog:delete'" class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <template slot="goodsInfoSlot" slot-scope="scope">
              <img :src="scope.row['goodsImg']" style="width:80%;height:100px"/><br/>
              名称：{{scope.row['goodsName']}}<br/>
              商品编号：{{scope.row['goodsCode']}}<br/>
              订单编号：{{scope.row['weituoLogCode']}}
            </template>
            <template slot="weituoPriceSlot" slot-scope="scope">
              商品价：{{scope.row['goodsPrice']}}<br/>
              委托价：{{scope.row['weituoPrice']}}<br/>
              手续费：{{scope.row['shouxufeiPrice']}}
            </template>
            <template slot="sellerUserInfoSlot" slot-scope="scope">
              <div v-if="scope.row['sellerUserCode']">
                <img :src="scope.row['sellerUserLogo']"/><br/>
                编号：{{scope.row['sellerUserCode']}}<br/>
                昵称：{{scope.row['sellerNickName']}}<br/>
                电话：{{scope.row['sellerTel']}}
                <el-button v-if="scope.row['status'] === 2" type="success" @click="handleCollectedPay(scope.row)">帮他确认收款</el-button>
              </div>
              <div v-else>
                平台<br/>
                <el-button v-if="scope.row['status'] === 2" type="success" @click="handleCollectedPay(scope.row)">确认收款</el-button>
              </div>
            </template>
            <template slot="buyUserInfoSlot" slot-scope="scope">
              <img :src="scope.row['buyUserLogo']"/><br/>
              编号：{{scope.row['buyUserCode']}}<br/>
              昵称：{{scope.row['buyNickName']}}<br/>
              电话：{{scope.row['buyTel']}}
            </template>
            <template slot="tuiInfoSlot" slot-scope="scope">
              一级：{{scope.row['tuiNickName']}}(佣：{{scope.row['tuiPrice']}})<br/>
              二级：{{scope.row['tui1NickName']}}(佣：{{scope.row['tui1Price']}})<br/>
              三级：{{scope.row['tui2NickName']}}(佣：{{scope.row['tui2Price']}})<br/>
            </template>
            <template slot="addTimeSlot" slot-scope="scope">
                {{scope.row['addTime'] * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
            </template>
            <template slot="payTimeSlot" slot-scope="scope">
                {{scope.row['payTime'] * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
            </template>
            <template slot="weituoPriceFormSlot" slot-scope="scope">
              商品价：{{scope.form.goodsPrice}}<br/>
              委托价：{{scope.form.guishuNickname}}<br/>
              手续费：{{scope.form.shouxufeiPrice}}
            </template>
            <template slot='addTimeFormSlot' slot-scope='scope'>
                {{scope.form.addTime * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
            </template>
            <template slot='payTimeFormSlot' slot-scope='scope'>
                {{scope.form.payTime * 1000 | date_timeline('YYYY-MM-DD HH:mm:ss')}}
            </template>
        </d2-crud-x>
        <el-dialog title="订单委托" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="增降比率" label-width="100px">
              <el-select v-model="zzbl" placeholder="请选择" @change="zzblChange">
                <el-option
                  v-for="item in options"
                  :key="item.index"
                  :label="item.name"
                  :value="item.index">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="转卖单价为" label-width="100px">
              <el-tag>{{rowData.weituoPrice}}</el-tag>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="weituoSave">确 定</el-button>
          </div>
        </el-dialog>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
export default {
  name: 'PkGoodsWeituoLog',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      options: [
        { index: -10, name: '-10%' },
        { index: -9, name: '-9%' },
        { index: -8, name: '-8%' },
        { index: -7, name: '-7%' },
        { index: -6, name: '-6%' },
        { index: -5, name: '-5%' },
        { index: -4, name: '-4%' },
        { index: -3, name: '-3%' },
        { index: -2, name: '-2%' },
        { index: -1, name: '-1%' },
        { index: 0, name: '持平' },
        { index: 1, name: '+1%' },
        { index: 2, name: '+2%' },
        { index: 3, name: '+3%' },
        { index: 4, name: '+4%' },
        { index: 5, name: '+5%' }
        // ,
        // { index: 6, name: '+6%' }
      ],
      zzbl: 5,
      rowData: {},
      dialogFormVisible: false,
      statusList: [{ label: '待付款', value: 1 }, { label: '待收款', value: 2 }, { label: '投诉单', value: 3 }, { label: '已付款，待委托/提货', value: 4 }, { label: '已付款，委托费', value: 5 }, { label: '已提货', value: 6 }, { label: '已取消/删除', value: 0 }]
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
      this.$prompt('确定要重置该订单数据吗？<br/>' + '订单号：' + row.weituoLogCode + '<br/>卖家：' + (!row.sellerNickName ? '平台' : row.sellerNickName) + '<br/>买家：' + row.buyNickName +
        '<br/><p style="color:red">该操作危险，请任意输入口令确认</p>', '重置订单操作', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value) {
          this.$message({
            message: '操作失败，未输入口令！',
            type: 'warning'
          })
          return false
        }
        api.DelObj(row.goodsId)
        this.doRefresh()
        return true
      }).catch(() => {
      })
    },
    statusChanged ($event) {
      this.crud.searchOptions.form.status = $event
      this.doRefresh()
    },
    handleRest (index) {
      this.$prompt('确定要重置该订单数据吗？<br/>' + '订单号：' + index.row.weituoLogCode + '<br/>卖家：' + (!index.row.sellerNickName ? '平台' : index.row.sellerNickName) + '<br/>买家：' + index.row.buyNickName +
        '<br/><p style="color:red">该操作危险，请任意输入口令确认</p>', '重置订单操作', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value) {
          this.$message({
            message: '操作失败，未输入口令！',
            type: 'warning'
          })
          return false
        }
        return api.RestOrder(index.row.goodsId).then(ret => {
          this.doRefresh()
        })
      }).catch(() => {
      })
    },
    handleWeituo (index) {
      this.rowData = index.row
      this.dialogFormVisible = true
    },
    zzblChange (value) {
      this.rowData.weituoPrice = (this.rowData.goodsPrice + (this.rowData.goodsPrice * (value / 100))).toFixed(2)
    },
    weituoSave () {
      return api.WeituoOrder(this.rowData.goodsId, this.rowData.weituoPrice).then(ret => {
        this.dialogFormVisible = false
        this.doRefresh()
      })
    },
    handleCollectedPay (row) {
      this.$confirm('确定已收款吗？', '收款', {
        type: 'warning'
      }).then(() => {
        return api.CollectedPay(row.goodsId).then(ret => {
          this.doRefresh()
        })
      }).then(() => {
      }).catch(() => {})
    }
  }
}
</script>
