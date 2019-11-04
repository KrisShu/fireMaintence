<style lang="less">
#patrolDetailsBox{
  height: 100%;
  .noData{
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    & >img{
      width: 26px;
      height: 90%;
      margin-top: 40px;
    }
    .noData_text{
        display: flex;
        align-items: center;
        position: absolute;
        top: 60%;
        img{
          width: 36px;
          margin-right:20px; 
        }
      
        span{
          font-size: 32px;
          color: #aeadad;
          
        }
    }
  }

  .dataBox{
    display: flex;
    flex-direction: column;
    height: 100%;
    .dataBox_content{
      flex: 1;
    }
    .dataBox_title{
      font-size: 26px;
      color: #a0a0a0;
      letter-spacing: 2px;
    }
    .van-step__title{
      border: 1px solid rgb(216, 216, 216);
      padding: 8px
    }
    .van-step--vertical{
      padding: 10px !important
    }
    .van-step__circle-container,
    .van-step__line {
      top: 50%;
    }
    .van-step__circle{
      width: 20px;
      height: 20px;
    }
    .van-grid-item__content{
      padding: 0px;
    }
    .img{
      width: 160px;
      height: 140px;
    }
    .deleteIcon{
      position: absolute;
      top: 0px;
      right: 0px;

      width: 40px;
    }
    .voiceBg{
      margin-top: 20px;
      width: 120px;
      height: 50px;
      border-radius: 10px;
      background:#4cc234;
      color: white;
      text-align: center;
      span{
        font-size: 20px;
      }
    }
  }
 .re{
   position: relative;
 }
 .green{
   color: green;
 }
 .blue{
   color: rgb(0, 162, 255);
 }
 .orange{
   color: orangered;
 }
}
</style>
<template>
  
  <div id="patrolDetailsBox">
    <!-- 新增 -->
    <div style="height:100%" v-if="add">
      <!--  -->
      <div v-if="localList.length<=0" class="noData">
        <img src="../../assets/imgs/zbxc_img_03.png" alt="">
        <div class="noData_text">
          <img src="../../assets/imgs/zbxc_img_02.png" alt="">
        <span>还没有巡查轨迹哦！</span>
        </div>
      </div>
      <!--  -->
      <div v-else class="dataBox">
        <div class="dataBox_content">
           <p class="dataBox_title pd28 van-hairline--bottom">
            有效轨迹点{{localList.length}}个，发现2个问题，现场解决1个问题
          </p>
          <div class="pd28 re">
              <van-steps  direction="vertical" :active="localList.length">
                <van-step v-for="(val,index) in localList" :key="index">
                  <div class="step_content "  @click="showTrajectroy(val)">
                    <p class="displayflex pd20_topBottom van-hairline--bottom">
                      <span class="color1">{{val.creationTime}}</span>
                      <span class="color1 green" v-if="val.ProblemStatus == 1">正常</span>
                      <span class="color1 blue" v-if="val.ProblemStatus == 2">故障</span>
                      <span class="color1 orange" v-if="val.ProblemStatus == 3">故障</span>
                    </p>
                    <!-- <p class="left_title pd20_topBottom">{{val.systems[0].systemName}}等{{val.systems.length}}个系统</p> -->
                    <p v-if="val.ProblemRemarkType == 1" class="left_title overflow">
                        {{val.ProblemRemark}}
                    </p>
                    <div class="voiceBg" v-if="val.ProblemRemarkType == 2">
                      <span>语音</span>
                    </div>
                    <div class="imgs pd20_topBottom" v-if="val.photoList.length>0">
                      <van-grid :border="false" :gutter="10" :column-num="3">
                        <van-grid-item v-for="(img,index2) in val.photoList" :key="index2">
                          <img class="img" :src="img" alt="">
                        </van-grid-item>
                        </van-grid>
                    </div>
                    
                  </div>
                  <img @click="deleteTrajectroy(index)" class="deleteIcon" src="../../assets/imgs/delete_red.png" alt="">
                </van-step>
               </van-steps>
          </div>
        </div>
        <div class="btns" @click="submit">
          <van-button type="info"  size="large">提交</van-button>
        </div>
         
      </div>
      <!--  -->

    </div>
    <!-- 查看 -->
    <div class="dataBox" v-else>
      <p class="dataBox_title pd28 van-hairline--bottom">
        有效轨迹点{{total}}个，发现{{problemcount.length}}个问题，现场解决{{problemhadcount.length}}个问题
      </p>
      <div class="pd28 re">
            <van-steps  direction="vertical" :active="patrolTrajectroy.length">
              <van-step v-for="(val,index) in patrolTrajectroy" :key="index">
                <div class="step_content "  @click="showTrajectroy(val)">
                  <p class="displayflex">
                    <span class="color1">{{val.creationTime}}</span>
                    <span class="color1 green" v-if="val.patrolStatus == 1">正常</span>
                    <span class="color1 blue" v-if="val.patrolStatus == 2">故障</span>
                    <span class="color1 orange" v-if="val.patrolStatus == 3">故障</span>
                  </p>
                  <!-- <p class="left_title pd20_topBottom">{{val.fireSystemName}}等{{val.fireSystemNames.length}}个系统</p> -->
                  <p v-if="val.problemRemakeType == 1" class="left_title overflow">
                      {{val.remakeText}}
                  </p>
                  <div class="voiceBg" v-if="val.problemRemakeType == 2">
                    <span>语音</span>
                  </div>
                  <div class="imgs pd20_topBottom">
                    <van-grid :border="false" :gutter="10" :column-num="3">
                      <van-grid-item v-for="(img,index2) in val.photoList" :key="index2">
                        <img class="img" :src="img" alt="">
                      </van-grid-item>
                      </van-grid>
                  </div>
                  
                </div>
              </van-step>
            </van-steps>
      </div>

    </div>
    
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props:{
    add:{
      type:Boolean,
      default(){
        return true
      }
    },
    PatrolId:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      nodata:false,
      step:[],
      total:0,
      problemhadcount:[],//
      problemcount:[],//
      patrolTrajectroy:[],//查看
      localList:[],//本地信息,
      add_patrolId:'',

      takeImgsbase64:[]
    }
  },
  created(){
    console.log("PatrolId",this.PatrolId,this.add)
    if(!this.add){
      this.getpatroldetails();
    }else{
      this.getLocal()
    }
  },
  methods:{
    deleteTrajectroy(index){
      this.localList.splice(index,1)
     localStorage.setItem('patrolArray',JSON.stringify(this.localList))
     console.log("删除之后",this.$store.state.TrajectroyList.length)
    },
    showTrajectroy(item){
      console.log("this.add",this.add)
      this.$store.commit('setlocalTrajectroy',item)
      this.$router.push({
        path:'/patrolTrajectroy',
        query:{
          isadd :this.add
        }
      })
    },
    /* 查看巡查轨迹 */
    getpatroldetails(){
      this.$axios.get(this.$api.GetPatrolTrackList,{
        params:{
          PatrolId :this.PatrolId
        }
      }).then(res=>{
        console.log("巡查轨迹",res)
        this.total = res.data.result.length;
        // this.problemcount = 
        this.patrolTrajectroy = res.data.result
        for(let arr1 of res.data.result){
          arr1.photoList =[]
          for(let arr of arr1.photosBase64){
            arr1.photoList.push(`data:image/;base64,${arr}`)
          }
          if (arr1.patrolStatus == 3) {
            this.problemcount.push(arr1.patrolStatus)
          }
           if (arr1.patrolStatus == 2) {
            this.problemhadcount.push(arr1.patrolStatus)
          }
        }
         
      }).catch(err=>{
        console.log("巡查轨迹失败",err)
      })
    },
    /* 获取本地 */
    getLocal(){
      console.log("this.$store.state.localTrajectroy",localStorage.getItem('patrolArray'),this.$store.state.TrajectroyList)
      if (JSON.parse(localStorage.getItem('patrolArray')) ) {
        // this.localList = JSON.parse(localStorage.getItem('patrolArray')) 
        if (JSON.parse(localStorage.getItem('patrolArray')).length >0) {

          this.localList = this.$store.state.TrajectroyList
          console.log("this.localList的长度", this.localList.length)
          for (let index = 0; index < this.localList.length; index++) {
            console.log("循环数据")
            if (this.localList[index].photoListFile.length) {
              console.log("有图片就转码")
              this.takeImgsbase64[index] = {}
              for (let y = 0; y < this.localList[index].photoListFile.length; y++) {
               this.takeImgsbase64[index].file=[]
                  this.takeImgsbase64[index].file.push(this.getBase64Time(this.localList[index].photoListFile[y]))
              
              }
            }else{
              console.log("没有图片的接阔")
               this.takeImgsbase64[index] = 1
            }
            
            
          }

        }
      }
       
    },
    getBase64Time(url){
            console.log("调用此方法",url)
            let that =this;
            let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            image = new Image();
            image.crossOrigin = "Anonymous";
            image.onload = function() {//这里是一个异步，所以获取到的base64文件需要用回调
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0);
                ctx.font ="200px Arial";
                ctx.fillStyle = "tomato"; 
                let time = that.getCurrnetTime("timeSign");//获取当前的时间
                 console.log("time",time)
                ctx.textAlign = "end";
                ctx.textBaseline = "middle";
                ctx.fillText(time,image.width-20,image.height-100);
                let dataURL = canvas.toDataURL( "image/png/jpg"); 
                // console.log("dataURL",dataURL)
                return dataURL
                // that.takeImgsbase64.push(dataURL);
                // that.$emit('update:takeImgsbase64', that.takeImgsbase64) //双向绑定还是要抛出？这是个疑问
                // console.log("组件里的that.takeImgs",that.takeImgsbase64)
            };
            image.src = url
        },
         //获取当前时间
        getCurrnetTime(flga){
            let now = new Date(),
            year = now.getFullYear(), //得到年份
            month = now.getMonth()+1,//得到月份
            date = now.getDate(),//得到日期
            hour = now.getHours(),//得到小时
            minu = now.getMinutes(),//得到分钟
            seconds = now.getSeconds();//得到秒

            month = month<10?'0'+ month : month;
            date =date<10?'0'+ date : date;
            hour =hour<10?'0'+ hour : hour;
            minu = minu<10?'0'+ minu : minu;
            seconds = seconds<10?'0'+ seconds : seconds;
            if(flga == 'timeSign'){
                return year + "-" + month + "-" + date +" "+hour+":"+minu
            }else if(flga == 'name'){//返回时间戳
                return now.getTime()
            }
            
        },

         base64TOfile(base64){
           console.log("base64",base64)
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



    /* 提交 */
    // 新建一个巡查对象，然后返回ID，再依次添加数据
    submit(){
      
      console.log("转化的base64",this.takeImgsbase64,this.takeImgsbase64.length)
      Toast.loading({
        duration: 0,
        mask: true,
        message: "提交中"
      });
      let data={
        userId :this.$store.state.userInfo.userId,
        fireUnitId:localStorage.getItem('fireUnitId')
      }
      console.log("data",data)
      this.$axios.post(this.$api.AddPatrolTrack,data).then(res=>{
        console.log("添加巡查记录",res)
        if (res.data.success) {
          this.add_patrolId = res.data.result.patrolId
          this.submitTrajectroy()
        }

      }).catch(err=>{
        console.log("添加巡查记录失败",err)
      })
    },
    /* submit */
    submitTrajectroy(){
      let that = this;
      for (let index = 0; index < this.localList.length; index++) {
        let param = new FormData();
        param.append("PatrolId",that.add_patrolId)
        param.append("PatrolAddress",this.localList[index].patrolAddress)
        param.append("ProblemStatus",this.localList[index].ProblemStatus)
        param.append("ProblemRemarkType",this.localList[index].ProblemRemarkType)
        param.append("ProblemRemark",this.localList[index].ProblemRemark)
        param.append("RemarkVioce", this.localList[index].RemarkVioce)
          if ( this.localList[index].RemarkVioce) {
                 param.append("VoiceLength", this.localList[index].duration)
          }
          if (this.localList[index].photoListFile.length) {
            for (let y = 0; y <  this.takeImgsbase64[index].file.length; y++) {
              
              let fileImg = this.base64TOfile(this.takeImgsbase64[index].file[y])
              console.log("fileImg",fileImg)
              param.append(`LivePicture${Number(y) + 1}`, fileImg);
            }
           
          }
      }

       this.$axios.post(this.$api.AddPatrolTrackDetail,param).then(res => {
              console.log("添加巡查轨迹反馈",res)
                  Toast.clear();
                  that.$toast.success("提交成功");
                  that.$router.push({
                    name:'firePatrol'
                  });
                  localStorage.removeItem('patrolArray')
                  this.$store.commit('setTrajectroyList',[])
            }).catch(err=>{
              console.log("请求错误",err)
               Toast.clear();
               this.$toast('网络连接超时请稍后重试')
            })

      }


      // for(let arr of this.localList){
      //      let param = new FormData();
      //       param.append("PatrolId",that.add_patrolId)
      //       param.append("PatrolAddress",arr.patrolAddress)
      //       param.append("ProblemStatus",arr.ProblemStatus)
      //       param.append("ProblemRemarkType",arr.ProblemRemarkType)
      //       param.append("ProblemRemark",arr.ProblemRemark)
      //       param.append("RemarkVioce", arr.RemarkVioce)
      //       console.log(" arr.duration)", arr.duration)
      //       console.log(" arr.photoListFile)", arr.photoListFile,arr.photoListFile.length)
      //       if ( arr.RemarkVioce) {
      //            param.append("VoiceLength", arr.duration)
      //       }
      //     if (arr.photoListFile.length) {
      //        for (let y in arr.photoListFile){
      //          //转换为文件
      //           that.base64TOfile(that.takeImgsbase64[y])
      //          param.append(`LivePicture${Number(y) + 1}`, arr.photoListFile[y]);
      //       }
      //     }
           

      //       this.$axios.post(this.$api.AddPatrolTrackDetail,param).then(res => {
      //         console.log("添加巡查轨迹反馈",res)
      //             Toast.clear();
      //             that.$toast.success("提交成功");
      //             that.$router.push({
      //               name:'firePatrol'
      //             });
      //             localStorage.removeItem('patrolArray')
      //             this.$store.commit('setTrajectroyList',[])
      //       }).catch(err=>{
      //         console.log("请求错误",err)
      //          Toast.clear();
      //          this.$toast('网络连接超时请稍后重试')
      //       })

      // }

  }
}
</script>

