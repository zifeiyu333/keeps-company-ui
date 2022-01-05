<template>
  <div >
    <div>当前选择会员：<span class="current_selected"><el-tag>{{nickName}}</el-tag><el-tag>{{userCode}}</el-tag></span></div>
    <br/>
    <el-form ref="form" :model="form" :rules="dataRule" label-width="200px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <el-button icon="el-icon-refresh" @click="getData()">刷新</el-button>
            <el-button type="primary" icon="el-icon-success" @click="onSubmit">保存</el-button>
          </span>
        </div>
        <el-form-item label="是否VIP" prop="xianggouNum">
          <el-switch
            v-model="form.isVip"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
        <div v-if="form.isVip === 1">
          <el-form-item label="有效天数" prop="vipDaoqiTime">
            <el-input-number v-model="form.vipDaoqiTime" :min="0" :max="999999999" style="width:300px"></el-input-number>
            <el-tag>从第二天0点起算天数</el-tag>
          </el-form-item>
          <el-form-item label="提前抢购分钟（上午）" prop="tiqianMiao">
            <el-input-number v-model="form.tiqianMiao" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
          </el-form-item>
          <el-form-item label="提前抢购分钟（下午）" prop="tiqianMiao2">
            <el-input-number v-model="form.tiqianMiao2" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
          </el-form-item>
          <el-form-item label="抢购数量（上午）" prop="qiangNum">
            <el-input-number v-model="form.qiangNum" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
            <el-tag>0表示不限制</el-tag>
          </el-form-item>
          <el-form-item label="抢购数量（下午）" prop="qiangNum2">
            <el-input-number v-model="form.qiangNum2" :min="0" :max="999999" label="0表示不限制" style="width:300px"></el-input-number>
            <el-tag>0表示不限制</el-tag>
          </el-form-item>
        </div>
      </el-card>
    </el-form>
  </div>
</template>
<script>
// import dayjs from 'dayjs'
import { GetObj, UpdateVipObj } from './api'
export default {
  name: 'PkSetVip',
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
      form: {
        isVip: 0,
        vipDaoqiTime: 0,
        tiqianMiao: 0,
        tiqianMiao2: 0,
        qiangNum: 0,
        qiangNum2: 0
      },
      dataRule: {
        vipDaoqiTime: [{ required: true, message: 'VIP到期时间不能为空', trigger: 'blur' }],
        tiqianMiao: [{ required: true, message: '提前抢购时间（上午）不能为空', trigger: 'blur' }],
        tiqianMiao2: [{ required: true, message: '提前抢购时间（下午）不能为空', trigger: 'blur' }],
        qiangNum: [{ required: true, message: '抢购数量（上午）不能为空', trigger: 'blur' }],
        qiangNum2: [{ required: true, message: '抢购数量（下午）不能为空', trigger: 'blur' }]
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
          isVip: ret.data.isVip,
          vipDaoqiTime: ret.data.vipDaoqiTime,
          tiqianMiao: ret.data.tiqianMiao,
          tiqianMiao2: ret.data.tiqianMiao2,
          qiangNum: ret.data.qiangNum,
          qiangNum2: ret.data.qiangNum2
        }
      })
    },
    onSubmit () {
      this.$confirm('确定要保存吗？', '设置VIP', {
        type: 'warning'
      }).then(() => {
        UpdateVipObj(this.form, this.userCode).then(ret => {
          if (ret.code === 200) {
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
