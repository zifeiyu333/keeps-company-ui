import { request } from '@/api/service'
export function GetList (query) {
  return request({
    url: '/pk/statistics/getOnlineList',
    method: 'get',
    params: query
  })
}
