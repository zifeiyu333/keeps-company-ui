import { request } from '@/api/service'
export const crudOptions = (vm) => {
  var validatorPhone = function (rule, value, callback) {
    if (value === '') {
      callback(new Error('手机号不能为空'))
    } else if (!/^1\d{10}$/.test(value)) {
      callback(new Error('手机号格式错误'))
    } else {
      callback()
    }
  }
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
          return !vm.hasPermissions('sys:user:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:user:update')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:user:delete')
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
            return !vm.hasPermissions('sys:user:authz')
          }
        }
      ]
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        width: 70,
        // type: 'select',
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '姓名',
        key: 'realName',
        // type: 'select',
        // dict: { url: ''} //数据字典
        search: { disabled: false }, // 开启查询
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          },
          rules: [{ required: true, message: '请输入姓名' }]
        },
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '工号',
        key: 'userName',
        // type: 'select',
        // dict: { url: ''} //数据字典
        search: { disabled: false }, // 开启查询
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          },
          rules: [{ required: true, message: '请输入工号' }]
        },
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '所属机构',
        key: 'orgNo',
        type: 'tree-selector',
        dict: {
          url: '/sys/org/queryTree?orgNo=',
          isTree: true,
          value: 'orgNo',
          label: 'orgName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return [{ orgNo: '0', orgName: '无', children: ret.data }]
            })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择所属机构' }],
          component: {
            props: {
              multiple: false,
              elProps: {
                defaultExpandAll: true
              },
              dict: { cache: false }
            }
          }
        },
        sortable: true
      },
      {
        title: '手机号',
        key: 'mobilePhone',
        // type: 'phoneNumber',
        width: 150,
        form: {
          // component: {
          //   props: {
          //     onlyCountries: ['CN']
          //   }
          // },
          rules: [{ required: true, message: '请输入手机号' }, { validator: validatorPhone, trigger: 'blur' }]
        },
        // valueBuilder (row) { // 将row里面手机号相关的字段组合成组件需要的value对象
        //   row.mobileValue = { phoneNumber: row.mobile, callingCode: row.callingCode }
        // },
        // valueResolve (row) { // 将value解析成row的字段
        //   if (row.mobileValue != null) {
        //     row.mobile = row.mobileValue.phoneNumber
        //     row.callingCode = row.mobileValue.callingCode
        //   }
        // },
        // dict: { url: ''} //数据字典
        search: { disabled: false, width: '260px' }, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '性别',
        key: 'sex',
        type: 'radio',
        width: 70,
        dict: {
          data: [
            { value: 1, label: '男' }, { value: 2, label: '女', color: 'danger' }
          ]
        }, // 数据字典
        // search: { disabled: true}, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '邮箱',
        key: 'email',
        // type: 'select',
        // dict: { url: ''} //数据字典
        search: { disabled: false }, // 开启查询
        // disabled: false, // 是否隐藏列
        form: { // 表单配置
          // disabled: true, // 禁用表单编辑
          rules: [{ required: false, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]
        },
        sortable: true
      },
      {
        title: '角色',
        key: 'roleIds',
        type: 'select',
        width: 250,
        dict: {
          url: '/sys/role/select',
          value: 'roleId',
          label: 'roleName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => { return ret.data })
          }
        }, // 数据字典
        search: { disabled: true }, // 开启查询
        // disabled: false, // 是否隐藏列
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        },
        view: {
          disabled: true
        },
        sortable: true
      },
      {
        title: '密码',
        key: 'password',
        // type: 'select',
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: {
          // disabled: true,
          component: {
            props: {
              showPassword: true
            }
          },
          helper: '填写则修改密码'
        }, // 表单配置
        disabled: true, // 是否隐藏列
        sortable: true
      },
      {
        title: '头像',
        key: 'avatar',
        type: 'avatar-uploader',
        width: 100,
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '创建时间',
        key: 'crtTime',
        type: 'datetime',
        width: 140,
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '修改时间',
        key: 'crtTime',
        type: 'datetime',
        width: 140,
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      }
    ]
  }
}
