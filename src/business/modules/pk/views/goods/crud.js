import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('pk:goods:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('pk:goods:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('pk:goods:delete')
        }
      },
      lineEdit: {
        show: true
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '商品ID',
        key: 'goodsId',
        width: '80px',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      },
      {
        title: '商品图片',
        key: 'goodsImg',
        width: '120px',
        type: 'avatar-uploader',
        // valueBuilder (row) {
        //   row.goodsImg = process.env.VUE_APP_DOMAIN_URL + row.goodsImg
        // },
        // valueResolve (row, col) {
        //   console.log('--------valueResolve-----', col)
        //   row.goodsImg = process.env.VUE_APP_DOMAIN_URL + row.goodsImg // 'http://greper.veryreader.com/extends/error.jpg'
        // },
        form: { // 表单配置
          rules: [{ required: true, message: '请选择商品图片' }],
          component: {
            formatter: function (row, column, cellValue, index) {
              return process.env.VUE_APP_DOMAIN_URL + cellValue
            },
            props: {
              elProps: {
                accept: '.png,.jpeg,.jpg,.ico,.bmp,.gif'
              },
              uploader: {
                type: 'form',
                custom: {
                  keepName: false
                }
              }
            }
          }
        },
        sortable: true
      },
      {
        title: '商品分类',
        key: 'cateCode',
        width: '120px',
        search: { disabled: false }, // 开启查询
        type: 'select',
        dict: {
          url: '/pk/goodscate/all',
          value: 'cateCode',
          label: 'cateName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return ret
            })
          }
        },
        form: { // 表单配置
          rules: [{ required: true, message: '请选择分类' }]
        },
        sortable: true
      },
      {
        title: '商品编号',
        key: 'goodsCode',
        search: { disabled: false }, // 开启查询
        form: { // 表单配置
          disabled: true
        },
        sortable: true
      },
      {
        title: '商品名称',
        key: 'goodsName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入商品名称' }]
        },
        formatter: function (row, column, cellValue, index) {
          return cellValue
        },
        sortable: true
      },
      {
        title: '商品价格',
        key: 'goodsPrice',
        width: '120px',
        type: 'number',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请填写商品价格' }]
        },
        sortable: true
      },
      {
        title: '是否上线',
        key: 'isShow',
        type: 'switch',
        sortable: true,
        width: '100px',
        search: {
          disabled: true
        },
        form: {
          component: {
            props: {
              activeValue: 1,
              inactiveValue: 0
            }
          }
        },
        component: {
          props: {
            activeValue: 1,
            inactiveValue: 0
          }
        }
      },
      {
        title: '开启模拟',
        key: 'isNoBuy',
        type: 'switch',
        sortable: true,
        width: '100px',
        search: {
          disabled: true
        },
        form: {
          component: {
            props: {
              activeValue: 1,
              inactiveValue: 0
            }
          }
        },
        component: {
          props: {
            activeValue: 1,
            inactiveValue: 0
          }
        }
      },
      {
        title: '购物区',
        key: 'isGoods',
        type: 'switch',
        sortable: true,
        width: '100px',
        search: {
          disabled: false
        },
        form: {
          component: {
            props: {
              activeValue: 1,
              inactiveValue: 0
            }
          }
        },
        component: {
          props: {
            activeValue: 1,
            inactiveValue: 0
          }
        }
      },
      {
        title: '商品归属',
        key: 'guishuNickname',
        form: {
          disabled: true,
          slot: true,
          helper: { slot: true }
        },
        sortable: true,
        rowSlot: true
      },
      {
        title: '排序',
        key: 'paixu',
        type: 'number',
        width: '220px',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请填写商品顺序' }]
        },
        rowSlot: true,
        sortable: true
      },
      {
        title: '归属人',
        key: 'guishuUserCode',
        width: '120px',
        search: { disabled: true }, // 开启查询
        // type: 'select',
        sortable: true,
        show () {
          return false
        }
        // ,
        // dict: {
        //   url: '/pk/user/query?size=100',
        //   value: 'userCode',
        //   label: 'phone',
        //   getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
        //     return request({ url: url }).then(ret => {
        //       return ret.data.records
        //     })
        //   }
        // },
        // form: {
        //   rules: [{ required: true, message: '请选择商品归属人' }],
        //   component: {
        //     props: {
        //       // separator: ',', // 多选时，value的分隔符
        //       elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
        //         filterable: true,
        //         remote: true,
        //         multiple: false,
        //         clearable: true
        //       }
        //     }
        //   }
        // },
      },
      {
        title: '商品描述',
        key: 'goodsDesc',
        type: 'editor-quill',
        disabled: true, // 隐藏列
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              uploader: {
                type: 'form' // 上传后端类型【cos,aliyun,oss,form】
              }
            },
            events: {
              'text-change': (event) => {
                console.log('text-change:', event)
              }
            },
            show: true
          }
        }
      },
      {
        title: '',
        key: 'guishuUser',
        search: {
          disabled: false,
          slot: true
        },
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入创建时间' }]
        },
        show: false
      }
    ]
  }
}
