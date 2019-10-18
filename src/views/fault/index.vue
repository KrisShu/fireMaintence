<style lang="less">
#faultBox {
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
    <router-view></router-view>
    <!--  -->
    <van-tabbar v-model="active">
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
            label: "故障处理",
            active: require("../../assets/imgs/deal1.png"),
            normal: require("../../assets/imgs/deal2.png"),
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
      this.$router.push("/");
    }
  }
};
</script>

