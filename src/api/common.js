/* common api */
import request from '@/utils/request'
const BASE_OMP_CLINIC_URL = '/omp/clinic'

// commonInfo
/* export function getCommonInfo() {
  return request({
    url: '/common/info',
    method: 'get'
  })
} */
// verify user permission
/* export function getPagePermassion(data) {
  return request({
    url: '/perms',
    method: 'get',
    data
  })
} */
// curUserInfo
export function getCurUserInfo() {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/info`,
    method: 'get'
  })
}
// province
export function getProvince() {
  return request({
    url: '/pcz/province/list',
    method: 'get'
  })
}
// city
export function getCity(data) {
  return request({
    url: '/pcz/city/list',
    method: 'get',
    data
  })
}
// zone
export function getZone(data) {
  return request({
    url: '/pcz/zone/list',
    method: 'get',
    data
  })
}
