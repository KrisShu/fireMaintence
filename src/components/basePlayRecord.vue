
<style lang="less">
.basePlayRecordBox{
    position: relative;
    .playRecord{
        width: 174px;
        height: 50px;
        border-radius: 8px;
        background: #4cc234;
        display: flex;
        align-items: center;
        img{
            width: 25px;
            height: 30px;
            margin: 0px 20px;
        }
        span{
            font-size: 16px;
            color: white;
        }
    }
    .deleteIcon{
        width: 36px;
        height: 32px;
        position: absolute;
        left: 220px;
        top: 50%;
        transform: translate(-50%,-50%)
    }
}   
   
</style>
<template>
  <div class="basePlayRecordBox">
    <div class="playRecord" @click="palySound">
        <img src="../assets/imgs/xhs__img_01.png" alt="">
        <span>点击播放</span>
    </div>
    <img @click="deleteVoice" v-if="isEdit" class="deleteIcon" src="../assets/imgs/delete.png" alt="">
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    model:{
       prop:'recordVoice',
       event:"change"  
    },
    props:{
        recordVoice:String,//声音文件
        isEdit:{
            type:Boolean,
            default(){
                return true
            }
        }
    },
    data(){
       return{
           palyer:Object
       }
    },
    methods:{
        /* 点击播放 */
        palySound(){
            let that = this;
            this.player = plus.audio.createPlayer(this.recordVoice); //创建音频播放器对象
            let p = this.player;
            p.play(()=> {
                that.$toast("播放完毕");
                },
                (e)=> {
                that.$toast(e.message);
                }
            );

        },
        /* 删除语音 */
        deleteVoice(){
            console.log("删除语音")
            this.player.close();
            this.recordVoice = "";
            this.$emit('change',this.recordVoice)
        }
    }
}
</script>
