import Vue from 'vue'
import d2Crud from '@d2-projects/d2-crud'
import d2CrudX from 'd2-crud-x'
import util from '@/libs/util'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pAreaSelector, D2pFileUploader, D2pIconSelector, D2pTreeSelector, D2pFullEditor, D2pUploader, D2pDemoExtend } from 'd2p-extends' // 源码方式引入，上传组件支持懒加载
// http请求
import { request } from '@/api/service'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)

// 按如下重命名引入可与官方版共存，index.vue中标签用<d2-crud-x />使用加强版
// 不传name，则d2CrudX的标签仍为<d2-crud>,不可与官方版共存
Vue.use(d2CrudX, { name: 'd2-crud-x' })

// 官方版【此处为演示与官方版共存而引入，全新项目中可以用d2-crud-x完全替代官方版】
Vue.use(d2Crud)

// 引入d2CrudPlus
Vue.use(d2CrudPlus, {
  starTip: false,
  getRemoteDictFunc (url, dict) {
    return request({ // 用你项目中的http请求
      url: url,
      method: 'get'
    }).then(ret => {
      return ret.data // 返回字典数组
    })
  },
  commonOption () { // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置，
          request: {
            current: 'current',
            size: 'size'
          },
          response: {
            current: 'current', // 当前页码 ret.data.current
            size: 'size', // 当前页码 ret.data.current
            // size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'records' // 列表数组 ret.data.records
          }
        }
      },
      pageOptions: {
        compact: true,
        export: {
          local: true, // 本地导出,false为服务端导出
          title: '导出数据', // 文件名
          type: 'excel' // 导出类型，excel 或 cvs
          // formatter(row,context){}
        }
      },
      options: {
        size: 'small'
      },
      formOptions: {
        closeOnClickModal: true, // 点击对话框背景关闭对话框,实际使用过程中容易误触把对话框关闭，导致输入内容丢失，建议设置为false
        nullToBlankStr: true, // 提交修改表单时，将undefined的数据修改为空字符串''，可以解决无法清空字段的问题
        defaultSpan: 12 // 默认的表单 span
      },
      viewOptions: {
        disabled: false,
        componentType: 'form' // 【form,row】 表单组件 或 行组件展示
      },
      rowHandle: {
        width: 260,
        edit: {
          type: 'primary'
        }
      }
    }
  }
})

// 安装扩展插件, extends里面的组件全部是懒加载的，可以放心use
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
Vue.use(D2pIconSelector)
Vue.use(D2pFullEditor, {
  ueditor: {
    serverUrl: '/api/ueditor/'
  }
})
Vue.use(D2pDemoExtend)
Vue.use(D2pFileUploader)
Vue.use(D2pUploader, {
  defaultType: 'cos',
  cos: {
    domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
    bucket: 'd2p-demo-1251260344',
    region: 'ap-guangzhou',
    secretId: '', //
    secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
    getAuthorization  (custom) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      return request({
        url: '/upload/cos/getAuthorization',
        method: 'get'
      }).then(ret => {
        // 返回结构如下
        // ret.data:{
        //   TmpSecretId,
        //   TmpSecretKey,
        //   XCosSecurityToken,
        //   ExpiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
        // }
        return ret.data
      })
    }
  },
  alioss: {
    domain: 'https://d2p-demo.oss-cn-shenzhen.aliyuncs.com',
    bucket: 'd2p-demo',
    region: 'oss-cn-shenzhen',
    accessKeyId: '',
    accessKeySecret: '',
    getAuthorization  (custom, context) { // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      return request({
        url: '/upload/alioss/getAuthorization',
        method: 'get'
      }).then(ret => {
        return ret.data
      })
    },
    sdkOpts: { // sdk配置
      secure: true // 默认为非https上传,为了安全，设置为true
    }
  },
  qiniu: {
    bucket: 'd2p-demo',
    getToken (custom) {
      return request({
        url: '/upload/qiniu/getToken',
        method: 'get'
      }).then(ret => {
        return ret.data // {token:xxx,expires:xxx}
      })
    },
    domain: 'http://d2p.file.veryreader.com'
  },
  form: {
    action: process.env.VUE_APP_API + 'sys/ossfile/upload',
    headers: {
      Authorization: util.cookies.get('token'),
      appid: process.env.VUE_APP_ID
    },
    data: {}, // 上传附加参数
    name: 'file',
    successHandle (ret) { // 需要将res.url 设置为url
      if (ret.url == null || ret.url === '') {
        throw new Error('上传失败')
      }
      return { url: ret.url, folder: ret.folder }
    }
  }
})

//  自定义字段类型示例
d2CrudPlus.util.columnResolve.addTypes({
  time2: {
    form: { component: { name: 'el-date-picker', props: { type: 'datetime' } } }, // 编辑时支持日期时间
    search: { component: { props: { type: 'date' } } }, // 搜索时只支持日期
    formatter (row, column, value, index) {
      return value + '-->我是自定义字段类型：time2'
    },
    _handle (column) {
      //  此方法主要将column中某些依赖的用户配置的属性放到默认配置中，比如数据字典的配置
      if (column.dict != null) {
        this.form.component.props.dict = column.dict
        this.component.props.dict = column.dict
      }
    }
  }
})

// 修改官方字段类型
const selectType = d2CrudPlus.util.columnResolve.getType('select')
selectType.component.props.color = 'auto' // 修改官方的字段类型，设置select的单元格组件支持自动染色
