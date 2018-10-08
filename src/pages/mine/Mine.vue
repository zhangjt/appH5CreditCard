<!--个人设置-->
<template>
  <div class="mine-container">

    <div class="mine-top">
      <div class="top-top">
        <img :src="headImg" onerror="javascript:this.src='/static/images/photo_f.png';" @click="goSetting">
        <div class="top-left">
          <span>{{nick}}</span>
          <!-- <div class="trans-round">
                        <span>{{gradeNickname}}</span>
                    </div> -->
        </div>
        <!-- <span class="setting" @click="goSetting">个人设置</span> -->
        <div class="msg-alert" @click="goMsg">
          <img src="/static/images/notice@2x.png">
          <img class="badage" v-show="unread" src="/static/images/dot.png">
        </div>

      </div>
      <div class="top-bottom">
        <div class="bottom-left" @click="goRebate">
          <div class="left-text">
            <span class="big-font">{{rebateFee}}</span>
            <span class="small-font">我的返利(元)</span>
          </div>

          <img :src="arrowUrl">

        </div>
        <div class="top-line">
          <div class="line"></div>
        </div>
        <div class="bottom-right" @click="goWallet">
          <div class="right-text">
            <span class="big-font">{{balance}}</span>
            <span class="small-font">我的钱包(元)</span>
          </div>
          <img :src="arrowUrl">
        </div>
      </div>
    </div>
    <div class="mine-divider"></div>
    <div class="mine-bottom">
      <div class="msg-area" @click="goProgress"><img src="/static/images/Group7@2x.png">
        <div class="dot">
          <span>进度查询</span>
        </div><img class="arrow-img" src="/static/images/personal_enter.png"></div>
      <div class="line"></div>
      <div class="msg-area" @click="goAboutUs"><img src="/static/images/we@2x.png">
        <div class="dot">
          <span>关于我们</span>
        </div><img class="arrow-img" src="/static/images/personal_enter.png"></div>
      <div class="line"></div>
      <div class="msg-area" @click="goApply"><img src="/static/images/apply@2x.png">
        <div class="dot">
          <span>申卡提单</span>
        </div><img class="arrow-img" src="/static/images/personal_enter.png"></div>
      <div class="line"></div>
      <div class="msg-area" @click="goSetting"><img src="/static/images/fit@2x.png">
        <div class="dot">
          <span>个人设置</span>
        </div><img class="arrow-img" src="/static/images/personal_enter.png"></div>
      <div class="line"></div>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      arrowUrl: "/static/images/into.png",
      headImg: "/static/images/photo_f.png",
      phone: "",
      rebateFee: 0,
      balance: 0,
      nickname: "",
      unread: false
    };
  },
  watch: {},
  computed: {
    nick: function() {
      if (this.nickname) {
        return this.nickname;
      } else if (this.phone) {
        return (
          this.phone.substring(0, 3) + "****" + this.phone.substring(8, 11)
        );
      } else {
        return "  ";
      }
    }
  },
  methods: {
    getUserInfo() {
      this.$http.getUserInfo().then(res => {
        if (res) {
          this.headImg = res.head_img;
          this.phone = res.phone;
          this.nickname = res.nickname;
          // this.gradeNickname = res.gradeNickname;
          this.rebateFee = res.rebateFee.toFixed(2);
          this.balance = res.balance.toFixed(2);
          sessionStorage.setItem("balance", this.balance);
          this.cardInfo = res.bankCardInfo;
          if (this.cardInfo) {
            sessionStorage.setItem("isBind", this.cardInfo.isBind);
          }
        }
      });
    },
    getMsgList: function() {
      var params = {
        page: this.curentPage,
        limit: 1
      };
      this.$http.getMsgList(params).then(res => {
        if (res) {
          this.unread = res.unread > 0;
        }
      });
    },
    goProgress: function() {
      //跳转到进度查询
      this.$router.push({
        path: "/mine/mineRecord",
        query: {index: '2',
        title:"进度查询"}

      });
    },
    goApply: function() {
      //跳转到申卡提单
      this.$router.push({ path: "/mine/applyCard" });
    },
    goMsg: function() {
      //跳转到消息列表
      this.$router.push({ path: "/mine/msgCenter" });
    },
    goSetting: function() {
      //跳转到个人设置
      this.$router.push({ path: "/mineSetting" });
    },
    goRebate: function() {
      //跳转到累计返利
      this.$router.push({
        path: "/mine/mineRecord",
        query: {index: '1',
        title:"我的返利"}

      });
    },
    goWallet: function() {
      //跳转到我的钱包
      this.$router.push({ path: "/mine/mineWallet" });
    },
    goAboutUs: function() {
      //跳转到关于我们
      this.$router.push("/mine/aboutUs");
    }
  },
  created() {
    this.getUserInfo();
    var b = sessionStorage.getItem("balance");
    if (b) {
      this.balance = b;
    }
    this.getMsgList();
  },

  mounted() {}
};
</script>
<style lang="postcss" scoped>
.mine-container {
}
.mine-divider {
  width: 100%;
  height: 12px;
  background: #f6f7f8;
}

