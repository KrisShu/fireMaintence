<style lang="less">

.technicalSupportBox{
    box-sizing: border-box;
    width: 100%;
    .banner{
      width: 100%;
      height: 350px;  
    }
    .list{
        height: 130px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 26px;
        .left{
            display: flex;
            align-items: center;
            img{
                margin-right: 20px;
                &.icon01{
                    width: 40px;
                    height: 34px;
                }
                &.icon02{
                    width: 40px;
                    height: 40px;
                }
            }
            span{
                color: #262626;
                font-size: 30px;
            }
        }
        .callHref{
           display:inline-block;

        }
        .callBtn{
            width: 60px;
            height: 60px;
        }
        .nextBtn{
            width: 18px;
            height: 30px;
        }
    }
}
    
</style>
<template>
    <div class="technicalSupportBox">
       <base-nav title="技术支持"></base-nav>
        <img class="banner" src="../../assets/imgs/site_img_06.png" alt="">
         <div class="callBox list van-hairline--bottom">
             <div class="left">
                <img class="icon01" src="../../assets/imgs/site_img_07.png" alt="">
                <span>技术支持电话：15881199975</span>
             </div>
              <a class="callHref" href="tel:15881199975">
                <img class="callBtn" src="../../assets/imgs/site_btn_call.png" alt="">
              </a>
         </div>
         <!-- 我要建议 -->
         <div class="adviceBox list van-hairline--bottom" @click="goToAdvice">
            <div class="left ">
                <img class="icon02" src="../../assets/imgs/site_img_08.png" alt="">
                <span>我要提建议</span>
            </div>
            <img class="nextBtn" src="../../assets/imgs/xhs__img_arrow.png" alt="">
         </div>
    </div>

</template>
<script>
export default {
    methods: {
       goToAdvice(){
           this.$router.push({
               path:'/addadvice'
           })
       }
    },
}
</script>