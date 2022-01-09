/* medicine api */
import request from '@/utils/request'
const baseUrl = 'cmdata'

// 根据type查询配置下拉列表
// 1.饮食类型 2.运动类型 3.起居类型 4.活动类型 5.心理类型 6.中医保健类型 7.经络类型 8.功效类型 9.部位类型 10.穴位类型 11.药材类型 12.方剂类型 13.成药类型 14.治则类型 15.单位类型 16.厂家类型
export function getConfigurationByTypeApi(data) {
  return request({
    url: `${baseUrl}/configuration/findType`,
    method: 'get',
    data
  })
}
//根据id来增加文娱内容
export function addplaysApi(data) {
  return request({
    url: `${baseUrl}/plays/create`,
    method: 'post',
    data
  })
}
//根据id修改文娱内容
export function updataplaysApi(data) {
  return request({
    url: `${baseUrl}/plays/update`,
    method: 'put',
    data
  })
}
//根据id获取文娱内容
export function getplaysDetailApi(data) {
  return request({
    url: `${baseUrl}/plays/findOne`,
    method: 'get',
    data
  })
}
//获取列表
export function getplaysListApi(data) {
  return request({
    url: `${baseUrl}/plays/search/page`,
    method: 'post',
    data
  })
}
//根据id删除文娱列表
export function deleteOneApi(data) {
  return request({
    url: `${baseUrl}/plays/delete`,
    method: 'delete',
    data
  })
}