.msg-alert {
  display: flex;
  margin-top: -10px;
  & > img {
    width: 30px;
    height: 30px;
  }
  & .badage {
    width: 5px;
    height: 5px;
    margin-left: -5px;
    margin-top: 5px;
  }
}
.mine-top {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-top: 44px; */
  height: 136px;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  background: url("/static/images/my_bg@2x.png");
  background-size: contain;
  & .top-top {
    height: 78px;
    display: flex;
    align-items: center;
    & > img {
      width: 52px;
      height: 52px;
      border-radius: 26px;
    }

    & span {
      font-size: 14px;
      text-align: center;
    }

    & .setting {
      height: 78px;
      padding-top: 16px;
    }

    & .top-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 2px;
      flex-grow: 1;

      & > span {
        font-size: 18px;
        text-align: left;
        margin-left: 15px;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      & .trans-round {
        margin-top: 5px;
        width: 50px;
        height: 20px;
        display: flex;
        margin-left: 10px;
        justify-content: center;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.1);
        line-height: 20px;
        & > span {
          font-size: 10px;
          text-align: center;
        }
      }
    }
  }

  & .top-bottom {
    height: 78px;
    display: flex;
    margin-bottom: 10px;
    & .bottom-left {
      width: 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      & .left-text {
        display: flex;
        flex-direction: column;

        & .big-font {
          font-size: 26px;
        }
        & .small-font {
          font-size: 12px;
        }
      }

      & img {
        width: 24px;
        height: 24px;
        margin-left: 4px;
      }
    }

    & .top-line {
      width: 1px;
      display: flex;
      align-items: center;
      & .line {
        width: 1px;
        background: white;
        height: 24px;
      }
    }

    & .bottom-right {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      & .right-text {
        display: flex;
        flex-direction: column;

        & .big-font {
          font-size: 26px;
        }
        & .small-font {
          font-size: 12px;
        }
      }

      & img {
        width: 24px;
        height: 24px;
        margin-left: 4px;
      }
    }
  }
}
.mine-bottom {
  color: #334354;
  font-size: 16px;

  & .line {
    width: 337px;
    margin-left: 20px;
    height: 1px;
    background: #ececec;
  }

  & .msg-area {
    display: flex;
    justify-content: flex-end;
    height: 62px;
    align-items: center;
    padding-left: 20px;
    cursor: pointer;
    font-size: 16px;
    color: #1c1b3f;
    & .dot {
      margin-left: 8px;
      flex-grow: 100;
      display: flex;
      align-items: center;
    }
    & img {
      width: 36px;
      height: 36px;
    }

    & .arrow-img {
      width: 7px;
      height: 18px;
      margin-right: 20px;
    }
  }
}
</style>
