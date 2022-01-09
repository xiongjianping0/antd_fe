/* audit-user api */
import request from '@/utils/request'
const BASE_OMP_CLINIC_URL = '/omp/clinic'

export function getUserListApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/page`,
    method: 'get',
    data
  })
}

export function addUserApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/create`,
    method: 'post',
    data
  })
}

export function modifyUserApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/update`,
    method: 'put',
    data
  })
}

export function deleteUserApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/delete`,
    method: 'delete',
    data
  })
}

export function resetUserPwdApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/resetPassword`,
    method: 'post',
    data
  })
}

export function getUserDetailApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/detail`,
    method: 'get',
    data
  })
}
