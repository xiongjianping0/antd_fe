/* audit-user api */
import request from '@/utils/request'
const BASE_URL = '/omp/merchant'

export function getClassifyList(data) {
  return request({
    url: BASE_URL + '/category/page',
    method: 'get',
    data
  })
}

export function addClassify(data) {
  return request({
    url: BASE_URL + '/category/create',
    method: 'post',
    data
  })
}

export function detailClassify(data) {
  return request({
    url: BASE_URL + '/category/detail',
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

