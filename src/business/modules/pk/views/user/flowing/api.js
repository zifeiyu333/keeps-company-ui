import { request } from '@/api/service'
const apiPrefix = '/pk/goodsweituolog'

export function GetFlowing (userCode, startTime, endTime) {
  return request({
    url: apiPrefix + '/getFlowing',
    method: 'get',
    params: {
      userCode: userCode,
      startTime: startTime,
      endTime: endTime
    }
  })
}
