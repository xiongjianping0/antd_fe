/* audit-user api */
import request from '@/utils/request'
const BASE_URL = '/omp/merchant'

//规格列表
export function getSpecList(data) {
  return request({
    url: BASE_URL + '/spec/keyPage',
    method: 'get',
    data
  })
}

export function addSpecApi(data) {
  return request({
    url: BASE_URL + '/spec/createSpecKey',
    method: 'post',
    data
  })
}

export function detailSpecApi(data) {
  return request({
    url: BASE_URL + '/spec/specKeyDetail',
    method: 'get',
    data
  })
}

export function modifySpecApi(data) {
  return request({
    url: BASE_URL + '/spec/updateSpecKey',
    method: 'put',
    data
  })
}
