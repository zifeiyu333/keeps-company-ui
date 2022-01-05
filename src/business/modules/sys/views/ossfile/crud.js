export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('sys:ossfile:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('sys:ossfile:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('sys:ossfile:delete')
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
        title: '存储类型，1七牛，2阿里云，3腾讯云，4本地存储',
        key: 'storageType',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入存储类型，1七牛，2阿里云，3腾讯云，4本地存储' }]
        },
        sortable: true
      },
      {
        title: '文档存放目录id',
        key: 'groupId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入文档存放目录id' }]
        },
        sortable: true
      },
      {
        title: '存储域名',
        key: 'fileUrl',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入存储域名' }]
        },
        sortable: true
      },
      {
        title: '文件名',
        key: 'fileName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入文件名' }]
        },
        sortable: true
      },
      {
        title: '文件类型',
        key: 'fileType',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入文件类型' }]
        },
        sortable: true
      },
      {
        title: '文件大小',
        key: 'fileSize',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入文件大小' }]
        },
        sortable: true
      },
      {
        title: '存档名',
        key: 'archiveName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入存档名' }]
        },
        sortable: true
      },
      {
        title: '视频/长度，文件字数扩展字段',
        key: 'leng',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入视频/长度，文件字数扩展字段' }]
        },
        sortable: true
      },
      {
        title: '备注描述',
        key: 'remark',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入备注描述' }]
        },
        sortable: true
      },
      {
        title: '0未审核，1审核通过，2不通过',
        key: 'isReview',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入0未审核，1审核通过，2不通过' }]
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
