/* medicine api */
import request from '@/utils/request'
const baseUrl = 'cmdata'

// 根据type查询配置下拉列表
// 类型1.食材类型\n 2.药膳类型\n 3.食物类型\n 4.食品类型\n 5.保健品类型\n 6.运动类型\n 7.起居类型\n 8.活动类型\n 9.心理类型\n 10.中医保健类型\n 11.药材药类\n 12.方剂分类\n 13.成药分类\n 14.升级沉浮\n 15.性\n 16.味\n 17.经络\n 18.功效\n 19.脏\n 20.腑\n 21.部位\n 22.穴位\n 23.治则\n 24.单位\n 25.厚薄\n 26.阴阳\n 27.厂家
export function getConfigurationByTypeApi(data) {
  return request({
    url: `${baseUrl}/configuration/findType`,
    method: 'get',
    data
  })
}
//根据id来增加药材内容
export function addMedicineApi(data) {
  return request({
    url: `${baseUrl}/medicineDrug/create`,
    method: 'post',
    data
  })
}
//根据id修改药材内容
export function updataMedicineApi(data) {
  return request({
    url: `${baseUrl}/medicineDrug/update`,
    method: 'put',
    data
  })
}
//根据id获取药材内容
export function getMedicineDetailApi(data) {
  return request({
    url: `${baseUrl}/medicineDrug/findOne`,
    method: 'get',
    data
  })
}
//获取列表
export function getMedicineListApi(data) {
  return request({
    url: `${baseUrl}/medicineDrug/search/page`,
    method: 'post',
    data
  })
}
//根据id删除药材列表
export function deleteOneApi(data) {
  return request({
    url: `${baseUrl}/medicineDrug/delete`,
    method: 'delete',
    data
  })
}
