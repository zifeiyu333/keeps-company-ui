import { request } from '@/api/service'
const apiPrefix = '/pk/statistics'
export function Index () {
  return request({
    url: apiPrefix + '/index',
    method: 'get'
  })
}
export function Line (statisticsDate) {
  return request({
    url: apiPrefix + '/line?statisticsDate=' + statisticsDate,
    method: 'get'
  })
}
