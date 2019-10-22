<style lang="less">
   #loginBox{
       font-size: 36px;
        .titleDiv{
            width: 100%;
            display: flex;
            height: 400px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
                img{
                    width: 457px;
                    height: 88px;
                }
                p{
                    font-size: 36px;
                    color: #262626;
                    font-weight: bold;
                    margin-top: 26px;
                }
            
        }
        .left-icon{
            width: 34px;
            height: 46px;
        }
        .left-icon2{
            width: 34px;
            height: 42px;
        }
        .van-field__left-icon{
            margin-right: 25px;
        }

        .checked_forget{
            display: flex;
            justify-content: space-between;
            padding: 60px 66px;
            font-size: 30px;
           
            .van-checkbox__icon--round .van-icon{
                border-radius: 8px;
            }
            .van-checkbox__icon--checked .van-icon{
                color: #039cfe;
                background: white;
            }
            .van-checkbox__label{
               color: #9b9a9a;
            }
            .forget{
                color: #0398fe;
            }

        }
        .btns{
            padding: 16px;
            button:nth-of-type(2){
                margin-top: 30px;
                background-color: #00b7e4;
                border-color: #00b7e4;
            }
        }
   }

</style>

<template>
  <div id="loginBox">
      <base-nav title="登录" :showLeft="false"></base-nav>
      <div class="titleDiv">
        <img src="../../assets/imgs/load_img_01.png" alt="">
        <p>作业终端</p>
      </div>

    <van-cell-group>
        <van-field v-model="username" clearable  placeholder="请输入手机号码">
            <img class="left-icon" slot="left-icon" src="../../assets/imgs/load_img_02.png" alt="">
        </van-field>

        <van-field v-model="password" type="password"  placeholder="请输入密码">
            <img class="left-icon2" slot="left-icon" src="../../assets/imgs/load_img_03.png" alt="">
        </van-field>
        
    </van-cell-group>
        <div class="checked_forget">
            <van-checkbox v-model="checked">自动登录</van-checkbox>
            <p class="forget">忘记密码</p>
        </div>

        <div class="btns">
            <van-button type="info" @click="login" size="large">登录</van-button>
            <van-button @click="$router.push('/registerInvation')" type="info" size="large">维保单位管理员注册</van-button>
        </div>

        
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            username:'',
            password:'',
            checked:true
        }
    },
    methods:{
      
        login(){
            let loginFrom ={
                account:this.username,
                password:this.password,
                isPersistent:this.checked
            }
            if( !(this.username && this.password)){
                 this.$toast('请填写登录用户和密码');
            }else{
                this.$axios.post(this.$api.USER_LOGIN,loginFrom).then(res=>{
                   if(res.data.result.success){
                    localStorage.setItem('userInfo',JSON.stringify(res.data.result))
                    this.$store.commit('setuserInfo',res.data.result)
                       console.log("登录成功",res)
                    this.$router.push({
                        path:'/'
                    })
                   }else{
                       this.$toast(res.data.result.failCause);
                   }
                }).catch(err=>{
                     console.log("登录失败",res)
                })
            }

            // this.$router.push({
            //     path:'/'
            // })
        }
    }
}

</script>