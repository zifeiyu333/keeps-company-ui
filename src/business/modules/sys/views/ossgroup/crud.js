export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('sys:ossgroup:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('sys:ossgroup:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('sys:ossgroup:delete')
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
        title: '该组允许上传类型，1都行，2图片，3视频，4文件',
        key: 'uploadType',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入该组允许上传类型，1都行，2图片，3视频，4文件' }]
        },
        sortable: true
      },
      {
        title: '上级节点',
        key: 'parentId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入上级节点' }]
        },
        sortable: true
      },
      {
        title: '文档目录名称',
        key: 'name',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入文档目录名称' }]
        },
        sortable: true
      },
      {
        title: '是否删除0是，1否',
        key: 'isDelete',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入是否删除0是，1否' }]
        },
        sortable: true
      },
      {
        title: '是否为系统保留，1是，0否',
        key: 'isSystem',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入是否为系统保留，1是，0否' }]
        },
        sortable: true
      },
      {
        title: '系统编号',
        key: 'systemId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入系统编号' }]
        },
        sortable: true
      },
      {
        title: '客户编号',
        key: 'clentId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入客户编号' }]
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
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入创建时间' }]
        },
        sortable: true
      },
      {
        title: '创建人id',
        key: 'crtUser',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入创建人id' }]
        },
        sortable: true
      },
      {
        title: '创建人名称',
        key: 'crtName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入创建人名称' }]
        },
        sortable: true
      },
      {
        title: '创建IP',
        key: 'crtHost',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入创建IP' }]
        },
        sortable: true
      },
      {
        title: '更新时间',
        key: 'updTime',
        type: 'datetime',
        width: 152,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入更新时间' }]
        },
        sortable: true
      },
      {
        title: '更新人id',
        key: 'updUser',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入更新人id' }]
        },
        sortable: true
      },
      {
        title: '更新人名称',
        key: 'updName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入更新人名称' }]
        },
        sortable: true
      },
      {
        title: '更新IP',
        key: 'updHost',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入更新IP' }]
        },
        sortable: true
      }
    ]
  }
}
