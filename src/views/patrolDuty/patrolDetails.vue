<style lang="less">
#patrolDetailsBox{
  .noData{
    width: 100%;
    display: flex;
    justify-content: center;
    & >img{
      width: 36px;
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
  }
 .re{
   position: relative;
 }
}
</style>
<template>
  
  <div id="patrolDetailsBox">
    <!-- 新增 -->
    <div v-if="add">
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
          <p class="dataBox_title pd28 van-hairline--bottom">
            有效轨迹点{{localList.length}}个，发现2个问题，现场解决1个问题
          </p>
          <div class="pd28 re">
              <van-steps  direction="vertical" :active="localList.length">
                <van-step v-for="(val,index) in localList" :key="index">
                  <div class="step_content "  @click="showTrajectroy(val)">
                    <p class="displayflex">
                      <span class="color1">{{val.creationTime}}</span>
                      <span class="color1" v-if="val.ProblemStatus == 1">正常</span>
                      <span class="color1" v-if="val.ProblemStatus == 2">故障</span>
                      <span class="color1" v-if="val.ProblemStatus == 3">故障</span>
                    </p>
                    <p class="left_title pd20_topBottom">{{val.systems[0].systemName}}等{{val.systems.length}}个系统</p>
                    <p v-if="val.ProblemRemarkType == 1" class="left_title overflow">
                        {{val.ProblemRemark}}
                    </p>
                    <base-play-record v-if="val.ProblemRemarkType == 2"></base-play-record>
                    <div class="imgs pd20_topBottom" v-if="val.photoList">
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
      <!--  -->

    </div>
    <!-- 查看 -->
    <div class="dataBox" v-else>
      <p class="dataBox_title pd28 van-hairline--bottom">
        有效轨迹点{{total}}个，发现2个问题，现场解决1个问题
      </p>
        <div class="pd28 re">
              <van-steps  direction="vertical" :active="patrolTrajectroy.length">
                <van-step v-for="(val,index) in patrolTrajectroy" :key="index">
                  <div class="step_content "  @click="showTrajectroy(val)">
                    <p class="displayflex">
                      <span class="color1">{{val.creationTime}}</span>
                      <span class="color1" v-if="val.patrolStatus == 1">正常</span>
                      <span class="color1" v-if="val.patrolStatus == 2">故障</span>
                      <span class="color1" v-if="val.patrolStatus == 3">故障</span>
                    </p>
                    <p class="left_title pd20_topBottom">{{val.fireSystemName}}等{{val.fireSystemNames.length}}个系统</p>
                    <p v-if="val.problemRemakeType == 1" class="left_title overflow">
                        {{val.remakeText}}
                    </p>
                    <base-play-record v-if="val.problemRemakeType == 2" :isEdit="false"></base-play-record>
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
      step:[
        // {
        //   time:'2019-101-12 11:50',
        //   status : 0,
        //   system:"巡查消防",
        //   text:'栋1单元21楼，发现楼梯拐角处电箱栋1单元21楼，发现楼梯拐角处电箱门',
        //   img:[require('../../assets/imgs/test1.jpg'),require('../../assets/imgs/test1.jpg'),require('../../assets/imgs/test1.jpg')]
        // },
        // {
        //   time:'2019-101-12 11:50',
        //   status : 0,
        //   system:"巡查消防",
        //   text:'栋1单元21楼，发现楼梯拐角处电箱栋1单元21楼，发现楼梯拐角处电箱门',
        //   img:[require('../../assets/imgs/test1.jpg')]
        // },
        //  {
        //   time:'2019-101-12 11:50',
        //   status : 0,
        //   system:"巡查消防",
        //   text:'栋1单元21楼，发现楼梯拐角处电箱栋1单元21楼，发现楼梯拐角处电箱门',
        //   img:[require('../../assets/imgs/test1.jpg')]
        // }
      ],
      total:0,
      patrolTrajectroy:[],//查看
      localList:[],//本地信息
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
      this.step.splice(index,1)
    },
    showTrajectroy(item){
      this.$store.commit('setlocalTrajectroy',item)
      this.$router.push({
        path:'/patrolTrajectroy',
        isadd:this.add
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
        this.patrolTrajectroy = res.data.result
        for(let arr1 of res.data.result){
          arr1.photoList =[]
          for(let arr of arr1.photosBase64){
            arr1.photoList.push(`data:image/;base64,${arr}`)
          }
        }
         
      }).catch(err=>{
        console.log("巡查轨迹失败",err)
      })
    },
    /* 获取本地 */
    getLocal(){
      console.log("this.$store.state.localTrajectroy",this.$store.state.TrajectroyList)
       this.localList = this.$store.state.TrajectroyList
    }

  }
}
</script>

