/* login api */
import request from '@/utils/request'
const BASE_OMP_CLINIC_URL = '/omp/clinic'

export function login(data) {
  return request({
    url: `/api/v1/login`,
    method: 'post',
    data,
    utokenFlag: 2, // 2-代表不带参数utoken
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

}

export function logout() {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/logout`,
    method: 'post'
  })
}
