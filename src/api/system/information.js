/* information api */
import request from '@/utils/request'
const OMP_CLINIC_SERVICE_URL = '/omp/clinic'

// information list
export function getInformationDataApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/healthKnowledge/page`,
    method: 'get',
    data
  })
}

// information add
export function addInformationApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/healthKnowledge/create`,
    method: 'post',
    data
  })
}

// information detail
export function getInformationDetailApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/healthKnowledge/detail`,
    method: 'get',
    data
  })
}

// information update
export function updateInformationApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/healthKnowledge/update`,
    method: 'put',
    data
  })
}

// information delete
export function deleteInformationApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/healthKnowledge/delete`,
    method: 'delete',
    data
  })
}
