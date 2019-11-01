<style lang="less">
#registerBox{
    .van-cell-group{
        padding-top: 60px;
        margin-bottom: 60px;
        .van-field__left-icon{
            margin-right: 26px;
        }
        .left-icon{
            width: 35px;
	        height: 37px;
        }
        .left-icon2{
            width: 36px;
            height: 30px;
        }
         .left-icon3{
            width: 32px;
	        height: 44px;
        }
         .left-icon4{
            width: 34px;
	        height: 40px;
        }
        .van-field__control:disabled{
            color: #262626;
            -webkit-text-fill-color:#262626;
        }
    }
    .btns{
        padding: 16px;
    }

}
</style>
<template>
  <div id="registerBox">
      <base-nav title="维保单位管理员注册"></base-nav>
        <van-cell-group>
            <van-field v-model="companyname"  disabled>
                <img class="left-icon" slot="left-icon" src="../../assets/imgs/load_img_06.png" alt="">
            </van-field>

            <van-field v-model="trueName" type="text"  placeholder="请输入真实姓名">
                <img class="left-icon2" slot="left-icon" src="../../assets/imgs/load_img_08.png" alt="">
            </van-field>
            <van-field v-model="phone" type="number"  placeholder="请输入手机号码">
                <img class="left-icon3" slot="left-icon" src="../../assets/imgs/load_img_02.png" alt="">
            </van-field>
            <van-field v-model="password" type="password"  placeholder="请设置登录密码">
                <img class="left-icon4" slot="left-icon" src="../../assets/imgs/load_img_03.png" alt="">
            </van-field>

        </van-cell-group>
        <div class="btns">
            <van-button @click="register" type="info" size="large">注册</van-button>
        </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            companyname:'公司名称',
            trueName:'',
            phone:'',
            password:''


        }
    },
    created(){
        if(this.$route.query){
            this.companyname = this.$route.query.parameter.fireUnitName
        } 
    },
    methods:{
        register(){
            let registerFrom = {
                safeUnitName: this.$route.query.parameter.fireUnitName,
                userName:this.trueName,
                phone:this.phone,
                password:this.password,
                invitatCode:this.$route.query.parameter.invationCode
            }
            if(!(this.companyname && this.trueName && this.phone && this.password)){
                this.$toast('请将字段填写完成')
            }else{
                this.$axios.post(this.$api.USER_REGIST,registerFrom).then(res=>{
                    
                    if(res.data.result.success){
                       this.$toast('注册成功，请登录')
                       this.$router.push({
                           path:"/login"
                       })
                    }else{
                        this.$toast(res.data.result.failCause)
                    }
                }).catch(err=>{
                    console.log("注册失败",err)
                })
            }
        }
    }

}
</script>

