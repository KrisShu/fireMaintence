<style lang="less">
    .addiCON{
        width: 40px;
        height: 40px;
    }
    .deleticon{
        width: 40px;
        height: 40px;
    }
    .fireTitle{
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<template>
  <div class="myFireUnitList">
      <base-nav title="防火单位管理" active="false"></base-nav>
      <p class="pd28 color1">您可以对您的防火单位进行管理新增或者删除</p>
      <div class="pd28 displayflex">
          <span class="left_title">管辖单位</span>
         
           <img @click="addFireUnit" class="addiCON" src="../../assets/imgs/add.png" alt="">
      </div>
      <base-list @pathTo="deleteF"  @refresh="listData"  :finished="finished"  @onLoad="listData" :tableList="fireUnitList">
          <div class="slotBox" slot="content" slot-scope="scope">
              <div class="displayflex">
                <span class="fireTitle">{{scope.item.fireUnitName}}</span>
                <img class="deleticon" src="../../assets/imgs/delete2.png" alt="">
              </div>
            
        </div>
      </base-list>
  </div>
</template>

<script>
export default {
    data(){
        return{
            finished:false,
            page:{
                UserId: this.$store.state.userInfo.userId,
                SkipCount:0
            },
            fireUnitList:[]
        }
    },
    methods:{
        listData(falg){
            console.log("falg",falg)
             let p = this.page
            if (falg == 'onLoad') {
                p.SkipCount = this.fireUnitList.length
                this.axiosWay(p)
                
            }else if(falg == 'refresh'){
                  p.SkipCount = 0;
                  this.fireUnitList =[];
                  this.axiosWay(p)
            }
            
        },
        axiosWay(p){
            this.$axios.get(this.$api.GetSafeUnitUserEvent,{
                params:p
            }).then(res=>{
                console.log("res",res)
                this.fireUnitList = this.fireUnitList.concat(res.data.result.items)
                if (res.data.result.items.length<10) {
                    this.finished = true
                }
            }).catch(err=>{
                console.log("失败",err)
            })
        },
        /* 添加单位 */
        addFireUnit(){
            this.$router.push({
                path:'/allFireUnits'
            })
        },
        /* 删除 */
        deleteF(item){
            console.log("删除",item)
            let data = {
                SafeUserId:this.$store.state.userInfo.userId,
                FireUnitId:item.fireUnitId
            }
            this.$axios.post(this.$api.DelSafeUserFireUnit,data).then(res=>{
                console.log("删除成功",res)
                if (res.data.result.success) {
                    this.$toast('删除成功')
                }
            }).catch(err=>{
                console.log("删除失败",err)
            })
        }
    }
}
</script>

