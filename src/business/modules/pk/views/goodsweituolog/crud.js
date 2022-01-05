import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      width: '200px',
      view: {
        size: 'mini'
      },
      edit: {
        show: false
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('pk:goodsweituolog:delete')
        }
      },
      custom: [
        {
          show: (index, row) => {
            return row.status !== 0 && row.status !== 6
          },
          text: '重置',
          type: 'danger',
          size: 'mini',
          emit: 'rest',
          order: 1 // 数字越小越排前面
        },
        {
          show: (index, row) => {
            return row.status === 4
          },
          text: '委托',
          type: 'success',
          size: 'mini',
          emit: 'weituo',
          order: 1 // 数字越小越排前面
        }
      ],
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '订单ID',
        key: 'goodsId',
        width: '80px',
        sortable: true
      },
      {
        title: '商品分类',
        key: 'cateCode',
        width: '120px',
        search: { disabled: false }, // 开启查询
        type: 'select',
        show: false,
        dict: {
          url: '/pk/goodscate/all',
          value: 'cateCode',
          label: 'cateName',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return ret
            })
          }
        },
        form: { // 表单配置
          rules: [{ required: true, message: '请选择分类' }]
        },
        sortable: true
      },
      {
        title: '',
        key: 'buyTel',
        search: {
          disabled: false,
          slot: true
        },
        show: false
      },
      {
        title: '商品基本信息',
        key: 'goodsInfo',
        // valueBuilder (row) {
        //   row.goodsImg = process.env.VUE_APP_DOMAIN_URL + row.goodsImg
        // },
        rowSlot: true,
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '委托价/商品价/手续费',
        key: 'weituoPrice',
        width: '150px',
        rowSlot: true,
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '卖家',
        key: 'sellerUserInfo',
        rowSlot: true,
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '买家',
        key: 'buyUserInfo',
        rowSlot: true,
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '交易状态',
        key: 'status',
        type: 'select',
        width: '130px',
        form: { // 表单配置
        },
        dict: {
          data: [ // 本地数据字典
            { value: 0, label: '已取消/删除' },
            { value: 1, label: '待买家付款' },
            { value: 2, label: '待卖家确认' },
            { value: 3, label: '卖家投诉未付款' },
            { value: 4, label: '已付款，待委托/提货' },
            { value: 5, label: '已委托' },
            { value: 6, label: '已提货' }
          ]
        },
        sortable: true
      },
      {
        title: '创建时间',
        key: 'addTime',
        type: 'date',
        rowSlot: true,
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '推广',
        key: 'tuiInfo',
        rowSlot: true,
        form: { // 表单配置
          slot: true
        },
        sortable: true
      },
      {
        title: '是否新购',
        key: 'isNewBuy',
        type: 'select',
        width: '100px',
        sortable: true,
        dict: {
          data: [ // 本地数据字典
            { value: 0, label: '否' },
            { value: 1, label: '是' }
          ]
        }
      }
    ]
  }
}
