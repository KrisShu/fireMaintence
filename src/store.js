import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},//全局用户信息
    localTrajectroy:[],//具体轨迹详情
    TrajectroyList:[],//轨迹列表
  },
  mutations: {
    setuserInfo(state,val){
      state.userInfo = val
    },
    setlocalTrajectroy(state,val){
      state.localTrajectroy = val
    },

    setTrajectroyList(state,val){
      state.TrajectroyList = val
    }
  },
  actions: {

  }
})
