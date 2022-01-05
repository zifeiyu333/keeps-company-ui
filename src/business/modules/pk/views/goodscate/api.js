import { request } from '@/api/service'
const apiPrefix = '/pk/goodscate'
export function GetList (query) {
  return request({
    url: apiPrefix + '/query',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: apiPrefix + '/create',
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

export function UpdateRowField (cateCode, value, field) {
  return request({
    url: apiPrefix + '/updateRowField',
    method: 'post',
    params: { cateCode: cateCode, value: value, field: field }
  })
}
