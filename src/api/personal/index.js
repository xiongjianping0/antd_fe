/* personal api */
import request from '@/utils/request'
const BASE_OMP_CLINIC_URL = '/omp/clinic'

// modify info
export function infoDataSubmitApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/update`,
    method: 'put',
    data
  })
}

// modify password
export function pwdDataSubmitApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/staff/updatePassword`,
    method: 'post',
    data
  })
}
