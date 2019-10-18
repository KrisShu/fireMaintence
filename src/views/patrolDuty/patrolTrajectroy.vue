<style lang="less">
  #patrolTrajectroyBox{
    .patrolTrajectroy_system{
      flex: 2;
      p{
        line-height: 1.5;
        text-align:right;
      }
    }
    .patrolTrajectroy_text{
      line-height: 1.5;
    }
  }
</style>
<template>
  <div id="patrolTrajectroyBox">
      <base-nav title="巡查轨迹详情"></base-nav>

      <div class="patrolTrajectroyContent">
        <p class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查时间</span>
          <span class="color1">2019-10-14 10:50</span>
        </p>
        <p class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查地点</span>
          <span class="color1">地点</span>
        </p>
        <div class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查系统</span>
          <div class="patrolTrajectroy_system color1">
            <p>巡查系统</p>
             <p>巡查系统</p>
              <p>巡查系统</p>
          </div>
        </div>
        <p class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查结果</span>
          <span class="color1">正常</span>
        </p>
        <!--  -->
        <div class="pd28">
          <p class="left_title">情况描述</p>
          <p class="pd28 color1 patrolTrajectroy_text">情况描述情况
            描述情况描述情况描述情况描述情况描述情况描述情况描述情况描述情况描述情况描述情况描述</p>
          <base-play-record class="pd28" :isEdit="false"></base-play-record>
          <div>
            <p class="left_title">现场照片</p>
            <base-take-photo :istakePhoto="false" :Imgs="Imgs"></base-take-photo>
          </div>
        </div>
        
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Imgs:[require("../../assets/imgs/test1.jpg")]
    }
  }
}
</script>

