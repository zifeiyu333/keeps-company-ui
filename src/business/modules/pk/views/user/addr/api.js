import { request } from '@/api/service'
export function QueryPage (query) {
  return request({
    url: '/pk/useraddr/query',
    method: 'get',
    params: query
  })
}
