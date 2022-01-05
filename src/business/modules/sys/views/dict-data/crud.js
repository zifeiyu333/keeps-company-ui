import { request } from '@/api/service'
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
          return !vm.hasPermissions('sys:dictdata:info')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dictdata:update')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dictdata:delete')
        }
      }
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        sortable: true,
        width: 100,
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '字典类型',
        key: 'dictId',
        search: { disabled: false }, // 开启查询
        sortable: true,
        type: 'select',
        dict: {
          url: '/sys/dict/all',
          value: 'id',
          label: 'dictName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return ret
            })
          }
        },
        form: {
          rules: [
            { required: true, message: '请选择字典类型' }
          ]
        }
      },
      {
        title: '字典标签',
        key: 'label',
        sortable: true, // 开启查询
        form: {
          rules: [
            { required: true, message: '请填写字典标签' }
          ]
        }
      },
      {
        title: '字典值',
        key: 'value',
        type: 'number',
        sortable: true, // 开启查询
        form: {
          rules: [
            { required: true, message: '请填写字典值' }
          ]
        }
      },
      {
        title: '颜色',
        key: 'color',
        sortable: true
      },
      {
        title: '状态',
        key: 'status',
        search: { disabled: false }, // 开启查询
        type: 'select',
        dict: {
          data: [
            { value: 1, label: '启用' }, { value: 0, label: '禁用', color: 'danger' }
          ]
        }, // 数据字典
        // disabled: false //是否隐藏列
        sortable: true,
        form: {
          rules: [
            { required: true, message: '请选择状态' }
          ]
        }
      },
      {
        title: '备注',
        key: 'remark',
        search: { disabled: false },
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
