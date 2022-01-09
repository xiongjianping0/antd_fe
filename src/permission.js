/* permission control */
// vue router
// get token from cookie
import { getUToken } from '@/utils/auth'
// page title
import getPageTitle from '@/utils/get-page-title'
import { cleanSelectedTable } from '@/utils/storage'
// message
import { Message } from 'element-ui'
// progress
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
// vuex
import store from './store'
// set progress
NProgress.configure({
  showSpinner: false
})

// page white list
const whiteList = ['/login']

// Global Before Guards
router.beforeEach((to, from, next) => {
  /* 调试接口注释掉此内容 */
  // next()
  // return
  /* 调试接口注释掉此内容 */

  // start progress
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // get router privilegeId
  const curPrivilegeId = to.meta.privilegeId || 0
  // get user token
  const hasUToken = getUToken()
  if (hasUToken) {
    // have token
    if (to.path === '/login') {
      // entry router path is '/login', go to '/'
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      debugger
      // entry router path is not '/login'
      const hasCommonInfo = store.getters.commonInfo // commonInfo
      // judge commonInfo has exist
      if (JSON.stringify(hasCommonInfo) != '{}') {
        // has commonInfo
        if (curPrivilegeId === 0) {
          // 登录带进来的页面无权限或无此路由，直接跳首页
          if (from.path == '/login') {
            // 从登陆进来的，直接跳转首页
            next('/')
          } else {
            next(from)
            // 不是从登陆页面进入的，所以在此判断去的页面是否是没有权限的路由还是不存在的路由
            // 校验用户权限
            /* const permsData = { perms: to.path.substr(1) }
            store.dispatch('app/getPermission', permsData).then(res => {
              const pageFlag = res.inMenu || 0
              if (pageFlag === 1) {
                // 路由存在，但是当前用户没有权限
                MessageBox({
                  title: '提示',
                  message: '您无权限访问，请联系管理员',
                  type: 'warning',
                  confirmButtonText: '确定',
                  showClose: false,
                  closeOnClickModal: false,
                  closeOnPressEscape: false
                }).then(() => {
                  next(from)
                })
              } else {
                // 路由不存在
                const unfound = '/404'
                next(unfound)
              }
            }) */
          }
        } else {
          next()
        }
        NProgress.done()
      } else {
        // commonInfo不存在
        try {
          // 请求commonInfo接口，获取后端返回的页面，并添加进路由中
          // store.dispatch('app/getUserInfo').then(res => {
          //   const accessRoutes = res
          //   router.addRoutes(accessRoutes)
          //   next({ ...to, replace: true })
          // })
          this.$router.push({ path: this.redirect || '/' })

        } catch (error) {
          // 跳转至登录页面
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    // no token
    if (whiteList.indexOf(to.path) !== -1) {
      // in white list(no need to login in), go to (to.path)
      next()
    } else {
      // not in white list,clear commonInfo, go to ('/login?redirect=${to.path}')
      store.dispatch('app/clearCommonInfo').then(res => {
        next(`/login`)
        NProgress.done()
      })
    }
  }
})

// Global Before Guards
router.afterEach(() => {
  cleanSelectedTable()
  // finish progress bar
  NProgress.done()
})
