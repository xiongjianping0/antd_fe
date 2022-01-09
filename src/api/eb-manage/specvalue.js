/*商品规格值 api */
import request from '@/utils/request'
const baseUrl ='/omp/merchant'

//获取规格值list
export function getSpecValueApi(data) {
  return request({
    url: `${baseUrl}//spec/valuePage`,
    method: 'get',
    data
  })
}
//根据id获取规格值详情
export function getSpecValueDetailApi(data) {
  return request({
    url: `${baseUrl}/spec/specValueDetail`,
    method: 'get',
    data
  })
}
//获取规格名下拉
export function getSpecKeySugApi(data) {
  return request({
    url: `${baseUrl}/spec/sug`,
    method: 'get',
    data
  })
}
//修改规格值
export function updateSpecValueApi(data) {
  return request({
    url: `${baseUrl}/spec/updateSpecValue`,
    method: 'put',
    data
  })
}
//添加规格值
export function createSpecValueApi(data) {
  return request({
    url: `${baseUrl}/spec/createSpecValue`,
    method: 'post',
    data
  })
}

