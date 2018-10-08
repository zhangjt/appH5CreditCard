<template>
  <div class="login">
    {{ code }}
    <mt-header :title="title" class="boder-header">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <mt-button slot="right" @click="changePanel">{{rightTitle}}</mt-button>
    </mt-header>

    <div class="login-quick" v-show="quickVisable">
      <form class="login-form" @submit="checkForm" action="" v-model="form">
        <mt-field placeholder="请输入手机号码" type="tel" v-model="form.phoneNumber" class="phone"></mt-field>
        <form-captcha :phoneNumber="form.phoneNumber" :captcha.sync="form.captcha"></form-captcha>
        <form-verification :phoneNumber="form.phoneNumber" :captcha="form.captcha" :verification.sync="form.verification"></form-verification>

        <div class="mint-cell-wrapper btn-module">
          <div class="btn-margin">
            <mt-button class="common-btn">登录</mt-button>
          </div>
          <div class="login-checkbox">
            <mt-checklist
              v-model="form.agreeValue"
              :options="options">
            </mt-checklist>
            <span>若您输入的手机号未注册，将会进入注册流程。注册即视为同意《<a @click="showAgreement"> 财喵万卡注册服务协议</a>》</span>
          </div>
        </div>

      </form>
    </div>
    <div class="login-pwd" v-show="!quickVisable">
      <login-pwd></login-pwd>
    </div>

    <!-- <mt-popup
      v-model="popupVisible"
      class="agreement-popup"
      position="right">
      <mt-header title="注册服务协议" class="boder-header">
        <mt-button @click="hidePopup" icon="back" slot="left"></mt-button>
      </mt-header>
      <login-agreement></login-agreement>
    </mt-popup> -->

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import FormCaptcha from "@/components/login/FormCaptcha";
import FormVerification from "@/components/login/FormVerification";
// import LoginAgreement from '@/components/login/LoginAgreement'
import LoginPwd from "@/pages/login/LoginPwd";
import valid from "@/modules/valid";

export default {
  name: "login",
  components: { FormCaptcha, FormVerification, LoginPwd },
  data() {
    return {
      title: "手机号快捷登录",
      rightTitle: "密码登录",
      // popupVisible: false,
      quickVisable: true,
      options: [
        {
          label: " ",
          value: true
        }
      ],
      code: "",
      form: {
        phoneNumber: localStorage.getItem("caiPhone"),
        captcha: "",
        verification: "",
        agreeValue: [true]
      }
    };
  },
  computed: {
    ...mapState({
      loginThirdType: state => state.accountInfo.loginThirdType,
      thirdType: state => state.accountInfo.thirdType,
      tempToken: state => state.accountInfo.tempToken
    })
  },
  created() {
    // alert(document.location);
    // alert(this.$route.query.code);
    if (this.$route.query.code) {
      this.code = this.$route.query.code;
      // this.setAccessToken(this.$route.query.code);
    }
    // window.addEventListener('hashchange', this.afterQRScan);
    this.SETLOGINVALUE({
      captchaShow: false,
      sendShow: true,
      btnDisable: false
    });
  },
  mounted() {},
  methods: {
    ...mapActions([
      "getUserInfo" // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapMutations(["SETLOGINVALUE", "SETLOGINSTATE"]),
    changePanel() {
      this.quickVisable = !this.quickVisable;
      if (!this.quickVisable) {
        this.title = "密码登录";
        this.rightTitle = "快捷登录";
      } else {
        this.title = "手机号快捷登录";
        this.rightTitle = "密码登录";
      }
    },
    // 向后台发出登录请求
    toLogin: function(form) {
      this.$http
        .toLogin(form)
        .then(res => {
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
        })
        .catch(err => {
        });
    },
    checkForm: function(e) {
      localStorage.setItem("caiPhone", this.form.phoneNumber || "");
      var phone = valid.validatePhoneNumber(this.form.phoneNumber);

      if (phone === "") {
        if (!this.form.captcha) {
          this.$toast("图形验证码不能为空");
        } else if (!this.form.verification) {
          this.$toast("短信验证码不能为空");
        } else if (this.form.agreeValue.length === 0) {
          this.$toast("请同意财喵万卡注册服务协议");
        } else {
          let form = {
            phone: this.form.phoneNumber,
            img_code: this.form.captcha,
            captcha_code: this.form.verification,
            type: 4
          };

          this.toLogin(form);
        }
      } else {
        this.$toast(phone);
      }

      e.preventDefault();
    },
    showAgreement() {
      // this.popupVisible = true
      this.$router.push("/user/agreement");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.login-checkbox {
  margin: 0px 20px 55px;
  display: flex;
  font-size: 12px;
  line-height: 21px;
  color: #a4a4a4;
  & a {
    color: #ff683f;
    text-decoration: none;
  }
  & span {
    margin-top: 6px;
  }
  & .mint-checklist {
    margin-top: -2px;
  }
  & .mint-checklist-title {
    margin: 0;
  }
  & .mint-checklist-label {
    padding: 0;
  }
}

.agreement-popup {
  width: 100%;
  height: 100%;
}
</style>
