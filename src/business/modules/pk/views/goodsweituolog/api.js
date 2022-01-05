import { request } from '@/api/service'
const apiPrefix = '/pk/goodsweituolog'
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

export function RestOrder (id) {
  return request({
    url: apiPrefix + '/restOrder/' + id,
    method: 'post'
  })
}

export function CollectedPay (id) {
  return request({
    url: apiPrefix + '/collectedPay/' + id,
    method: 'post'
  })
}

export function GetObj (id) {
  return request({
    url: apiPrefix + '/info/' + id,
    method: 'get'
  })
}

export function WeituoOrder (id, weituoPrice) {
  return request({
    url: apiPrefix + '/weituoOrder',
    method: 'post',
    data: { id: id, weituoPrice: weituoPrice }
  })
}

export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete/' + id,
    method: 'delete'
  })
}
