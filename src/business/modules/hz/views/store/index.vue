<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">门店信息</template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                @custom-update='updateHandle'
                v-on="_crudListeners">
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  >
                  <template slot="storeSnSearchSlot" slot-scope="scope">
                    <el-form-item label="">
                      <el-input v-model="scope.form['storeSn']" placeholder="店铺编号/名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="">
                      <el-cascader
                        v-model="scope.form['locationAddress']"
                        ref="cascaderAddr"
                        class="dialogWidth"
                        clearable
                        :options="addresData"></el-cascader>
                    </el-form-item>
                  </template>
                </crud-search>
                <el-button v-permission="'hz:store:add'" size="small" type="primary" @click="addHandle()"><i class="el-icon-plus"/> 新增</el-button>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <span slot="PaginationPrefixSlot" class="prefix" >
                <el-button v-permission="'hz:store:delete'" class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <template slot="storeSnSlot" slot-scope="scope">
              店铺名：{{scope.row['storeName']}}<br/>
              编号：{{scope.row['storeSn']}}
            </template>
            <template slot="storeInfoSlot" slot-scope="scope" label="基本信息">
              <div class="gridPic">
                <el-image :lazy="true" :src="scope.row['storeLogo']" :preview-src-list="[scope.row['storeLogo']]"> </el-image>
              </div><br/>
              联系人：{{scope.row['contactName']}}<br/>
              电话：{{scope.row['contactPhone']}}<br/>
              营业时间：{{scope.row['businessHours']}}<br/>
              均价：{{scope.row['averagePrice']}}<br/>
              折扣额度：{{scope.row['discountRate']}}
            </template>
            <template slot="personInfoSlot" slot-scope="scope">
              <div class="gridPic" v-if="scope.row['personAvatar']">
                <el-image :lazy="true" :src="scope.row['avatar']" :preview-src-list="[scope.row['personAvatar']]"> </el-image>
              </div><br/>
              姓名：{{scope.row['personRealName']}}<br/>
              手机号：{{scope.row['personPhone']}}
            </template>
            <template slot="certificationInformationSlot" slot-scope="scope">
              <div class="gridPic" v-if="scope.row['idCardFront']">
                <el-image :lazy="true" :src="scope.row['idCardFront']" :preview-src-list="[scope.row['idCardFront']]"> </el-image>
                <el-image :lazy="true" :src="scope.row['idCardReverse']" :preview-src-list="[scope.row['idCardReverse']]"> </el-image>
                <el-image :lazy="true" :src="scope.row['businessLicense']" :preview-src-list="[scope.row['businessLicense']]"> </el-image>
              </div><br/>
              法人姓名：{{scope.row['legalRealName']}}<br/>
              手机号：{{scope.row['legalPhone']}}
            </template>
        </d2-crud-x>
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" ></add-or-update>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
import city from '@/business/utils/city'
import AddOrUpdate from './insertOrUpdate'
export default {
  name: 'HzStore',
  mixins: [d2CrudPlus.crud],
  components: { AddOrUpdate },
  data () {
    return {
      addresData: [],
      addOrUpdateVisible: false
    }
  },
  created () {
    this.addresData = city
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    },
    addHandle () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(null)
      })
    },
    updateHandle (index) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(index.row.id)
      })
    },
    delRequest (row) {
      return api.DelObj(row.storeSn)
    },
    infoRequest (row) {
      return api.GetObj(row.id)
    },
    paymentInfoHandle (index) {
      this.insertOrUpdateVisble = true
    }
  }
}
</script>

<style lang="scss">
.gridPic{
  width: 110px;
  height: 110px;
  cursor: pointer;
  position:relative;
  display:inline-block;
  padding:5px;
  // border:1px solid #d1dbe5;
  border-radius:4px;
  transition:all .3s;
  // box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
