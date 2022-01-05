export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('billnote:categorytemp:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('billnote:categorytemp:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('billnote:categorytemp:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '',
        key: 'id',
        width: 100,
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
        title: '类目编号',
        key: 'categoryCode',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入类目编号' }]
        },
        sortable: true
      },
      {
        title: '模版编号',
        key: 'tempCode',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入模版编号' }]
        },
        sortable: true
      }
    ]
  }
}
