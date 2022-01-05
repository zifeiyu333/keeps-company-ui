import { request } from '@/api/service'
const apiPrefix = '/pk/userlog'
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

export function applyOkObj (id) {
  return request({
    url: apiPrefix + '/applyOk/' + id,
    method: 'put'
  })
}

export function applyNoObj (id, value) {
  return request({
    url: apiPrefix + '/applyNo/' + id,
    method: 'put',
    data: { memo: value }
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
