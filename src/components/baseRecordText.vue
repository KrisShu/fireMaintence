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
        <base-play-record  :recordVoice="recordTexts.voice"></base-play-record>
        <base-record v-model="recordTexts.voice"></base-record>
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
    }

}
</script>
