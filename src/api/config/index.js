/* system-config api */
import request from '@/utils/request'
const BASE_URL = "/omp/merchant"
//系统管理---->应运配置
//关于我们编辑
export function modifyConfig(data) {
  return request({
    url: `${BASE_URL}/config/update/about/us`,
    method: 'post',
    data
  })
}
//关于我们详情
export function getConfigDetail(data) {
  return request({
    url: `${BASE_URL}/config/detail/about/us`,
    method: 'get',
    data
  })
}
