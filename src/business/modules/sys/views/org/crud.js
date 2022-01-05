import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('sys:org:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('sys:org:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('sys:org:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '机构编号',
        key: 'orgNo',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        disabled: false,
        sortable: true
      },
      {
        title: '机构名称',
        key: 'orgName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入机构名称' }]
        },
        sortable: true
      },
      {
        title: '上级机构',
        key: 'parentNo',
        type: 'tree-selector',
        dict: {
          url: '/sys/org/queryTree?orgNo=',
          isTree: true,
          value: 'orgNo',
          label: 'orgName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return [{ orgNo: '0', orgName: '根节点', children: ret.data }]
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
        },
        // formatter (row, column, value, index) {
        //   if (row.parentOrgName !== undefined) {
        //     return row.parentOrgName
        //   }
        //   return '无'
        // },
        // valueBuilder (row, key) {
        //   if (row.parentOrgName !== undefined) {
        //     return row.parentOrgName
        //   }
        //   return '无'
        // },
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
        title: '排序',
        key: 'orderNum',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
          rules: [{ required: true, message: '请输入排序' }]
        },
        sortable: true
      },
      {
        title: '创建时间',
        key: 'crtTime',
        type: 'datetime',
        width: 152,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入创建时间' }]
        },
        sortable: true
      }
    ]
  }
}
