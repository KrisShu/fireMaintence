
<style lang="less">

</style>
<template>
  <div class="baseRecordBox">
    <van-button 
    @touchstart.native="startRecord"
    @touchmove.native="recording"
    @touchend.native="endRecord">按住说话</van-button>
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
        recordVoice:String
    },
    data(){
       return{
           timeOutEvent:'',
           longpress:0,
           recordIcon :require("../assets/imgs/recod.gif"),
           record:Object,//录音对象
       }
    },
    methods:{
        /* 开始点击 */
        startRecord(){
            this.longpress = 0;
            this.timeOutEvent = setTimeout(()=>{
                this.longpress =1
                this.recordSound();
            },1000)
        },
        /* 获取录音设备开始录音 */
        recordSound(){
            let that = this;
            console.log("录音中。。。。。");
            plus.device.vibrate(100);//开启录音设备震动
            Toast({
                duration: 0,
                message: '录音中',
                icon: this.recordIcon
            });
            let  r = plus.audio.getRecorder(); //获取当前设备的录音对象
            this.record = r;
            if(r == null){
                Toast({
                    message: '录音设备故障',
                    icon: warning
                });
                return
            }
            r.record({ filename: "_doc/audio/" },(recordFile)=>{
                console.log("录音成功",recordFile)
                Toast.clear();//关闭蒙层动画
                //将录取的声音抛给播放播放组件
                that.$emit("change",recordFile)//双向绑定数据
                //还要将语音转化为文件对象，而抛出的语音本地文件
                 that.$emit("Vocieto", recordFile);
            },(e)=>{
                 alert("Audio record failed录音失败: " + e);
            })

        },
        /* 点击结束 */
        endRecord() {
            console.log("结束")
            clearTimeout(this.timeOutEvent)
            Toast.clear();
            if(this.timeOutEvent !==0 && this.longpress ==0){
                Toast({
                    message: '长按时间太短',
                    icon: 'warning-o'
                });
                console.log("此处为点击事件")
            }else if(this.timeOutEvent !==0 && this.longpress ==1){
                this.record.stop();
            }
        },
        /* 滑动事件 */
        recording() {
            console.log("滑动。。。");
        }
    }
}
</script>
