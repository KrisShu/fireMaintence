<style lang="less">
#firstMenu{
    height: 100%;
    .leftBox{
        display: flex;
        align-items: center;
        span{
            font-size: 28px;
        }
    }
    .leftIcon{
        width: 32px;
	    height: 40px;
    }
    .van-grid{
        position: fixed;
        bottom: 0px;
        width: 100%;
        .van-grid-item{
           border: solid 2px #039cfe;
        }
        .van-grid-item__content{
            padding: 16px;
        }
        .menuIcon{
            width: 66px;
            height: 66px;
            margin-right: 16px;
        }
        .menuIcon2{
            width: 60px;
            height: 60px;
            margin-right: 16px;
        }
        .slotBox{
            display: flex;
            align-items: center;
            span{
                font-size: 36px;
                color: #039cfe;
            }
        }
    }
    .active{
         border: none !important;
        .van-grid-item__content{
            background: #039cfe;
           span{
                color: white !important;
           }
           
        }
        
    }
}
</style>
<template>
    <div id="firstMenu">
        <!--  -->
        <base-nav :showLeft="false">
            <div class="leftBox" slot="left">
                <img class="leftIcon" src="../../assets/imgs/ssgz_img_01.png" alt="" />
                <span style="color:white; margin-left: 16px">{{ $store.state.userInfo.name }}</span>
            </div>
        </base-nav>
        <!--  -->
          <router-view/>
        <!--底部导航  -->
        <van-grid clickable  border center :column-num="2">
            <van-grid-item to="/fireUnitList" @click="menuchange('maintenance')" :class="active? 'active':'unactive'">
                <div class="slotBox" slot="default">
                    <img class="menuIcon" :src="active ? maintenance2: maintenance1" alt="">
                    <span>维保事物</span>
                </div>
            </van-grid-item>
            <van-grid-item to="/set"  @click="menuchange('set')" :class="active ?'unactive':'active'">
                 <div class="slotBox" slot="default">
                    <img class="menuIcon2" :src=" active ?set2 : set1" alt="">
                    <span>我的设置</span>
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active:true,
            set1:require('../../assets/imgs/set_1.png'),
            set2:require('../../assets/imgs/set_2.png'),
            maintenance1:require('../../assets/imgs/maintenance_1.png'),
            maintenance2:require('../../assets/imgs/maintenance_2.png'),
        }
    },
    methods:{
        menuchange(state){
           if(state == 'set'){
               this.active = false
           }else{
                this.active = true
           }

        }
    }

}
</script>

