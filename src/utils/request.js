/**
 * 封装请求request
 */

import router from '@/router'
import store from '@/store'
import { getUToken } from '@/utils/auth'
import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个axios实例
const service = axios.create({
  // process.env 属性返回包含用户环境的对象
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 30, // 设置请求超时时间
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 全局的请求次数，请求的间隙
service.defaults.retry = 4
service.defaults.retryDelay = 1000

// 请求拦截器，在请求或响应被then或catch处理前拦截它们
service.interceptors.request.use(
  // axios的请求配置config
  config => {
    console.log(config)
    // step1: 判断请求地址
    if (!config.url) {
      /* eslint-disable-next-line */
      console.error('request need url')
      // 抛出自定义错误
      throw new Error({
        source: 'axiosInterceptors',
        message: '请求需要填写URL'
      })
    }
    // 默认使用 get 请求
    if (!config.method) {
      config.method = 'get'
    }
    // 大小写容错
    config.method = config.method.toLowerCase()
    // 检测post和get传数据时的字段
    if (config.method === 'get' || config.method === 'delete') {
      if (!config.params) {
        // 防止字段用错
        config.params =
          {
            t: Date.parse(new Date()) / 1000, // 兼容IE
            ...config.data
          } || {}
      }
    } else if (config.method === 'post' || config.method === 'put') {
      if (!config.data) {
        // 防止字段用错
        config.data =
          {
            ...config.params,
            t: Date.parse(new Date()) / 1000 // 兼容IE
          } || {}
      }
      // 检测是否包含文件类型, 若包含则进行 formData 封装
      // 检查子项是否有 Object 类型, 若有则字符串化
      let hasFile = false
      const FileList = function Fun() { }
      const File = function Fun() { }
      const Blob = function Fun() { }
      Object.keys(config.data).forEach(key => {
        if (typeof config.data[key] === 'object') {
          const item = config.data[key]
          // instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
          if (
            item instanceof FileList ||
            item instanceof File ||
            item instanceof Blob
          ) {
            hasFile = true
          } else if (
            Object.prototype.toString.call(item) === '[object Object]'
          ) {
            if (
              config.headers['Content-Type'].indexOf('application/json') == -1
            ) {
              config.data[key] = JSON.stringify(config.data[key])
            }
          }
        }
      })
      // 检测到存在文件使用 FormData 提交数据
      if (hasFile) {
        // 有文件
        const formData = new FormData()
        Object.keys(reqConfig.data).forEach(key => {
          formData.append(key, config.data[key])
        })
        config.headers['Authorization'] = getUToken()
        config.data = formData
      } else {
        if (config.headers['Content-Type'].indexOf('application/json') > -1) {
          // 1-默认带参数utoken 2-代表不带参数utoken
          const utokenFlag = config.utokenFlag || 1
          if (utokenFlag != 2) {
            // 每个请求都携带token
            config.headers['Authorization'] = getUToken()
          }
          return config
        }
        // 对 data 进行任意转换处理
        config.transformRequest = [
          data => {
            let src = ''
            for (const item in data) {
              src +=
                encodeURIComponent(item) +
                '=' +
                encodeURIComponent(data[item]) +
                '&'
            }
            // 解决IE缓存问题
            // src = src + 'n=' + encodeURIComponent(Math.random())
            // console.log('step1请求参数is--' + src)
            return src
          }
        ]
      }
    } else {
      // TODO: 其他类型请求数据格式处理
      console.warn(`其他请求类型: ${reqConfig.method}, 暂无自动处理`)
    }
    // step2: auth 处理
    // 1-默认带参数utoken 2-代表不带参数utoken
    const utokenFlag = config.utokenFlag || 1
    if (utokenFlag != 2) {
      // 每个请求都携带token, U-TOKEN是自定义的
      config.headers['Authorization'] = getUToken()
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 控制消息提示弹出次数
let isMessageNum = 0
// 控制退出的次数——遇到401只走一次
let loginOutNum = 1
// 响应式拦截器
service.interceptors.response.use(
  async response => {
    // IE 9下处理返回的数据
    if (
      response.data === undefined &&
      response.config.responseType === 'json' &&
      response.request.responseText != null
    ) {
      try {
        response.data = JSON.parse(response.request.responseText)
      } catch (e) { }
    }
    const res = response.data
    const config = response.config
    let errorMsg = res.message || 'Error'
    const msgType = 'error' // Message弹框类型
    let isNeedPopup = false // 是否弹出错误提示
    // 此处处理状态不为0的处理 根据业务代码处理
    switch (res.code) {
      case 999:
        errorMsg = '网络错误，请稍后重试'
        isNeedPopup = true
        break
      case 20:
      case 21:
        // 登录已过期 || 账号在其他设备登录
        // 如果初始值等于0的时候，则提示信息，只弹一次
        if (isMessageNum == 0) {
          isNeedPopup = true
        }
        isMessageNum++
        // 退出
        setTimeout(() => {
          logout()
        }, 2000)
        break
      case 401:
        // 未登录
        if (loginOutNum === 1) {
          logout()
        } else {
          store.commit('resetStore')
          router.push(`/login?redirect=${location.hash.substr(1)}`)
          loginOutNum = 1
          return
        }
        loginOutNum++
        break
      case 0:
        isMessageNum = 0
        loginOutNum = 1
        break
      default:
        isNeedPopup = tr
        break
    }

    if (isNeedPopup) {
      Message({
        message: errorMsg,
        type: msgType,
        duration: 3 * 1000
      })
    }
    if (res.code !== 1) {
      return Promise.reject(new Error(errorMsg))
    }

    return res
  },
  error => {
    // 请求失败、错误处理回调
    const originalRequest = error.config
    // const request = error.request
    // const isAxiosError = error.isAxiosError
    // const toJSON = error.toJSON

    let errorMessage = '网络错误，请稍后重试'
    const response = error.response || {}
    const status = response.status + ''
    const res = response.data || {}
    if ((status.startsWith(5) && res.code !== '9999') || status.startsWith(4)) {
      errorMessage = res.message || '网络错误，请稍后重试'
    }
    if (
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      // 重新请求
      return service.request(originalRequest)
    }
    Message({
      message: errorMessage,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

const logout = async () => {
  await store.dispatch('user/logout')
  store.commit('resetStore')
  router.push(`/login?redirect=${location.hash.substr(1)}`)
  // location.reload()
}

export default service
