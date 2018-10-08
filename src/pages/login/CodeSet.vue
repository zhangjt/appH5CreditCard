<template>
  <div class="code-reset-container">
    <mt-header title="密码设置" class="boder-header">
      <router-link to="/mineSetting" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="item-container">
      <div class="item-stytle" style="margin-top: 53px;">
        <input type="password" maxlength="16" v-model="codeInput" placeholder="请设置登录密码，6-16位字符">
      </div>

      <div class="item-stytle">
        <input type="password" maxlength="16" v-model="configCodeInput" placeholder="请再次输入登录密码">
      </div>
    </div>

    <div class="submit-style" @click="submit">
      提交
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { Toast } from "mint-ui";
export default {
  name: "CodeSet",
  data() {
    return {
      codeInput: "",
      configCodeInput: ""
    };
  },

  components: {},

  computed: {},

  methods: {
    submit() {
      // 重新设置密码
      if (!this.codeInput) {
        Toast("请输入新密码");
        return;
      }

      if (!this.configCodeInput) {
        Toast("请确认密码新密码");
        return;
      }

      if (this.configCodeInput === this.codeInput) {
        this.$http
          .setPassword({ password: md5(this.codeInput) })
          .then(res => {
            if (res && res.statusCode==0) {
              Toast("密码设置成功");
              this.$router.go(-1);
            }else{
              //TODO
            }
          });
      } else {
        Toast("两次密码不一致");
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.code-reset-container {
  background: #ffffff;
  height: 667px;
  width: 100%;

  & .item-container {
    background-color: white;
    & .item-stytle {
      display: flex;
      justify-content: space-between;
      margin-left: 32px;
      height: 64px;
      margin-top: 10px;

      & input {
        width: 315px;
        height: 36px;
        font-size: 14px;
        color: #a4a4a4;
        line-height: 36px;
        outline: medium;
        border: 0;
        border-bottom: 0.5px solid #e6e6e6;
      }
    }
  }

  & .submit-style {
    width: 270px;
    height: 44px;
    background-color: #4477dd;
    font-size: 16px;
    border-radius: 5px;
    margin: 30px auto;
    text-align: center;
    line-height: 44px;
    color: white;
  }
}
</style>