<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header"></template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                @termList="termListHandle"
                @recharge="rechargeHandle"
                @walletBill="walletBillHandle"
                @flowing="flowingHandle"
                @paymentInfo="paymentInfoHandle"
                @inviter="inviterHandle"
                @setVip="setVipHandle"
                @resetPassword="resetPasswordHandle"
                @addr="addrHandle"
                v-on="_crudListeners">
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch">
                  <template slot="nickNameSearchSlot" slot-scope="scope">
                    <el-input placeholder="昵称" v-model="scope.form.nickName"></el-input>
                  </template>
                  <template slot="phoneSearchSlot" slot-scope="scope">
                    <el-input placeholder="手机号" v-model="scope.form.phone"></el-input>
                  </template>
                </crud-search>
                <el-button v-permission="'pk:user:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <span slot="PaginationPrefixSlot" class="prefix" >
                <el-button v-permission="'pk:user:delete'" class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
            </span>
            <template slot="tuiUserCodeSlot" slot-scope="scope" v-if="scope.row['tuiUserCode']">
              <img :src="scope.row.tuiUserLogo"/><br/>
              会员编号：{{scope.row['tuiUserCode']}}<br/>
              微信昵称：{{scope.row['tuiNickName']}}
            </template>
            <template slot="tui1UserCodeSlot" slot-scope="scope" v-if="scope.row['tui1UserCode']">
              <img :src="scope.row.tui1UserLogo"/><br/>
              会员编号：{{scope.row['tui1UserCode']}}<br/>
              微信昵称：{{scope.row['tui1NickName']}}
            </template>
            <template slot="tui2UserCodeSlot" slot-scope="scope" v-if="scope.row['tui2UserCode']">
              <img :src="scope.row.tui2UserLogo"/><br/>
              会员编号：{{scope.row['tui2UserCode']}}<br/>
              微信昵称：{{scope.row['tui2NickName']}}
            </template>
            <template slot="tuiUserCodeFormSlot" slot-scope="scope" v-if="scope.form['tuiUserCode']">
              <img :src="scope.form.tuiUserLogo"/><br/>
              会员编号：{{scope.form['tuiUserCode']}}<br/>
              微信昵称：{{scope.form['tuiNickName']}}
            </template>
            <template slot="tui1UserCodeFormSlot" slot-scope="scope"  v-if="scope.form['tui1UserCode']">
              <img :src="scope.form.tui1UserLogo"/><br/>
              会员编号：{{scope.form['tui1UserCode']}}<br/>
              微信昵称：{{scope.form['tui1NickName']}}
            </template>
            <template slot="tui2UserCodeFormSlot" slot-scope="scope"  v-if="scope.form['tui2UserCode']">
              <img :src="scope.form.tui2UserLogo"/><br/>
              会员编号：{{scope.form['tui2UserCode']}}<br/>
              微信昵称：{{scope.form['tui2NickName']}}
            </template>
        </d2-crud-x>
        <el-dialog :title="subTitle" :visible.sync="dialogVisible">
          <sub-table :queryType="queryType" :nickName="nickName" ref="subTableRef" :userCode="userCode" @selectData='callbackSub'></sub-table>
          <div slot="footer">
            <el-button @click="handleCleanInviter" v-if="queryType === 2">设置为无邀请人</el-button>
            <el-button @click="handleDialogCancel"  v-if="queryType === 2">设置选定行为邀请人</el-button>
          </div>
        </el-dialog>
        <el-dialog title="钱包记录" :visible.sync="walletTableVisble">
          <wallet-bill-table :nickName="nickName" ref="walletTableRef" :userCode="userCode" ></wallet-bill-table>
        </el-dialog>
        <el-dialog title="流水查询" :visible.sync="flowingVisble">
          <flowing :nickName="nickName" ref="flowingRef" :userCode="userCode" ></flowing>
        </el-dialog>
        <el-dialog title="收款信息" :visible.sync="paymentInfoVisble">
          <payment :nickName="nickName" ref="paymentInfoRef" :userCode="userCode" ></payment>
        </el-dialog>
        <el-dialog title="设置VIP" :visible.sync="setVipVisble">
          <set-vip :nickName="nickName" ref="walletTableRef" :userCode="userCode" ></set-vip>
        </el-dialog>
        <el-dialog title="收获地址" :visible.sync="addrVisble">
          <addr ref="addrRef" :userCode="userCode" ></addr>
        </el-dialog>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import subTable from './subTable'
