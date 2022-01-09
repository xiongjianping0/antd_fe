/* recommended api */
import request from '@/utils/request'
const OMP_CLINIC = '/omp/clinic'

// 推荐内容管理-查询列表
export function getRecommendedDataApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/page`,
    method: 'get',
    data
  })
}

// 推荐内容管理-新增
export function addRecommendedApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/create`,
    method: 'post',
    data
  })
}

// 推荐内容管理-详情
export function getRecommendedDetailApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/getDetailById`,
    method: 'get',
    data
  })
}

// 推荐内容管理-修改
export function updateRecommendedApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/update`,
    method: 'post',
    data
  })
}

// 推荐内容管理-状态操作
export function getRecommendedIsHiddenApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/updateIsHidden`,
    method: 'post',
    data
  })
}

// 推荐内容管理-删除
export function deleteRecommendedApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/delete`,
    method: 'delete',
    data
  })
}

// 页面/位置-列表
export function getPageLocationApi() {
  return request({
    url: `/omp/clinic/content/recommended/pageLocation/list`,
    method: 'get',
  })
}

// 查询商品或服务列表
export function getGoodsOrSerivcesPageApi(data) {
  return request({
    url: `/omp/clinic/content/recommended/getGoodsOrSerivcesPage`,
    method: 'get',
    data
  })
}

// 商品分类列表查询 
export function getGoodsCategoryApi() {
  return request({
    url: `/omp/merchant/category/list`,
    method: 'get',
  })
}



