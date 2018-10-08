<template>
  <mt-field placeholder="请输入图形验证码" v-model="captchaVal" class="imgCaptcha" type="number">
    <div v-show="!captchaShow" @click="getCaptcha" class="get-captcha">
      <span>获取图形验证码</span>
    </div>
    <img v-show="captchaShow" alt="单击图片刷新" class="captcha-img" :src="codeImgSrc" @click="refreshCode">
  </mt-field>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import valid from '@/modules/valid'

export default {
  name: 'HomeNav',
  data () {
    return {
      codeImgSrc: '',
      captchaVal: ''
    }
  },
  props: {
    phoneNumber: {
      type: String
    },
    captcha: {
      type: String
    }
  },
  computed: {
    ...mapState({
      captchaShow: state => state.loginInfo.captchaShow
    })
  },
  watch: {
    captchaVal (newVal, oldVal) {
      // 在监听你使用update事件来更新captcha,而在父组件不需要调用该函数
      this.$emit('update:captcha', newVal)
    }
  },
  methods: {
    ...mapMutations([
      'SETCAPTCHASHOW'
    ]),
    // 获取图形验证码
    getImgCode (phoneNumber) {
      this.$http.getImageCode(phoneNumber).then(res => {
        if(res.image){
          this.codeImgSrc = "data:image/png;base64,"+res.image
        }
      })
    },
    refreshCode: function () {
      this.getImgCode(this.phoneNumber)
    },
    getCaptcha () {
      var res = valid.validatePhoneNumber(this.phoneNumber)
      if (res === '') {
        this.getImgCode(this.phoneNumber)
        this.SETCAPTCHASHOW({captchaShow: true})
      } else {
        this.$toast(res)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.home-nav-item{
  width: 50%;
  text-align: center;
  & .icon{
    background-size: contain;
    display: block;
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
}
.rebate{
  color: #5594DF;
  & .icon{
    background-image: url('/static/images/fanli@2x.png');
  }
}
.account{
  color: #FF9300;
  & .icon{
    background-image: url('/static/images/jizhang@2x.png');
  }
}

</style>
