<style lang="less">
#addPatrolBox{
  display: flex;
  height: 100%;
  flex-direction: column;
  // overflow: scroll;
  .addTrajectory{
    display: flex;
    justify-content: space-between;
    padding: 30px 16px;
    align-items: center;
    .left{
      font-size: 28px;
      color: #262626;
      span{
       font-size: 28px;
       color: #a09f9f;
      }
    }
    .right{
      color: #00aeff;
      display: flex;
      align-items: center; 
      img{
        margin-right: 20px;
        width: 40px;
        height: 40px;
      }
    }
  }
  .patrol_details{
    flex: 1;
  }
}
</style>
<template>
  
  <div id="addPatrolBox">
    <base-nav active="1" title="巡查记录"></base-nav>
    <!-- 增加巡查记录 -->
    <div v-if="isadd" class="addTrajectory van-hairline--bottom">
      <p class="left">巡查方式：<span>扫码巡查</span></p>
      <div class="right" @click="addTrajectory"> 
        <img class="addIcon" src="../../assets/imgs/add.png" alt="">
        <span>新增巡查轨迹</span>
      </div>
    </div>
    <!-- 查看巡查记录详情 -->
    <div v-else class="">
      <p class="displayflex pd28 van-hairline--bottom">
        <span class="left_title">巡查方式：一般巡查</span>
        <span class="color1">2019-10-12 14:40</span>
      </p>
      <p class="color1 pd28 van-hairline--bottom">
        巡查人员：吴亦凡
      </p>
    </div>
    <!-- 增加模块的添加按钮 -->
    <div class="patrol_details">
      <patrol-details :PatrolId="PatrolId" :add="isadd"></patrol-details>
    </div>
    <!--  -->
  </div>    
</template>

<script>
import patrolDetails from './patrolDetails'
export default {
  components:{
    patrolDetails
  },
  data(){
    return{
      isadd:Boolean,
      PatrolId:0,
    }
  },
  created(){
    console.log("this.$route.query",this.$route.query)
    if(this.$route.query){
     this.$route.query.add ? this.isadd = true :this.isadd = false
     this.PatrolId =  this.$route.query.PatrolId
    }
  },
  methods:{
    addTrajectory(){
      this.$router.push({
        path:'/addPatrolTrajectory'
      })
    }
  }

}
</script>

