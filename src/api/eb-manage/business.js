/* audit-user api */
import request from '@/utils/request'
const BASE_URL = '/omp/merchant'
const BASE_MERCHANT_B_URL = '/merchant/b'

//商户列表
export function getMerchantList(data) {
  return request({
    url: BASE_URL + '/merchant/page',
    method: 'get',
    data
  })
}
//根据ID删除商户
export function getMerchantDelApi(data) {
  return request({
    url: BASE_URL + '/merchant/delete',
    method: 'delete',
    data
  })
}

export function addMerchantApi(data) {
  return request({
    url: BASE_URL + '/merchant/create',
    method: 'post',
    data
  })
}

export function detailMerchantApi(data) {
  return request({
    url: BASE_URL + '/merchant/detail',
    method: 'get',
    data
  })
}

export function modifyMerchantApi(data) {
  return request({
    url: BASE_URL + '/merchant/update',
    method: 'put',
    data
  })
}
//商户营业或者关店
export function MerchantStatusApi(data) {
  return request({
    url: BASE_URL + '/merchant/updateMerchantStatus',
    method: 'get',
    data
  })
}
// privilege list
export function getPrivilegeList(data) {
  return request({
    url: `${BASE_MERCHANT_B_URL}/role/privilege/list`,
    method: 'get',
    data
  })
}
// privilege update
export function updateRolePrivilege(data) {
  return request({
    url: `${BASE_MERCHANT_B_URL}/role/privilege/update`,
    method: 'post',
    data
  })
}

// 重置诊所端超管密码
export function resetMerchantPwdApi(data) {
  return request({
    url: `${BASE_MERCHANT_B_URL}/staff/in/resetPassword`,
    method: 'post',
    data
  })
}
