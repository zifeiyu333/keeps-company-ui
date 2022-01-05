<template>
  <d2-container  >
    <template slot="header">应用相关配置
    </template>
    <el-form ref="form" :model="form" :rules="dataRule" label-width="120px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            微信公众号设置
            <el-button icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
            <el-button type="primary" icon="el-icon-success" @click="onSubmitGongzhong">保存</el-button>
          </span>
        </div>
        <el-form-item label="名称" prop="gzhName">
          <el-input v-model="form.gzhName"></el-input>
        </el-form-item>
        <el-form-item label="商户号" prop="mchId">
          <el-input v-model="form.mchId"></el-input>
        </el-form-item>
        <el-form-item label="ApiKey" prop="apiKey">
          <el-input v-model="form.apiKey"></el-input>
        </el-form-item>
        <el-form-item label="AppKey" prop="appKey">
          <el-input v-model="form.appKey"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret" prop="appSecret">
          <el-input v-model="form.appSecret"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
    <el-form ref="weituoForm" :model="weituoForm" :rules="dataWeituoRule" label-width="200px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            委托设置
            <el-button icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
            <el-button type="primary" icon="el-icon-success" @click="onSubmitWeituo">保存</el-button>
          </span>
        </div>
        <el-form-item label="商品限购数（上午）" prop="xianggouNum">
          <el-input-number v-model="weituoForm.xianggouNum" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="商品限购数（下午）" prop="xianggouNum2">
          <el-input-number v-model="weituoForm.xianggouNum2" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="自动确认收款时间（分钟）" prop="autoShoukuanMiao">
          <el-input-number v-model="weituoForm.autoShoukuanMiao" :min="0" :max="999999" label="分钟" style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="公司账户码" prop="companyAlipayUserid">
          <el-input-number v-model="weituoForm.companyAlipayUserid" label="公司支付宝账户用户ID" style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="商品支付到" prop="goodsPayto">
          <el-radio-group v-model="weituoForm.goodsPayto">
            <el-radio :label="0">公司对公</el-radio>
            <el-radio :label="1">个人码</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="委托费支付到" prop="weituofeiPayto">
          <el-radio-group v-model="weituoForm.weituofeiPayto">
            <el-radio :label="0">公司</el-radio>
            <el-radio :label="1">个人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付起始时间" prop="paytoStartTimeStr">
          <el-time-picker value-format="HH:mm:ss"
            v-model="weituoForm.paytoStartTimeStr">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="支付截至时间" prop="paytoEndTimeStr">
          <el-time-picker value-format="HH:mm:ss"
            v-model="weituoForm.paytoEndTimeStr">
          </el-time-picker>
        </el-form-item>
      </el-card>
    </el-form>
    <el-form ref="fenxiaoForm" :model="fenxiaoForm" :rules="dataFenxiaoRule" label-width="200px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            分销设置
            <el-button icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
            <el-button type="primary" icon="el-icon-success" @click="onSubmitFenxiao">保存</el-button>
          </span>
        </div>
        <el-form-item label="推荐人" prop="isMustTui">
          <el-radio-group v-model="fenxiaoForm.isMustTui">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">必须有推荐人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分销级别" prop="fenxiaoJibie">
          <el-radio-group v-model="fenxiaoForm.fenxiaoJibie">
            <el-radio :label="0">不分销</el-radio>
            <el-radio :label="1">一级</el-radio>
            <el-radio :label="2">二级</el-radio>
            <el-radio :label="3">三级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联创分佣" prop="isLianchuangFenyong">
          <el-radio-group v-model="fenxiaoForm.isLianchuangFenyong">
            <el-radio :label="0">不分佣</el-radio>
            <el-radio :label="1">分佣</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分佣方式" prop="isBilv">
          <el-radio-group v-model="fenxiaoForm.isBilv">
            <el-radio :label="0">比率</el-radio>
            <el-radio :label="1">现金</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分佣配置" v-if="fenxiaoForm.fenxiaoJibie > 0 && fenxiaoForm.isBilv === 0">
            <el-col :span="6" v-if="fenxiaoForm.isLianchuangFenyong === 1">
              <el-input-number v-model="fenxiaoForm.bilv" :min="0" :max="1000" :precision="3" style="width:180px">
              </el-input-number>
              <el-tag>联创佣金（‰）</el-tag>
            </el-col>
            <el-col :span="6" v-if="fenxiaoForm.fenxiaoJibie > 0">
              <el-input-number type="number" v-model="fenxiaoForm.bilv1" :min="0" :max="1000" :precision="3" style="width:180px">
              </el-input-number>
              <el-tag>一级佣金（‰）</el-tag>
            </el-col>
            <el-col :span="6" v-if="fenxiaoForm.fenxiaoJibie > 1">
              <el-input-number type="number" v-model="fenxiaoForm.bilv2"  :min="0" :max="1000" :precision="3" style="width:180px">
              </el-input-number>
              <el-tag>二级佣金（‰）</el-tag>
            </el-col>
            <el-col :span="6" v-if="fenxiaoForm.fenxiaoJibie > 2">
              <el-input-number type="number" v-model="fenxiaoForm.bilv3"  :min="0" :max="1000" :precision="3" style="width:180px">
              </el-input-number>
              <el-tag>三级佣金（‰）</el-tag>
            </el-col>
        </el-form-item>
        <el-form-item label="分佣配置" v-if="fenxiaoForm.fenxiaoJibie > 0 && fenxiaoForm.isBilv === 1">
            <el-col :span="6" v-if="fenxiaoForm.isLianchuangFenyong === 1">
              <el-input-number v-model="fenxiaoForm.yuan" :min="0" :max="999999999" :precision="2" style="width:180px">
              </el-input-number>
              <el-tag>联创佣金（元）</el-tag>
            </el-col>
            <el-col :span="6" v-if="fenxiaoForm.fenxiaoJibie > 0">
              <el-input-number type="number" v-model="fenxiaoForm.yuan1" :min="0" :max="999999999" :precision="2" style="width:180px">
              </el-input-number>
              <el-tag>一级佣金（元）</el-tag>
            </el-col>
            <el-col :span="6" v-if="fenxiaoForm.fenxiaoJibie > 1">
              <el-input-number type="number" v-model="fenxiaoForm.yuan2"  :min="0" :max="999999999" :precision="2" style="width:180px">
              </el-input-number>
              <el-tag>二级佣金（元）</el-tag>
            </el-col>
            <el-col :span="6" v-if="fenxiaoForm.fenxiaoJibie > 2">
              <el-input-number type="number" v-model="fenxiaoForm.yuan3"  :min="0" :max="999999999" :precision="2" style="width:180px">
              </el-input-number>
              <el-tag>三级佣金（元）</el-tag>
            </el-col>
        </el-form-item>
        <el-form-item label="最低提现" prop="zuidiTixian">
          <el-input-number v-model="fenxiaoForm.zuidiTixian" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="提现手续费率（‰）" prop="tixianShouxufei">
          <el-input-number v-model="fenxiaoForm.tixianShouxufei" :min="0" :max="1000" :precision="3" label="0表示无手续费" style="width:300px"></el-input-number>
        </el-form-item>
      </el-card>
    </el-form>
    <!-- <el-form ref="weituoForm" :model="weituoForm" :rules="dataWeituoRule" label-width="200px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            标题和分享设置
            <el-button icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
            <el-button type="primary" icon="el-icon-success" @click="onSubmit">保存</el-button>
          </span>
        </div>
        <el-form-item label="首页标题" prop="xianggouNum">
          <el-input v-model="weituoForm.xianggouNum" label="0表示不限制"></el-input>
        </el-form-item>
        <el-form-item label="分享标题" prop="xianggouNum2">
          <el-input v-model="weituoForm.xianggouNum2" label="0表示不限制"></el-input>
        </el-form-item>
        <el-form-item label="分享描述" prop="autoShoukuanMiao">
          <el-input v-model="weituoForm.autoShoukuanMiao" label="分钟"></el-input>
        </el-form-item>
      </el-card>
    </el-form> -->
  </d2-container>
