import { request } from '@/api/service'
export function GetList (query) {
  return request({
    url: '/pk/userlog/query',
    method: 'get',
    params: query
  })
}
