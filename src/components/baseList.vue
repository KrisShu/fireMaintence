<style lang="less" scoped>
#list {
  height: 100%;
  .van-cell{
    box-sizing: border-box;
    // height: 124px;
    display: flex;
    align-items: center;
  }
  .van-list{
    // padding-bottom: 100px;
  }
}


</style>
<template>
  <div id="list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list  class="van-clearfix" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell @click="pathTo(item)" v-for="(item,index) in tableList" :key="index" :is-link="islink">
          <slot name="content" :item='item'></slot>
        </van-cell>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
export default {
  props:{
      tableList:{
            type:Array,
            default(){
              return []
            }
      },
      islink:{
        type:Boolean,
        default:false
      },
      // loading: {
      //   type:Boolean,
      //   default: false
      // },
      finished:{
        type:Boolean,
        default: false
      },
      // isLoading: {
      //   type:Boolean,
      //   default: false
      // }
  },
  data() {
    return{
      isLoading :false,
      loading:false
    }
  },
  mounted(){
    console.log("基础列表")
  },
  methods: {
    onLoad() {
      setTimeout(() => {
          this.$emit('onLoad','onLoad')
          this.loading = false
          }, 500)
   
    },
    onRefresh() {
      let that = this;
      this.$emit("refresh",'refresh')
        that.$toast("刷新成功");
        this.isLoading = false
    },
    pathTo(item){
      this.$emit('pathTo',item)
    }
  }
};
</script>

