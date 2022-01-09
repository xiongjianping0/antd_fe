/* rawmaterials api */
import request from '@/utils/request'
const BASE_URL = '/omp/device/part'

//获取原材料分页列表
export function getRawmatListApi(data) {
  return request({
    url: BASE_URL + '/management/pageByInboundNum',
    method: 'get',
    data
  })
}
//根据入库编号，产品名称查询
export function getRawmatDataApi(data) {
  return request({
    url: BASE_URL + '/management//detailByInboundNum',
    method: 'get',
    data
  })
}
//根据id，查看零件信息
export function getRawmatViewApi(data) {
  return request({
    url: BASE_URL + '/management/getById',
    method: 'get',
    data
  })
} 
