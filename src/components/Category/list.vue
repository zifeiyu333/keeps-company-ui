<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
                <el-button v-permission="'sys:category:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <span slot="PaginationPrefixSlot" class="prefix" >
              <el-button v-permission="'sys:category:delete'" class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <template slot="extraFormSlot" slot-scope="scope">
              <div class="upLoadPicBox" @click="modalPicTap(scope.form)">
                <div v-if="scope.form.extra" class="pictrue"><img :src="scope.form.extra"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </template>
        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from '@/api/sysCategoryApi'
export default {
  name: 'SysCategory',
  mixins: [d2CrudPlus.crud],
  props: {
    biztype: { // 1 产品分类，2 附件分类，3 文章分类， 4 设置分类， 5 菜单分类， 6 配置分类， 7 秒杀配置， 8 门店分类
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: { value: -1 },
      validator: (obj) => {
        return obj.value > 0
      }
    },
    pid: {
      type: Number,
      default: 0,
      validator: (value) => {
        return value >= 0
      }
    },
    selectModel: { // 是否选择模式
      type: Boolean,
      default: false
    },
    // selectModelKeys: {
    //   type: String
    // },
    selectModelKeys: {
      type: Array
    },
    rowSelect: {}
  },
  data () {
    return {}
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    async pageRequest (query) {
      query.type = this.biztype.value
      const ret = await api.GetTree(query)
      // 请至少保证有一列没有设置固定宽度，否则也会有错位问题
      // 修复合计行错位问题
      this.$nextTick(async () => { // 这里要异步执行
        // await this.$nextTick() //如果一次nextTick不行，那就两次
        this.getD2CrudTable().store.scheduleLayout()
      }) // 等待加载完成后触发重排布局
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
      row.type = this.biztype.value
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    batchDelRequest (ids) {
      return api.DelObj(ids)
    },
    infoRequest (row) {
      return api.GetObj(row.id)
    },
    // 点击商品图
    modalPicTap (row) {
      this.$modalUpload(function (img) {
        row.extra = img[0].fileUrl
      }, '2', 'store')
    }
  }
}
</script>
