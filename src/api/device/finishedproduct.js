/* finishedproduct api */
import request from '@/utils/request'
const BASE_URL = '/omp/device/product'

//获取成品管理分页列表
export function getFinishListApi(data) {
  return request({
    url: BASE_URL + '/inbound/page',
    method: 'get',
    data
  })
}
//根据条件,分页查询成品
export function getFinishDataApi(data) {
  return request({
    url: BASE_URL + '/inbound/pageByCondition',
    method: 'get',
    data
  })
}
//查看某个成品的详细信息，如果是自产成品，还需要返回它的零件列表
export function getFinishViewApi(data) {
  return request({
    url: BASE_URL + '/inbound/getById',
    method: 'get',
    data
  })
} 
//使用记录
export function getFinishSeeApi(data) {
  return request({
    url: BASE_URL + '/usage/getById',
    method: 'get',
    data
  })
}
