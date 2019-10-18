<style lang="less">
  #faultHandleBox{
    .van-tabs__line{
      background-color: #039cfe;
    }
  }
</style>
<template>
  <div id="faultHandleBox">
    <van-tabs  v-model="active" animated swipeable>
      <van-tab title="待处理">
        <fault-handle-list :active="active"></fault-handle-list>
      </van-tab>
      <van-tab title="处理中"> 
        <fault-handle-list   :active="active"></fault-handle-list>
      </van-tab>
      <van-tab title="已处理" >
        <fault-handle-list  :active="active" ></fault-handle-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import faultHandleList from './faultHandleList.vue'
export default {
  components:{
    faultHandleList
  },
  data() {
    return {
      active: 0,
    };
  },
  mounted(){
    if(this.$route.query){
      this.active = +this.$route.query.active
    }
  },
  methods:{
  }
}
</script>

