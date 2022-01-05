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
          return !vm.hasPermissions('sys:role:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:role:update')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:role:delete')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'warning',
          size: 'small',
          emit: 'authz',
          icon: 'el-icon-s-flag',
          disabled () {
            return !vm.hasPermissions('sys:role:authz')
          }
        }
      ]
    },
    columns: [
      {
        title: 'id',
        key: 'roleId',
        sortable: true,
        width: 100,
        // type: 'select',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '角色名称',
        key: 'roleName',
        form: {
          rules: [{ required: true, message: '请输入角色名称' }],
          component: {
            props: {
              placeholder: '角色名称'
            }
          }
        },
        sortable: true
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '角色代码',
        key: 'roleKey',
        // type: 'select',
        search: { disabled: false }, // 开启查询
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          },
          rules: [{ required: true, message: '请输入角色代码' }],
          component: {
            props: {
              placeholder: '角色代码'
            }
          }
        },
        // disabled: false //是否隐藏列
        sortable: true
      },
      {
        title: '创建时间',
        key: 'crtTime',
        sortable: true,
        type: 'datetime',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '更新时间',
        key: 'updTime',
        sortable: true,
        type: 'datetime',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      }

    ]
  }
}
