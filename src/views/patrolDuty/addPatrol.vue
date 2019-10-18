<style lang="less">
#addPatrolBox{
  display: flex;
  height: 100%;
  flex-direction: column;
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
    <!--  -->
      <div class="patrol_details">
        <patrol-details :add="isadd"></patrol-details>
      </div>
    <!--  -->
      <div class="btns">
        <van-button type="info"  size="large">提交</van-button>
      </div>
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
      isadd:Boolean
    }
  },
  created(){
    if(this.$route.query){
     this.$route.query.add ? this.isadd = true :this.isadd = false
     
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

