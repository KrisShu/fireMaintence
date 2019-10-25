
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
          margin-left: 20px;
        }
      }
    }
    .slotBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right_icons{
        img{
          width: 64px;
          height: 64px;
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
 
      <div class="topBox pd28">
        <van-cell-group>
          <van-field v-model="value" placeholder="输入设施编码进行查询" />
        </van-cell-group>
        <div class="imgsBox displayflex">
         <base-sweep-code @barcode="getcode"></base-sweep-code>
          <img @click="add" src="../../assets/imgs/add.png">
        </div>
      </div>
      

      <base-list  :finished="finished" @onLoad="listData" @refresh="listData" :tableList="tableList">
        <div class="slotBox" slot="content" slot-scope="scope">
          <div class="left_text">
            <p>
              {{scope.item.equiNo}}：
              <span>{{scope.item.fireSystemName}}</span>
            </p>
            <p>{{scope.item.address}}</p>
          </div>
          <div class="right_icons">
            <img @click="edit(scope.item)" src="../../assets/imgs/guide_btn_edit.png" alt="">
            <img @click="deleteCode(scope.item)" src="../../assets/imgs/guide_btn_del.png" alt="">
          </div>
        </div>
      </base-list>
      
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
      value:'',
      finished:false,
      tableList:[],
      page:{
        FireUnitId:localStorage.getItem('fireUnitId'),
        SkipCount:0
      }
    }
  },
  methods:{
    /* 获取扫码字段值 */
    getcode(code){
      this.value = code
    },
    listData(flag){
      let p = this.page;
      if (flag =="onLoad") {
        p.SkipCount = this.tableList.length
         this.axiosWay(p)
      }else if (flag == 'refresh') {
         p.SkipCount = 0;
         this.tableList =[];
         this.axiosWay(p)
      }
      
     
    },
    axiosWay(p){
      this.$axios.get(this.$api.GetEquipmentNoList,{
        params:p
      }).then(res=>{
        console.log("res",res)
        this.tableList = this.tableList.concat(res.data.result.equipmentNoList)
        if (res.data.result.equipmentNoList.length<10) {
          this.finished = true;
        }
      })
    },
    /* 编辑 */
    edit(item){
      console.log("item",item)
      this.$router.push({
        path:'/editCode',
        query:{
          item:item
        }
      })
    },
    /* 新增 */
    add(){
      this.$router.push({
        path:'/editCode'
      })
    },
    /* 删除 */
    deleteCode(item){
      let data = {
        opreation:0,
        id:item.id,
        equiNo:item.equiNo,
        address:item.address,
        fireSystemId:item.fireSystemId
      }
    this.$axios.put(this.$api.UpdateEquipmentNoInfo,data).then(res=>{
        console.log("删除成功",res)
    }).catch(err=>{
        console.log("删除失败",err)
    })

    }
  }
}
</script>

