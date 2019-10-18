<style lang="less">
#patrolList{
    position: relative;
    /* 下拉菜单 */
    .dropdownmenu{
        padding: 0px 16px;
        .van-dropdown-menu {
            &:after {
            border-width: 0;
            }
            .van-dropdown-menu__item {
            justify-content: left;
            }
    
        }
        .add_box{
            img{
                width: 40px;
                height: 40px;
            }
        }
}
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
    }
}
</style>
<template>
    <div id="patrolList">
        <!--  -->
        <van-sticky>
            <van-cell class="dropdownmenu">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" :options="recordActive ? option2: option1" />
                    <div class="add_box" @click="gotoAdd">
                        <img src="../../assets/imgs/add.png" alt="">
                        <span>新增</span>
                    </div>
                </van-dropdown-menu>
            </van-cell>
            
        </van-sticky>

        <!-- 列表 -->
        <base-list @pathTo="gotoDetails" :tableList="tableList" >
            <div class="slot_content" slot="content" slot-scope="scope">
                <div class="left_name_time">
                    <span class="time">{{scope.item.time}}</span>
                    <span class="name">{{scope.item.name}}</span>
                </div>
                <div class="right_status">
                    <span class="status">
                        {{scope.item.status}}
                    </span>
                </div>
            </div>
        </base-list>
    </div>
</template>

<script>
export default {
    props:{
        recordActive:{//判断状态，0---值班记录，1---巡查记录
            type:Number,
            default:0
        },
        tableList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            value1: 0,
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '全部', value: 0 },
                { text: '正常', value: 1 },
                { text: '故障', value: 2 }
            ],
        }
    },
    methods:{
        gotoAdd(){
            console.log("recordActive",this.recordActive)
            if(this.recordActive == 0){
                this.$router.push({
                    path:'/addDuty'
                })
            }else if(this.recordActive == 1){
                this.$router.push({
                    path:'/addPatrol',
                    query:{
                        add :true
                    }
                })
            }
        },
        gotoDetails(item){
             if(this.recordActive == 0){
                this.$router.push({
                    path:'/dutyDetails',
                    query:{
                        isproblem:true
                    }
                })
            }else if(this.recordActive == 1){
                this.$router.push({
                    path:'/addPatrol',
                      query:{
                        add :false
                    }
                })
            }
        }
    }
}
</script>

