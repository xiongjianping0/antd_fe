/* audit-user api */
import request from '@/utils/request'
const BASE_URL = '/omp/merchant'

export function getGoodsList(data) {
  return request({
    url: BASE_URL + '/goods/page',
    method: 'get',
    data
  })
}
//上架下架
export function getGoodsStatus(data) {
  return request({
    url: BASE_URL + '/goods/updateGoodsOnlineStatus',
    method: 'get',
    data
  })
}

export function goodsDetailApi(data) {
  return request({
    url: BASE_URL + '/goods/detail',
    method: 'get',
    data
  })
}


export function modifyClassify(data) {
  return request({
    url: BASE_URL + '/category/update',
    method: 'post',
    data
  })
}
//商品审核
export function checkStatusApi(data) {
  return request({
    url: BASE_URL + '/goods/updateGoodsCheckStatus',
    method: 'get',
    data
  })
}

//查询所有功效
export function getEffectListApi() {
  return request({
    url: BASE_URL + '/goods/effect/list',
    method: 'get',
  })
}

//为商品设置功效
export function createEffectApi(data) {
  return request({
    url: BASE_URL + '/goods/effect/create',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}


