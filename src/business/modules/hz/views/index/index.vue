<template>
  <d2-container class='page'>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="bg-Warning b-radius b-shadow">
          <div class="tap-content">
            <i class="el-icon-s-marketing"></i>
            <div class="tap-title" style="display:flex; width:300px;">
              <div style="flex:1;text-align:center;">
                <p>当前在线人数</p>
                <p style="cursor:pointer" @click="showOnline">{{statisticsData.countOnline}}人</p>
              </div>
              <div style="flex:1;text-align:center;">
                <p>今日抢到人数</p>
                <p>{{statisticsData.qiangCountPerson}}人</p>
              </div>
              <div style="flex:1;text-align:center;">
                <p>总人数</p>
                <p>{{statisticsData.countPerson}}人</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg-info b-radius b-shadow">
          <div class="tap-content">
            <i class="el-icon-s-order"></i>
            <div class="tap-title" style="display:flex; width:300px;">
                <div style="flex:1;text-align:center;">
                    <p>未购</p>
                    <p>{{statisticsData.notBuyNum}}人</p>
                </div>
                <div style="flex:1;text-align:center;">
                    <p>首购</p>
                    <p>{{statisticsData.oneBuyNum}}人</p>
                </div>
                <div style="flex:1;text-align:center;">
                    <p>复购</p>
                    <p>{{statisticsData.fuBuyNum}}人</p>
                </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg-info2 b-radius b-shadow">
          <div class="tap-content">
            <i class="el-icon-s-data"></i>
            <div class="tap-title" style="display:flex; width:300px;">
              <div style="flex:1;text-align:center;">
                <p>今日订单数</p>
                <p>{{statisticsData.toDayGoodsWeituoNum}}个</p>
              </div>
              <div style="flex:1;text-align:center;">
                <p>今日订单额</p>
                <p>{{statisticsData.toDayStatisticsOrderVo.orderAmount}}元</p>
              </div>
              <div style="flex:1;text-align:center;">
                <p>今日手续费</p>
                <p>{{statisticsData.toDayStatisticsOrderVo.shouxufeiAmount}}元</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg-Success2 b-radius b-shadow">
          <div class="tap-content">
            <i class="el-icon-goods"></i>
            <div class="tap-title" style="display:flex; width:300px;">
              <div style="flex:1;text-align:center;">
                <p>订单总数</p>
                <p>{{statisticsData.goodsWeituoNum}}个</p>
              </div>
              <div style="flex:1;text-align:center;">
                <p>订单总额</p>
                <p>{{statisticsData.statisticsOrderVo.orderAmount}}元</p>
              </div>
              <div style="flex:1;text-align:center;">
                <p>总手续费</p>
                <p>{{statisticsData.statisticsOrderVo.shouxufeiAmount}}元</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" class="chart_wrap">
        <div class="block">
            <span class="demonstration">统计日期</span>
            <el-date-picker
            v-model="statisticsDate"
            @change="line"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <ve-line :data='chartData' :settings="chartSettings"></ve-line>
      </el-col>
    </el-row>
  </d2-container>
</template>
<script>
import { Index, Line } from './api'
export default {
  data () {
    this.chartSettings = {
      labelMap: {
        orderNum: '订单数量',
        orderAmount: '订单金额',
        weituoAmount: '委托金额',
        shouxufeiAmount: '手续费'
      }
    }
    return {
      onlineVisble: false,
      statisticsData: {
        countOnline: 0,
        countPerson: 0,
        qiangCountPerson: 0,
        notBuyNum: 0,
        oneBuyNum: 0,
        fuBuyNum: 0,
        goodsNum: 0,
        goodsWeituoNum: 0,
        statisticsOrderVo: {
          orderAmount: 0,
          weituoAmount: 0,
          shouxufeiAmount: 0
        },
        toDayGoodsWeituoNum: 0,
        toDayStatisticsOrderVo: {
          orderAmount: 0,
          weituoAmount: 0,
          shouxufeiAmount: 0
        }
      },
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
      statisticsDate: [],
      chartData: {
        columns: ['date', 'orderNum', 'orderAmount', 'weituoAmount', 'shouxufeiAmount'],
        rows: [
        ]
      }
    }
  },
  created () {
    // this.IndexData()
    // this.line(null)
  },
  methods: {
    // 获取数据列表
    IndexData () {
      Index().then(ret => {
        this.statisticsData = {
          countOnline: ret.countOnline,
          countPerson: ret.countPerson,
          qiangCountPerson: ret.qiangCountPerson,
          notBuyNum: ret.notBuyNum,
          oneBuyNum: ret.oneBuyNum,
          fuBuyNum: ret.fuBuyNum,
          goodsNum: ret.goodsNum,
          goodsWeituoNum: ret.goodsWeituoNum,
          statisticsOrderVo: ret.statisticsOrderVo,
          toDayGoodsWeituoNum: ret.toDayGoodsWeituoNum,
          toDayStatisticsOrderVo: ret.toDayStatisticsOrderVo
        }
        this.statisticsDate = ret.statisticsDate
      })
    },
    line (statisticsDate) {
      console.info(statisticsDate)
      Line(statisticsDate).then(ret => {
        this.chartData.rows = ret.data
      })
    },
    showOnline () {
      this.onlineVisble = true
    }
  }
}
</script>
<style lang='scss' scoped>
.page {
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}

  /* .el-card{
    background: none;
    border: none;
  }
  .site-content > .el-tabs > .el-tabs__content{
    padding: 0;
  } */
  .el-row{
    margin-bottom: 20px;
  }
  .b-radius{
    border-radius: 8px;
  }
  .b-shadow{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .tap-content{
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .tap-content i{
    font-size: 70px;
  }
  .tap-title{
    font-size: 18px;
    text-align: right;
  }
  .diebg{
    background-color: rgba(255, 255, 255, .2);
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
  }
  .bg-white{background-color: #fff;}
  .bg-info{background-color: #409EFF;}
  .bg-info2{background-color: rgb(123, 185, 248);}
  .bg-Success{background-color: #67C23A;}
  .bg-Success2{background-color: rgb(138, 219, 97);}
  .bg-Warning{background-color: #E6A23C;}
  .bg-Warning2{background-color: rgb(235, 187, 116);}
  .bg-Danger{background-color: #F56C6C;}
  .bg-Danger2{background-color: rgb(226, 170, 170);}
  .chart-box {
    height: 400px;
    padding: 10px;
  }
  .chart-hidden{
    overflow: auto;
    height: 340px;
  }
  .box-title{
    display: flex;
    justify-content:space-between;
  }
  .box-title h3{
    margin-top:0;
    font-size: 18px;
    font-weight: bold;
    font-family: '微软雅黑';
  }
  .copy{
    text-align: center;
    color: #999;
    margin-top: 20px;
  }
</style>
