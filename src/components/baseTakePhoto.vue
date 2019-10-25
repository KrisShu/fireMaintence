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
        takeImgs:Array,
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
    },
    methods:{
        takePhoto(){
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
                        var imgSrc = entry.toLocalURL();//
                        that.getBase64Time(imgSrc)
                        
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
        /* 照片转码成base64加上时间水印 */
        getBase64Time(url){
            console.log("调用此方法")
            let that =this;
            let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            image = new Image();
            image.crossOrigin = "Anonymous";
            image.onload = function() {//这里是一个异步，所以获取到的base64文件需要用回调
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0);
                ctx.font ="200px Arial";
                ctx.fillStyle = "tomato"; 
                let time = that.getCurrnetTime("timeSign");//获取当前的时间
                 console.log("time",time)
                ctx.textAlign = "end";
                ctx.textBaseline = "middle";
                ctx.fillText(time,image.width-20,image.height-100);
                let dataURL = canvas.toDataURL( "image/png/jpg"); 
                that.takeImgs.push(dataURL);
                that.$emit('change',that.takeImgs) //双向绑定还是要抛出？这是个疑问
                console.log("组件里的that.takeImgs",that.takeImgs)
            };
            image.src = url
        },
         //获取当前时间
        getCurrnetTime(flga){
            let now = new Date(),
            year = now.getFullYear(), //得到年份
            month = now.getMonth()+1,//得到月份
            date = now.getDate(),//得到日期
            hour = now.getHours(),//得到小时
            minu = now.getMinutes(),//得到分钟
            seconds = now.getSeconds();//得到秒

            month = month<10?'0'+ month : month;
            date =date<10?'0'+ date : date;
            hour =hour<10?'0'+ hour : hour;
            minu = minu<10?'0'+ minu : minu;
            seconds = seconds<10?'0'+ seconds : seconds;
            if(flga == 'timeSign'){
                return year + "-" + month + "-" + date +" "+hour+":"+minu
            }else if(flga == 'name'){//返回时间戳
                return now.getTime()
            }
            
        },
        /* 点击展示图片 */
        showImg(index){
            if(this.istakePhoto){
                const instance = ImagePreview({
                    images: this.takeImgs,
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