</template>

<script>
// import dayjs from 'dayjs'
import * as api from './api'
export default {
  name: 'PkAppmy',
  data () {
    return {
      form: {
        myAppId: 0,
        gzhName: '',
        gzhCode: '',
        mchId: '',
        apiKey: '',
        appKey: '',
        appSecret: ''
      },
      weituoForm: {
        myAppId: 0,
        xianggouNum: 0,
        xianggouNum2: 0,
        autoShoukuanMiao: 0,
        autoShouHuoMiao: 0,
        companyAlipayUserid: '',
        goodsPayto: 0,
        weituofeiPayto: 0,
        paytoStartTime: 0,
        paytoEndTime: 0
      },
      fenxiaoForm: {
        myAppId: 0,
        isMustTui: 0,
        fenxiaoJibie: 0,
        isLianchuangFenyong: 0,
        isBilv: 0,
        yuan: 0,
        yuan1: 0,
        yuan2: 0,
        yuan3: 0,
        bilv: 0,
        bilv1: 0,
        bilv2: 0,
        bilv3: 0,
        zuidiTixian: 0,
        tixianShouxufei: 0
      },
      dataRule: {
        gzhName: [{ required: true, message: '公众号名称不能为空', trigger: 'blur' }],
        mchId: [{ required: true, message: '商户号不能为空', trigger: 'blur' }],
        apiKey: [{ required: true, message: 'ApiKey不能为空', trigger: 'blur' }],
        appKey: [{ required: true, message: 'AppKey不能为空', trigger: 'blur' }],
        appSecret: [{ required: true, message: 'AppSecret不能为空', trigger: 'blur' }]
      },
      dataWeituoRule: {
        xianggouNum: [{ required: true, message: '限购商品数（上午）不能为空', trigger: 'blur' }],
        xianggouNum2: [{ required: true, message: '限购商品数（下午）不能为空', trigger: 'blur' }],
        autoShoukuanMiao: [{ required: true, message: '自动确认收款时间不能为空', trigger: 'blur' }],
        companyAlipayUserid: [{ required: true, message: '公司账户码不能为空', trigger: 'blur' }],
        paytoStartTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        paytoEndTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }]
      },
      dataFenxiaoRule: {
        bilvRule: [{ required: true, message: '分佣比率不能为空', trigger: 'blur' }],
        yuanRule: [{ required: true, message: '分佣金额不能为空', trigger: 'blur' }],
        zuidiTixian: [{ required: true, message: '最低提现金额不能为空', trigger: 'blur' }],
        tixianShouxufei: [{ required: true, message: '提现手续费率不能为空', trigger: 'blur' }]
      },
      cascadeElProps: {
        showAllLevels: false, // 仅显示最后一级
        props: {
          checkStrictly: true, // 可以不需要选到最后一级
          emitPath: false
        }
      },
      dictData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据列表
    getData () {
      api.GetObj('58').then(ret => {
        this.form = {
          myAppId: ret.data.myAppId,
          gzhName: ret.data.gzhName,
          gzhCode: ret.data.gzhCode,
          mchId: ret.data.mchId,
          apiKey: ret.data.apiKey,
          appKey: ret.data.appKey,
          appSecret: ret.data.appSecret
        }
        this.weituoForm = {
          myAppId: ret.data.myAppId,
          xianggouNum: ret.data.xianggouNum,
          xianggouNum2: ret.data.xianggouNum2,
          autoShoukuanMiao: ret.data.autoShoukuanMiao,
          autoShouHuoMiao: ret.data.autoShouHuoMiao,
          companyAlipayUserid: ret.data.companyAlipayUserid,
          goodsPayto: ret.data.goodsPayto,
          weituofeiPayto: ret.data.weituofeiPayto,
          paytoStartTimeStr: ret.data.paytoStartTimeStr,
          paytoEndTimeStr: ret.data.paytoEndTimeStr
        }
        this.fenxiaoForm = {
          myAppId: ret.data.myAppId,
          isMustTui: ret.data.isMustTui,
          fenxiaoJibie: ret.data.fenxiaoJibie,
          isLianchuangFenyong: ret.data.isLianchuangFenyong,
          isBilv: ret.data.isBilv,
          yuan: ret.data.yuan,
          yuan1: ret.data.yuan1,
          yuan2: ret.data.yuan2,
          yuan3: ret.data.yuan3,
          bilv: ret.data.bilv,
          bilv1: ret.data.bilv1,
          bilv2: ret.data.bilv2,
          bilv3: ret.data.bilv3,
          zuidiTixian: ret.data.zuidiTixian,
          tixianShouxufei: ret.data.tixianShouxufei
        }
      })
    },
    onSubmitGongzhong () {
      api.UpdateObj(this.form).then(ret => {
        if (ret.code === 200) {
          this.$message.success(ret.msg)
        } else {
          this.$message.error(ret.msg)
        }
      })
    },
    onSubmitWeituo () {
      api.UpdateObj(this.weituoForm).then(ret => {
        if (ret.code === 200) {
          this.$message.success(ret.msg)
        } else {
          this.$message.error(ret.msg)
        }
      })
    },
    onSubmitFenxiao () {
      api.UpdateObj(this.fenxiaoForm).then(ret => {
        if (ret.code === 200) {
          this.$message.success(ret.msg)
        } else {
          this.$message.error(ret.msg)
        }
      })
    },
    onRefresh () {
      this.getData()
    }
  }
}
</script>
