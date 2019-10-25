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
Vue.prototype.$url = "http://fd.sctsjkj.com:5080"; // 全局服务器地址
import VConsole from 'vconsole';
let vConsole = new VConsole();
Vue.use(vConsole);
Vue.use(Vant)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://fd.sctsjkj.com:5080' //* axios线上接口ip地址 

//刷新页面 stroe也不会被清空
let val = localStorage.getItem("userInfo");
if(val){
  let info = JSON.parse(val);
  store.commit("setuserInfo",info)
  store.commit("changeLogin",'1')
}

//弹窗时点击返回键需要返回
Vue.prototype.backBtn =function(fun){
  plus.key.removeEventListener("backbutton", function() {});//先移除最先绑定的 物理返回键1
  plus.key.addEventListener("backbutton",function(){//绑定物联返回键2 --- 为关闭弹窗等内容
    fun();

    plus.key.removeEventListener("backbutton", function() {});//再移除绑定物联返回键2 

    plus.key.addEventListener("backbutton",function(){ //再监听
      let hash = location.hash
      let url = location.hash.split("/")[1];
      console.log("打印url地址",url)
      console.log("打印hash地址",hash)
      if(url === 'login' || url === 'fireUnitList'  || url ==='set'){//处于第一页面就
          //不能提醒再次退出
          plus.runtime.quit();
      }else{
        window.history.back();
      }
    })
  }) 
}
//手机端物理返回键  方法1 
document.addEventListener("plusready", function() {

  let time = ""; // 用来存上一次按键时间；
  console.log("记录时间",time)
  plus.key.addEventListener("backbutton",function(){
    let hash = location.hash
    let url = location.hash.split("/")[1];
    console.log("打印url地址",url)
    console.log("打印hash地址",hash)
    if(url === 'login' || url === 'fireUnitList'  || url ==='set'){//处于第一页面就
      if(new Date() - time < 2000){//如果小于2s,退出程序
        plus.runtime.quit();
      }else{
        time = new Date();
        plus.nativeUI.toast("再按一次退出应用");
      }
    }else{
      window.history.back();
    }
  })
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
