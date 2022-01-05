
export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dict:info')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dict:update')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dict:delete')
        }
      }
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        sortable: true,
        width: 100,
        // type: 'select',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '字典名称',
        key: 'dictName',
        sortable: true,
        form: {
          rules: [
            { required: true, message: '请填写字典名称' }
          ]
        }
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '字典编码',
        key: 'dictType',
        search: { disabled: false }, // 开启查询
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          },
          rules: [
            { required: true, message: '请填写字典编码' }
          ]
        }, // 表单配置
        // disabled: false //是否隐藏列
        sortable: true
      },
      {
        title: '值类型',
        key: 'dictValueType',
        type: 'select',
        search: { disabled: false }, // 开启查询
        dict: {
          data: [
            { value: 1, label: '数值型' }, { value: 2, label: '字符型', color: 'danger' }
          ]
        }, // 数据字典
        sortable: true,
        form: {
          rules: [
            { required: true, message: '请选择值类型' }
          ]
        }
      },
      {
        title: '备注',
        key: 'remark',
        search: { disabled: true },
        sortable: true
      },
      {
        title: '创建时间',
        key: 'crtTime',
        sortable: true,
        type: 'datetime',
        form: { disabled: true } // 表单配置
      },
      {
        title: '更新时间',
        key: 'updTime',
        sortable: true,
        type: 'datetime',
        form: { disabled: true } // 表单配置
      }
    ]
  }
}
