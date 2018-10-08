<template>
  <mt-header v-if="isShow" :title="title" class="boder-header">
    <mt-button @click="turnTo" icon="back" slot="left"></mt-button>
    <mt-button @click="showPage"  slot="right">我的提单</mt-button>
  </mt-header>
</template>
<script>

  export default {
    name: 'GoBack',
    props: {
      url: {
        type: String
      },
      title: {
        title: String
      },
    },
    data () {
      return {
        isShow: false,
      }
    },
    components: {},
    created () {
      this.isShowTop()
    },
    methods: {
      turnTo () {
        if (this.url) {
          this.$router.push(this.url)
        } else {
          this.$router.back()
        }
        this.$emit('goBackWith')
      },
      isShowTop () {
        if (this.$wanka.isWanka()) {

        } else {
          this.isShow = true
        }
      },
      showPage () {
        this.$router.push({path: '/mine/applyCard/mineApplyRecord'})
      }
    },
    watch: {},
    mounted () {
    }
  }

</script>
<style lang='postcss'>

  .boder-header {
    background: #fff;
    z-index: 999;
  }

</style>
