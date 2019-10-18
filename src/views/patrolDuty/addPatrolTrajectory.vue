<style lang="less">
  #addPatrolTrajectroyBox{
    display: flex;
    flex-direction: column;
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
            <van-checkbox v-for="(arr,index) in checkbox" :key="index" shape="square" :name="arr">复选框 a</van-checkbox>
          </van-checkbox-group>
          
        </div>
      </div>
      <!--  -->
      <div class="displayflex pd28 van-hairline--bottom">
        <span class="left_title">发现问题</span>
        <van-switch v-model="checked"/>
      </div>
      <!--  -->
      <div v-if="checked" class="problemBox van-hairline--bottom">
        <div class="displayflex pd28">
          <span class="left_title">问题描述</span>
          <img @click="showrecordText" class="record_textIcon" :src="isRecord ? textIcon  : recodIcon" alt="">
        </div>
        <baseRecordText :isRecord="isRecord" v-model="recordTexts"></baseRecordText>
        <div class="displayflex pd28 van-hairline--top-bottom">
            <span class="left_title">是否已解决</span>
            <van-switch v-model="checked"/>
        </div>
      </div>
      <!--  -->
      <div class="pd28">
        <p class="left_title">现场照片：</p>
        <baseTakePhoto></baseTakePhoto>
      </div>
    </div>
    <div class="btns displayflex">
      
        <van-button type="info"  size="normal">保存并返回</van-button>
        <van-button class="button2"  size="normal">保存并继续添加</van-button>
    </div>
    
  </div>
</template>

<script>
import baseSweepCode from '../../components/baseSweepCode'
export default {
  components:{
    baseSweepCode
  },
  data(){
    return{
      patrolAddress:'',
      result:['a'],
      checkbox:['a','b','c','d'],
      isnormal:false,
      checked:true,
      recodIcon:require("../../assets/imgs/zbxc_btn_yuyin.png"),
      textIcon:require("../../assets/imgs/zbxc_btn_jianpan.png"),
      isRecord:false,
      recordTexts:{}
    }
  },
  methods:{
    showrecordText(){
      this.isRecord = !this.isRecord
    }
  }
}
</script>

