<style lang="less">
#addDuty{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .vh{
    flex: 1;
  }
  .duty_record_title{
    margin-bottom: 40px;
  }
  .van-cell__title{
    font-size: 28px;
    color: #262626;
  }
  /*  */
  .problem_describetioBOX{
    .record_textIcon{
      width: 50px;
      height: 50px;
    }
    .van-switch{
        font-size: 32px  !important;
      }
  }
  /*  */
  .btns{
    position: relative;
    bottom: 0px;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
<template>
  <div id="addDuty">
    <div class="vh">
      <base-nav active="0" title="新增值班记录"></base-nav>
      <!--  -->
      <div class="duty_name pd28 van-hairline--bottom displayflex">
        <span class="left_title">值班人员</span>
        <span class="color1">吴亦凡</span>
      </div>
      <!--  -->
      <div class="duty_record pd28 van-hairline--bottom ">
        <p class="displayflex duty_record_title">
          <span class="left_title">值班记录</span>
          <span class="color1">请填写纸质值班记录、并拍照存档</span>
        </p>
        <base-take-photo v-model="imgs"></base-take-photo>
      </div>
      <!--  -->
      <van-cell-group class="pd20 van-hairline--bottom">
          <van-switch-cell v-model="checked" title="发现问题" />
      </van-cell-group>
      <!--  -->
      <div class="problem_describetioBOX" v-if="checked">
        <div class="displayflex pd28"> 
          <span class="left_title">情况描述</span>
          <img @click="showrecordText" class="record_textIcon" :src="isRecord ? textIcon  : recodIcon" alt="">
        </div>
        <base-record-text :isRecord="isRecord" v-model="recordText"></base-record-text>
        <!--  -->
        <van-cell-group class="pd20 van-hairline--bottom">
          <van-switch-cell v-model="isdel" title="是否已解决" />
        </van-cell-group> 
        <!--  -->
        <div class="pd28">
          <p class="left_title">  附件现场问题图片</p>
          <base-take-photo></base-take-photo>
        </div>
      </div>
    </div>
    
    <div class="btns">
          <van-button type="info" @click="submit" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgs:[],
      checked:false,//发现问题switch
      recodIcon:require("../../assets/imgs/zbxc_btn_yuyin.png"),
      textIcon:require("../../assets/imgs/zbxc_btn_jianpan.png"),
      isRecord:false,
      recordText:{},//情况说明
      isdel:false,//是否已解决
    }
  },
  methods:{
    dddd(){
      console.log("双向数据绑定",this.data)
      
    },
    showrecordText(){
      this.isRecord = !this.isRecord
    },
    /* 提交数据 */
    submit(){
      this.$router.back();
    }
  }

}
</script>

