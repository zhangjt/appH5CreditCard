<template>
  <div class="login">
    <mt-header :title="title" class="boder-header">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <form style="display:none">
          <input type="password"/>
    </form>
    <form class="forget" @submit="checkForm" action="" v-model="forgetform">
      <mt-field placeholder="请输入手机号码" type="tel" v-model="forgetform.phoneNumber"></mt-field>
      <form-captcha :phoneNumber="forgetform.phoneNumber" :captcha.sync="forgetform.captcha"></form-captcha>
      <form-verification :phoneNumber="forgetform.phoneNumber" :captcha="forgetform.captcha" :verification.sync="forgetform.verification"></form-verification>
      <mt-field placeholder="请设置登录密码，6-16位字符" type="password" v-model="forgetform.password"></mt-field>

      <div class="btn-module">
        <div class="btn-margin">
          <mt-button class="common-btn blue" :disabled="btnDisabled">提交</mt-button>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import md5 from 'md5'
import FormCaptcha from '@/components/login/FormCaptcha'
import FormVerification from '@/components/login/FormVerification'
import valid from '@/modules/valid'

export default {
  name: 'login',
  components: { FormCaptcha, FormVerification },
  computed: {
    btnDisabled: {
      get: function () {
        if (this.forgetform.phoneNumber) {
          return false
        } else {
          return true
        }
      }
    }
  },
  data () {
    return {
      title: '密码修改',
      forgetform: {
        phoneNumber: localStorage.getItem('caiPhone'),
        captcha: '',
        verification: '',
        password: ''
      },
      isFromMineSetting: false
    }
  },
  created () {
    this.SETLOGINVALUE({
      captchaShow: false,
      sendShow: true,
      btnDisable: false
    })
    this.isFromMineSetting = this.$route.query.isFromMineSetting
  },
  mounted () {
    setTimeout(() => {
      this.forgetform.password = ''
    }, 200)
  },
  methods: {
    ...mapMutations([
      'SETLOGINVALUE'
    ]),
    changePwd: function (form) {
      this.$http.resetPassword(form).then(res => {
        if (res && res.statusCode == 0) {
          this.$toast('密码修改成功')
           localStorage.removeItem("session_id");
          this.$router.replace('/user/login');
        }else{
          if(res.statusMsg){
            this.$toast(res.statusMsg);
          }
        }
      })
    },
    checkForm: function (e) {
      localStorage.setItem('caiPhone', this.forgetform.phoneNumber || '')
      var phone = valid.validatePhoneNumber(this.forgetform.phoneNumber)

      if (phone === '') {
        if (!this.forgetform.captcha) {
          this.$toast('图形验证码不能为空')
        } else if (!this.forgetform.verification) {
          this.$toast('短信验证码不能为空')
        } else if (!this.forgetform.password) {
          this.$toast('密码不能为空')
        } else if (this.forgetform.password.length < 6 || this.forgetform.password.length > 16) {
          this.$toast('登录密码应设置为6-16位字符')
        } else {
          let form = {
            phone: this.forgetform.phoneNumber,
            password: md5(this.forgetform.password),
            img_code: this.forgetform.captcha,
            captcha_code: this.forgetform.verification,
          }
          this.changePwd(form)
        }
      } else {
        this.$toast(phone)
      }

      e.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.login{
  background-color: #FBFBFB;
  & .login-form{
    background-color: #fff;
  }
}
.mint-cell{
  padding-left: 15px;
}
.btn-margin{
  margin: 75px 52px;
}
</style>
