/* drugclassification api */
import request from '@/utils/request'
const BASE_URL = '/omp/clinic/medicine'

//分页查询
export function getDrugListApi(data) {
  return request({
    url: BASE_URL + '/category/tree',
    method: 'get',
    data
  })
}
//药品分类详情
export function getDrugDataApi(data) {
  return request({
    url: BASE_URL + '/category/getById',
    method: 'get',
    data
  })
}
//删除药品分类
export function getDrugDelApi(data) {
  return request({
    url: BASE_URL + '/category/delete',
    method: 'delete',
    data
  })
}
//添加药品分类
export function getDrugAddApi(data) {
  return request({
    url: BASE_URL + '/category/create',
    method: 'post',
    data
  })
}
//修改药品分类
export function getDrugUptApi(data) {
  return request({
    url: BASE_URL + '/category/update',
    method: 'put',
    data
  })
}