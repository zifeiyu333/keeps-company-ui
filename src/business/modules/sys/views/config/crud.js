export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('sys:config:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('sys:config:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('sys:config:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        width: 100,
        form: { disabled: true }, // 表单配置
        sortable: true
      },
      {
        title: 'key',
        key: 'keyName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入key' }]
        },
        sortable: true
      },
      {
        title: 'value',
        key: 'value',
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入value' }]
        },
        sortable: true
      },
      {
        title: '启用',
        key: 'status',
        dict: {
          url: '/sys/dictdata/is'
        },
        type: 'dict-switch',
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
        title: '备注',
        key: 'remark',
        form: { // 表单配置
        },
        sortable: true
      }
    ]
  }
}
