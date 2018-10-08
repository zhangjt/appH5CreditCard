<template>
  <mt-header title="财喵万卡" class="boder-header">
<!--     <mt-button @click="turnToMesg" icon="" slot="left">
      <div class="iconfont icon-iconfontxiaoxi1 mesg"></div>
    </mt-button>
    <mt-button @click="turnToRebate" icon="" slot="right">
      <div class="iconfont icon-fanli"></div>
    </mt-button> -->
  </mt-header>
</template>
<script>
export default {
  name: 'IndexTop',
  props: {

  },
  data() {
    return {

    }
  },
  components: {},
  created() {
    this.isShowTop()
  },
  methods: {
    turnToMesg(){
      this.$router.push({ path: '/mine/msgCenter' })
    },
    turnToRebate(){
      //跳转到累计返利
      this.$router.push({
        path: "/mine/mineRecord",
        query: {index: '1',
        title:"我的返利"}

      });
    },

    isShowTop() {
      if (this.$wanka.isWanka()) {

      } else {
        this.isShow = true;
      }
    }


  },
  watch: {},
  mounted() {}
}

</script>
<style lang='postcss' scoped>
.iconfont{
  font-size:24px;
}
.mesg{
  display:flex;
}
.mesg:after{
  flex:1;
  content:'';
  color:red;
  background:red;
  width:5px;
  height:5px;
  border-radius:50%;
}
</style>
