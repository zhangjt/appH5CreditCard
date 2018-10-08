<!--  -->
<template>
  <div class="msg-list-item-container" v-on:click="goToMsgDetail">
    <div class="date-style" v-show="!isShowDate">{{msgItem.addtime.substring(0, 10)}}</div>

    <div>
      <div class="advert-container" v-show="Boolean(msgItem.image)">

        <img class="advert-img" :src="msgItem.image" />

      </div>

      <div class="intro-container" :style="{'margin-top':Boolean(msgItem.image)?'0px':'10px'}">

        <div class="title-class">{{msgItem.title}}</div>
        <div class="intro-class" v-if="msgType == '3'">{{msgItem.content}}</div>
        <div class="cut-off-img"></div>
        <div style="font-size: 12px;color: #909090;margin-top:8px">查看详情</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  components: {},

  computed: {},

  props: {
    msgItem: {
      type: Object
    },
    isShowDate: {
      type: Boolean
    },
    msgType: {
      type: String
    }
  },

  methods: {
    goToMsgDetail() {
      if (this.msgType == "0") {
        this.$router.push({
          path: "/msgDetail",
          query: { msgId: this.msgItem.id }
        });
      } else {
        window.location.href = this.msgItem.url;
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.msg-list-item-container {
  background-color: #f6f7f8;
  & .date-style {
    width: 104px;
    height: 24px;
    line-height: 24px;
    background: #d8d8d8;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    margin: 14px auto 5px;
    border-radius: 12px;
  }

  & .advert-container {
    position: relative;
    margin-top: 10px;
    & .advert-img {
      width: 345px;
      height: 86px;
      margin-left: 15px;
      vertical-align: bottom;
    }
  }

  & .intro-container {
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 10px;
    padding-bottom: 8px;
    background: white;
    margin-left: 15px;
    margin-right: 15px;
    position: relative;
    min-height: 40px;
    & .title-class {
      font-size: 14px;
      color: #1c2042;
      width: 100%;
      word-wrap: break-word;
    }

    & .intro-class {
      width: 318px;
      margin-top: 5px;
      font-size: 12px;
      color: #909090;
      display: block;
      word-break: break-all;
      word-wrap: break-word;
    }

    & .cut-off-img {
      margin-top: 10px;
      height: 1px;
      background: #ececec;
    }
  }
}
</style>