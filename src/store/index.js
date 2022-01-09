import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// import VuexPersistence from 'vuex-persist'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Vuex)

/* const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ // eslint-disable-line
    commonInfo: state.app.commonInfo,
    logined: state.user.logined
  }),
}) */

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  mutations: {
    // 重置vuex本地state储存状态
    resetStore(state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  getters
  // plugins: [vuexLocal.plugin]
})

export default store
