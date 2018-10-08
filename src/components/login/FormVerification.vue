<template>
  <mt-field placeholder="请输入短信验证码" v-model="verificationVal" class="msgCaptcha" type="number">
    <div class="get-captcha" @click="getCode" :disabled="btnDisable">
      <span v-show="sendShow">{{codeLabel}}</span>
      <span v-show="!sendShow">{{count}}s</span>
    </div>
  </mt-field>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import valid from '@/modules/valid'

export default {
  name: 'HomeNav',
  data () {
    return {
      codeLabel: '获取短信验证码',
      count: '',
      verificationVal: ''
    }
  },
  props: {
    phoneNumber: {
      type: String
    },
    captcha: {
      type: String
    },
    verification: {
      type: String
    }
  },
  computed: {
    ...mapState({
      sendShow: state => state.loginInfo.sendShow,
      btnDisable: state => state.loginInfo.btnDisable
    })
  },
  mounted () {
    setTimeout(() => {
      this.verificationVal = ''
    }, 200)
  },
  watch: {
    verificationVal (newVal, oldVal) {
      // 在监听你使用update事件来更新captcha,而在父组件不需要调用该函数
      this.$emit('update:verification', newVal)
    }
  },
  methods: {
    ...mapMutations([
      'SETSENDSHOW', 'SETBTNDISABLE'
    ]),
    // 获取短信验证码
    getMsgCode (phoneNumber, code) {
      this.$http.getMsgCode(phoneNumber, code).then(res => {
          const TIME_COUNT = 60
          this.SETBTNDISABLE({btnDisable: true})
          // this.btnDisable = true;
          if (!this.timer) {
            this.count = TIME_COUNT
            this.SETSENDSHOW({sendShow: false})
            // this.sendShow = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.SETSENDSHOW({sendShow: true})
                // this.sendShow = true;
                clearInterval(this.timer)
                this.codeLabel = '重新发送'
                this.SETBTNDISABLE({btnDisable: false})
                // this.btnDisable = false;
                this.timer = null
              }
            }, 1000)
        }
        if(res.statusMsg){
            this.$toast(res.statusMsg);
        }
      })
    },
    getCode () {
      var res = valid.validatePhoneNumber(this.phoneNumber)
      if (res === '') {
        if (this.captcha === '') {
          this.$toast('请输入图片验证码')
        } else {
          this.getMsgCode(this.phoneNumber, this.captcha)
        }
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
