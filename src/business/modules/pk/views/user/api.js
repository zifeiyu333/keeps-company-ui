import { request } from '@/api/service'
const apiPrefix = '/pk/user'
export function GetList (query) {
  return request({
    url: apiPrefix + '/query',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: apiPrefix + '/update',
    method: 'put',
    data: obj
  })
}

export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete/' + id,
    method: 'delete'
  })
}

export function GetObj (id) {
  return request({
    url: apiPrefix + '/info/' + id,
    method: 'get'
  })
}

export function Recharge (userCode, amount) {
  return request({
    url: apiPrefix + '/recharge',
    method: 'put',
    data: { userCode: userCode, amount: amount }
  })
}

export function ResetPassword (userCode, password) {
  return request({
    url: apiPrefix + '/resetPassword',
    method: 'put',
    data: { userCode: userCode, password: password }
  })
}

export function UpdateInviter (userCode, inviterUserCode, cleanInviter) {
  return request({
    url: apiPrefix + '/updateInviter',
    method: 'put',
    data: { userCode: userCode, inviterUserCode: inviterUserCode, cleanInviter: cleanInviter }
  })
}

export function UpdateRowField (userCode, value, field) {
  return request({
    url: apiPrefix + '/updateRowField',
    method: 'post',
    params: { userCode: userCode, value: value, field: field }
  })
}
