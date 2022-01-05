<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form ref="form" :model="dataForm" :rules="dataRule" label-width="120px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺名称" prop="storeName">
              <el-input v-model="dataForm.storeName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联会员" prop="personId">
              <el-autocomplete
                v-model="personInfo"
                :fetch-suggestions="getPersonList"
                placeholder="请输入会员姓名/手机号"
                @select="handleSelectPerson"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="门店分类" prop="categoryIds"
                          :rules="[{ required:true,message:'请选择门店分类',trigger:['blur','change'] }]"
            >
              <el-cascader v-model="dataForm.categoryIds" :options="categoryTreeData" :props="categoryProps" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺LOGO">
              <div class="upLoadPicBox" @click="modalPicTap('2')">
                <div class="pictrue" v-if="dataForm.storeLogo"><img :src="dataForm.storeLogo"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="门店电话" prop="phone">
              <el-input v-model="dataForm.phone" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提货点营业：" prop="businessHours">
              <el-time-picker
                is-range
                v-model="dayTime"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="请选择时间营业时间"
                value-format="HH:mm:ss"
                @change="onChangeTime">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="人均价格" prop="averagePrice">
              <el-input-number v-model="dataForm.averagePrice" :precision="2" :step="1" :max="99999999"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地" prop="locationAddress">
              <el-cascader
                ref="cascaderAddr"
                class="dialogWidth"
                clearable
                v-model="locationAddress"
                :options="addresData"
                @change="handleChange"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="经纬度：" prop="lng">
              <el-tooltip content="请点击查找位置选择位置">
                <el-input v-model="latlng" placeholder="请查找位置" readOnly>
                  <el-button slot="append" @click="onSearch">查找位置</el-button>
                </el-input>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="locationDetailedAddress">
              <el-input v-model="dataForm.locationDetailedAddress" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-dict code="store_status" v-model="dataForm.status"></el-dict>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态" prop="isCheck">
              <el-dict code="isCheck" v-model="dataForm.isCheck"></el-dict>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签">
              <el-tag
                v-for="tag in tags"
                :key="tag.name"
                closable
                @close="deleteTags(tag.name)"
                :type="tag.type">
                {{tag.name}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="tagInputVisible"
                v-model="tagInput"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addTags">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="顺序">
              <el-input-number v-model="dataForm.orderNum" ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简介">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="dataForm.introduction" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核备注">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="dataForm.checkRemarks" placeholder="不通过时，请填写具体原因。审核消息将推送给申请人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card><br/>
      <el-card class="box-card" :body-style="{ padding: '10px' }">
        <div slot="header" class="clearfix">
          <span>认证信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人姓名">
              <el-input v-model="dataForm.legalRealName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人手机号">
              <el-input v-model="dataForm.legalPhone" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-form-item label="身份证正面">
                <el-button type="text" class="button" v-if="dataForm.idCardFront" @click="clear(2)">清除</el-button>
                <el-tag v-else>无</el-tag>
              </el-form-item>
            </div>
            <img :src="form.idCardFront" class="image" style="width: 100%;" v-if="dataForm.idCardFront">
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="身份证反面">
                <el-button type="text" class="button" v-if="dataForm.idCardReverse" @click="clear(3)">清除</el-button>
                <el-tag v-else>无</el-tag>
              </el-form-item>
            </div>
            <img :src="form.idCardReverse" class="image" style="width: 100%;" v-if="dataForm.idCardReverse">
          </el-col>
        </el-row>
      </el-card>
      <br/>
      <el-card class="box-card" :body-style="{ padding: '10px' }">
        <div slot="header" class="clearfix">
          <span>扩展信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="dataForm.contactName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="dataForm.contactPhone" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信">
              <el-input v-model="dataForm.wx" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QQ">
              <el-input v-model="dataForm.qq" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card><br/>
      <el-card class="box-card" :body-style="{ padding: '10px' }">
        <div slot="header" class="clearfix">
          <span>账户信息</span>
        </div>
        <el-form-item label="">
          <el-tag>无</el-tag>
        </el-form-item>
      </el-card><br/>
      <el-card>
        <div slot="header" class="clearfix">
          <span>导图</span>
        </div>
        <div>
            <div class="conters scrollbarAll" :style="{maxHeight:'260px'}">
              <div
                  v-for="(image, index) in dataForm.images"
                  :key="index"
                  class="gridPic">
                  <el-image style="width: 100px; height: 100px" :lazy="true" :src="image" :preview-src-list="dataForm.images"> </el-image>
                  <div class="del">
                      <i @click="deleteImage(index)" class="el-icon-delete" ></i>
                  </div>
                </div>
              <div class="upLoadPicBox" @click="modalImages('2')">
                <div class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </div>
        </div>
      </el-card><br/>
      <el-card>
        <div slot="header" class="clearfix">
          <span>平台收款码</span>
        </div>
        <div>
          <el-form-item label="">
            <el-button type="text" class="button" v-if="dataForm.qrAlipay" @click="clear(2)">清除</el-button>
            <el-tag v-else>无</el-tag>
          </el-form-item>
        </div>
        <img :src="form.qrAlipay" class="image" style="width: 100%;" v-if="dataForm.qrAlipay">
      </el-card>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
    <el-dialog v-model="modalMap" title='上传经纬度' :visible.sync="modalMap" append-to-body class="mapBox"  width="500px">
      <iframe
        id="mapPage" width="100%" height="100%" frameborder=0
        v-bind:src="keyUrl"
      ></iframe>
    </el-dialog>
  </el-dialog>
</template>
<script>
import { GetList } from '../person/api'
import city from '@/business/utils/city'
import { GetTree } from '@/api/sysCategoryApi'
import * as api from './api'
import { request } from '@/api/service'
export default {
  data () {
    return {
      currentDate: new Date(),
      domainUrl: process.env.VUE_APP_DOMAIN_URL,
      modalMap: false,
      keyUrl: '',
      visible: false,
      loading: false,
      addresData: [],
      dayTime: ['', ''],
      locationAddress: [],
      latlng: '',
      personInfo: '',
      tags: [],
      tagInputVisible: '',
      tagInput: '',
      tagType: ['', 'success', 'info', 'warning', 'danger'],
      categoryTreeData: [],
      categoryProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true,
        emitPath: false,
        multiple: true
      },
      dataForm: {
        id: null,
        personId: '',
        categoryIds: [],
        storeName: '',
        phone: '',
        status: '1',
        isCheck: '1',
        storeLogo: '',
        businessHours: '',
        locationAddress: '',
        locationProvinceId: null,
        locationCityId: null,
        locationCountyId: null,
        locationDetailedAddress: '',
        lng: '',
        lat: '',
        tags: '',
        orderNum: 99,
        legalRealName: '',
        legalPhone: '',
        images: []
      },
      dataRule: {
        storeName: [
          { required: true, message: '门店名称不能为空', trigger: 'blur' }
        ],
        personId: [
          { required: true, message: '请关联平台会员', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        businessHours: [
          { required: true, message: '营业时间不能为空', trigger: 'blur' }
        ],
        averagePrice: [
          { required: true, message: '人均价格不能为空', trigger: 'blur' }
        ],
        locationAddress: [
          { required: true, message: '所在地不能为空', trigger: 'blur' }
        ],
        locationDetailedAddress: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        lng: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        isCheck: [
          { required: true, message: '审核状态不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '顺序不能为空', trigger: 'blur' }
        ]
      },
      dictData: []
    }
  },
  watch: {
  },
  created () {
    this.addresData = city
    this.getKey()
  },
  mounted () {
    this.getCategoryTree()
    window.addEventListener('message', function (event) {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      var loc = event.data
      if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        window.parent.selectAdderss(loc)
      }
    }, false)
    window.selectAdderss = this.selectAdderss
  },
  methods: {
    init (id) {
      var _this = this
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.empty()
        if (this.dataForm.id) {
          api.GetObj(this.dataForm.id).then(ret => {
            if (ret.code === 200) {
              ret.data.status = ret.data.status.toString()
              ret.data.isCheck = ret.data.isCheck.toString()
              var locationAddress = []
              if (ret.data.locationProvinceId) {
                locationAddress.push(ret.data.locationProvinceId)
              }
              if (ret.data.locationCityId) {
                locationAddress.push(ret.data.locationCityId)
              }
              if (ret.data.locationCountyId) {
                locationAddress.push(ret.data.locationCountyId)
              }
              this.locationAddress = locationAddress
              this.dayTime = ret.data.businessHours.split(',')
              this.latlng = ret.data.lat + ',' + ret.data.lng
              var personInfo = ''
              var personEntity = ret.data.personEntity
              if (personEntity.realName) {
                personInfo = '【姓名：' + personEntity.realName + '】'
              }
              personInfo += '【昵称：' + personEntity.nickName + '】【电话：' + personEntity.phone + '】'
              this.personInfo = personInfo
              if (ret.data.tags) {
                var tags = ret.data.tags.split(',')
                tags.forEach(function (name) {
                  _this.tags.push({ type: _this.tagType[Math.floor(Math.random() * 5)], name: name })
                })
              }
              this.dataForm = ret.data
            } else {
              this.$message.error(ret.msg)
            }
          })
        }
      })
    },
    // 所有分类
    getCategoryTree () {
      const treeFrom = {
        status: 1,
        type: 8
      }
      GetTree(treeFrom).then(res => {
        this.categoryTreeData = res.data
      })
    },
    getPersonList (query, cb) {
      if (query !== '') {
        GetList({ phone: query }).then(ret => {
          var results = []
          ret.data.records.filter(item => {
            let str = ''
            if (item.realName) {
              str = '【姓名：' + item.realName + '】'
            }
            results.push({ value: str + '【昵称：' + item.nickName + '】【电话：' + item.phone + '】', id: item.id })
          })
          cb(results)
        })
      }
    },
    // 取消
    cancel () {
      this.visible = false
      this.empty()
    },
    empty () {
      this.dayTime = ['', '']
      this.locationAddress = []
      this.latlng = ''
      this.personInfo = ''
      this.tags = []
      this.tagInputVisible = ''
      this.tagInput = ''
      this.$refs.form.resetFields()
    },
    // 提交
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.tags) {
            var tags = []
            this.tags.forEach(function (tag) {
              tags.push(tag.name)
            })
            this.dataForm.tags = tags.join(',')
          }
          if (!this.dataForm.id) {
            api.AddObj(this.dataForm).then(ret => {
              if (ret.code === 200) {
                this.cancel()
                this.$message.success(ret.msg)
              } else {
                this.$message.error(ret.msg)
              }
            })
          } else {
            api.UpdateObj(this.dataForm).then(ret => {
              if (ret.code === 200) {
                this.cancel()
                this.$message.success(ret.msg)
              } else {
                this.$message.error(ret.msg)
              }
            })
          }
        }
      })
    },
    deleteTags (name) {
      var tags = this.tags
      this.tags = tags.filter(this.createTagFilter(name))
    },
    createTagFilter (name) {
      return (state) => {
        return (state.name.toLowerCase() !== name.toLowerCase())
      }
    },
    addTags () {
      this.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const tagInput = this.tagInput
      if (tagInput) {
        this.tags = this.tags.filter(this.createTagFilter(tagInput))
        this.tags.push({ type: this.tagType[Math.floor(Math.random() * 5)], name: tagInput })
      }
      this.tagInputVisible = false
      this.tagInput = ''
    },
    // 上传图片
    modalPicTap (tit) {
      const _this = this
      this.$modalUpload(function (img) {
        _this.dataForm.storeLogo = img[0].fileUrl
      }, tit, 'system')
    },
    // 上传图片
    modalImages (tit) {
      const _this = this
      this.$modalUpload(function (imgs) {
        for (let i = 0; i < imgs.length; i++) {
          _this.dataForm.images.push(imgs[i].fileUrl)
        }
      }, tit, 'system')
    },
    deleteImage (index) {
      this.dataForm.images.splice(index, 1)
    },
    // 确认关联会员
    handleSelectPerson (item) {
      this.dataForm.personInfo = item.value
      this.dataForm.personId = item.id
    },
    // 确认营业时间
    onChangeTime (e) {
      this.dataForm.businessHours = e ? e.join(',') : ''
    },
    // 确认省市区
    handleChange (e) {
      const province = e[0]
      const city = e[1]
      var node = this.$refs.cascaderAddr.getCheckedNodes()
      this.dataForm.locationAddress = node[0].pathLabels.join('-')
      this.dataForm.locationProvinceId = province
      this.dataForm.locationCityId = city
      if (e.length === 3) {
        this.dataForm.locationCountyId = e[2]
      }
    },
    // 查找位置
    onSearch () {
      this.modalMap = true
    },
    // 选择经纬度
    selectAdderss (data) {
      this.dataForm.lng = data.latlng.lat
      this.dataForm.lat = data.latlng.lng
      this.latlng = data.latlng.lat + ',' + data.latlng.lng
      this.modalMap = false
    },
    // key值
    getKey () {
      request({
        url: '/sys/config/get/tengxun_map_key',
        method: 'get'
      }).then(ret => {
        const keys = ret.data.value
        this.keyUrl = `https://apis.map.qq.com/tools/locpicker?type=1&key=${keys}&referer=myapp`
      })
    }
  }
}
</script>

<style lang="scss">
  .mapBox .el-dialog__body {
    height: 640px !important
  }
  .el-tag + .el-tag {
    margin-left: 10px
  }
  .button-new-tag {
    margin-left: 10px;
    line-height: 30px;
    height: 32px;
    padding-top: 0;
    padding-bottom: 0
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom
  }
  .conters{
    display: flex;
    flex-wrap: wrap;
    /*max-height: 296px;*/
    overflow: auto;
  }
  .conters:after {content: ""; width: 410px !important; }
  .gridPic{
    margin-right: 10px;
    margin-bottom: 10px;
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
  .gridPic:hover .del{
    opacity:1;
  }
  .gridPic .del,
  .gridPic .layer{
      opacity:0;
      transition:all .3s;
  }
  .gridPic .del{
      position:absolute;
      bottom:0px;
      right:35px;
      color:#8492a6;
      cursor:pointer;
      font-size:1.5em;
  }
  .gridPic .layer{
      position:absolute;
      left:0;
      right:0;
      top:0;
      height:200px;
      color:#fff;
      text-align:center;
      z-index:5;
      background-color:rgba(0,0,0,.4);
  }
  .gridPic .layer i{
      font-size:1.6em;
      margin-top:80px;
  }
</style>
