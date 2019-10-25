<style lang="less">
.changePassword{
    display: flex;
    flex-direction: column;
    height: 100%;
    .van-cell-group{
        padding-top: 40px;
        flex: 1;
    }
    .left-icon{
        width: 24px;
    }
    .left-icon2{
        width: 32px;
    }
}
    
</style>
<template>
    <div class="changePassword">
        <base-nav title="修改密码"></base-nav>
        <van-cell-group>
            <van-field v-model="originPW" clearable  placeholder="请输入原始密码">
            <img class="left-icon" slot="left-icon" src="../../assets/imgs/wjmm_img_02.png" alt="">
            </van-field>

            <van-field v-model="password" type="password"  placeholder="请设置新密码">
                <img class="left-icon2" slot="left-icon" src="../../assets/imgs/load_img_03.png" alt="">
            </van-field>
            <van-field v-model="re_password" type="password"  placeholder="请再次确认密码">
                <img class="left-icon2" slot="left-icon" src="../../assets/imgs/load_img_03.png" alt="">
            </van-field>
            
        </van-cell-group>
        <div class="btns">
            <van-button type="info" @click="changePW" size="large">修改密码</van-button>
        </div>
    </div>

</template>
<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            originPW:'',
            password:'',
            re_password:''

        }
    },
    methods: {
       goToAdvice(){
           this.$router.push({
               path:'/addadvice'
           })
       },
       /* 修改密码 */
        changePW(){
           let data={
               account:localStorage.getItem('account'),
               oldPassword:this.originPW,
               newPassword:this.password
           }
           if (this.originPW && this.password && this.re_password) {
               if (this.password == this.re_password) {
                   console.log("参数",data)
                   this.$axios.post(this.$api.ChangePassword,data).then(res=>{
                       console.log("修改密码",res)
                       if (res.data.result.success) {
                          Toast.success('修改密码成功，请重新登录');
                          localStorage.clear();
                          this.$router.push({
                              path:'/login'
                          })

                       }else{
                         this.$toast(res.data.result.failCause)
                       }
                   }).catch(err=>{
                       console.log("修改密码失败",err)
                   })
               }else{
                this.$toast('新密码两次输入的不一致')
               }
           }else{
               this.$toast('请将字段填写完整')
           }
        }
    },
}
</script>