/* 订单 api */
import request from '@/utils/request'
const baseUrl ='/omp/merchant'
//根据id获取订单
export function getorderApi(data) {
  return request({
    url: `${baseUrl}/order/page`,
    method: 'get',
    data
  })
}

//取消订单
export function canaelApi(data) {
  return request({
    url: `${baseUrl}/order/cancel`,
    method: 'post',
    data
  })
}
//查看订单详情
export function detailApi(data) {
  return request({
    url: `${baseUrl}/order/detail`,
    method: 'get',
    data
  })
}

