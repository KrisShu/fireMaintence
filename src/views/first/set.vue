<style lang="less">
#set{
  padding-top: 30px;
  .lefticon{
    margin-right: 24px;
    width: 40px;
    height: 40px;
  }
}
</style>
<template>
  <div id="set">
    <van-cell  v-for="(arr,index) in menuCell" :key="index" :title="arr.tile" is-link >
      <img class="lefticon" slot="icon" :src="arr.icon" alt="">
    </van-cell>
    <van-cell @click="logout" class="van-hairline--bottom" title="注销登录" is-link >
       <img  class="lefticon" slot="icon" src="../../assets/imgs/site_img_05.png" alt="">
    </van-cell>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { ImagePreview } from 'vant';
export default {
components:{
},
data(){
  return{
    menuCell:[
      {
        tile:'我负责的防火单位',
        icon:require('../../assets/imgs/load_img_06.png'),
        path:''
      },
      {
        tile:'修改密码',
        icon:require('../../assets/imgs/site_img_03.png'),
        path:''
      }

    ]

    
  }
},
methods:{
  logout(){
    Dialog.confirm({
      title: '注销登录',
      message: '确认注销登录吗？'
    }).then(() => {
      // on confirm
      this.$router.push({
        path:'/login'
      })
    }).catch(() => {
      // on cancel
    });
  }
}
}
</script>

