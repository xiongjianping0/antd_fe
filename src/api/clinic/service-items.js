/* service-items api */
import request from '@/utils/request'
const BASE_URL = '/omp/clinic/service'

//服务分页查询
export function getServiceListApi(data) {
  return request({
    url: BASE_URL + '/item/page',
    method: 'get',
    data
  })
}
//服务详情
export function getServiceDataApi(data) {
  return request({
    url: BASE_URL + '/item/detail',
    method: 'get',
    data
  })
}
//创建服务
export function getServiceAddApi(data) {
    return request({
      url: BASE_URL + '/item/create',
      method: 'post',
      data
    })
  }
//删除服务
export function getServiceDelApi(data) {
  return request({
    url: BASE_URL + '/item/delete',
    method: 'delete',
    data
  })
}
//修改服务
export function getServiceUptApi(data) {
  return request({
    url: BASE_URL + '/item/update',
    method: 'put',
    data
  })
}