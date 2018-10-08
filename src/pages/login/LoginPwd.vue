<template>
  <div class="login">
    <!-- <mt-header :title="title" class="boder-header">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <form class="login-form" @submit="checkForm" action="" v-model="passform">
      <mt-field placeholder="请输入手机号码" type="tel" v-model="passform.username" class="phone"></mt-field>
      <mt-field placeholder="请输入登录密码" type="password" v-model="passform.password" class="password"></mt-field>

      <div class="btn-module">
        <div class="btn-margin">
          <mt-button class="common-btn" :disabled="btnDisabled">登录</mt-button>
        </div>
      </div>

    </form>
    <!--  -->
    <router-link class="forget" to="/user/forgetPassword">忘记密码</router-link>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import md5 from "md5";
import valid from "@/modules/valid";

export default {
  name: "login",
  data() {
    return {
      title: "密码登录",
      passform: {
        username: localStorage.getItem("caiPhone"),
        password: ""
      }
    };
  },
  computed: {
    btnDisabled: {
      get: function() {
        if (this.passform.username) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  methods: {
    ...mapActions([
      "getUserInfo" // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapMutations(["SETLOGINSTATE"]),
    // 向后台发出登录请求
    toLogin: function(form) {
      this.$http.toLogin(form).then(res => {
        if (res && res.phone) {
          this.SETLOGINSTATE({ loginState: true });
          setTimeout(() => {
            this.getUserInfo();
            var redirectUrl = this.$route.query.redirected;
            if (redirectUrl) {
              this.$router.push({ path: redirectUrl });
            } else {
              this.$router.go(-1);
            }
          }, 500);
        } else if (res.statusMsg) {
          this.$toast(res.statusMsg);
        }
      });
    },
    checkForm: function(e) {
      localStorage.setItem("caiPhone", this.passform.username || "");
      var phone = valid.validatePhoneNumber(this.passform.username);
      if (phone === "") {
        if (!this.passform.password) {
          this.$toast("密码不能为空");
        } else {
          let form = {
            phone: this.passform.username,
            password: md5(this.passform.password),
            type: 0,
            channel: "wapzc"
          };
          this.toLogin(form);
        }
      } else {
        this.$toast(phone);
      }

      e.preventDefault();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.login {
  text-align: center;
}
.forget {
  margin-top: 165px;
  display: inline-block;
  color: #8d929c;
  font-size: 14px;
  text-decoration: none;
}
.btn-module {
}
</style>
