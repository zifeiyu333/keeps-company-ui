import { request } from '@/api/service'
export function GetList (query) {
  return request({
    url: '/pk/user/query',
    method: 'get',
    params: query
  })
}

export function GetTermList (query) {
  return request({
    url: '/pk/user/queryUserTermList',
    method: 'get',
    params: query
  })
}
