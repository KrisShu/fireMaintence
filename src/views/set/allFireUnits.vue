<style lang="less">
    .deleticon{
        width: 40px;
        height: 40px;
    }
</style>
<template>
    <div class="allFireUnits">
        <base-nav title="关联防火单位"></base-nav>
        <div class="listBox pd28">
            <base-list @pathTo="add" @refresh="listData"  :finished="finished"  @onLoad="listData" :tableList="fireUnitList">
                <div class="slotBox" slot="content" slot-scope="scope">
                    <div class="displayflex">
                        <span class="fireTitle">{{scope.item.name}}</span>
                        <img class="deleticon" src="../../assets/imgs/addFire.png" alt="">
                    </div>
                </div>
            </base-list>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            finished:false,
            fireUnitList:[],
            page:{
                SafeUnitId:this.$store.state.userInfo.safeUnitID,
                SkipCount:0
            }
        }
    },
    methods:{
        listData(flga){
            let p = this.page
            if (flga == 'onLoad') {
                p.SkipCount = this.fireUnitList.length
                this.axiosWay(p);
            }
        },
        axiosWay(p){
            this.$axios.get(this.$api.GetAllFireUnitOfSafe,{
                params:p
            }).then(res=>{
                console.log("所有单位列表",res)
                this.fireUnitList = this.fireUnitList.concat(res.data.result.items)
                if (res.data.result.items.length<10) {
                    this.finished = true
                }
            }).catch(err=>{
                console.log("所有列表失败",err)
            })
        },
        add(item){
            console.log("item",item)
            let data={
                SafeUserId:this.$store.state.userInfo.userId,
                FireUnitId:item.unitId
            }
            this.$axios.post(this.$api.AddSafeUserFireUnit,data).then(res=>{
                console.log("res",res)
                if (res.data.result.success) {
                    this.$toast('添加成功')
                    this.$router.back();
                }else{
                     this.$toast(res.data.result.failCause)
                }
            }).catch(err=>{
                console.log("err",err)
            })
        }
    }
}
</script>

