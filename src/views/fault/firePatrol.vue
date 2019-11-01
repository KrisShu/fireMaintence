<style lang="less">
#firePatrolBox{
  background: #f3f3f3;
  .van-tabs__line{
    background-color: #039cfe;
  }
  /* 下拉菜单 */
  .van-dropdown-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    &:after {
      border-width: 0;
    }
    .van-dropdown-menu__item {
      justify-content: left;
    }
    .van-dropdown-menu__title{
      color: #989898;
    }
    .van-cell{
       color: #989898;
    }
    .van-dropdown-item__option--active{
      color: #039cfe;
    }
    .add_box{
        display: flex;
        align-items: center;
        font-size: 28px;
        color: #00aeff;
        img{
            margin-right: 12px;
            width: 40px;
            height: 40px;
        }
    }

  }
  .dropdownmenu{
      padding: 0px 16px;
  }
  /* tab面板内容 */
  .van-tabs__content{
    // height: 1060px;
  }

  /* slot内容 */
.slot_content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left_name_time{
        display: flex;
        flex-direction: column;
        .time{
            font-size: 26px;
            color: #989898;
        }
        .name{
            font-size: 28px;
            color: #262626;
        }

    }
    .right_status{
        font-size: 28px;
        .normal{
          color: rgb(37, 192, 37);
        }
        .blue{
          color: rgb(13, 126, 255);
        }
        .orange{
          color: #ff8a00;
        }
    }
    
}
  .nosubmitBox{
    padding: 10px 34px;
    font-size: 26px;
    background: white;
      .redStatus{
        color: red;
      }
  }
  
}

</style>
<template>
  <div id="firePatrolBox">
        <van-cell class="dropdownmenu">
            <van-dropdown-menu>
                <van-dropdown-item @change="changedropdown"  title="记录状态" v-model="value1" :options="option1" />
                <div class="add_box" @click="gotoAdd">
                    <img src="../../assets/imgs/add.png" alt="">
                    <span>新增</span>
                </div>
            </van-dropdown-menu>
        </van-cell>
        <div @click="gotoaddpatrol" v-if="$store.state.TrajectroyList.length>0" class="nosubmitBox">
          <p class="van-hairline--bottom displayflex pd28_topBottom">
            <span>巡查轨迹</span>
            <span class="redStatus">未提交</span>
          </p>
        </div>

     <!-- 列表 -->
    <base-list @pathTo="gotoDetails" @onLoad="GetPatrollist" @refresh="GetPatrollist" :finished="finished" :tableList="tableList" >
        <div class="slot_content" slot="content" slot-scope="scope">
            <div class="left_name_time">
                <span class="time">{{scope.item.creationTime}}</span>
                <span class="name">{{scope.item.patrolUser}}</span>
            </div>
            <div class="right_status">
                <span class="status " v-if="scope.item.patrolStatus == 0">未指定</span>
                <span class="status normal" v-if="scope.item.patrolStatus == 1">正常</span>
                <span class="status blue" v-if="scope.item.patrolStatus == 2">故障</span>
                <span class="status orange" v-if="scope.item.patrolStatus == 3">故障</span>
            </div>
        </div>
    </base-list>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{
  },
  data() {
    return {
      value1: 0,
      option1: [
          { text: '全部', value: 0 },
          { text: '正常', value: 1 },
          { text: '故障(已解决)', value: 2 },
          { text: '故障(未解决)', value: 3 }
      ],
      tableList:[],
      finished:false,
      page: {
        FireUnitId: + localStorage.getItem('fireUnitId'),
        PatrolStatus:0,
        SkipCount:0,
        MaxResultCount:10,
      },
      

    }
  },
  mounted(){
  },
  methods:{
    /* 存在未提交的 */
    gotoaddpatrol(){
        this.$router.push({
              path:'/addPatrol',
              query:{
                  add :true
              }
        })
    },
   GetPatrollist(flag){
     let p = this.page
      if (flag == 'onLoad') {
         console.log("触发1111111111111")
          p.SkipCount =  this.tableList.length
          this.axiosWay(p)
      }else if (flag == 'refresh') {
        p.SkipCount = 0;
        this.finished = false;
        this.tableList =[];
         this.axiosWay(p)
      }
   },
   /*  */
   gotoDetails(item){
     console.log("item",item)
    this.$router.push({
      path:'/addPatrol',
      query:{
        add:false,
        PatrolId:item.patrolId
      }
    })
   },
   /*  */
   axiosWay(p){
     console.log("7878788888878877778787878787878787878")
      this.$axios.get(this.$api.GetPatrollist,{
          params:p
      }).then(res=>{
        console.log("获取巡查列表",res)
        this.tableList = this.tableList.concat(res.data.result.patrolList)
        if (res.data.result.patrolList.length <10) {
          this.finished = true
        }
      }).catch(err=>{
        console.log("失败",err)
      })
   },
   /*  */
   gotoAdd(){
    this.$axios.get(this.$api.GetAddAllow,{
      params:{
        FireUnitId:localStorage.getItem('fireUnitId')
      }
    }).then(res=>{
      console.log("是否可以添加",res)

     
      if (res.data.result.success) {
          if (this.$store.state.TrajectroyList.length>0) {
            this.$toast('有未提交的巡查轨迹点，请提交后再新增');
          }else{
              this.$router.push({
                path:'/addPatrol',
                query:{
                    add :true
                }
              })
          }
         
      }else{
         this.$toast(res.data.result.failCause);
      }
    }).catch(err=>{
      console.log(err)
    })

    // this.$router.push({
    //   path:'/addPatrol',
    //   query:{
    //       add :true
    //   }
    // })

   },
   /*  */
   changedropdown(status){
     console.log("切换状态",status)
      let p = this.page
      p.PatrolStatus = status
       p.SkipCount = 0;
        this.finished = false;
        this.tableList =[];
         this.axiosWay(p)
   }
  }
}
</script>

