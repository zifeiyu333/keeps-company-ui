export const crudOptions = (vm) => { // 这里改成一个Function
  return {
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
    pagination: false,
    columns: [
      {
        title: '收件人',
        key: 'name',
        search: { disabled: true },
        sortable: true
      },
      {
        title: '手机号',
        key: 'phone',
        search: { disabled: true },
        sortable: true
      },
      {
        title: '所在地',
        key: 'areaname',
        search: { disabled: true },
        sortable: true
      },
      {
        title: '详细地址',
        key: 'addr',
        search: { disabled: true },
        sortable: true
      }
    ]
  }
}
