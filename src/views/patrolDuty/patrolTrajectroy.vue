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
      <base-nav title="巡查轨迹详情" :PatrolId="content.patrolId"></base-nav>

      <div class="patrolTrajectroyContent">
        <p class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查时间</span>
          <span class="color1">{{content.creationTime}}</span>
        </p>
        <p class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查地点</span>
          <span class="color1">{{content.patrolAddress}}</span>
        </p>
        <!-- <div v-if="!add" class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查系统</span>
          <div class="patrolTrajectroy_system color1">
            <p v-for="(sys,index2) in content.fireSystemNames" :key="index2">{{sys}}</p>
            
          </div>
        </div> -->
        <!-- <div v-else class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查系统</span>
          <div class="patrolTrajectroy_system color1">
            <p v-for="(sys,index2) in content.systems" :key="index2">{{sys.systemName}}</p>
          </div>
        </div> -->
        <p v-if="!add" class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查结果</span>
          <span class="color1" v-if="content.patrolStatus == 1">正常</span>
          <span class="color1" v-if="content.patrolStatus == 2">故障</span>
          <span class="color1" v-if="content.patrolStatus == 3">故障</span>
        </p>
        <p v-else class="pd28 displayflex van-hairline--bottom">
          <span class="left_title ">巡查结果</span>
          <span class="color1" v-if="content.ProblemStatus == 1">正常</span>
          <span class="color1" v-if="content.ProblemStatus == 2">故障</span>
          <span class="color1" v-if="content.ProblemStatus == 3">故障</span>
        </p>
        <!--  -->
        <div v-if="!add" class="pd28">
          <p class="left_title">情况描述</p>
          <p class="pd28 color1 patrolTrajectroy_text" v-if="content.problemRemakeType == 1">{{content.remakeText}} </p>
          <base-play-record :time="content.voiceLength" :recordVoice="content.remakeText" v-if="content.problemRemakeType == 2" class="pd28" :isEdit="false"></base-play-record>
          <div v-if="content.photosBase64.length>0">
            <p class="left_title">现场照片</p>
            <base-take-photo :istakePhoto="false" :trueImgs="content.truephotoList" :Imgs="content.photoList"></base-take-photo>
          </div>
        </div>
        <div v-else class="pd28">
          <p class="left_title">情况描述</p>
          <p class="pd28 color1 patrolTrajectroy_text" v-if="content.ProblemRemarkType == 1">{{content.ProblemRemark}} </p>
          <base-play-record :Editduration="true" :recordVoice="content.RemarkVioceT" v-if="content.ProblemRemarkType == 2"  class="pd28" :isEdit="false"></base-play-record>
          <div v-if="content.photoList.length>0">
            <p class="left_title">现场照片</p>
            <base-take-photo :istakePhoto="false" :trueImgs="content.photoList" :Imgs="content.photoList"></base-take-photo>
          </div>
        </div>
        
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Imgs:[require("../../assets/imgs/test1.jpg")],
      content:'',
      add:''
    }
  },
  created(){
    console.log(" this.$route.query.isadd", this.$route.query)
    this.add = this.$route.query.isadd 
    this.$route.query.isadd ? this.getLocalVuex():this.getVuexData()
    
  },
  methods:{
    getVuexData(){
      console.log("sdddddadsdfsdfsfsfsfsfsfsdfsfsd")
      let val = this.$store.state.localTrajectroy
      val.photoList =[];
      val.truephotoList =[];
     
      console.log("val",val)
      if (val.patrolId && val.problemRemakeType == 2) {
         val.remakeText = `${this.$url}${val.remakeText}`;       
      }
      //遍历缩略图
      for(let arr of val.photosBase64){
        val.photoList.push(`data:image/;base64,${arr}`)
      }
        //遍历真实图片
      for(let arr of  val.patrolPhotosPath){
        val.truephotoList.push(`${this.$url}${arr}`)
      }
      this.content = val
    },
    /*  */
    getLocalVuex(){
       let val = this.$store.state.localTrajectroy
      this.content = val
    }
  }
}
</script>

