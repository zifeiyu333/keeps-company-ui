import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:menu:info')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('sys:menu:update')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('sys:menu:delete')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'primary',
          size: 'small',
          emit: 'add-sub-resource',
          icon: 'el-icon-plus',
          disabled: () => {
            return !vm.hasPermissions('sys:menu:add')
          }
        }
      ],
      width: 180,
      fixed: 'right'
    },
    indexRow: { // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center'
    },
    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      rowKey: 'menuId'
    },
    pagination: false,
    columns: [
      {
        title: '菜单名称',
        key: 'menuName',
        sortable: true,
        search: {},
        form: {
          rules: [{ required: true, message: '请选择菜单名称' }],
          component: {
            props: {
              placeholder: '菜单名称'
            }
          }
        },
        width: 200
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: 'id',
        key: 'menuId',
        form: {
          disabled: true
        },
        sortable: true
      },
      {
        title: '菜单类型',
        key: 'menuType',
        type: 'select',
        align: 'center',
        width: 100,
        search: {},
        dict: {
          url: '/sys/dictdata/menu_type',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => { return ret.data })
          }
          // ,
          // value: 'dictNumber', // 数据字典中value字段的属性名
          // label: 'dictLabel' // 数据字典中label字段的属性名
        },
        // search: { disabled: true }, //开启查询
        form: {
          rules: [{ required: true, message: '请选择菜单类型' }]
        },
        // disabled: false //是否隐藏列
        sortable: true
      },
      {
        title: '父节点',
        key: 'parentId',
        sortable: true,
        width: 100,
        type: 'tree-selector',
        dict: {
          url: '/sys/menu/queryTree',
          isTree: true,
          value: 'menuId',
          label: 'menuName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return [{ menuId: 0, menuName: '根节点', children: ret.data }]
            })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择父节点' }],
          component: {
            props: {
              multiple: false,
              elProps: {
                defaultExpandAll: true
              },
              dict: { cache: false }
            }
          }
        }
      },
      {
        title: '图标',
        key: 'icon',
        sortable: false,
        type: 'icon-selector',
        width: 60
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由名称',
        key: 'routeName',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: '路由名称'
            }
          }
        },
        width: 170
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '权限代码',
        key: 'perms',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: 'aaa:bbb:ccc'
            }
          }
        },
        width: 170
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由地址',
        key: 'routePath',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: '/sys/menu'
            }
          }
        },
        width: 180
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由组件',
        key: 'routeComponent',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: ''
            }
          },
          helper: '最顶层的菜单必须配置为layoutHeaderAside。子菜单配置组件路径，例如/sys/views/menu'
        },
        width: 180
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '排序',
        key: 'orderNum',
        sortable: true,
        type: 'number'
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      }
    ]
  }
}
