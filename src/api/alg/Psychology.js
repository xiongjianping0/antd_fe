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
//根据id来增加心理内容
export function addpsychologApi(data) {
  return request({
    url: `${baseUrl}/psychological/create`,
    method: 'post',
    data
  })
}
//根据id修改心理内容
export function updatapsychologApi(data) {
  return request({
    url: `${baseUrl}/psychological/update`,
    method: 'put',
    data
  })
}
//根据id获取心理内容
export function getpsychologDetailApi(data) {
  return request({
    url: `${baseUrl}/psychological/findOne`,
    method: 'get',
    data
  })
}
//获取列表
export function getpsychologListApi(data) {
  return request({
    url: `${baseUrl}/psychological/search/page`,
    method: 'post',
    data
  })
}
//根据id删除心理列表
export function deleteOneApi(data) {
  return request({
    url: `${baseUrl}/psychological/delete`,
    method: 'delete',
    data
  })
}
