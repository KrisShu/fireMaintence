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
        <span style="margin-right: 10px;">值班</span>
        <span>张胜利 (18349900415)</span>

      </div>
      <!--  -->
      <div class="find_time pd28  van-hairline--bottom">
        <span class="left_tip">发现时间:</span>
        <span>2019-10-12 11:52</span>
      </div>
      <!--  -->
      <div class="problem_describetion pd28 van-hairline--bottom">
        <p class="left_tip">问题描述:</p>
        <p class="describetion">
          A座23楼，发现楼梯拐角处停放有一辆电动车，暂未找到主人
        </p>
        <van-grid class="imgBox" :gutter="20" :column-num="3">
          <van-grid-item @click="showImg(index)" v-for="(value,index) in testImg" :key="index">
            <van-image class="img" :src="value.img" />
          </van-grid-item>
        </van-grid>
      </div>
      <!--  -->
      <div class="solution_time pd28  van-hairline--bottom">
        <span class="left_tip">解决时间:</span>
        <span>2019-10-12 11:52</span>
      </div>
      <!--  -->
      <div class="solution_way pd28  van-hairline--bottom">
        <span class="left_tip">处理途径:</span>
        <span>自行处理</span>
      </div>
      <!--  -->
      <div class="remark_tips pd28  van-hairline--bottom">
         <span class="left_tip">备注信息:</span>
        <p class="tips">
          已联系车辆主人处理
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
      ]
    }
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
    }
  }
}
</script>

