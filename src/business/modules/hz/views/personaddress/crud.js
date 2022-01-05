export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        disabled: () => {
          return !vm.hasPermissions('hz:personaddress:add')
        }
      },
      edit: {
        disabled: () => {
          return !vm.hasPermissions('hz:personaddress:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('hz:personaddress:delete')
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
        title: '会员ID',
        key: 'personId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入会员ID' }]
        },
        sortable: true
      },
      {
        title: '所在省份id',
        key: 'provinceId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入所在省份id' }]
        },
        sortable: true
      },
      {
        title: '所在城市id',
        key: 'cityId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入所在城市id' }]
        },
        sortable: true
      },
      {
        title: '所在区id',
        key: 'countyId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入所在区id' }]
        },
        sortable: true
      },
      {
        title: '地区组合-分割如河南省-郑州市-中原区',
        key: 'address',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入地区组合-分割如河南省-郑州市-中原区' }]
        },
        sortable: true
      },
      {
        title: '详细地址',
        key: 'detailedAddress',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入详细地址' }]
        },
        sortable: true
      },
      {
        title: '联系电话',
        key: 'phone',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入联系电话' }]
        },
        sortable: true
      },
      {
        title: '联系人姓名',
        key: 'name',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入联系人姓名' }]
        },
        sortable: true
      },
      {
        title: '是否默认 1是 0否',
        key: 'isDefault',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入是否默认 1是 0否' }]
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
        title: '客户代码',
        key: 'clentId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入客户代码' }]
        },
        sortable: true
      },
      {
        title: '小程序ID',
        key: 'appId',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入小程序ID' }]
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
      }
    ]
  }
}
