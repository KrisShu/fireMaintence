<style lang="less">
@font-color :#262626;
#fireUnitList{
  .slotBox{
    display: flex;
    align-items: center;
    span{
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .redicon{
    width: 36px;
    height: 36px;
    position: absolute;
   
  }
  .fireTitle{
    font-size: 30px;
    color: @font-color;
    margin-left: 46px;
  }
  .nodata{
    p{
      text-align: center;
      color: #cccccc;
      line-height: 2;
    }
  }
}
</style>
<template>
  <div id="fireUnitList">
      <base-list @pathTo="goToFault" @refresh="listData"  :finished="finished"  @onLoad="listData" :tableList="fireUnitList" :islink="true">
        <div class="slotBox" slot="content" slot-scope="scope">
          <img class="redicon" v-show="scope.item.haveSafeEvent" src="../../assets/imgs/red.png" alt="">
          <span class="fireTitle">{{scope.item.fireUnitName}}</span>
        </div>
        <div slot="nodataTips">
         <p>您还没有关联的防火单位</p>
         <p>请先到我的设置——我负责的防火单位中设置</p>
        </div>
      </base-list>
  </div>
</template>

<script>
export default {
  data(){
    return{
      fireUnitList:[],
      page:{
        UserId: this.$store.state.userInfo.userId,
        SkipCount:0
      },
      loading:false,
      finished:false,
      isLoading:false
    }
   
  },
  created(){
  },
  methods:{
    goToFault(item){
      console.log("item",item)
      localStorage.setItem('fireUnitId',item.fireUnitId)
      localStorage.setItem('fireUnitName',item.fireUnitName)
      this.$router.push({
        path:'/fault'
      })
    },
    /* 请求列表数据 */
    listData(a){
       let p = this.page
      if (a == 'refresh') {

        p.SkipCount = 0;
        this.fireUnitList = [];
        this.$axios.get(this.$api.GetSafeUnitUserEvent,{
          params:p
        }).then(res=>{
          console.log("维保事物列表",res)
          if(res.data.result.totalCount>0){
            this.fireUnitList = this.fireUnitList.concat(res.data.result.items) 
            if (res.data.result.items.length<10) {
              this.finished = true 
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      }else if (a == 'onLoad'){
        p.SkipCount = this.fireUnitList.length
        this.$axios.get(this.$api.GetSafeUnitUserEvent,{
          params:p
        }).then(res=>{
          console.log("维保事物列表",res)
          if(res.data.result.totalCount>0){
            this.fireUnitList = this.fireUnitList.concat(res.data.result.items) 
            if (res.data.result.items.length<10) {
              this.finished = true 
            }
          }else{
             this.finished = true 
          }
        }).catch(err=>{
          console.log(err)
        })
      }
     
      
    },

    // listData(success){
    //   let p = this.page
    //   let x = arguments [0] instanceof Object
    //   if(!x){
    //     p.SkipCount =0
    //   }
    //   this.$axios.get(this.$api.GetSafeUnitUserEvent,{
    //     params:p
    //   }).then(res=>{
    //     console.log("维保事物列表",res)
    //     if(res.data.result.totalCount>0){
    //       this.fireUnitList = this.fireUnitList.concat(res.data.result.items) 
    //       x ? success(this.fireUnitList.length,res.data.result.totalCount,p):''
    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }
  }
}
</script>

