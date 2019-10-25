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
    <van-cell  @click="pathTo(arr.path)" v-for="(arr,index) in menuCell" :key="index" :title="arr.tile" is-link >
      <img class="lefticon" slot="icon" :src="arr.icon" alt="">
      <div v-if="arr.tile == '技术支持'">天树聚</div>
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
        path:'/myFireUnits'
      },
      {
        tile:'修改密码',
        icon:require('../../assets/imgs/site_img_03.png'),
        path:'/changePw'
      },
      {
        tile:'技术支持',
        icon:require('../../assets/imgs/site_img_04.png'),
        path:'/support'
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
      localStorage.clear();
      this.$router.push({
        path:'/login'
      })
    }).catch(() => {
      // on cancel
    });
  },
  pathTo(item){
    console.log("要去的路径",item)
    this.$router.push({
      path:item
    })
  }
}
}
</script>

