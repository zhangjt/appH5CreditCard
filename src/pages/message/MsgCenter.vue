<!--  -->
<template>
  <div class="msg-center-container">
    <mt-header title="消息" class="boder-header">
      <mt-button icon="back" slot="left" @click="reback"></mt-button>
    </mt-header>

    <scroller class="scroller-class" :on-refresh="refresh">
      <div v-show="!isEmpty">
        <div v-show="funCount>0" class="msg-center-item" style="margin-top: 10px;" v-on:click="goToMsgList('3')">
          <div class="logo-tip-class">
            <img class="logo_img" src="../../assets/images/choice.png" />

            <div class="unread-tip" v-if="funMsgCount>0" :style="{'font-size':funMsgCount>99 ? '6px':'10px'}">
              {{funMsgCount > 99?"99+":funMsgCount}}
            </div>
          </div>

          <div class="content-container">
            <div class="title-class">精选活动</div>
            <div class="content-class">{{funMsgTitle}}</div>
          </div>

          <div class="date-class">
            {{funMsgAddTime}}
          </div>
        </div>

        <div v-show="funCount>0" class="cut-off-img"></div>

        <div v-show="sysCount>0" class="msg-center-item" v-on:click="goToMsgList('0')">
          <div class="logo-tip-class">
            <img class="logo_img" src="../../assets/images/system.png" />
            <div class="unread-tip" v-if="sysMsgCount>0" :style="{'font-size':sysMsgCount>99 ? '6px':'10px'}">
              {{sysMsgCount > 99?"99+":sysMsgCount}}
            </div>
          </div>
          <div class="content-container">
            <div class="title-class">系统公告</div>
            <div class="content-class">{{sysMsgTitle}}</div>
          </div>

          <div class="date-class">
            {{sysMsgAddTime}}
          </div>
        </div>

        <div v-show="sysCount>0" class="cut-off-img"></div>
      </div>
      <empty class="empty" v-if="isEmpty"></empty>
    </scroller>
  </div>
</template>

<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import http from "http";
import Empty from "@/components/Empty";
export default {
  data() {
    return {
      funMsgCount: 0,
      sysMsgCount: 0,
      sysMsgTitle: "",
      funMsgTitle: "",
      sysMsgAddTime: "",
      funMsgAddTime: "",
      isEmpty: false,
      sysCount: 0,
      funCount: 0
    };
  },
  created() {
    window.getMsgListCallBack = this.getMsgListCallBack;
    this.loadData();
  },
  components: {
    Empty
  },

  computed: {},

  methods: {
    done() {},

    refresh(done) {
      this.loadData(done);
    },

    loadData(done) {
      this.getMsgList(0, done);
    },

    getMsgList(msgType, done) {
      if (done) {
        this.done = done;
      }
      let params = {
        type: msgType,
        limit: 1,
        page: 1
      };

      // this.$http.loadData("/app/msg/list", params, "getMsgListCallBack");
      this.$http
        .getMsgList(params)
        .then(res => {
          if (res) {
            switch (msgType) {
              case 0:
                this.sysMsgCount = res.unread;
                if (res.list[0]) {
                  this.sysMsgTitle = res.list[0].title;
                  this.sysMsgAddTime = this.getDate(res.list[0].addtime);
                }
                this.sysCount = res.count;
                this.getMsgList(3);
                break;
              case 3:
                if (this.done) {
                  this.done(false);
                }
                this.funMsgCount = res.unread;
                if (res.list[0]) {
                  this.funMsgTitle = res.list[0].title;
                  this.funMsgAddTime = this.getDate(res.list[0].addtime);
                }
                this.funCount = res.count;
                this.isEmpty = this.sysCount <= 0 && this.funCount <= 0;
                break;
            }
          }
        })
        .catch(err => {
          //do nothing
        });
    },

    // getMsgListCallBack(res) {
    //   if (this.done) {
    //     this.done(false);
    //   }
    //   if (res) {
    //     if (res.responseData) {
    //       res = res.responseData;
    //     }
    //     switch (msgType) {
    //       case 0:
    //         this.sysMsgCount = res.unread;
    //         this.sysMsgTitle = res.list[0].title;
    //         this.sysMsgAddTime = this.getDate(res.list[0].addtime);
    //         break;
    //       case 3:
    //         this.funMsgCount = res.unread;
    //         this.funMsgTitle = res.list[0].title;
    //         this.funMsgAddTime = this.getDate(res.list[0].addtime);
    //         break;
    //     }
    //   }
    // },

    goToMsgList(msgType) {
      var titleName;
      switch (msgType) {
        case "3":
          titleName = "精选活动";
          break;
        case "0":
          titleName = "系统公告";
          break;
      }
      this.$router.push({
        path: "/mine/mineMsgList",
        query: {
          titleName: titleName,
          msgType: msgType
        }
      });
    },

    reback() {
      this.$router.push("/mine");
    },
    getDate(addTime) {
      addTime = addTime.substring(0, 10);
      var date = new Date(addTime);
      var m = date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
      var d = date.getDate(); // 获取日(1-31)
      return m + "月" + d + "日";
    }
  }
};
</script>
<style lang='postcss' scoped>
.msg-center-container {
  & .scroller-class {
    position: absolute;
    top: 44px;
    background: #f6f7f8;
    & .msg-center-item {
      height: 96px;
      background: #ffffff;
      position: relative;
      & .logo-tip-class {
        width: 42px;
        height: 42px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 24px;
        margin: auto;

        & .logo_img {
          width: 42px;
          height: 42px;
        }

        & .unread-tip {
          position: absolute;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #fb1a1a;
          font-size: 10px;
          position: absolute;
          top: 4px;
          left: 15px;
          margin-top: -6px;
          margin-left: 13px;
          line-height: 13px; /*让黄色div中的文字内容垂直居中*/
          text-align: center; /*让文字水平居中*/
          color: #ffffff;
        }
      }

      & .content-container {
        height: 42px;
        position: absolute;
        left: 88px;
        top: 0;
        bottom: 0;
        margin: auto;

        & .title-class {
          font-size: 14px;
          color: #1c2042;
        }

        & .content-class {
          max-width: 289px;
          margin-top: 5px;
          font-size: 12px;
          color: #909090;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      & .date-class {
        position: absolute;
        font-size: 12px;
        color: #d8d8d8;
        top: 26px;
        left: 304px;
      }
    }

    & .cut-off-img {
      height: 1px;
      background: #ececec;
      margin-left: 30px;
      margin-right: 30px;
    }
  }
}
</style>