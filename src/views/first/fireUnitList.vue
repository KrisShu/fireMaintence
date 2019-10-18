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
}
</style>
<template>
  <div id="fireUnitList">
      <base-list @pathTo="goToFault" @refresh="listData"  :finished="finished"  @onLoad="onLoad" :tableList="fireUnitList" :islink="true">
        <div class="slotBox" slot="content" slot-scope="scope">
          <img class="redicon" v-show="scope.item.haveSafeEvent" src="../../assets/imgs/red.png" alt="">
          <span class="fireTitle">{{scope.item.fireUnitName}}</span>
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
    this.listData();
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
      if (a == 'refresh') {
        console.log("刷新")
        return
      }
      console.log("a",a)
        let p = this.page
      this.$axios.get(this.$api.GetSafeUnitUserEvent,{
        params:p
      }).then(res=>{
        console.log("维保事物列表",res)
        if(res.data.result.totalCount>0){
          this.fireUnitList = this.fireUnitList.concat(res.data.result.items) 
          if (res.data.result.items.length<10) {
            this.finished = true 
            // this.loading = false 
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    onLoad(){

    }

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

