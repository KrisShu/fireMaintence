<style lang="less">
  #handle{
    height: 100%;
    display: flex;
    flex-direction: column;
    .content{
      flex: 1;
    }
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
    .base_play_record{
      margin-top: 20px;
    }
    /*  */
    .problem_describetion{
      .describetion{
        font-size: 26px;
        color: #8e8e8e;
        line-height: 1.5;
        margin: 20px 0px;
      }

    }
    /*  */
    .problem_handle{

      .handleBox{
        padding: 30px 0px;
        background-color: #f3f2f2;
        margin-top: 40px;
        border-radius: 8px;
        .van-cell-group{
           background-color: #f3f2f2;
        }
        .van-cell{
          padding: 0px;
           background-color: #f3f2f2;
           .van-cell__title{
             font-size: 26px;
           }
         
        }
         .van-switch{
            font-size: 32px  !important;
          }
          .howtoHandle{
            .text{
              margin-bottom: 20px;
            }
            .van-radio-group{
              padding-left: 100px;
              .van-radio:nth-of-type(1){
                margin-bottom: 10px;
              }
              .van-radio__icon .van-icon{
                width: 1.2em;
                height: 1.2em;
              }
            }
          }
          .van-field__label{
            width: 100px;
          }
          textarea{
            background: white;
            text-indent: 20px;
          }
      }
    }
    /*  */
    .btns{
      padding: 20px;
    }
    

  }
</style>


<template>
  
  <div id="handle">
      <base-nav active='0' title="设施故障待处理"></base-nav>
        <div class="content">
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
            <p class="describetion" v-if="BreakDownInfo.problemRemakeType == 1">
            {{BreakDownInfo.remakeText}}
            </p>
            <base-play-record v-if="BreakDownInfo.problemRemakeType == 2" :time="BreakDownInfo.voiceLength" :recordVoice="BreakDownInfo.voice" class="base_play_record" :isEdit='false'></base-play-record>
            <base-take-photo :istakePhoto="false" :trueImgs="BreakDownInfo.truephotoList" :Imgs="BreakDownInfo.photoList"></base-take-photo>
          </div>
          <!--  -->
          <div class="problem_handle pd28">
          <p class="left_tip">问题处理</p>
          <div class="handleBox">
            
              <van-cell-group class="pd20 van-hairline--bottom">
                <van-switch-cell v-model="checked" title="是否已解决" />
              </van-cell-group>

              <div class="howtoHandle pd20">
                <p class="text">问题处理途径</p>
                <van-radio-group v-model="radio">
                  <van-radio name="1">维保叫修</van-radio>
                </van-radio-group>
              </div>

              <div class="pd20">
                <van-cell-group>
                  <van-field v-model="message" label="备注" type="textarea"  placeholder="请输入留言" rows="6" autosize />
                </van-cell-group>
              </div>
          </div>
          </div>
        </div>
      <!--  -->
        <div class="btns">
            <van-button type="info" @click="submit" size="large">提交</van-button>
        </div>


  </div>
</template>

<script>

export default {
  data(){
    return{
      BreakDownId:'',
      BreakDownInfo:{},
      checked: false,
      radio: '1',
       message:'',
      testImg:[]
    }
   
  },
  created(){
    this.BreakDownId = this.$route.query.BreakDownId;
    this.GetBreakDownInfo(this.BreakDownId)
  },
  methods:{
    submit(){ 
      let handleStatus = this.checked ? '3':'2' 
   
      let UpdateBreakDownInfo ={
        breakDownId:this.BreakDownId,
        handleStatus,
        solutionWay : this.radio,
        remark:this.message
      }
      this.$axios.put(this.$api.UpdateBreakDownInfo,UpdateBreakDownInfo).then(res=>{
        if(res.data.result.success){
           this.$router.back();
        }
      }).catch(err=>{
         console.log("更新失败",err)
      })
     
    },
    GetBreakDownInfo(BreakDownId){
      this.$axios.get(this.$api.GetBreakDownInfo,{
        params:{
          BreakDownId
        }
      }).then(res=>{
        console.log("this.BreakDownInfo",res.data.result)
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

        //语音文字
        if (res.data.result.problemRemakeType == 2) {
            this.BreakDownInfo.voice = `${this.$url}${res.data.result.remakeText}`;
        }

          console.log("获取BreakDownId",res)
      }).catch(err=>{
         console.log("获取BreakDownId",err)
      })
    }
    
  }
}
</script>

