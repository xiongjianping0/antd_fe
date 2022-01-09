/**
 * 操作用户登录、退出
 */

import { login, logout } from '@/api/login/index'
import { resetRouter } from '@/router'
import { getUToken, removeUToken, setUToken } from '@/utils/auth'

const state = {
  utoken: getUToken(),
  logined: false, // 是否登录
  avatar: 'http://pic4.zhimg.com/50/v2-46c2eb18d011d3711617a2664844e5fd_hd.jpg'
}

const mutations = {
  SET_LOGINED: state => {
    state.logined = true
  },
  REMOVE_LOGINED: state => {
    state.logined = false
  },
  SET_U_TOKEN: (state, token) => {
    state.utoken = token
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        identity: username.trim(),
        password: password,
        role: 2
      })
        .then(response => {
          const { data } = response
          const uToken = data.tokenHead + data.token
          commit('SET_U_TOKEN', uToken || '')
          commit('SET_LOGINED')
          setUToken(uToken || '')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 退出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_U_TOKEN', '')
          commit('REMOVE_LOGINED')
          localStorage.clear()
          removeUToken()
          resetRouter()
          resolve()
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
