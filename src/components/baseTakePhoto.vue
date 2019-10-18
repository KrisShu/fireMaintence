<style lang="less">
.baseTakePhoto{
    .addphotoBox{
        .van-grid{
            width: 100%;
        }
        .van-grid-item__content{
            position: relative;
            width: 100%;
            height: 180px;

        }
        display: flex;
        .addphoto{
            width: 100%;
        }
        .deleteIcon{
            width: 40px;
            height: 34px;
            position: absolute;
            top: -14px;
            right: -20px;
        }

    }

    
    .imgBox{
        margin-top: 40px;
        .van-grid-item__content{
          padding: 0px;
        }
        .img{
         width: 100%;
         height: 180px;
        }
      }
}
</style>
<template>
    <div class="baseTakePhoto">
        <!-- 添加删除照片 -->
        <div class="addphotoBox" v-if="istakePhoto">
          
            <van-grid class="imgBox"  :border="false" :gutter="20" :column-num="3">
                <van-grid-item v-if="takeImgs.length<3">
                      <img class="addphoto"   @click="takePhoto" src="../assets/imgs/zbxc_btn_paizhao.png" alt="">
                </van-grid-item>
                <van-grid-item @click="showImg(index)" v-for="(value,index) in takeImgs" :key="index">
                    <van-image class="img" :src="value" />
                    <img @click="takeImgs.splice(index, 1)" class="deleteIcon" src="../assets/imgs/delete.png" />
                </van-grid-item>
            </van-grid>
        </div>
        
        
        <!-- 纯展示图片 -->
        <van-grid class="imgBox" v-else :gutter="20" :column-num="3">
          <van-grid-item @click="showImg(index)" v-for="(value,index) in Imgs" :key="index">
            <van-image class="img" :src="value" />
          </van-grid-item>
        </van-grid>
    </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
    model:{
        prop:"takeImgs",
        event:'change'
    },
    props:{
        takeImgs:{
            type:Array,
            default(){
                return [
                ]
            }
        },
        istakePhoto:{
            type:Boolean,
            default(){
                return true
            }
        },
        Imgs:{
            type:Array,
            default(){
                return []
            }
        },
        trueImgs:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            count:0,
            img: require('../assets/imgs/test1.jpg')
        }
    },
    mounted(){
        this.takeImgs.push(this.img)
    },
    methods:{
        takePhoto(){
            this.$emit('change',this.testdata )
            let that = this;
            let bts = [
                {
                title: "拍照"
                },
                {
                title: "从相册选择"
                }
            ];
            plus.nativeUI.actionSheet(
                {
                cancel: "取消",
                buttons: bts
                },
                function(e) {
                if (e.index == 1) {
                    that.getCamera();
                } else if (e.index == 2) {
                    that.getImg();
                }
                }
            );


        },
        /* 打开相机 */
        getCamera(){
            let that = this;
            let cmr = plus.camera.getCamera();
            let res = cmr.supportedImageResolutions[14];
            let fmt = cmr.supportedImageFormats[0];
            cmr.captureImage(
                function(path){
                    //获取拍照后的真实地址
                    plus.io.resolveLocalFileSystemURL(path,function(entry) {
                        console.log("拍照获取的真实路径",entry.fullPath)
                        that.takeImgs.push(entry.fullPath)
                        console.log("that.takeImgs",that.takeImgs)
                        that.$emit('change',that.takeImgs)
                    },
                    function(e) {
                        console.log(e.message);
                    }
                    );

                }
            )
        },
        /* 打开相册 */
        getImg(){

        },
        /* 点击展示图片 */
        showImg(index){
            if(this.istakePhoto){
                const instance = ImagePreview({
                    images: [
                    require('../assets/imgs/test1.jpg'),
                    require('../assets/imgs/test1.jpg'),
                    ],
                    startPosition: index,
                    closeOnPopstate: true 
                });
            }else{
                 const instance = ImagePreview({
                    images: this.trueImgs,
                    startPosition: index,
                    closeOnPopstate: true 
                });
            }
            
        },
        /* 删除图片 */
        // deleteImg(index){
        //     this.takeImgs.
        // }
    }
}
</script>

