/* audit-role api */
import request from '@/utils/request'
const BASE_OMP_CLINIC_URL = '/omp/clinic'

// roles list
export function rolePageListApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/page`,
    method: 'get',
    data
  })
}

// roles list
export function roleListApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/list`,
    method: 'get',
    data
  })
}

// roles add
export function addRoleApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/create`,
    method: 'post',
    data
  })
}

// roles modify
export function modifyRoleApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/update`,
    method: 'put',
    data
  })
}

// roles delete
export function deleteRoleApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/delete`,
    method: 'delete',
    data
  })
}

// roles detail
export function getRoleDetailApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/detail`,
    method: 'get',
    data
  })
}

// privilege list
export function getRolePrivilegeListApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/omp/privilege/list`,
    method: 'get',
    data
  })
}

// privilege update
export function updateRolePrivilegeApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/role/omp/privilege/update`,
    method: 'post',
    data
  })
}
