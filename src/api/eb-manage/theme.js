/* audit-user api */
import request from '@/utils/request'
const BASE_URL = '/merchant/b'

export function getThemeListApi(data) {
  return request({
    url: BASE_URL + '/theme/page',
    method: 'get',
    data
  })
}

//新增主题
export function addThemeApi(data) {
  return request({
    url: BASE_URL + '/theme/create',
    method: 'post',
    data
  })
}

export function themeDetailApi(data) {
  return request({
    url: BASE_URL + '/theme/detail',
    method: 'get',
    data
  })
}

//修改主题
export function modifyThemeApi(data) {
  return request({
    url: BASE_URL + '/theme/update',
    method: 'put',
    data
  })
}

//上架下架
export function getThemeStatusApi(data) {
  return request({
    url: BASE_URL + '/theme/change/status',
    method: 'get',
    data
  })
}
//根据商品id筛选商品
export function getGoodsByIdApi(data) {
  return request({
    url: BASE_URL + '/goods/list/ids',
    method: 'get',
    data
  })
}
//删除主题
export function deleteThemeApi(data) {
  return request({
    url: BASE_URL + '/theme/delete',
    method: 'DELETE',
    data
  })
}

