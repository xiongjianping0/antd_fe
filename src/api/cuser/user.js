/* cuser-user api */
import request from '@/utils/request'
const BASE_URL = '/user/v1/user'

//[运营端]获取用户列表
export function getUserListApi(data) {
    return request({
      url: BASE_URL + '/get/list',
      method: 'get',
      data
    })
  }
//[运营端]根据用户UID获取用户详情
export function getUserDetailApi(data) {
    return request({
      url: BASE_URL + '/get/detail',
      method: 'get',
      data
    })
  }
  