<template>
  <div >
    <div>当前选择会员：<span class="current_selected"><el-tag>{{nickName}}</el-tag><el-tag>{{userCode}}</el-tag></span></div>
    <br/>
    <el-form ref="form" :model="form" :rules="dataRule" label-width="120px">
      <el-card class="box-card">
        <el-form-item label="支付宝授权码：">
          <el-tag v-if="form.alipayId">{{form.alipayId}}</el-tag>
          <el-tag v-else>无</el-tag>
          <el-button type="text" v-if="form.alipayId" @click="clear(1)">清除</el-button>
        </el-form-item>
      </el-card><br/>
      <el-card class="box-card" :body-style="{ padding: '10px' }">
        <el-form-item label="银行卡信息">
          <el-tag v-if="!form.bankName">无</el-tag>
          <el-button type="text" v-if="form.bankName" @click="clear(4)">清除</el-button>
        </el-form-item>
        <el-form-item label="姓名" v-if="form.bankName">
          <el-tag>{{form.bankName}}</el-tag>
        </el-form-item>
        <el-form-item label="预留手机号" v-if="form.bankPhone">
          <el-tag>{{form.bankPhone}}</el-tag>
        </el-form-item>
        <el-form-item label="卡号" v-if="form.bankNum">
          <el-tag>{{form.bankNum}}</el-tag>
        </el-form-item>
        <el-form-item label="开户行" v-if="form.bankKaihuhang">
          <el-tag>{{form.bankKaihuhang}}</el-tag>
        </el-form-item>
      </el-card><br/>
      <el-row>
        <el-col :span="10" :offset="0">
          <el-card>
            <div>
              <el-form-item label="支付宝收款码：">
                <el-button type="text" class="button" v-if="form.qrAlipay" @click="clear(2)">清除</el-button>
                <el-tag v-else>无</el-tag>
              </el-form-item>
            </div>
            <img :src="form.qrAlipay" class="image" style="width: 100%;" v-if="form.qrAlipay">
          </el-card>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-card>
            <div>
              <el-form-item label="微信收款码：">
                <el-button type="text" class="button" v-if="form.qrWeixin" @click="clear(3)">清除</el-button>
                <el-tag v-else>无</el-tag>
              </el-form-item>
            </div>
            <img :src="form.qrWeixin" class="image" style="width: 100%;" v-if="form.qrWeixin">
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// import dayjs from 'dayjs'
import { GetObj, ClearPayment } from './api'
export default {
  name: 'PkPayment',
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
      currentDate: new Date(),
      domainUrl: process.env.VUE_APP_DOMAIN_URL,
      form: {
        alipayId: '',
        qrAlipay: '',
        qrWeixin: '',
        bankName: '',
        bankPhone: '',
        bankNum: '',
        bankKaihuhang: ''
      },
      dataRule: {
      },
      dictData: []
    }
  },
  watch: {
    userCode: {
      handler (newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.getData()
        }
      },
      deep: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据列表
    getData () {
      GetObj(this.userCode).then(ret => {
        this.form = {
          alipayId: ret.data.alipayId,
          qrAlipay: ret.data.qrAlipay,
          qrWeixin: ret.data.qrWeixin,
          bankName: ret.data.bankName,
          bankPhone: ret.data.bankPhone,
          bankNum: ret.data.bankNum,
          bankKaihuhang: ret.data.bankKaihuhang
        }
      })
    },
    clear (type) {
      this.$confirm('确定要清除用户的该收款方式吗？', '设置VIP', {
        type: 'warning'
      }).then(() => {
        ClearPayment(type, this.userCode).then(ret => {
          if (ret.code === 200) {
            switch (type) {
              case 1:
                this.form.alipayId = ''
                break
              case 2:
                this.form.qrAlipay = ''
                break
              case 3:
                this.form.qrWeixin = ''
                break
              case 4:
                this.form.bankName = ''
                this.form.bankPhone = ''
                this.form.bankNum = ''
                this.form.bankKaihuhang = ''
                break
            }
            this.$message.success(ret.msg)
          } else {
            this.$message.error(ret.msg)
          }
        })
      }).then(() => {
      }).catch(() => {})
    }
  }
}
</script>
