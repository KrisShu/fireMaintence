<style lang="less">
    #registerInvationBox{
        background: #fafafa;
        width: 100%;
        height: 100vh;
        .van-cell-group{
            padding: 20px 0px;
        }
        .btns{
            background: white;
            position: fixed;
            bottom: 20px;
            width: 100%;
            box-sizing: border-box;
            padding: 16px;
        }
        .tips{
            padding: 16px;
            color: #c8c8c8;
            line-height: 1.5;
        }
        .vagueBox{
            position: absolute;
            height: 600px;
            .van-overlay{
                height: 100%;
                top:220px;
            }
            .van-popup--top{
                top: 220px;
            }
        }
    }
   
</style>
<template>
  <div id="registerInvationBox">
    <base-nav title="维保单位员工注册"></base-nav>
    <van-cell-group>
        <van-field v-model="fireUnitName" clearable @keyup="search" placeholder="请输入维保单位名称">
            <img class="left-icon" slot="left-icon" src="../../assets/imgs/load_img_06.png" alt="">
        </van-field>

        <van-field v-model="invationCode"   placeholder="请输入邀请码">
            <img class="left-icon2" slot="left-icon" src="../../assets/imgs/load_img_07.png" alt="">
        </van-field>
        
    </van-cell-group>
     <div class="vagueBox">
        <van-popup  v-model="show"  position="top" :style="{ height: '70%' }">
            <ul class="pd28">
                <li @click="select(arr)" class="pd28_topBottom font1 van-hairline--bottom" v-for="(arr,index) in searchList" :key="index">
                    {{arr.safeUnitName}}
                </li>
            </ul>
        </van-popup>
    </div>
    <div class="btns">
        <van-button  @click="nextStep" type="info" size="large">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            fireUnitName:'',
            fireUnitID:'',
            invationCode:'',
            show:false,
            searchList:'',//模糊查询列表
        }
    },
    watch:{
        // "fireUnitName":function(){
        //     setTimeout(()=>{
        //         this.search();
        //     },1000)
        // }
    },
    methods:{
        search(){
            if(this.fireUnitName == ''){
                return
            }else{
                this.$axios.get(this.$api.GetSelectSafeUnits,{
                    params:{
                        Name:this.fireUnitName
                    }
                }).then(res=>{
                    console.log("模糊查询",res)
                    this.show = true
                    if( res.data.result.length>0){
                        this.searchList = res.data.result
                    }
                 
                }).catch(err=>{
                    console.log("模糊查询失败",err)
                })
            }
        },
        /*  */
        select(arr){
            this.fireUnitName = arr.safeUnitName
            this.fireUnitID = arr.safeUnitId
            this.show = false
        },
        nextStep(){
            let parameter={
                fireUnitName:this.fireUnitName,
                fireUnitID:this.fireUnitID,
                invationCode:this.invationCode
            }
            let data = {
                unitName:this.fireUnitName,
                invitatCode:this.invationCode
            }
            if(!(this.fireUnitName && this.fireUnitID && this.invationCode)){
               this.$toast('请填写正确的维保单位和邀请码');
            }else{
                this.$axios.post(this.$api.InvitatVerify,data).then(res=>{
                    console.log("邀请码验证",res)
                    if (res.data.result.success) {
                        this.$router.push({
                            path:'/register',
                            query:{
                                parameter
                            }
                        })
                    }else{
                        this.$toast(res.data.result.failCause);
                    }
                }).catch(err=>{
                    console.log("")
                })
              
            }
        }
    }
}
</script>

