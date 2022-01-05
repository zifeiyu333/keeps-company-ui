export const crudOptions = (vm) => {
  return {
    rowHandle: {
      width: '150px',
      view: {
        show: () => {
          return !vm.hasPermissions('hz:store:view')
        }
      },
      edit: {
        text (scope) {
          return '编辑'
        },
        emit: 'custom-update',
        show: (index, row) => {
          return false
        },
        disabled: () => {
          return true
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('hz:store:delete')
        }
      },
      custom: [
        {
          show: (index, row) => {
            return true
          },
          disabled: () => {
            return !vm.hasPermissions('hz:store:update')
          },
          text: '编辑',
          icon: 'el-icon-edit', // 按钮图标，↓↓↓↓也可以传入一个方法↓↓↓↓
          type: 'success',
          size: 'small',
          emit: 'custom-update',
          order: 1 // 数字越小越排前面
        }
      ],
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    formOptions: { // 编辑对话框及el-form的配置
      type: 'dialog', // 默认对话框模式，drawer 抽屉模式
      size: '50%', // 抽屉模式的宽度
      fullscreen: false, // 全屏按钮，传null则隐藏全屏按钮，抽屉模式请隐藏
      draggable: true, // 是否支持表单对话框拖拽，抽屉模式请关闭
      saveRemind: true, // 有修改时是否需要保存提醒，也可以传入一个方法，自定义确认对话框，()=> return vm.$confirm({})
      labelWidth: '100px',
      labelPosition: 'left',
      saveLoading: false,
      gutter: 20,
      maxHeight: true, // 对话框内部显示滚动条
      defaultSpan: 12, // 默认表单字段所占宽度
      updateTableDataAfterEdit: false // 添加和删除提交后，是否直接更新本地table的数据，默认会自动刷新表格，所以不需要更新本地数据
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 100,
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        },
        sortable: true
      },
      {
        title: '店铺',
        key: 'storeSn',
        width: 160,
        search: {
          disabled: false,
          slot: true
        },
        form: {
          slot: true,
          component: {
            show: false
          }
        },
        rowSlot: true,
        sortable: true
      },
      {
        title: '绑定会员信息',
        key: 'personInfo',
        width: 260,
        search: { disabled: false }, // 开启查询
        rowSlot: true,
        form: {
          component: {
            show: false
          }
        },
        sortable: true
      },
      {
        title: '店铺信息',
        key: 'storeInfo',
        width: 260,
        rowSlot: true,
        form: {
          slot: true,
          component: {
            show: false
          }
        },
        sortable: true
      },
      {
        title: '认证信息',
        key: 'certificationInformation',
        width: 260,
        rowSlot: true,
        form: { // 表单配置
          component: {
            show: false
          }
        },
        sortable: true
      },
      {
        title: '标签',
        key: 'tags',
        width: 200,
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '所在地',
        key: 'locationAddress',
        width: 200,
        search: { disabled: false }, // 开启查询
        form: { // 表单配置
        },
        rowSlot: true,
        formatter (row, column, value, index) {
          return value + ';' + row.locationDetailedAddress
        },
        sortable: true
      },
      {
        title: '共享卡出现频次',
        key: 'sharedCardNum',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入共享卡出现频次' }]
        },
        sortable: true
      },
      {
        title: '门店邀请人',
        width: '120px',
        key: 'invitePersonInfo',
        search: { disabled: false }, // 开启查询
        rowSlot: true,
        form: {
          component: {
            show: false
          }
        },
        sortable: true
      },
      {
        title: '微信/QQ',
        key: 'wx',
        width: '120px',
        form: { // 表单配置
        },
        formatter (row, column, value, index) {
          return value + '/' + row.qq
        },
        sortable: true
      },
      {
        title: '经纬度',
        key: 'lng',
        width: '120px',
        form: { // 表单配置
        },
        formatter (row, column, value, index) {
          return value + ',' + row.lat
        },
        sortable: true
      },
      {
        title: '状态',
        key: 'status',
        width: '100px',
        type: 'select',
        search: { disabled: false }, // 开启查询
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
            { value: 0, label: '禁用' },
            { value: 1, label: '启用' },
            { value: 2, label: '停业' }
          ]
        },
        sortable: true
      },
      {
        title: '审核状态',
        key: 'isCheck',
        width: '100px',
        type: 'select',
        // dict: { url: ''}, //数据字典
        search: { disabled: false }, // 开启查询
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
        title: '审核备注',
        key: 'checkRemarks',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入审核备注' }]
        },
        sortable: true
      },
      {
        title: '顺序',
        key: 'orderNum',
        form: { // 表单配置
        },
        sortable: true
      }
    ]
  }
}
