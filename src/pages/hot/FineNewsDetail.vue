<template>
    <div class="bg">
     <mt-header title="公告详情" class="boder-header">
      <mt-button icon="back" slot="left" @click="reback"></mt-button>
    </mt-header>
    <iframe :src="url" class="iframe-bg"></iframe>
    </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://www.baidu.com'
    }
  },
  methods: {
    reback () {
      this.$router.push('/hot/FineNews')
    }
  },
  created () {
    this.url = this.$route.query.url
  }
}
</script>

<style lang="postcss" scoped>
.bg {

}
.iframe-bg {
    height: 100%;
    width: 100%;
}
</style>
