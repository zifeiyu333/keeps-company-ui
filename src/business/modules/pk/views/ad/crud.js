export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('pk:ad:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('pk:ad:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('pk:ad:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '广告ID',
        key: 'adId',
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
        title: '广告名称',
        key: 'adName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入广告名称' }]
        },
        sortable: true
      },
      {
        title: '广告图片',
        key: 'adImg',
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
        title: '广告链接',
        key: 'adUrl',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        },
        sortable: true
      },
      {
        title: '背景色',
        key: 'diquName',
        type: 'color-picker',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请选择背景色' }]
        },
        sortable: true
      }
      // ,
      // {
      //   title: '开始时间',
      //   key: 'startDateTime',
      //   type: 'date',
      //   form: { // 表单配置
      //   // disabled: true, // 禁用表单编辑
      //     rules: [{ required: true, message: '请选择开始时间' }]
      //   },
      //   sortable: true
      // },
      // {
      //   title: '结束时间',
      //   key: 'endDateTime',
      //   type: 'date',
      //   form: { // 表单配置
      //   // disabled: true, // 禁用表单编辑
      //     rules: [{ required: true, message: '请选择结束时间' }]
      //   },
      //   sortable: true
      // }
    ]
  }
}
