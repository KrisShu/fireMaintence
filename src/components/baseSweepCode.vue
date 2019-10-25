<style lang="less">

#SweepCodeBox{
    .SweepCodeIcon{
        width: 44px;
        height: 44px;
    }
}
</style>
<template>
    <div id="SweepCodeBox">
        <img @click="sweepCode" class="SweepCodeIcon" src="../assets/imgs/site_btn_saoma.png" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{
            barcode:Object
        }
    },
    methods:{
        sweepCode(){
            console.log("触发此方法")
            let that = this;
            this.barcode = plus.barcode.create('barcode',[plus.barcode.QR],{
                width: "100%",
                height: "100%"
            })
            this.backBtn(function(){
                 that.barcode.close();
            })
            this.barcode.onmarked = this.onmarked;
            plus.webview.currentWebview().append(this.barcode);
            this.barcode.start();
        },
        onmarked(type, result){
            var text = '未知: ';
            switch(type){
                case plus.barcode.QR:
                text = 'QR: ';
                break;
                case plus.barcode.EAN13:
                text = 'EAN13: ';
                break;
                case plus.barcode.EAN8:
                text = 'EAN8: ';
                break;
            }
            console.log("二维码类型",text,type,result)

            this.$emit('barcode',result)
            this.barcode.close();
        }
    }
}
</script>

