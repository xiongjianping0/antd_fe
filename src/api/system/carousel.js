/* carousel api */
import request from '@/utils/request'
const OMP_CLINIC_SERVICE_URL = '/omp/clinic'

// carousel list
export function getCarouselDataApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/banner/page`,
    method: 'get',
    data
  })
}

// carousel add
export function addCarouselApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/banner/create`,
    method: 'post',
    data
  })
}

// carousel detail
export function getCarouselDetailApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/banner/detail`,
    method: 'get',
    data
  })
}

// carousel update
export function updateCarouselApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/banner/update`,
    method: 'put',
    data
  })
}

// carousel delete
export function deleteCarouselApi(data) {
  return request({
    url: `${OMP_CLINIC_SERVICE_URL}/banner/delete`,
    method: 'delete',
    data
  })
}
