import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import '../src/assets/css/reset.css'//公共样式
import './plugins/baseComponnets'//公共基础组件
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import api from './plugins/api.js'

Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$url = "http://fd.sctsjkj.com:5080"; // 服务器地址
import VConsole from 'vconsole';
let vConsole = new VConsole();
Vue.use(vConsole);

Vue.use(Vant)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://fd.sctsjkj.com:5080' //* 线上接口ip地址 

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
