import { request } from '@/api/service'
const apiPrefix = '/pk/user'

export function ClearPayment (type, userCode) {
  return request({
    url: apiPrefix + '/clearPayment',
    method: 'post',
    data: {
      type: type,
      userCode: userCode
    }
  })
}

export function GetObj (userCode) {
  return request({
    url: apiPrefix + '/infoByUserCode/' + userCode,
    method: 'get'
  })
}
