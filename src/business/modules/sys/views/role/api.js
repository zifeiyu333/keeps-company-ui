import { request } from '@/api/service'
const apiPrefix = '/sys/role'
export function GetList (query) {
  return request({
    url: apiPrefix + '/query',
    method: 'get',
    params: query
  })
}

export function GetAllList (query) {
  return request({
    url: apiPrefix + '/select',
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
export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取角色权限资源
 * @param roleId
 * @returns {*}
 * @constructor
 */
export function QueryMenuIdList (roleId) {
  return request({
    url: apiPrefix + '/queryMenuIdList',
    method: 'get',
    params: { roleId }
  })
}

/**
 * 授权
 * @param roleId
 * @param menuIds
 * @returns {*}
 * @constructor
 */
export function DoAuthz (roleId, menuIds) {
  return request({
    url: apiPrefix + '/authz',
    method: 'post',
    params: { roleId },
    data: menuIds
  })
}
