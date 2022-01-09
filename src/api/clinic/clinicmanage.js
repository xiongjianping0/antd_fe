/* clinicmanage api */
import request from '@/utils/request'
const BASE_URL = '/omp/clinic'
const BASE_CLINICADMIN_URL = '/clinicAdmin'

//获取诊所分页列表
export function getClinicmanageListApi(data) {
  return request({
    url: BASE_URL + '/clinic/page',
    method: 'get',
    data
  })
}
//根据ID获取诊所详情
export function getClinicmanageDataApi(data) {
  return request({
    url: BASE_URL + '/clinic/detail',
    method: 'get',
    data
  })
}
//根据ID删除诊所
export function getClinicmanageDelApi(data) {
  return request({
    url: BASE_URL + '/clinic/delete',
    method: 'delete',
    data
  })
}
//添加诊所
export function getClinicmanageAddApi(data) {
  return request({
    url: BASE_URL + '/clinic/create',
    method: 'post',
    data
  })
}
//修改诊所信息
export function getClinicmanageUptApi(data) {
  return request({
    url: BASE_URL + '/clinic/update',
    method: 'put',
    data
  })
}
//设备管理列表
export function getDeviceListApi(data) {
  return request({
    url: `/omp/device/product/outbound/page`,
    method: 'get',
    data
  })
}
// 获取诊所编号
export function getClinicCodeApi() {
  return request({
    url: BASE_URL + '/clinic/clinicCode',
    method: 'get'
  })
}
// privilege list
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
}
// 创建诊所公钥私钥
export function addcreateApi(data) {
  return request({
    url: `fuioupay/saveClinicKey`,
    method: 'post',
    data
  })
}
//获取诊所公钥私钥
export function getClinicKeyApi(data) {
  return request({
    url: `fuioupay/getClinicKey`,
    method: 'get',
    data
  })
}
//创建诊所机构
export function addclinicOrgApi(data) {
  return request({
    url: BASE_URL + '/clinicOrg/createOrUpdate',
    method: 'post',
    data
  })
}
//获取诊所机构
export function getclinicOrgApi(data) {
  return request({
    url: BASE_URL + '/clinicOrg/detail',
    method: 'get',
    data
  })
}
// 重置诊所端超管密码
export function resetClinicPwdApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/staff/in/resetPassword`,
    method: 'post',
    data
  })
}
// 诊所创建报告权限和诊所修改报告设置
export function reportFeaturesCreateOrupdateApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/reportFeatures/createOrupdate`,
    method: 'post',
    data
  })
}
// 根据诊所id查询报告设置
export function reportFeaturesGetByclinicIdApi(data) {
  return request({
    url: `${BASE_CLINICADMIN_URL}/reportFeatures/getByclinicId`,
    method: 'get',
    data
  })
}
//设置小程序是否展示状态
export function getupdateStatusApi(data) {
  return request({
    url: BASE_URL + '/clinic/updateStatus',
    method: 'get',
    data
  })
}
