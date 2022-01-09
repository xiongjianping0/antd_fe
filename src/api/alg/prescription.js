/* medicine api */
import request from '@/utils/request'
const baseUrl = 'cmdata'

// 根据type查询配置下拉列表
export function getConfigurationByTypeApi(data) {
  return request({
    url: `${baseUrl}/configuration/findType`,
    method: 'get',
    data
  })
}
//根据id来增加方剂内容
export function addPrescriptApi(data) {
  return request({
    url: `${baseUrl}/prescription/create`,
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
}
//根据id修改方剂内容
export function updataprescriptApi(data) {
  return request({
    url: `${baseUrl}/prescription/update`,
    method: 'put',
    data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
}
//根据id获取方剂内容
export function getprescriptApi(data) {
  return request({
    url: `${baseUrl}/prescription/findOne`,
    method: 'get',
    data
  })
}
//获取列表
export function getprescriptListApi(data) {
  return request({
    url: `${baseUrl}/prescription/search/page`,
    method: 'post',
    data
  })
}
//根据id删除药材列表
export function deleteOneApi(data) {
  return request({
    url: `${baseUrl}/prescription/delete`,
    method: 'delete',
    data
  })
}
// 药材sug
export function getMedicineSugApi(data) {
  return request({
    url: `${baseUrl}/medicineDrug/searchName`,
    method: 'get',
    data,

  })
}
