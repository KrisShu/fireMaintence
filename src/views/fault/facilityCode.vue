
<style lang="less" scoped>
#facilityCodeBox{
    .topBox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .imgsBox{
        img{
          width: 44px;
          height: 44px;
          margin-right: 20px;
        }
      }
    }
    .slotBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right_icons{
        img{
          width: 70px;
          height: 70px;
          &:nth-of-type(1){
            margin-right: 20px;
          }
        }
      }

    }
}
  
</style>
<template>
  <div id="facilityCodeBox">
 
      <div class="topBox">
        <van-cell-group>
          <van-field v-model="value" placeholder="输入设施编码进行查询" />
        </van-cell-group>
        <div class="imgsBox">
          <img src="../../assets/imgs/site_btn_saoma.png" alt="">
          <img src="../../assets/imgs/add.png">
        </div>
      </div>
      

      <base-list :tableList="tableList">
        <div class="slotBox" slot="content" slot-scope="scope">
          <div class="left_text">
            <p>
              {{scope.item.code}}
              <span>{{scope.item.tips}}</span>
            </p>
            <p>{{scope.item.address}}</p>
          </div>
          <div class="right_icons">
            <img src="../../assets/imgs/guide_btn_edit.png" alt="">
            <img src="../../assets/imgs/guide_btn_del.png" alt="">
          </div>
        </div>
      </base-list>
      
  </div>
</template>

<script>
export default {
  data(){
    return{
      value:'',
      tableList:[
        {
          address:'A座1楼左侧大厅',
          code:'GkJ68',
          tips:'消防供配电系统'
        },
        {
          address:'A座1楼左侧大厅',
          code:'GkJ68',
          tips:'消防供配电系统'
        }
      ],
      params:{
        
      }
    }
  },
  methods:{
    axiosWay(){
      this.$axios.get(this.$api.GetEquipmentNoList)
    }
  }
}
</script>

