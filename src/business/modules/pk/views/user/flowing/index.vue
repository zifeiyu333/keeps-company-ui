<template>
  <div >
    <div>当前选择会员：<span class="current_selected"><el-tag>{{nickName}}</el-tag><el-tag>{{userCode}}</el-tag></span></div>
    <br/>
    <el-form ref="form" label-width="120px">
      <el-card class="box-card">
        <el-form-item label="起始时间：">
            <el-col :span="12">
              <el-date-picker
                v-model="dateTimes"
                type="daterange"
                align="right"
                unlink-panels
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" @click="getFlowing()">查询</el-button>
            </el-col>
        </el-form-item>
        <el-form-item label="查询结果：">
            <el-col :span="6">
              <el-tag>总流水：{{sumAmount}}</el-tag>
            </el-col>
            <el-col :span="6">
              <el-tag>总订单：{{countNum}}</el-tag>
            </el-col>
            <el-col :span="6">
              <el-tag>已交易会员：{{isNewBuyNum}}</el-tag>
            </el-col>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { GetFlowing } from './api'
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
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dateTimes: '',
      sumAmount: 0,
      countNum: 0,
      isNewBuyNum: 0
    }
  },
  watch: {
    userCode: {
      handler (newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.clear()
        }
      },
      deep: true
    }
  },
  created () {
  },
  methods: {
    // 获取数据列表
    clear () {
      this.sumAmount = 0
      this.countNum = 0
      this.isNewBuyNum = 0
    },
    getFlowing () {
      GetFlowing(this.userCode, dayjs(this.dateTimes[0]).format('YYYY-MM-DD'), dayjs(this.dateTimes[1]).format('YYYY-MM-DD')).then(ret => {
        if (ret.code === 200) {
          this.sumAmount = ret.data.sumAmount
          this.countNum = ret.data.countNum
          this.isNewBuyNum = ret.data.isNewBuyNum
        } else {
          this.$message.error(ret.msg)
        }
      })
    }
  }
}
</script>
