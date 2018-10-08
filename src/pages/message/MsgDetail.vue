
<template>
  <div class="msg-detail-container" v-title="title">
    <!-- <mt-heade v-if="!isWanka" title="消息详情" class="boder-header">
      <mt-button icon="back" slot="left" @click="reback"></mt-button>
    </mt-heade> -->
    <go-back v-if="!isWanka" class="title-class" :title="title"></go-back>


    <div class="msg-detail-content">
      <div class="title-style">{{msgItem.title}}</div>

      <div class="date-style">
        {{msgItem.addtime}}
      </div>
      <div class="content-style" v-html="msgItem.content"></div>
    </div>
  </div>
</template>

<script>
import wanka from "@/modules/wanka.js";
import GoBack from "@/pages/index/GoBack";
export default {
  data() {
    return {
      msgId: "",
      msgItem: [],
      contentHeight: 0,
      isWanka: false,
      title:'公告详情',
    };
  },
  created() {
    window.getMsgDetailCallBack = this.getMsgDetailCallBack;
    this.isWanka = this.$wanka.isWanka() ? true : false;
    this.msgId = this.$route.query.msgId;
    this.loadData();
  },

  
  components: {
    GoBack
  },

  computed: {},

  methods: {
    reback() {
      this.$router.back();
    },
    loadData() {
      this.$http.loadData(
        "/app/msg/msginfo",
        { msgid: this.msgId },
        "getMsgDetailCallBack"
      );
    },
    getMsgDetailCallBack(res) {
      if (res) {
        if (res.responseData) {
          res = res.responseData;
        }

        this.msgItem = res.list;
      }
    }
  }
};
</script>
<style lang='postcss'>
.msg-detail-container {
  min-height: 668px;
  & .title-container {
    background: #ffffff;
    padding-top: 30px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    & .left-img {
      height: 32px;
      width: 24px;
      margin-left: 7px;
    }
    & .title-sytle {
      font-size: 18px;
      color: #253b40;
      flex-grow: 1;
      text-align: center;
    }
    & .right-text {
      font-size: 14px;
      color: #092126;
      margin-right: 12px;
    }
  }

  & .msg-detail-content {
    overflow-y: auto;
    & .title-style {
      margin-top: 15px;
      font-size: 32px;
      color: #1c2042;
      text-align: center;
    }

    & .date-style {
      margin-top: 7px;
      font-size: 12px;
      color: #8d929c;
      text-align: center;
    }

    & .content-style {
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
      & img {
        max-width: 100%;
      }
    }
  }
}
</style>