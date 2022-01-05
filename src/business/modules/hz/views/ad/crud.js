import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('hz:ad:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('hz:ad:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('hz:ad:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '编号',
        key: 'id',
        width: 80,
        form: {
          disabled: true
        },
        sortable: true
      },
      {
        title: '名称',
        key: 'name',
        search: { disabled: false }, // 开启查询
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入名称' }]
        },
        sortable: true
      },
      {
        title: '广告位置',
        key: 'adPositionId',
        width: '120px',
        search: { disabled: false }, // 开启查询
        type: 'select',
        dict: {
          url: '/sys/category/queryTree?type=5&status=1',
          value: 'id',
          label: 'name',
          getData: (url) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return ret
            })
          }
        },
        form: { // 表单配置
          rules: [{ required: true, message: '请选择广告位置' }]
        },
        sortable: true
      },
      {
        title: '媒体类型',
        key: 'mediaType',
        type: 'select',
        align: 'center',
        width: 100,
        search: {},
        dict: {
          url: '/sys/dictdata/media_type',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => { return ret.data })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择媒体类型' }]
        },
        sortable: true
      },
      {
        title: '广告图片',
        key: 'imageUrl',
        type: 'avatar-uploader',
        // valueBuilder (row) {
        //   row.adImg = process.env.VUE_APP_DOMAIN_URL + row.adImg
        // },
        form: { // 表单配置
          component: {
            props: {
              elProps: {
                accept: '.png,.jpeg,.jpg,.ico,.bmp,.gif'
              },
              uploader: {
                type: 'form',
                custom: {
                  keepName: false // 保持文件名，注意：中文及特殊符号文件名在ios上支持不是很好
                }
              }
            }
          }
        },
        component: { name: 'd2p-images-format' },
        view: {
          component: { props: { height: 100, width: 100 } }
        },
        align: 'center',
        sortable: true
      },
      {
        title: '链接',
        key: 'link',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入链接' }]
        },
        sortable: true
      },
      {
        title: '展示内容',
        key: 'content',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入展示内容' }]
        },
        sortable: true
      },
      {
        title: '广播结束时间',
        key: 'endTime',
        type: 'datetime',
        width: 152,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入广播结束时间' }]
        },
        sortable: true
      },
      {
        title: '状态',
        key: 'enabled',
        width: '100px',
        type: 'select',
        search: { disabled: false }, // 开启查询
        form: { // 表单配置
          component: {
            name: 'dict-select',
            props: {
              elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
                filterable: true,
                clearable: true
              }
            }
          }
        },
        dict: {
          data: [ // 本地数据字典
            { value: 0, label: '禁用' },
            { value: 1, label: '启用' }
          ]
        },
        sortable: true
      },
      {
        title: '排序',
        key: 'orderNum',
        sortable: true,
        type: 'number'
      },
      {
        title: '创建时间',
        key: 'crtTime',
        type: 'datetime',
        width: 152,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      }
    ]
  }
}
