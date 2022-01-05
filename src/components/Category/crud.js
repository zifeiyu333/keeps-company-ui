import { request } from '@/api/service'
import * as commFilter from '@/filters/commFilter'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('sys:category:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('sys:category:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('sys:category:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      rowKey: 'id'
    },
    pagination: false,
    columns: [
      {
        title: '名称',
        key: 'name',
        search: { disabled: false }, // 开启查询
        form: { // 表单配置
          rules: [{ required: true, message: '请输入分类名称' }]
        },
        sortable: true
      },
      // {
      //   title: '编号',
      //   key: 'code',
      //   form: { // 表单配置
      //     rules: [{ required: true, message: '请输入分类编号' }]
      //   },
      //   sortable: true
      // },
      {
        title: '父节点',
        key: 'pid',
        sortable: true,
        width: 100,
        type: 'tree-selector',
        dict: {
          url: '/sys/category/queryTree',
          isTree: true,
          value: 'id',
          label: 'name',
          getData: (url) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url, params: { type: vm.biztype.value } }).then(ret => {
              return [{ id: 0, name: '根节点', children: ret.data }]
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
        title: '类型',
        key: 'type',
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        },
        // valueBuilder (row) {
        //   row.type = commFilter.filterCategroyType(row.type)
        // },
        formatter (row, column, value, index) {
          return commFilter.filterCategroyType(row.type)
        },
        sortable: true
      },
      {
        title: '分类图标',
        key: 'extra',
        type: 'avatar-uploader',
        component: {
          props: {
            error: 'slot'
          },
          slots: {
            // jsx 自定义错误展示
            error: (h, scope) => {
              return (<i class="el-icon-picture-outline" style='font-size:20px'/>)
            }
          }
        },
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '状态',
        key: 'status',
        type: 'select',
        dict: {
          url: '/sys/dictdata/status',
          value: 'id',
          label: 'label',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return ret
            })
          }
        },
        form: { // 表单配置
          rules: [{ required: true, message: '请选择数据状态' }],
          value: 1
        },
        sortable: true
      },
      {
        title: '排序',
        key: 'orderNum',
        sortable: true,
        form: { // 表单配置
          rules: [{ required: true, message: '请输入排序' }],
          value: 99
        },
        type: 'number'
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
          disabled: true
        },
        sortable: true
      }
    ]
  }
}
