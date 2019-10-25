<style lang="less">
.adviceBox{
    box-sizing: border-box;
  
    .adviceFrom{
        padding:40px 20px;
        .title{
            font-size: 30px;
            color: #262626;
        }
        .adviceTextarea{
            width: 100%;
            font-size: 26px;
            border-radius: 8px;
            border: solid 1px #dcdcdc;/* no */
            height: 450px;
            margin: 30px 0px;
            outline: none;
            text-indent: 10px;
            padding:20px;
            box-sizing: border-box;
            &::placeholder{
            color:#d2d2d2;
            }
    
        }
    }

}


</style>
<template>
    <div class="adviceBox">
        <base-nav title="技术支持" path="support" backHome=true></base-nav>
        <div class="adviceFrom">
            <span class="title">感谢您一直以来的支持，请在下方输入您的宝贵意见：</span>
            <textarea v-model="textarea" placeholder="请在这里输入您的建议内容" class="adviceTextarea"></textarea>
            <div class="btns">
                <van-button type="info" @click="submit" size="large">提交建议</van-button>
            </div>
        </div>
    </div>
</template>
<script>


import { Toast } from 'vant';
export default {
    data() {
        return {
            textarea:''
        }
    },
    methods: {
        submit(){
            let that =this;
            if(this.textarea.length>0){
                this.$axios.post(this.$api.Addadvice,{suggest:this.textarea}).then(res=>{
                   console.log("添加数据成功",res)
                   if(res.data.success){
                      Toast.success('提交成功')
                        that.$router.back();
                   }
                }).catch(res=>{
                    console.log("添加数据失败")
                })
            }else{
                Toast('请输入信息后再提交');
            }
        }
    },
}
</script>