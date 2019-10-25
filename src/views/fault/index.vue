<style lang="less">
#faultBox {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .leftBox {
    display: flex;
    align-items: center;
    color: white;
    img {
      width: 32px;
      height: 40px;
      margin-right: 20px;
    }
  }
  .rightIcon {
    width: 52px;
    height: 50px;
  }
  .centercontent{
    flex: 1;
   
    position: relative;
    .van-tabs{
      height: 100%;
      .van-tabs__content{
        height: 100%;
        .van-tab__pane{
          height: 100%;
        }
        #faultHandleList{
          height: 100%;
          #list{
             height: 100%;
          }
          .van-pull-refresh{
              height: 100%;
          }
          .van-pull-refresh__track{
            height: 100%;
          }
          .van-list{
            height: 100%;
            // overflow: scroll
          }

        }
      }
    }
  }

  // .tabbar{
  //   height: 100px;
  //   border: 3px solid darkkhaki;
  // }
}
</style>
<template>
  <div id="faultBox">
    <!--  -->
    <base-nav :showLeft="false">
      <div class="leftBox" slot="left">
        <img src="../../assets/imgs/ssgz_img_01.png" alt />
        <span>{{fireUnitName}}</span>
      </div>
      <img @click="goHome" class="rightIcon" slot="right" src="../../assets/imgs/home.png" alt />
    </base-nav>

    <!--  -->
    <div class="centercontent van-clearfix">
      <router-view></router-view>
    </div>
   
    <!--  -->
    <van-tabbar class="tabbar" v-model="active">
      <van-tabbar-item v-for="(item, index) in tabBars" :key="index" replace :to="item.router">
        <span>{{ item.label }}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
      return{
        active:0,
        tabBars: [
            {
            label: "维保叫修",
            active: require("../../assets/imgs/deal1.png"),
            normal: require("../../assets/imgs/del2.png"),
            router: "faultHandle"
            },
            {
            label: "消防巡查",
            active: require("../../assets/imgs/xun1.png"),
            normal: require("../../assets/imgs/xun2.png"),
            router: "firePatrol"
            },
            {
            label: "设施编码",
            active: require("../../assets/imgs/code1.png"),
            normal: require("../../assets/imgs/code2.png"),
            router: "facilityCode"
            }
         ],
         fireUnitName:''
      }
  },
  created(){
    this.active = this.$route.meta.active
    this.fireUnitName = localStorage.getItem('fireUnitName')
  },
  mounted(){
  },
  methods: {
    goHome() {
      console.log("this.$route",this.$route.meta.active)
      this.$router.push("/fireUnitList");
    }
  }
};
</script>

