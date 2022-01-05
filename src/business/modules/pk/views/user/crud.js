export const crudOptions = (vm) => {
  return {
    rowHandle: {
      width: 200,
      view: {
        show: false,
        order: 0, // 数字越小越排前面
        type: 'text',
        disabled: () => {
          return !vm.hasPermissions('pk:user:info')
        }
      },
      edit: {
        show: false
      },
      remove: {
        type: 'text',
        order: 11, // 数字越小越排前面
        style: { color: 'red' },
        disabled: () => {
          return !vm.hasPermissions('pk:user:delete')
        }
      },
      custom: [
        {
          text: '粉丝列表',
          type: 'text',
          size: 'small',
          emit: 'termList',
          order: 1 // 数字越小越排前面
        },
        {
          text: '充值',
          type: 'text',
          emit: 'recharge',
          order: 4 // 数字越小越排前面
        },
        {
          text: '钱包记录',
          type: 'text',
          emit: 'walletBill',
          order: 5 // 数字越小越排前面
        },
        {
          text: '总流水查询',
          type: 'text',
          emit: 'flowing',
          order: 6 // 数字越小越排前面
        },
        {
          text: '收款信息',
          type: 'text',
          emit: 'paymentInfo',
          order: 7 // 数字越小越排前面
        },
        {
          text: '变更推荐人',
          type: 'text',
          emit: 'inviter',
          order: 8 // 数字越小越排前面
        },
        {
          text: '设置VIP',
          type: 'text',
          emit: 'setVip',
          order: 9 // 数字越小越排前面
        },
        {
          text: '重置密码',
          type: 'text',
          emit: 'resetPassword',
          order: 10 // 数字越小越排前面
        },
        {
          text: '收获地址',
          type: 'text',
          emit: 'addr',
          order: 10 // 数字越小越排前面
        }
      ],
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '用户ID',
        key: 'userId',
        width: '80px',
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        },
        sortable: true
      },
      {
        title: '用户邮箱',
        key: 'email',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        },
        sortable: true
      },
      {
        title: '会员编号',
        key: 'userCode',
        width: '160px',
        search: { disabled: false },
        sortable: true
      },
      {
        title: '头像',
        key: 'headimgUrl',
        width: '120px',
        type: 'avatar-uploader',
        sortable: true
      },
      {
        title: '昵称',
        key: 'nickName',
        width: '120px',
        search: { disabled: false },
        sortable: true
      },
      {
        title: '手机号',
        key: 'phone',
        width: '120px',
        search: { disabled: false },
        sortable: true
      },
      {
        title: '所在地',
        key: 'areaname',
        search: { disabled: true }, // 开启查询
        form: {
          disabled: true,
          slot: true
        },
        sortable: true
      },
      {
        title: '上级会员信息',
        key: 'tuiUserCode',
        width: '220px',
        form: {
          disabled: true,
          slot: true
        },
        sortable: true,
        rowSlot: true
      },
      {
        title: '二级会员信息',
        key: 'tui1UserCode',
        width: '220px',
        disabled: false, // 隐藏列
        form: {
          disabled: true,
          slot: true
        },
        sortable: true,
        rowSlot: true
      },
      {
        title: '三级会员信息',
        key: 'tui2UserCode',
        width: '220px',
        disabled: false, // 隐藏列
        form: {
          disabled: true,
          slot: true
        },
        sortable: true,
        rowSlot: true
      },
      {
        title: '账户余额',
        key: 'rmb',
        type: 'number',
        width: '100px',
        readonly: true,
        sortable: true
      },
      {
        title: '提现金额',
        key: 'txrmb',
        width: '100px',
        formatter: function (row, column, cellValue, index) {
          return row.totalRmb - row.rmb
        },
        readonly: true,
        sortable: true
      },
      {
        title: '冻结',
        key: 'isBan',
        type: 'switch',
        sortable: true,
        width: '100px',
        search: {
          disabled: true
        },
        form: {
          component: {
            props: {
              activeValue: 1,
              inactiveValue: 0
            }
          }
        },
        component: {
          props: {
            activeValue: 1,
            inactiveValue: 0
          }
        }
      },
      {
        title: '是否VIP',
        key: 'isVip',
        type: 'select',
        width: '100px',
        sortable: true,
        dict: {
          data: [ // 本地数据字典
            { value: 0, label: '否' },
            { value: 1, label: '是' }
          ]
        }
      },
      {
        title: '',
        key: 'tui1UserLogo',
        width: '220px',
        disabled: true, // 隐藏列
        component: {
          show: false,
          disabled: true
        },
        form: {
          disabled: true,
          slot: true
        }
      },
      {
        title: '',
        key: 'tui1NickName',
        width: '220px',
        disabled: true, // 隐藏列
        component: {
          show: false,
          disabled: true
        },
        form: {
          disabled: true,
          slot: true
        }
      },
      {
        title: '',
        key: 'tui2UserLogo',
        width: '220px',
        disabled: true, // 隐藏列
        component: {
          show: false,
          disabled: true
        },
        form: {
          disabled: true,
          slot: true
        }
      },
      {
        title: '',
        key: 'tui2NickName',
        width: '220px',
        disabled: true, // 隐藏列
        component: {
          show: false,
          disabled: true
        },
        form: {
          disabled: true,
          slot: true
        }
      }
    ]
  }
}
