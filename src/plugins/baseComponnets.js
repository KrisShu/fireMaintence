import Vue from "vue"
import baseNav from '../components/baseNav.vue'
import baseList from '../components/baseList.vue'
import baseTakePhoto from '../components/baseTakePhoto.vue'
import baseRecordText from '../components/baseRecordText.vue'
import basePlayRecord from '../components/basePlayRecord.vue'
Vue.component("baseNav", baseNav); // 顶部导航
Vue.component("baseList", baseList); // 顶部导航
Vue.component("baseTakePhoto", baseTakePhoto); // 拍照功能
Vue.component("baseRecordText", baseRecordText); // 
Vue.component("basePlayRecord", basePlayRecord); // 播放语音
