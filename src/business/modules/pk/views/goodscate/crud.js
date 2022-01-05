export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('pk:goodscate:info')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('pk:goodscate:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('pk:goodscate:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '分类ID',
        key: 'cateId',
        form: { // 表单配置
          disabled: true
        },
        sortable: true
      },
      {
        title: '分类编号',
        key: 'cateCode',
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入分类编号' }]
        },
        sortable: true
      },
      {
        title: '分类图片',
        key: 'cateImg',
        type: 'avatar-uploader',
        form: { // 表单配置
          component: {
            name: 'd2p-file-uploader',
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
        // valueBuilder (row) {
        //   row.cateImg = process.env.VUE_APP_DOMAIN_URL + row.cateImg
        // },
        // formatter (row, column, cellValue, index) {
        //   return process.env.VUE_APP_DOMAIN_URL + cellValue
        // },
        component: { name: 'd2p-images-format' },
        view: {
          component: { props: { height: 100, width: 100 } }
        },
        align: 'center',
        sortable: true
      },
      {
        title: '分类名称',
        key: 'cateName',
        search: {
          disabled: false
        },
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入分类名称' }]
        },
        sortable: true
      },
      {
        title: '开始时间',
        key: 'startDateTime',
        type: 'time',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          component: {
            props: {
              format: 'HH:mm:ss',
              valueFormat: 'yyyy-MM-dd HH:mm:ss'
            }
          },
          rules: [{ required: true, message: '请输入开始时间' }]
        },
        component: {
          props: {
            format: 'HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        sortable: true
      },
      {
        title: '结束时间',
        key: 'endDateTime',
        type: 'time',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          component: {
            props: {
              format: 'HH:mm:ss',
              valueFormat: 'yyyy-MM-dd HH:mm:ss'
            }
          },
          rules: [{ required: true, message: '请输入结束时间' }]
        },
        component: {
          props: {
            // 行展示组件使用的dayjs，格式化标准与el-datepicker不一样
            format: 'HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        sortable: true
      },
      {
        title: '增长比率',
        key: 'zengzhangBilv',
        type: 'number',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      },
      {
        title: '手续费比率',
        key: 'sxfBilv',
        type: 'number',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      },
      {
        title: '最高限额',
        key: 'maxPrice',
        type: 'number',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      },
      {
        title: '交易模式',
        key: 'days',
        dict: {
          url: '/sys/dictdata/transaction_mode'
        },
        type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入交易模式' }]
        },
        sortable: true
      },
      {
        title: '是否开放',
        key: 'isKaifang',
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
        title: '是否显示',
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
        title: '顺序',
        key: 'sortNum',
        search: {
          disabled: true
        },
        type: 'number',
        form: { // 表单配置
          rules: [{ required: true, message: '请输入顺序' }]
        },
        rowSlot: true,
        sortable: true
      }
    ]
  }
}
