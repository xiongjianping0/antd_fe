/**
 * vue-router
 */

import Vue from 'vue'
import Router from 'vue-router'
// import ALGConManage from './modules/ALG-manage/content'
// import ALGMedManage from './modules/ALG-manage/medicine'
import Audit from './modules/audit'
// import Clinicoperation from './modules/clinicoperation'
// import Cuser from './modules/cuser'
import Dashboard from './modules/dashboard'
// import Device from './modules/device'
// import EBManage from './modules/EB-manage'
// import Example from './modules/example'
// import Hospital from './modules/hospital'
import Menu from './modules/menu'
import Personal from './modules/personal'
// import Role from './modules/role'
// import System from './modules/system'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      privilegeId: -1
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: {
      privilegeId: -1
    }
  },
  {
    path: '',
    redirect: '/dashboard',
    hidden: true
  },
  Dashboard,
  Personal,
  // Example,
  // EBManage,
  // Device,
  // Clinicoperation,
  // Hospital,
  // System,
  // ALGMedManage,
  // ALGConManage,
  // Cuser,
  Audit,
  // Role,
  Menu
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    // 页面进行跳转的时候，页面滚动的位置
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
