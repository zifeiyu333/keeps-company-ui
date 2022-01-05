import { request } from '@/api/service'
const apiPrefix = '/pk/user'

export function UpdateVipObj (obj, userCode) {
  obj.userCode = userCode
  return request({
    url: apiPrefix + '/updateVip',
    method: 'post',
    data: obj
  })
}

export function GetObj (userCode) {
  return request({
    url: apiPrefix + '/infoByUserCode/' + userCode,
    method: 'get'
  })
}
