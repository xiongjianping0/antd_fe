/* menu-audit api */
import request from '@/utils/request'
const BASE_OMP_CLINIC_URL = '/omp/clinic'

// 获取所有菜单列表
export function getMenuListApi() {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/menu/tree`,
    method: 'get'
  })
}

// 菜单或按钮详情
export function getMenuInfoApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/menu/detail`,
    method: 'get',
    data
  })
}

// 菜单新增
export function createMenuApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/menu/create`,
    method: 'post',
    data
  })
}

// 菜单编辑
export function updateMenuApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/menu/update`,
    method: 'put',
    data
  })
}

// 菜单删除
export function deleteMenuApi(data) {
  return request({
    url: `${BASE_OMP_CLINIC_URL}/menu/delete`,
    method: 'delete',
    data
  })
}
