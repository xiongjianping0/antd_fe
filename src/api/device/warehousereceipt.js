/* warehousereceipt api */
import request from '@/utils/request'
const BASE_URL = '/omp/device/stock'

//分页查询，零件或成品的出入库信息
export function getWarehousListApi(data) {
  return request({
    url: BASE_URL + '/management/pageByCondition',
    method: 'get',
    data
  })
}

//根据入库编号，产品名称查询
export function getRawmatDataApi(data) {
  return request({
    url: BASE_URL + '/management/getByCondition',
    method: 'get',
    data
  })
}
//根据成品编号,查询成品使用记录
export function getRawmatViewApi(data) {
  return request({
    url: BASE_URL + '/management/getByInboundNum',
    method: 'get',
    data
  })
}
//自产成品入库，N个零件组成一个自产成品
export function getRawmatInsApi(data) {
  return request({
    url: '/omp/device/product/inbound/createSp',
    method: 'post',
    data
  })
}
//根据条件getList
export function getWarehousereListApi(data) {
  return request({
    url: '/omp/device/product/outbound/clinic/list',
    method: 'get',
    data
  })
}
//根据条件查询成品列表
export function getWarehousereceiptInGetByApi(data) {
  return request({
    url: '/omp/device/product/inbound/getInboundProduct',
    method: 'get',
    data
  })
}
//成品出库，实际上就是把clinicId和productId添加到出库表
export function getRawmatInCreateApi(data) {
  return request({
    url: '/omp/device/product/outbound/create',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
//分页查询零件(自产成品入库)
export function getRawmatInpageApi(data) {
  return request({
    url: '/omp/device/part/management/getInboundPart',
    method: 'get',
    data
  })
}
//自产成品入库，N个零件组成一个自产成品(自产成品入库)
export function getRawmatInCreateSpApi(data) {
  return request({
    url: '/omp/device/product/inbound/createSp',
    method: 'post',
    data,
    headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
  })
}
