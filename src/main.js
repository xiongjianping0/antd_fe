/* entry file */
// Simulate a complete ES2015+ environment
import '@babel/polyfill'
// vue
import Vue from 'vue'
// normalize.css—— A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// quill—— Editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// echarts—— theme
import 'echarts/theme/macarons'
import 'echarts/theme/shine'
// global css
import '@/styles/index.scss'
// global filter
import '@/filters'
// entry
import App from './App'
// vuex
import store from './store'
// vue-router
import router from './router'
// icon
import '@/icons'
// cloneDeep
import cloneDeep from 'lodash/cloneDeep'
// permission control
import '@/permission'
// button permission
import { isAuth } from '@/utils'
Vue.prototype.isAuth = isAuth // 权限方法
// global variable
import WebConfig from '@/utils/config'
Vue.prototype.WebConfig = WebConfig

// 保存整站vuex本地state存储初始状态，用于退出时初始化
window.SITE_CONFIG = {}
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

// set ElementUI lang to EN
Vue.use(ElementUI)
// prevents vue from generating a production tip at startup
Vue.config.productionTip = false

// go back
Vue.prototype.back = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/')
}

new Vue({
  el: '#app', // index.html中的app
  router,
  store,
  // render函数接受app组件作为参数创建vnode
  render: h => {
    // 解决IE的router-link不跳转问题
    if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (router.path !== currentPath) {
          router.push(currentPath)
        }
      }, false)
    }
    return h(App)
    // 注意：这里 return 的结果，会 替换页面中 el 指定的那个 容器
  }
  // render: h => h(App)
})
