<style lang="less">
#handledBox{
  .pd28{
      padding:30px; 
    }
    .pd20{
      padding: 20px;
    }
    .left_tip{
      font-size: 28px;
      color: #262626;
      margin-right: 20px;
    }
    .source,.find_time{
       font-size: 28px;
       color: #262626;
    }
    /*  */
    .problem_describetion{
      .describetion{
        font-size: 26px;
        color: #8e8e8e;
        line-height: 1.5;
        margin: 20px 0px;
      }
      .imgBox{
        .van-grid-item__content{
          padding: 0px;
        }
        .img{
         width: 100%;

        }
      }

    }
    /*  */
    .remark_tips{
      .tips{
        line-height: 1.5;
        font-size: 28px;
        color: #262626;
        margin-top: 20px;
      }
    }
}
    
</style>

<template>
  <div id="handledBox">
    <base-nav title="设施故障已解决" active="2"></base-nav>
    <!--  -->
      <div class="source pd28 van-hairline--bottom">
        <span class="left_tip">问题来源:</span>
        <span style="margin-right: 10px;" v-if="BreakDownInfo.source == 1">值班</span>
        <span style="margin-right: 10px;" v-if="BreakDownInfo.source == 2">巡查</span>
        <span style="margin-right: 10px;" v-if="BreakDownInfo.source == 3">物联终端</span>
          <span>{{BreakDownInfo.userName}} ({{BreakDownInfo.phone}})</span>

      </div>
      <!--  -->
      <div class="find_time pd28  van-hairline--bottom">
        <span class="left_tip">发现时间:</span>
        <span>{{BreakDownInfo.creationTime}}</span>
      </div>
      <!--  -->
      <div class="problem_describetion pd28 van-hairline--bottom">
        <p class="left_tip">问题描述:</p>
       <p class="describetion" v-if="BreakDownInfo.problemRemakeType ==1">
         {{BreakDownInfo.remakeText}}
        </p>
       <base-play-record v-if="BreakDownInfo.problemRemakeType ==2" :recordVoice="BreakDownInfo.remakeText" class="base_play_record" :isEdit='false'></base-play-record>
        <base-take-photo :istakePhoto="false" :trueImgs="BreakDownInfo.truephotoList" :Imgs="BreakDownInfo.photoList"></base-take-photo>
      </div>
      <!--  -->
      <div class="solution_time pd28  van-hairline--bottom">
        <span class="left_tip">解决时间:</span>
        <span>{{BreakDownInfo.solutionTime}}</span>
      </div>
      <!--  -->
      <div class="solution_way pd28  van-hairline--bottom">
        <span class="left_tip">处理途径:</span>
        <span class="left_tip">维保叫修</span>
      </div>
      <!--  -->
      <div class="remark_tips pd28  van-hairline--bottom">
         <span class="left_tip">备注信息:</span>
        <p class="tips">
         {{BreakDownInfo.remark}}
        </p>
      </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  data(){
    return{
      testImg:[
        {
          img:require('../../assets/imgs/test1.jpg')
        },
        {
          img:require('../../assets/imgs/test1.jpg')
        },
        {
          img:require('../../assets/imgs/test1.jpg')
        }
      ],
      BreakDownInfo:[]
    }
  },
  created(){
    this.BreakDownId = this.$route.query.BreakDownId;
    console.log("处理中", this.BreakDownId)
    this.GetBreakDownInfo(this.BreakDownId)
  },
  methods:{
    showImg(index){
     const instance = ImagePreview({
        images: [
        require('../../assets/imgs/test1.jpg'),
        require('../../assets/imgs/test1.jpg'),
      ],
        startPosition: index,
        closeOnPopstate: true
      });
    },
    /* 获取信息 */
    GetBreakDownInfo(BreakDownId){
       this.$axios.get(this.$api.GetBreakDownInfo,{
        params:{
          BreakDownId
        }
      }).then(res=>{
        this.BreakDownInfo =  res.data.result
        this.BreakDownInfo.photoList =[];
        this.BreakDownInfo.truephotoList =[];
        //遍历真实图片
        for(let arr of  res.data.result.patrolPhotosPath){
          this.BreakDownInfo.truephotoList.push(`${this.$url}${arr}`)
        }
        //便利缩略图
        for(let arr of  res.data.result.photosBase64){
          this.BreakDownInfo.photoList.push(`data:image/;base64,${arr}`)
        }
          console.log("获取BreakDownId",res)
      }).catch(err=>{
         console.log("获取BreakDownId",err)
      })
    }
  }
}
</script>

