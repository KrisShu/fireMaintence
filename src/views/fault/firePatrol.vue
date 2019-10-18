<style lang="less">
#firePatrolBox{
  .van-tabs__line{
    background-color: #039cfe;
  }
  /* 下拉菜单 */
  .van-dropdown-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    .van-dropdown-menu__title{
      color: #989898;
    }
    .van-cell{
       color: #989898;
    }
    .van-dropdown-item__option--active{
      color: #039cfe;
    }
    .add_box{
                display: flex;
                align-items: center;
                font-size: 28px;
                color: #00aeff;
                img{
                    margin-right: 12px;
                }
            }
  }
  /* tab面板内容 */
  .van-tabs__content{
    // height: 1060px;
  }
  
}

</style>
<template>
  <div id="firePatrolBox">
      <van-tabs @change="onClick" v-model="active" sticky  swipeable>
        <van-tab title="值班记录">
          <patrol-list :tableList="tabelist" :recordActive="active"></patrol-list>
        </van-tab>
        <van-tab  title="巡查记录"> 
         <patrol-list :tableList="tabelist" :recordActive="active"></patrol-list>
        </van-tab>
      </van-tabs>

  
  </div>
</template>

<script>

import patrolList from './patrolList.vue'
export default {
  components:{
    patrolList
  },
  data() {
    return {
      active:0,
      tabelist:[],
      tablelist1:[
                {
                    time:'2019-10-11 12:00',
                    name:'张三',
                    status:0
                },
                {
                    time:'2019-10-11 12:00',
                    name:'张三',
                    status:1
                },
                 {
                    time:'2019-10-11 12:00',
                    name:'张三',
                    status:2
                }
      ],
      tablelist2:[
                {
                    time:'2019-10-11 12:00',
                    name:'李四',
                    status:0
                },
                {
                    time:'2019-10-11 12:00',
                    name:'李四',
                    status:1
                },
                 {
                    time:'2019-10-11 12:00',
                    name:'李四',
                    status:2
                }
      ],

      
    }
  },
  mounted(){
    this.tabelist = this.tablelist1
    if(this.$route.query){
      console.log("this.$route.query.active",this.$route.query.active)
      this.active = +this.$route.query.active
      console.log("this.active =",this.active)
      this.active ? this.tabelist = this.tablelist2:this.tabelist = this.tablelist1
    }
  },
  methods:{
    onClick(state){
      console.log("state",state)
      state ? this.tabelist = this.tablelist2:this.tabelist = this.tablelist1

    }
  }
}
</script>

