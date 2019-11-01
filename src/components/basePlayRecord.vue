
<style lang="less">
.basePlayRecordBox{
    position: relative;
    .playRecord{
        width: 200px;
        height: 70px;
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
            font-size: 24px;
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

    .box {
            width: 60px;
            height: 50px;
            box-sizing: border-box;
            position: relative;

        }
        .wifi-symbol {
            width: 52px;
            height: 52px;
            box-sizing: border-box;
            overflow: hidden;
            transform: rotate(135deg);
            margin-left: 30px;

        }
        .wifi-circle {
            border: 5px solid #000000;
            border-radius: 50%;
            position: absolute;
        }

        .first {
            width: 45px;
            height: 45px;
            background: #cccccc;
            top: 40px;
            left: 40px;
        }

        .second {
            width: 25px;
            height: 25px;
            top: 35px;
            left: 35px;
            animation: fadeInOut 1s infinite 0.2s;
        }

        .third {
            width: 40px;
            height: 40px;
            top: 25px;
            left: 25px;
            animation: fadeInOut 1s infinite 0.4s;
        }

        @keyframes fadeInOut {
            0% {
                opacity: 0; /*初始状态 透明度为0*/
            }
            100% {
                opacity: 1; /*结尾状态 透明度为1*/
            }
        }
}   
   
</style>
<template>
  <div class="basePlayRecordBox">
    <div class="playRecord" @click="palySound">
        <img v-if="!isplay" src="../assets/imgs/xhs__img_01.png" alt="">
            <div v-else class="box">
                <div class="wifi-symbol">
                    <div class="wifi-circle first"></div>
                    <div class="wifi-circle second"></div>
                    <div class="wifi-circle third"></div>
                </div>
            </div>
        <span v-if="isEdit || Editduration">{{duration}}"</span>
        <span v-else>{{time}}"</span>
        
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
        },
        Editduration:{
            type:Boolean,
            default(){
                return false
            }
        },
        time:Number
    },
    data(){
       return{
           palyer:Object,
           duration:'00.00',
           isplay:false
       }
    },
    watch:{
        recordVoice(val){
        console.log("watch-val变化",val)
            if (val) {
                this.createVoice();
            }
        }
    },
    created(){
        if (this.recordVoice) {
            this.createVoice();
        }
    },
    methods:{
        /* 创建播放对象 */
        createVoice(){
            console.log("初始化播放对象")
            this.player = plus.audio.createPlayer(this.recordVoice)
            setTimeout(() => {
                this.duration = this.player.getDuration(); // 获取音频的总长度 单位秒s
                if ( this.duration<1) {
                      this.duration = 1
                }else{
                    this.duration =Math.round(this.duration) 
                }
                this.$emit('voiceduration',this.duration)
                console.log("语音时长", this.duration);
            }, 500);

        },
        /* 点击播放 */
        palySound(){
            let that = this;
            this.isplay = true
            this.player = plus.audio.createPlayer(this.recordVoice); //创建音频播放器对象返回AudioPlayer
            let p = this.player;
           console.log("duration",this.duration)
            p.play(()=> {
                that.$toast("播放完毕");
                that.isplay = false
                },
                (e)=> {
                that.$toast(e.message);
                }
            );

        },
        /* 删除语音 */
        deleteVoice(){
            console.log("删除语音")
            this.player.stop();//停止播放
            this.recordVoice = "";
            this.isplay = false
            this.$emit('change',this.recordVoice)
        }
    }
}
</script>
