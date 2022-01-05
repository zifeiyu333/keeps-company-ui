export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('pk:gonggao:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('pk:gonggao:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('pk:gonggao:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '公告ID',
        key: 'gonggaoId',
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
        title: '公告名称',
        key: 'gonggaoName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入公告名称' }]
        },
        sortable: true
      },
      {
        title: '内容',
        key: 'gonggaoDesc',
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
      }
    ]
  }
}
