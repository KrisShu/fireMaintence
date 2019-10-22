<style lang="less">
  #addPatrolTrajectroyBox{
    display: flex;
    flex-direction: column;
    height: 100%;
    .addPatrolTrajectroyBox_content{
      flex: 1;
      .bggary{
        margin-top: 20px;
        line-height: 1.5;
        padding: 6px;
        box-sizing: border-box;
        width: 100%;
        height: 88px;
        background-color: #f0f0f0;
      }
      .normalBox{
        .top{
          .van-cell{
            padding: 0;
            flex: 1;
          }

        }
        .van-checkbox{
          padding: 16px 0px 16px 130px;
          .van-checkbox__icon .van-icon{
            width: 32px;
            height: 32px;
            border-radius: 6px;
            font-size:18px;
            line-height: 1.2;
          }
          .van-checkbox__label{
            font-size: 28px;
            color: #262626;
          }
        }
        
      }

      .van-switch{
        font-size: 36px !important; 
      }
      .problemBox{
        .record_textIcon{
          width: 50px;
          height: 50px;
        }
        .van-switch{
          font-size: 32px !important; 
        }
      }
    }
    .btns{
      width: 100%;
      box-sizing: border-box;
      justify-content: space-around !important;
      margin-top: 30px;
      .van-button{
        width: 300px;
        
      }
      .button2{
          background: url("../../assets/imgs/load_btn_02bg.png");
          color:white;
          border-color: #00e2cf;
        }
    }
    
  }
</style>
<template>
  <div id="addPatrolTrajectroyBox">
    <base-nav title="新增巡查轨迹"></base-nav>
    <div class="addPatrolTrajectroyBox_content">
          <!-- 扫码巡查 -->
      <div v-if="isnormal" class="sweepCode pd28 van-hairline--bottom">
        <div class="displayflex">
          <span class="left_title">设施编码：HK877v</span>
          <base-sweep-code></base-sweep-code>
        </div>
        <div class="bggary">
          <p>灭火器</p>
          <p>A座14楼电梯口</p>
        </div>
      </div>
       <!-- 一般巡查方式 -->
      <div v-else class="normalBox">
        <div class="top displayflex pd28 van-hairline--bottom">
          <span class="left_title">巡查地点：</span>
            <van-field v-model="patrolAddress" placeholder="输入地点名称"/>
        </div>
        <div class="patrolSystemBox pd28 van-hairline--bottom">
          <p class="left_title">巡查系统</p>
          <van-checkbox-group   v-model="result">
            <van-checkbox v-for="(arr,index) in Systems" :key="index" shape="square" :name="arr">{{arr.systemName}}</van-checkbox>
          </van-checkbox-group>
          
        </div>
      </div>
      <!--  -->
      <div class="displayflex pd28 van-hairline--bottom">
        <span class="left_title">发现问题</span>
        <van-switch v-model="isfind"/>
      </div>
      <!--  -->
      <div v-if="isfind" class="problemBox van-hairline--bottom">
        <div class="displayflex pd28">
          <span class="left_title">问题描述</span>
          <img @click="showrecordText" class="record_textIcon" :src="isRecord ? textIcon  : recodIcon" alt="">
        </div>
        <baseRecordText @voiceBase64="voiceBase64" :isRecord="isRecord" v-model="recordTexts"></baseRecordText>
        <div class="displayflex pd28 van-hairline--top-bottom">
            <span class="left_title">是否已解决</span>
            <van-switch v-model="issolution"/>
        </div>
      </div>
      <!--  -->
      <div class="pd28">
        <p class="left_title">现场照片：</p>
        <baseTakePhoto v-model="takeImgs"></baseTakePhoto>
      </div>
    </div>
    <div class="btns displayflex">
      
        <van-button type="info" @click="saveBack(0)" size="normal">保存并返回</van-button>
        <van-button class="button2"  @click="saveBack(1)"  size="normal">保存并继续添加</van-button>
    </div>
    
  </div>
</template>

<script>
import baseSweepCode from '../../components/baseSweepCode'
import { Toast } from 'vant';
import { log } from 'util';
export default {
  components:{
    baseSweepCode
  },
  data(){
    return{
      patrolAddress:'',
      result:[],
      Systems:[],
      isnormal:false,
      isfind:false,
      issolution:false,
      recodIcon:require("../../assets/imgs/zbxc_btn_yuyin.png"),
      textIcon:require("../../assets/imgs/zbxc_btn_jianpan.png"),
      isRecord:false,
      recordTexts:{},
      voiceFile:'',//
      takeImgs:[],//现场照片
    }
  },
  created(){
    this.getSystems();
  },
  methods:{
    /* 接收base64格式的语音文件 */
    voiceBase64(voiceBase64){
      this.voiceFile =  this.base64TOfile(voiceBase64,recordTexts.text)
    },
    showrecordText(){
      this.isRecord = !this.isRecord
    },
    getSystems(){
      this.$axios.get(this.$api.GetFireUnitlSystem,{
        params:{
          FireUnitId :+ localStorage.getItem('fireUnitId'),
        }
      }).then(res=>{
        console.log("获取巡查系统",res)
        this.Systems = res.data.result
      }).catch(err=>{
        console.log("获取巡查系统失败",err)
      })
    },
    saveBack(flag){
       console.log("this.takeImgs",this.takeImgs,this.recordTexts.text)
      console.log("flag",flag)
      if (this.patrolAddress) {
        let val ={  }
        val.patrolAddress = this.patrolAddress;//巡查地址
        val.systems =  this.result;//巡查系统
        //巡查系统的id
        let systemid = [];
        for(let arr of  this.result){
          systemid.push(arr.fireSystemId)
        }
        val.systemid = systemid.join(",")
        val.ProblemStatus = this.isfind ? (this.issolution ? 2:3) :1 ;//巡查结果
        //ProblemRemarkType----文字还是语音
        if (this.recordTexts.voice) {//语音
          val.ProblemRemarkType = 2
          val.RemarkVioceT = this.recordTexts.voice 
          //file对象的
          val.RemarkVioce = this.voiceFile
        }else{//文字
            val.ProblemRemarkType = 1
             val.RemarkVioce = ''
             val.ProblemRemark = this.recordTexts.text
        }

        val.creationTime = new Date().toLocaleString();//巡查时间
        if (this.takeImgs) {
          console.log("this.takeImgs",this.takeImgs.length)
          for(let i in this.takeImgs){
            //base64水印图片转文件对象
            val.photoListFile.push(this.base64TOfile(this.takeImgs[i]))
            //正常base64水印图片
            val.photoList.push(this.takeImgs[i])
          }
        }
       let patrolArray = this.$store.state.TrajectroyList
         if (!patrolArray) {
          patrolArray = [];
        } else {
          patrolArray = patrolArray;
        }
        patrolArray.unshift(val)//
        this.$store.commit('setTrajectroyList',patrolArray)
        this.$toast.success("本地保存成功,请尽快提交");
        flag ? this.$router.go(0): this.$router.back();
      }else{
       this.$toast('请填写正确的巡查地点');
      }
      // console.log("this.recordTexts.text",this.recordTexts.text)
    },
    /* base64转文件 */
    base64TOfile(base64){
      let that = this;
      var arr = base64.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]); // 解码base-64编码的数据
      var n = bstr.length; 
      var u8arr = new Uint8Array(n);// 无符号整型数组
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      //转换成file对象
      let filename = new Date().getTime();
      let filetest = new File([u8arr], filename, {type:mime})
      return filetest
    },
  }
}
</script>

