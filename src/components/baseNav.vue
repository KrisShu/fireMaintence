<style scoped lang="less">
.van-nav-bar{
     position: sticky;
     top: 0px;
     z-index: 999 !important;
     background: url('../assets/imgs/load_btn_01bg.png');
    .van-nav-bar__title{
        color: white;
        font-size: 36px;
    }
    .van-nav-bar__right{
        top: 50%;
        transform: translateY(-50%)
    }
   
}
 .van-nav-bar .van-icon{
    color: white;
}
</style>
<template>
        <van-sticky>
            <van-nav-bar :title="title"  :left-arrow="showLeft" @click-left="onClickLeft">
                <slot name="left" slot="left"></slot>
                <slot  class="rightIcon" name="right" slot="right"></slot>
            </van-nav-bar>
        </van-sticky>
       
 
  
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default: ""
        },
        showLeft:{
            type:Boolean,
            default:true
        },
        active:{
            type:String,
            default: ""
        },
        PatrolId:{
            type:Number,
            default:0
        }

    },
    mounted(){
        console.log("菜单状态",this.active)
    },
    methods:{
        onClickLeft(){
             
             if(this.title == '设施故障处理中' || this.title == '设施故障待处理' || this.title == '设施故障已解决'){
                 this.$router.push({
                     path:'/fault',
                     query:{
                        active:this.active
                     }
                 })
             }else if(this.title == '新增巡查记录'  || this.title == '巡查记录'){
                 console.log("巡查记录",this.active)
                  this.$router.push({
                     path:'/fault/firePatrol',
                     query:{
                        active:this.active
                     }
                 })
             }else if (this.title == '巡查轨迹详情'  ) {
                 if (this.PatrolId) {//有则表视为查看
                    this.$router.push({
                        path:'/addPatrol',
                        query:{
                        add:false,
                        PatrolId:this.PatrolId
                        }
                    })
                    }else{
                            console.log("ppppppppppppppppppppppppppppppppp")
                            this.$router.push({
                                path:'/addPatrol',
                                query:{
                                    add:true,
                                }
                            })
                        }
                        
            }else{
                 this.$router.back()
                 console.log("直接返回")
             }
        },
     
    }
}
</script>