import walletBillTable from './walletBillTable'
import flowing from './flowing'
import payment from './payment'
import setVip from './setVip'
import addr from './addr'
import * as api from './api'
export default {
  name: 'PkUser',
  mixins: [d2CrudPlus.crud],
  components: { subTable, walletBillTable, flowing, payment, setVip, addr },
  data () {
    return {
      subTitle: undefined,
      nickName: undefined,
      userCode: undefined,
      queryType: 1,
      dialogVisible: false,
      walletTableVisble: false,
      addrVisble: false,
      flowingVisble: false,
      paymentInfoVisble: false,
      setVipVisble: false
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
      return api.DelObj(row.userId)
    },
    batchDelRequest (ids) {
      return api.DelObj(ids)
    },
    infoRequest (row) {
      return api.GetObj(row.id)
    },
    termListHandle (index) {
      this.subTitle = '粉丝列表'
      this.nickName = index.row.nickName
      this.userCode = index.row.userCode
      this.queryType = 1
      // this.$set(this, 'userCode', index.row.userCode)
      // this.$set(this, 'nickName', index.row.nickName)
      this.dialogVisible = true
      // this.$nextTick(() => {
      //   this.$refs.subTableRef.crud.searchOptions.form.userCode = this.userCode
      //   this.$refs.subTableRef.doRefresh()
      // })
    },
    rechargeHandle (index) {
      this.$prompt('请填写充值金额', '充值操作', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{0,8}\.{0,1}(\d{1,2})?$/,
        inputErrorMessage: '请填写正确的充值金额数目，最多保留两位小数'
      }).then(({ value }) => {
        if (!value) {
          this.$message({
            message: '操作失败，未输入充值金额！',
            type: 'warning'
          })
          return false
        }
        return api.Recharge(index.row.userCode, value).then(ret => {
          this.doRefresh()
        })
      }).catch(() => {
      })
    },
    doCellDataChange (event) {
      const row = event.row
      let value = 0
      if (row[event.key]) {
        value = 1
      }
      return api.UpdateRowField(row.userCode, value, event.key)
    },
    walletBillHandle (index) {
      this.nickName = index.row.nickName
      this.userCode = index.row.userCode
      this.walletTableVisble = true
    },
    addrHandle (index) {
      this.userCode = index.row.userCode
      this.addrVisble = true
    },
    flowingHandle (index) {
      this.nickName = index.row.nickName
      this.userCode = index.row.userCode
      this.flowingVisble = true
    },
    inviterHandle (index) {
      this.subTitle = '变更邀请人'
      this.nickName = index.row.nickName
      this.userCode = index.row.userCode
      this.queryType = 2
      this.dialogVisible = true
    },
    setVipHandle (index) {
      this.nickName = index.row.nickName
      this.userCode = index.row.userCode
      this.setVipVisble = true
    },
    resetPasswordHandle (index) {
      this.$prompt('重置用户密码，若不填写，默认密码为888888', '充值密码', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /(^$)|(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~?!@#$%^&*()]{6,20}$/,
        inputErrorMessage: '至少包含数字跟字母，可以有字符，长度6-20'
      }).then(({ value }) => {
        if (!value) {
          value = '888888'
        }
        return api.ResetPassword(index.row.userCode, value).then(ret => {
          this.doRefresh()
        })
      }).catch(() => {
      })
    },
    paymentInfoHandle (index) {
      this.nickName = index.row.nickName
      this.userCode = index.row.userCode
      this.paymentInfoVisble = true
    },
    callbackSub (param, param2) {
      this.selectedUserCode = param
      this.selectedNickName = param2
    },
    handleCleanInviter () {
      this.$confirm('确定要设置为无邀请人吗？', '设置为无邀请人', {
        type: 'warning'
      }).then(() => {
        return api.UpdateInviter(this.userCode, '', 1).then(ret => {
          this.dialogVisible = false
          this.$message({
            message: '设置为无邀请人成功！',
            type: 'success'
          })
          this.doRefresh()
        })
      }).then(() => {
      }).catch(() => {})
    },
    handleDialogCancel () {
      if (this.queryType === 2) {
        if (this.selectedUserCode === this.userCode) {
          this.$message({
            message: '不能将邀请人变更为自己！',
            type: 'warning'
          })
          return
        }
        this.$confirm('确定要变更邀请人为（' + this.selectedNickName + '）吗？', '变更邀请人', {
          type: 'warning'
        }).then(() => {
          return api.UpdateInviter(this.userCode, this.selectedUserCode, 0).then(ret => {
            this.dialogVisible = false
            this.$message({
              message: '变更成功！',
              type: 'success'
            })
            this.doRefresh()
          })
        }).then(() => {
        }).catch(() => {})
      } else {
        this.dialogVisible = false
      }
    }
  }
}
</script>
