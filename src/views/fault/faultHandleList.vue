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
  <div id="faultHandleList">
   <base-list @pathTo="goToDetails" :finished="finished" @onLoad="GetBreakDownlist"  :tableList="list" >
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
      <p class="time">发现时间：<span>{{scope.item.solutionTime}}</span></p>
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
        SkipCount:0
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

    this.GetBreakDownlist('one');
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
      console.log("a",a)
      let p = this.page;
      console.log("p",p)

      if (a == 'onLoad') {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
        this.count++
        // p.SkipCount =  this.count *10
         p.SkipCount =  this.list.length
        console.log(" p.SkipCount ", p.SkipCount )
        this.$axios.get(this.$api.GetBreakDownlist,{
          params:p
        }).then(res=>{
           console.log("this.list2", this.list)
          this.list = this.list.concat(res.data.result.breakDownList)
          if (res.data.result.breakDownList.length<10) {
            console.log("没有数据了")
            this.finished = true
          }
        }).catch(err=>{
          console.log("设施故障列表",err)
        })
      }else if(a =='one'){
         p.SkipCount = 0
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", p.SkipCount)
        this.$axios.get(this.$api.GetBreakDownlist,{
          params:p
        }).then(res=>{
          console.log("设施故障列表",res)
          this.list = this.list.concat(res.data.result.breakDownList)
          console.log("this.list", this.list) 
          if (res.data.result.breakDownList.length<10) {
            this.finished = true
          }
        }).catch(err=>{
          console.log("设施故障列表",err)
        })


      }
      // if (a== 'onload') {
      //   console.log("打印onload的数据")
      //     p.SkipCount = this.list.length
      //     console.log("打印onload的数据",p)
      //     this.$axios.get(this.$api.GetBreakDownlist,{
      //       params:p
      //     }).then(res=>{
      //       this.list = this.list.concat(res.data.result.breakDownList) 
      //       if (res.data.result.breakDownList.length<10) {
      //         this.finished = false
      //       }
      //     }).catch(err=>{
      //       console.log("设施故障列表",err)
      //     })
      // }
      // else{
      //    console.log("aaaaaaaa")
      //  this.$axios.get(this.$api.GetBreakDownlist,{
      //     params:p
      //   }).then(res=>{
      //     this.list = this.list.concat(res.data.result.breakDownList) 
      //     if (res.data.result.breakDownList.length<10) {
      //       this.finished = false
      //     }
      //   }).catch(err=>{
      //     console.log("设施故障列表",err)
      //   })
      // }
      
    }
     /* 获取故障列表 */
    // GetBreakDownlist(success){
    //   // console.log("触发事件",success)
    //   let x = arguments[0] instanceof Object;
    //   //  console.log("触发事件",arguments[0].SkipCount)
    //    if (!x) {
    //     p.SkipCount = 0;
    //     this.list = [];
    //   }
    //   let p = this.page;
    //   console.log("ppppppppp",p,this.page)
    //   this.$axios.get(this.$api.GetBreakDownlist,{
    //     params:p
    //   }).then(res=>{
    //      this.list = this.list.concat(res.data.result.breakDownList) 
    //      p.total = res.data.result.totalCount
    //      x ? success(this.list.length, res.data.result.totalCount, p) : "";

    //   }).catch(err=>{
    //     console.log("设施故障列表",err)
    //   })
    // },
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

