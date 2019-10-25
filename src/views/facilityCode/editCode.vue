<style lang="less">
.editCode{
    height: 100%;
    display: flex;
    flex-direction: column;
    .content{
        flex: 1;
    }
    .displayflex{
    padding-right: 40px;
}

    .van-radio-group{
        padding: 28px;
    }
}

</style>
<template>
  <div class="editCode">
    <base-nav title="绑定设施编码"></base-nav>
    <div class="content">
        <van-cell-group>
            <div class="displayflex">   
                <van-field v-model="code" label="设施编码" placeholder="请输入设施编码" />
                <base-sweep-code></base-sweep-code>
            </div>
        
        <van-field v-model="address"  label="具体位置" placeholder="请输入具体位置"  />
        </van-cell-group>
        <van-cell>设施所属消防系统（单选）</van-cell>
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell v-for="(arr,index) in allSystems" :key="index" :title="arr.systemName" clickable @click="radioway(arr)">
                    <van-radio slot="right-icon" :name=arr.fireSystemId />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </div>
    

    <div class="btns">
        {{$route.query.length}}
        <van-button type="info" @click="submit" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
import baseSweepCode from '../../components/baseSweepCode'
import { Toast } from 'vant';
import { PassThrough } from 'stream';
export default {
    components:{
        baseSweepCode
    },
    data(){
        return{
            id:'',
            code:'',
            address:'',
            radio:'1',
            allSystems:''

        }
    },
    created(){
        this.GetFireUnitlSystem();
        console.log(this.$route.query)
        if (this.$route.query.item) {
            this.code = this.$route.query.item.equiNo
            this.address = this.$route.query.item.address
            this.radio = this.$route.query.item.fireSystemId
        }
    },
    methods:{
        GetFireUnitlSystem(){
            this.$axios.get(this.$api.GetFireUnitlSystem,{
                params:{
                    FireUnitId :localStorage.getItem('fireUnitId')
                }
            }).then(res=>{
                console.log("所有列表",res)
                this.allSystems = res.data.result
            }).catch(err=>{
                console.log("失败",err)
            })
        },
        radioway(arr){
            this.radio = arr.fireSystemId
        },
        /* 提交 */
        submit(){
            //添加
           let data
            if (this.code && this.address && this.radio) {
                if (this.$route.query.item) {//修改
                    data={
                        opreation:1,
                        id:this.$route.query.item.id,
                        equiNo:this.code,
                        address:this.address,
                        fireSystemId:this.radio
                    }
                    this.updateAxiosWay(data)
                }else{
                    data = {
                        fireUnitId:localStorage.getItem('fireUnitId'),
                        equiNo:this.code,
                        address:this.address,
                        fireSystemId:this.radio
                    }
                     this.addAxiosWay(data)
                }
               
            }else{
                this.$toast('请将字段填写完整');
            }
            
        },
        addAxiosWay(data){
            this.$axios.post(this.$api.AddEquipmentNo,data).then(res=>{
                console.log("添加成功",res)
                if (res.data.result.success) {
                    this.$router.back();
                }
            }).catch(err=>{
                console.log("添加失败",err)
            })
        },
        updateAxiosWay(data){
            this.$axios.put(this.$api.UpdateEquipmentNoInfo,data).then(res=>{
                console.log("修改成功",res)
                if (res.data.result.success) {
                    this.$router.back();
                }
            }).catch(err=>{
                console.log("修改失败",err)
            })

        }
    }
};
</script>

