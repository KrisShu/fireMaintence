<style lang="less">
#recordTextBox{
    .pd28{
        padding:10px  28px;
    }
    textarea{
        width: 100%;
        border: none;
        resize: none;
        text-indent: 20px;
    }
    .recordBox{

        position: relative;
        width: 100%;
        height: 240px;
        box-sizing: border-box;
        .van-button{
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translate(-50%);
        }
    }

}

</style>
<template>
  <div id="recordTextBox">
      <!-- 文字说明 -->
        <div class="pd28" v-if="!isRecord">
            <textarea v-model="recordTexts.text" placeholder="情况简要描述、200字以内"  cols="30" rows="10"></textarea>
        </div>
      <!-- 录制语音 -->
      <div class="pd28 recordBox" v-else>
        <base-play-record v-show="recordTexts.voice" v-model="recordTexts.voice"></base-play-record>
        <base-record @Vocieto="Vocieto" v-model="recordTexts.voice"></base-record>
      </div>
  </div>
</template>

<script>
import baseRecord from './baseRecord'
export default {
    components:{
        baseRecord
    },
    model:{
        prop:'recordTexts',
        event:'change'
    },
    props:{
        recordTexts:Object,
        isRecord:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    methods:{
        Vocieto(voiceFile){
            this.Audio2dataURL(voiceFile)
        },
        /* 本地文件转base64 */
        Audio2dataURL(vociePath){
            let that = this;
            plus.io.resolveLocalFileSystemURL(vociePath,function(entry){
                entry.file(function (file){
                console.log("语音文件对象",file)
                var fileReader = new plus.io.FileReader();
                fileReader.onloadend = function(evt) {
                that.$emit('voiceBase64',evt.target.result) 
                
                }
                fileReader.readAsDataURL( file );
                });
                
            },function(e){
                alert( "Resolve file URL failed: " + e.message );
            })
        }
    }

}
</script>
