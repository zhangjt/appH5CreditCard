<template>
  <div class="dialog-bg-style" v-show="dialogVisable">
    <div class="dialog-container">
      <div class="title-style" :title="title">{{title}}</div>
      <div class="button-container">
        <a @click="defaultClick" class="left-text-style">{{leftText}}</a>
        <a @click="primaryClick" class="right-text-style">{{rightText}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommonDialog',
    props: {
      title: {
        type: String
      },
      leftText: {
        type: String
      },
      rightText: {
        type: String
      },
      dialogVisable: {
        type: Boolean
      },
      confirmType: {
        type: Number
      }
    },
    data () {
      return {}
    },
    components: {},
    methods: {
      defaultClick: function () {
        // 点击取消
        this.$emit('defaultClick')
      },
      primaryClick: function () {
        // 点击确定
        this.$emit('primaryClick')
      }
    },
    watch: {},
    mounted () {
    }
  }
</script>

<style lang="postcss" scoped>
  .dialog-bg-style {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

  &  .dialog-container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    align-self: center;
    width: 296px;
    height: 168px;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

  &  .title-style {
    margin-top: 50px;
    font-size: 18px;
    color: #353543;
    text-align: center;
  }

  &  .button-container {
    justify-content: space-between;
    flex-direction: row;
    margin-top: 36px;
    display: flex;

  &  .left-text-style {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    text-align: center;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    background: #d6d7de;
    font-size: 18px;
    color: white;
  }

  &  .right-text-style {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 15px;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    background: #4477dd;
    font-size: 18px;
    color: white;
  }
  }
  }
  }
</style>
