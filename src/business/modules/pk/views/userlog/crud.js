export const crudOptions = (vm) => {
  return {
    rowHandle: {
      edit: {
        show: false
      },
      remove: {
        show: false
      },
      custom: [
        {
          show: (index, row) => {
            return row.isFafang === 0
          },
          text: '发放',
          type: 'success',
          size: 'small',
          emit: 'applyOk',
          order: 1 // 数字越小越排前面
        },
        {
          show: (index, row) => {
            return row.isFafang === 0
          },
          text: '拒绝',
          type: 'danger',
          size: 'small',
          emit: 'applyNo',
          order: 2 // 数字越小越排前面
        }
      ],
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '记录ID',
        key: 'logId',
        width: '80px',
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
        title: '用户编号',
        key: 'userCode',
        search: { disabled: false },
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '用户头像',
        key: 'userLogo',
        width: '120px',
        type: 'avatar-uploader',
        sortable: true
      },
      {
        title: '用户昵称',
        key: 'nickName',
        search: { disabled: false },
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '内容',
        key: 'content',
        search: { disabled: false },
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '金额',
        key: 'rmb',
        width: '100px',
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '实际金额',
        key: 'shijiRmb',
        width: '100px',
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
        title: '创建时间',
        key: 'addTime',
        type: 'date',
        rowSlot: true,
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: {
          slot: true,
          formatter: function (row, column, cellValue, index) {
            // return cellValue * 1000
          }
        },
        sortable: true
      },
      {
        title: '审核状态',
        key: 'isFafang',
        width: '100px',
        type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
          component: {
            name: 'dict-select',
            props: {
              elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
                filterable: true,
                clearable: true
              }
            }
          }
        },
        dict: {
          data: [ // 本地数据字典
            { value: 0, label: '待审核' },
            { value: 1, label: '已审核' },
            { value: 2, label: '未通过' }
          ]
        },
        sortable: true
      },
      {
        title: '备注',
        key: 'memo',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      }
    ]
  }
}
