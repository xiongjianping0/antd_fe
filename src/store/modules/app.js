/**
 * 操作commonInfo信息，路由及权限
 */

import { getCurUserInfo } from '@/api/common'
import Layout from '@/layout'
import { constantRoutes } from '@/router'
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  commonInfo: {},
  curUserInfo: {},
  routes: [],
  addRoutes: [],
  permissions: []
}

const menuRouters = []

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  COMMON_INFO: (state, commonInfo) => {
    state.commonInfo = commonInfo
  },
  CUR_USER_INFO: (state, curUserInfo) => {
    state.curUserInfo = curUserInfo
  },
  // 权限
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(state.addRoutes)
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // commoninfo 信息存入
  /* changeCommonInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getCommonInfo().then(response => {
        const res = response.data.commonInfo
        // 菜单列表和权限列表
        const menuList = res.privilege_list.menus
        const permissions = res.privilege_list.permissions
        // 重组权限数组
        // const allPrivileges = res.allPrivileges
        // const allPrivilegesMap = convertPrivilegeMap(allPrivileges)
        // res.allPrivilegesMap = allPrivilegesMap
        // 获取根路径
        getRootMenu(menuList)
        // 用递归填充
        convertTree(menuRouters, menuList)
        // 404
        // const unfound = { path: '*', redirect: '/404', hidden: true }
        // menuRouters.push(unfound)
        commit('COMMON_INFO', res)
        commit('SET_ROUTES', menuRouters)
        commit('SET_PERMISSIONS', permissions)
        resolve(menuRouters)
      }).catch(error => {
        reject(error)
      })
    })
  }, */
  // commoninfo 信息清除
  clearCommonInfo({ commit }) {
    commit('COMMON_INFO', {})
    commit('CUR_USER_INFO', {})
    commit('SET_ROUTES', [])
    commit('SET_PERMISSIONS', [])
  },
  // 获取页面权限
  /* getPermission({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      getPagePermassion(data).then(response => {
        const pageFlag = response.data
        resolve(pageFlag)
      }).catch(error => {
        reject(error)
      })
    })
  } */
  // 获取当前登录用户信息，包含权限
  getUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      getCurUserInfo(data)
        .then(response => {
          const res = response.data
          // 菜单列表和权限列表
          const menuList = res.menus
          const webPerms = res.webPerms
          // 获取根路径
          // getRootMenu(menuList)
          // 用递归填充
          convertTree(menuRouters, menuList)
          // 404
          // const unfound = { path: '*', redirect: '/404', hidden: true }
          // menuRouters.push(unfound)
          commit('COMMON_INFO', res)
          commit('CUR_USER_INFO', res.staffInfo || {})
          commit('SET_ROUTES', menuRouters)
          commit('SET_PERMISSIONS', webPerms)
          resolve(menuRouters)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

function getRootMenu(menuList) {
  menuRouters.splice(0, menuRouters.length)
  // 下面就要根据后端的菜单数据组装树型路由数据
  // 先取出根节点，没有父id的就是根节点
  menuList.forEach((m, i) => {
    if (m.parentId === -1) {
      const module = {
        path: '/' + m.url,
        component: Layout,
        meta: {
          title: m.name,
          privilegeId: m.id,
          icon: m.icon,
          fullUrl: m.url
        },
        hidden: m.hidden === 1,
        target: m.target === 1 ? '_blank' : '',
        redirect: '',
        name: m.url,
        alwaysShow: m.alwaysShow === 1
      }
      if (m.isTarget === 1) {
        module['component'] = () => import(`@/views/${m.viewPath}`)
      }
      menuRouters.push(module)
    }
  })
}

// 定义一个递归方法
function convertTree(parentRouters, menuList) {
  parentRouters.forEach(r => {
    menuList.forEach((m, i) => {
      if (
        m.parentId &&
        r.meta.privilegeId &&
        m.parentId == r.meta.privilegeId
      ) {
        if (!r.children) r.children = []
        const menu = {
          path: m.url,
          component: () => import(`@/views/${m.viewPath}`),
          meta: {
            title: m.name,
            privilegeId: m.id,
            icon: m.icon,
            fullUrl: m.url
          },
          hidden: m.hidden === 1,
          target: m.target === 1 ? '_blank' : '',
          name: m.url.replace('/', '-')
        }
        r.children.push(menu)
        r.redirect =
          r.path === '/'
            ? r.path + r.children[0].path
            : r.path + '/' + r.children[0].path
      }
    })
    if (r.children) {
      convertTree(r.children, menuList)
    }
  })
}

// 重组权限
function convertPrivilegeMap(pList) {
  const pMap = {}
  pList.forEach((item, index) => {
    if (item.url) {
      pMap['/' + item.url] = item
    }
  })
  return pMap
}
