import { request } from './service'
const apiPrefix = '/sys/ossfile'
export function GetList (query) {
  return request({
    url: apiPrefix + '/query',
    method: 'get',
    params: query
  })
}

export function upload (formData, obj) {
  return request({
    url: apiPrefix + '/upload',
    method: 'post',
    params: obj,
    data: formData
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

export function OssMoveApi (obj) {
  return request({
    url: apiPrefix + '/updateOfType',
    method: 'put',
    params: obj
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
