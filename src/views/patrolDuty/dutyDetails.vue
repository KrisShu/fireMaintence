<style lang="less">
  #dutyDetails{
    .text_describe{
      color: rgb(107, 107, 107);
      font-size: 26px;
      margin-top: 30px;
      line-height: 1.5;

    }
    .basePlayRecord{
      margin-top: 30px;
    }
    .localImgs{
      padding-top: 28px;
    }
  }
</style>
<template>
  <div id="dutyDetails">
    <base-nav title="值班记录" active=0></base-nav>
    <div class="displayflex pd28 van-hairline--bottom">
      <span class="left_title">提交时间</span>
      <span class="color1">2019-9-15 11:50</span>
    </div> 
    <!--  -->
    <div class="displayflex pd28 van-hairline--bottom">
      <span class="left_title">值班人员</span>
      <span class="color1">吴亦凡</span>
    </div> 
    <!--  -->
    <div class="pd28 van-hairline--bottom">
      <p class="left_title">值班记录</p>
      <base-take-photo :istakePhoto="false" :Imgs="showImgs"></base-take-photo>
    </div>
    <!--  -->
    <div class="pd28 displayflex van-hairline--bottom">
      <span class="left_title">发现问题</span>
      <span class="color1">{{ isProblem ? '是':'否'}}</span>
    </div>
    <!--  -->
    <div v-if="isProblem" class="pd28 van-hairline--bottom">
        <!--  -->
        <div class="van-hairline--bottom">
            <p class="left_title">情况描述</p>
            <p class="text_describe">
              文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述
              文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述
            </p>
            <basePlayRecord class="basePlayRecord"></basePlayRecord>
        </div>
        <!--  -->
        <div class="localImgs">
          <p class="left_title">现场问题图片</p>
          <base-take-photo :istakePhoto="false" :Imgs="showImgs"></base-take-photo>
        </div>
       
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      showImgs:[
        require('../../assets/imgs/test1.jpg'),
        require('../../assets/imgs/test1.jpg'),
        require('../../assets/imgs/test1.jpg')],
      isProblem:true,
    
    }
  },
  created(){
    console.log("this.$route.query.isproblem",this.$route.query.isproblem)
   this.isProblem = this.$route.query.isproblem
  }
}
</script>

