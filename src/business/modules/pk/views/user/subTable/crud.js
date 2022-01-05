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
    columns: [
      {
        title: '会员ID',
        key: 'userId',
        sortable: true,
        form: { disabled: true }
      },
      {
        title: '会员头像',
        key: 'headimgUrl',
        type: 'avatar-uploader',
        search: { disabled: true },
        sortable: true
      },
      {
        title: '会员手机号',
        key: 'phone',
        search: {
          disabled: false
        },
        show () {
          return (vm.queryType === 2)
        },
        sortable: true
      },
      {
        title: '会员编号',
        key: 'userCode',
        search: { disabled: true },
        sortable: true
      },
      {
        title: '会员昵称',
        key: 'nickName',
        search: { disabled: false },
        sortable: true
      },
      {
        title: '会员级别',
        key: 'level',
        search: { disabled: true },
        show () {
          return (vm.queryType === 1)
        },
        sortable: true
      },
      {
        title: '购买次数',
        key: 'isBuy',
        search: { disabled: true },
        sortable: true
      }
    ]
  }
}
