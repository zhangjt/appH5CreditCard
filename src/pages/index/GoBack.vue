<template>
    <mt-header v-if="isShow" :title="title" class="boder-header"  >
      <mt-button @click="turnTo" icon="back" slot="left"></mt-button>
    </mt-header>
</template>
<script>

export default {
  name: 'GoBack',
  props:{
    url:{
      type:String
    },
    title:{
      title:String
    }
  },
  data() {
    return {
      isShow:false,
    }
  },
  components: {},
  created(){
    this.isShowTop()
  },
  methods: {
    turnTo(){
      if (this.url) {
        this.$router.push(this.url)
      }else{
        this.$router.back()
      }
    },
    isShowTop(){
      if (this.$wanka.isWanka()) {

      }else{
        this.isShow=true;
      }
    }


  },
  watch: {
  },
  mounted() {}
}

</script>
<style lang='postcss' > 

.boder-header{
  background:#fff;
  z-index:999;
}

</style>
