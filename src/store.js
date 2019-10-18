import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},//全局用户信息
    localTrajectroy:[]
  },
  mutations: {
    setuserInfo(state,val){
      state.userInfo = val
    },
    setlocalTrajectroy(state,val){
      state.localTrajectroy = val
    }
  },
  actions: {

  }
})
