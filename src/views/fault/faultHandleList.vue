<style lang="less">
  #faultHandleList{
    .van-tabs__line{
      background-color: #039cfe;
    }
    .source_way{
      display: flex;
      justify-content: space-between;
      .source{
        font-size: 30px;
        color: #262626;
        flex: 8;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .way{
        font-size: 26px;
        color: #a9a9a9;
        flex: 1;
        text-align: right;
      }
      
    }
      .time{
        font-size: 26px;
        letter-spacing: 1px;
        color: #a2a2a2;
      }
  }
</style>
<template>
  <div id="faultHandleList" >
   <base-list @pathTo="goToDetails" @refresh="GetBreakDownlist" :finished="finished" @onLoad="GetBreakDownlist"  :tableList="list" >
    <div slot="content" slot-scope="scope">
      <div class="source_way">
        <span class="source">
          问题来源:{{scope.item.userName}} ({{scope.item.phone}})
        </span>
        <span v-if="scope.item.source == 1" class="way">
         值班
        </span>
         <span v-if="scope.item.source == 2" class="way">
         巡查
        </span>
        <span v-if="scope.item.source == 3" class="way">
         物联终端
        </span>
      </div>
      <p v-if="active == 0" class="time">发现时间：<span>{{scope.item.creationTime}}</span></p>
      <p v-if="active == 1" class="time">解决时间：<span>{{scope.item.solutionTime}}</span></p>
      <p v-if="active == 2" class="time">解决时间：<span>{{scope.item.solutionTime}}</span></p>
    </div>
   </base-list>
  </div>
</template>

<script>
export default {
  props:{
    active:{
      type:Number
    },
  },
  data() {
    return {
      page: {
        Source: 0,
        FireUnitId: + localStorage.getItem('fireUnitId'),
        HandleStatus: this.active + 1,
        total: 0,
        SkipCount:0,
        MaxResultCount:10,
      },
      list:[],
      finished:false,
      count:0
    };
  },
  mounted(){
    console.log("组件加载2222222222222222222222",this.active)

  },
  created(){

    // this.GetBreakDownlist('one');
  },

  methods:{
    goToDetails(item){
      console.log("路劲带参",item,)
      if(this.active == 0){
        this.$router.push({
          path:'/handle',
          query:{
            BreakDownId : item.breakDownId
          }
        })
      }else if(this.active == 1){
        this.$router.push({
          path:'/handling',
          query:{
            BreakDownId : item.breakDownId
          }
        })
      }else if(this.active == 2){
        this.$router.push({
          path:'/handled',
          query:{
            BreakDownId : item.breakDownId
          }
        })
      }
     
    },
    GetBreakDownlist(a){
      let p = this.page;
      console.log("p",p)

      if (a == 'onLoad') {
        p.SkipCount =  this.list.length
        console.log(" p.SkipCount ", p.SkipCount )
        this.$axios.get(this.$api.GetBreakDownlist,{
          params:p
        }).then(res=>{
           console.log("this.list2",res)
          this.list = this.list.concat(res.data.result.breakDownList)
          if (res.data.result.breakDownList.length<3) {
            console.log("没有数据了",res.data.result.breakDownList.length)
            this.finished = true
          }
        }).catch(err=>{
          console.log("设施故障列表",err)
        })
      }else if (a == 'refresh') {
        console.log("下拉刷新")

         this.finished = false
         p.SkipCount = 0
         this.list =[]

         this.$axios.get(this.$api.GetBreakDownlist,{
          params:p
        }).then(res=>{
           console.log("this.list2",res)
          this.list = this.list.concat(res.data.result.breakDownList)
          if (res.data.result.breakDownList.length<2) {
            console.log("没有数据了",res.data.result.breakDownList.length)
            this.finished = true
          }
        }).catch(err=>{
          console.log("设施故障列表",err)
        })

      }
      
    },
    /* 下拉刷新 */
    // refresh(){
    //   this.list =[];
    //    this.$axios.get(this.$api.GetBreakDownlist,{
    //     params:{
    //       Source: 0,
    //       FireUnitId: + localStorage.getItem('fireUnitId'),
    //       HandleStatus: this.active + 1,
    //       SkipCount:0
    //     }
    //   }).then(res=>{
    //     console.log("olll",res)
    //     this.list = res.data.result.breakDownList
    //   })
    // }
  }
}
</script>

