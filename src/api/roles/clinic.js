/* roles-clinic api */
import request from '@/utils/request'
const BASE_CLINICADMIN_URL = '/clinicAdmin'

// roles list
export function roleListApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/page`,
    method: 'get',
    data
  })
}

// roles add
export function addRoleApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/create`,
    method: 'post',
    data
  })
}

// roles modify
export function modifyRoleApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/update`,
    method: 'put',
    data
  })
}

// roles delete
export function deleteRoleApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/delete`,
    method: 'delete',
    data
  })
}

// roles detail
export function getRoleDetailApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/detail`,
    method: 'get',
    data
  })
}

/* // privilege list
export function getPrivilegeList(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/privilege/list`,
    method: 'get',
    data
  })
}

// privilege update
export function updateRolePrivilege(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/role/privilege/update`,
    method: 'post',
    data
  })
} */
