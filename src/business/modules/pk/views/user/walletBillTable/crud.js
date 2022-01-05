export const crudOptions = {
  rowHandle: {
    width: '100px',
    edit: {
      show: false
    },
    remove: {
      show: false
    }
  },
  formOptions: {
    appendToBody: true // 子表格必须 否则弹出对话框无法显示最顶层
  },
  options: {
    height: '500px', // 子表格必须设置高度， 你也可以在这里设置100%，然后给子表格外面包一层有高度的div
    highlightCurrentRow: true,
    rowKey: 'userId'
  },
  columns: [
    {
      title: '内容',
      key: 'content',
      search: { disabled: true },
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
      form: { // 表单配置
      },
      sortable: true
    },
    {
      title: '创建时间',
      key: 'addTime',
      type: 'date',
      rowSlot: true,
      form: {
        slot: true,
        formatter: function (row, column, cellValue, index) {
          // return cellValue * 1000
        }
      },
      sortable: true
    },
    {
      title: '数据类型',
      key: 'logType',
      type: 'select',
      width: '100px',
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
          { value: 1, label: '提现' },
          { value: 2, label: '佣金' }
        ]
      },
      sortable: true
    },
    {
      title: '状态',
      key: 'isFafang',
      width: '100px',
      formatter (row, column, value, index) {
        if (row.logType === 2) {
          return '已返佣'
        } else {
          if (value === 0) {
            return '待审核'
          } else if (value === 1) {
            return '审核通过'
          } else if (value === 2) {
            return '未通过'
          }
        }
      },
      sortable: true
    },
    {
      title: '备注',
      key: 'memo',
      form: { // 表单配置
      },
      sortable: true
    }
  ]
}
