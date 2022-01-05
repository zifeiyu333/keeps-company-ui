export const crudOptions = (vm) => {
  return {
    rowHandle: {
      width: '150px',
      view: {
        disabled: () => {
          return !vm.hasPermissions('hz:person:add')
        }
      },
      edit: {
        show: (index, row) => {
          return false
        },
        disabled: () => {
          return !vm.hasPermissions('hz:person:update')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('hz:person:delete')
        }
      },
      fixed: 'right'
    },
    options: {
      height: '100%'
    },
    columns: [
      {
        title: '编号',
        key: 'id',
        width: 80,
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
        title: '会员编号',
        key: 'personSn',
        width: 150,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入会员编号' }]
        },
        sortable: true
      },
      {
        title: '用户名',
        width: 150,
        key: 'userName',
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '真实姓名',
        key: 'realName',
        form: {
        },
        sortable: true
      },
      {
        title: '昵称',
        key: 'nickName',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入昵称' }]
        },
        sortable: true
      },
      {
        title: '手机号',
        key: 'phone',
        width: 150,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入手机号' }]
        },
        sortable: true
      },
      {
        title: '性别',
        key: 'gender',
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
          data: [
            { value: 0, label: '未知' },
            { value: 1, label: '男' },
            { value: 2, label: '女' }
          ]
        },
        sortable: true
      },
      {
        title: '出生年月日',
        key: 'birthday',
        type: 'datetime',
        width: 152,
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入出生年月日' }]
        },
        sortable: true
      },
      {
        title: '显示头像',
        key: 'avatar',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入显示头像' }]
        },
        sortable: true
      },
      {
        title: '所在地',
        key: 'address',
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '详细地址',
        key: 'detailedAddress',
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '用户状态',
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
          data: [
            { value: 1, label: '正常' },
            { value: 2, label: '禁用' },
            { value: 3, label: '注销' }
          ]
        },
        sortable: true
      },
      {
        title: '分享次数',
        key: 'shareNum',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入分享次数' }]
        },
        sortable: true
      },
      {
        title: '用户星级',
        key: 'stars',
        sortable: true
      },
      {
        title: '邀请人',
        key: 'inviter',
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '微信号',
        key: 'wechatCode',
        sortable: true
      },
      {
        title: 'QQ号',
        key: 'qqCode',
        sortable: true
      },
      {
        title: '支付宝',
        key: 'alipayCode',
        sortable: true
      },
      {
        title: '银行卡',
        key: 'bankCode',
        sortable: true
      },
      {
        title: '开户行',
        key: 'bank',
        sortable: true
      },
      {
        title: '注册来源',
        key: 'dataSource',
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
          data: [
            { value: 1, label: '小程序' },
            { value: 2, label: '公众号' },
            { value: 3, label: 'android' }
          ]
        },
        sortable: true
      },
      {
        title: '实名状态',
        key: 'identityCheckStatus',
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
          data: [
            { value: 0, label: '未审核' },
            { value: 1, label: '待审核' },
            { value: 2, label: '通过' },
            { value: 3, label: '不通过' }
          ]
        },
        sortable: true
      },
      {
        title: '审核备注',
        key: 'identityCheckRemarks',
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
        title: '身份证号',
        key: 'idCardNo',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入身份证号' }]
        },
        sortable: true
      },
      {
        title: '身份证正面',
        key: 'idCardFront',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入身份证正面' }]
        },
        sortable: true
      },
      {
        title: '身份证反面',
        key: 'idCardReverse',
        // type: 'select',
        // dict: { url: ''}, //数据字典
        // search: { disabled: false }, // 开启查询
        // disabled: true, // 隐藏列
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入身份证反面' }]
        },
        sortable: true
      },
      {
        title: '注册时间',
        key: 'crtTime',
        type: 'datetime',
        width: 152,
        form: { // 表单配置
        },
        sortable: true
      },
      {
        title: '注册IP',
        key: 'crtHost',
        sortable: true
      },
      {
        title: '用户登录时间',
        key: 'lastLoginTime',
        type: 'datetime',
        width: 152,
        form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入用户登录时间' }]
        },
        sortable: true
      },
      {
        title: '用户登录IP',
        key: 'lastLoginIp',
        sortable: true
      },
      {
        title: '微信小程序openid',
        key: 'wxMaOpenid',
        sortable: true
      },
      {
        title: '微信公众号openid',
        key: 'wxMpOpenid',
        sortable: true
      },
      {
        title: '微信开放平台',
        key: 'wxUnionid',
        sortable: true
      },
      {
        title: '团队长',
        key: 'isLeader',
        width: '80px',
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
          data: [
            { value: 1, label: '是' },
            { value: 0, label: '否' }
          ]
        },
        sortable: true
      },
      {
        title: '团队长卡号',
        key: 'leaderCardNo',
        sortable: true
      },
      {
        title: 'VIP人数',
        key: 'vipNum',
        sortable: true
      },
      {
        title: 'SVIP人数',
        key: 'svipNum',
        sortable: true
      },
      {
        title: '总人数',
        key: 'totalNum',
        sortable: true
      },
      {
        title: '数据汇总',
        key: 'hz',
        width: '80px',
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
          data: [
            { value: 1, label: '是' },
            { value: 0, label: '否' }
          ]
        },
        sortable: true
      }
    ]
  }
}
