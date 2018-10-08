<!--  -->
<template>
  <div class="mine-msg-container">
    <mt-header :title="titleName" class="boder-header">
      <mt-button icon="back" slot="left" @click="reback"></mt-button>
    </mt-header>

    <scroller class="scroller-class" :on-refresh="refresh" :on-infinite="infinite">
      <div class="all-msg-container" v-if="!hasNoData">
        <div v-for="(item,index) in msgList" :key="index">
          <msg-list-item :msgItem="item" :isShowDate="getLastDate(index)" :msgType="msgType"></msg-list-item>
        </div>
      </div>


      <empty class="empty" v-if="hasNoData"></empty>
    </scroller>
  </div>
</template>

<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
import Empty from "@/components/Empty";
import http from "http";
Vue.use(VueScroller);
import MsgListItem from "@/components/message/MsgListItem";
export default {
  components: { MsgListItem, Empty },
  data() {
    return {
      titleName: "",
      msgType: "0",
      page: 1,
      hasNoData: false,
      msgList: [],
      isRefresh: false,
      isCreate: false
    };
  },

  created() {
    this.isCreate = true;
  },

  activated() {
    window.getMsgListCallBack = this.getMsgListCallBack;
    this.titleName = this.$route.query.titleName;
    this.msgType = this.$route.query.msgType;
    this.$http.msgAllRead(this.msgType);
    if (!this.isCreate) {
      this.refresh();
    }
  },

  methods: {
    reback() {
      this.$router.push({ path: "/mine/msgCenter" });
    },
    done() {},
    refresh(done) {
      this.page = 1;
      this.isRefresh = true;
      this.getMsgList(done);
    },
    infinite(done) {
      //done(true)的时候会停止加载更多
      this.isRefresh = false;
      this.getMsgList(done);
    },
    getMsgList(done) {
      let params = {
        type: this.msgType,
        limit: 30,
        page: this.page
      };
      this.done = done;
      this.$http.loadData("/app/msg/list", params, "getMsgListCallBack");
    },

    getMsgListCallBack(res) {
      this.page += 1;
      this.isCreate = false;
      if (res) {
        if (res.responseData) {
          res = res.responseData;
        }
        this.hasNoData = res.count == 0;
        if (this.hasNoData) {
          //没有数据的情况
          this.done(true);
          this.msgList = [];
          return;
        }
        if (this.isRefresh) {
          this.msgList = res.list;
          this.done(true);
        } else {
          this.msgList = this.msgList.concat(res.list);
          this.done(this.msgList.length == res.count);
        }
      }
    },

    getLastDate(i) {
      var index = i - 1;
      if (index < 0) {
        return false;
      } else {
        var lastMsgItem = this.msgList[index];
        var msgItem = this.msgList[i];
        return (
          msgItem.addtime.substring(0, 10) ==
          lastMsgItem.addtime.substring(0, 10)
        );
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.mine-msg-container {
  height: auto;

  & .scroller-class {
    position: absolute;
    top: 44px;
    background: #f6f7f8;

    & .all-msg-container {
      margin-top: 10px;
    }
  }
}
</style>