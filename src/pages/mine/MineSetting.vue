<!--  -->
<template>
  <div class="mine-setting-container">
    <go-back title="个人设置" url="/mine"></go-back>
    <div class="item-container">
      <div class="item-style-1">
        <span class="left-text">头像</span>
        <img class="head-img" src="/static/images/photo_f.png" />
      </div>
      <div class="space-line"></div>
      <div class="item-style" @click="goModifyNickname">
        <span class="left-text">昵称</span>
        <div class="right-container">
          <span>{{nickName}}</span>
          <img src='/static/images/personal_enter.png'>
        </div>
      </div>
      <div class="space-line"></div>
      <div class="item-style">
        <span class="left-text">手机</span>
        <div class="right-container">
          <span>{{phoneNum}}</span>
          <img src='/static/images/personal_enter.png'>
        </div>
      </div>

      <div class="space-line"></div>

      <account-bind :cardInfo="cardInfo"></account-bind>

      <div class="item-style" v-on:click="goToCodeReset">
        <span class="left-text">登录密码</span>
        <div class="right-container">
          <span>{{passwordSet > 0?'修改密码':'未设置'}}</span>
          <img src='/static/images/personal_enter.png'>
        </div>
      </div>
    </div>
    <div>
    </div>

    <div class="logout-container" @click="logOut">
      退出当前账号
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AccountBind from "./AccountBind";
import GoBack from "@/pages/index/GoBack";
export default {
  data() {
    return {
      loginCode: "--/--",
    };
  },

  created() {
    this.getUserInfo();
    // isBind = this.cardInfo.isBind == 1;
  },

  components: { AccountBind,GoBack},

  computed: {
    ...mapState({
      nickName: state => state.accountInfo.nickname,
      phoneNum: state => state.accountInfo.phone,
      passwordSet: state => state.accountInfo.passwordSet,
      cardInfo: state => state.accountInfo.cardInfo
    })
  },

  methods: {
    ...mapMutations(["SETLOGINSTATE"]),
    ...mapActions([
      "getUserInfo" // 将 `this.incrementBy(getUserInfo)` 映射为 `this.$store.dispatch('getUserInfo', amount)`
    ]),

    goToCodeReset() {
      if (this.passwordSet > "0") {
        this.$router.push({
          path: "/user/forgetPassword",
          query: { isFromMineSetting: true }
        });
      } else {
        this.$router.push({ path: "/user/codeSet" });
      }
    },
    goModifyNickname() {
      this.$router.push({ path: "/mineSetting/modifyNickname" });
    },
    logOut() {
      this.$toast("成功退出登录");
      this.$router.push({ path: "/" });
      this.SETLOGINSTATE({ loginState: false });
      localStorage.removeItem("session_id");
    }
  }
};
</script>
<style lang="postcss" scoped>
.mine-setting-container {
  background: #fbfbfb;

  & .item-container {
    height: auto;
    background: #ffffff;
    margin-top: 14px;
    & .item-style-1 {
      height: 72px;
      padding-left: 27px;
      padding-right: 22px;
      display: flex;
      justify-content: space-between;

      & .left-text {
        font-size: 16px;
        color: #1c2042;
        line-height: 72px;
      }

      & .head-img {
        width: 52px;
        height: 52px;
        margin: auto 0;
      }
    }

    & .item-style {
      height: 64px;
      padding-left: 27px;
      padding-right: 22px;
      display: flex;
      justify-content: space-between;

      & .left-text {
        font-size: 16px;
        color: #1c2042;
        line-height: 64px;
      }

      & .right-container {
        display: flex;
        justify-content: flex-end;
        height: 64px;
        & span {
          font-size: 14px;
          color: #1c2042;
          line-height: 64px;
          margin-right: 17px;
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /*超出部分用...代替*/
        }

        & img {
          width: 7px;
          height: 14px;
          margin: auto 0;
        }
      }
    }

    & .space-line {
      height: 1px;
      margin-left: 27px;
      background: #ececec;
    }
  }

  & .logout-container {
    background: #ffffff;
    height: 52px;
    margin-top: 12px;
    font-size: 16px;
    color: #565656;
    line-height: 52px;
    text-align: center;
  }
}
</style>

