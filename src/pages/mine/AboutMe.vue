<template>
  <div class="mine-about-me" v-title="page_title">
    <go-back title="关于我们" url="/mine"/>
    <div class="item-container-1">
      <img class="app-icon" src="/static/images/logo.png">
      <div class="app-name">{{app_name}}</div>
    </div>
    <div class="item-container-2">
      <div @click="showWechatDialog" class="wechat-item-style" :data-clipboard-text="app_name">
        <div class="item-name">官方微信</div>
        <div class="item-content">财喵万卡</div>
      </div>
      <div class="space-line"></div>
      <div @click="showPhoneDialog" class="item-style">
        <div class="item-name">客服热线</div>
        <div class="item-content">{{service_number}}</div>
      </div>
      <div class="space-line"></div>
      <div class="item-style" v-show="isCheckUpdateVisable" @click="checkUpdate">
        <div class="item-name">检查更新</div>
        <div class="item-content">v1.0.0</div>
      </div>
      <div class="space-line" v-show="isCheckUpdateVisable"></div>
    </div>
    <div class="item-container-3">
      <div class="tips-style">{{app_name}}</div>
      <div class="tips-style">Copyright © 2017-2018 caimiaowanka.com</div>
    </div>
    <common-dialog :dialogVisable="isShow" :title="title" :rightText.sync="rightText" :leftText.sync="leftText"
                   @defaultClick="dismissDialog" :dialogVisable.sync="isShow" :confrimType.sync="dialogConfirmType"
                   @primaryClick="confirmDialog"/>
  </div>
</template>

<script>
  import GoBack from '@/pages/index/GoBack'
  import CommonDialog from '@/pages/index/CommonDialog'
  import Clipboard from 'clipboard'

  let phone = ''

  export default {
    data () {
      return {
        page_title: '关于我们',
        app_name: '财喵万卡',
        service_number: '400-1160588',
        isShow: false,
        rightText: '确定',
        leftText: '取消',
        title: '',
        dialogConfirmType: 0,
        isCheckUpdateVisable: false,
      }
    },
    mounted () {
      if (this.$wanka.isWanka() && this.$wanka.isAndroid()) {
        this.isCheckUpdateVisable = true
      }
    },
    created () {

    },
    components: {GoBack, CommonDialog},
    methods: {
      showPhoneDialog () {
        if (this.$wanka.isiOS() && this.$wanka.isWanka()) {

        } else if (this.$wanka.isiOS() && !this.$wanka.isWanka()) {
          //调用电话功能
          phone = 'tel:' + this.service_number
          window.location.href = phone
        } else {
          this.isShow = true
        }
        this.rightText = '呼叫'
        this.title = this.service_number
        this.dialogConfirmType = 2
      },
      showWechatDialog () {
        if (!this.$wanka.isWanka()) {
          let clipboard = new Clipboard('.wechat-item-style')
          clipboard.on('success', e => {
            //复制跳转微信
            this.isShow = true
            this.rightText = '确定'
            this.title = '复制微信号并跳转至微信'
            this.dialogConfirmType = 1
            // 释放内存
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            // 不支持复制
            // 释放内存
            clipboard.destroy()
          })

        } else {
          this.isShow = true
          this.rightText = '确定'
          this.title = '复制微信号并跳转至微信'
          this.dialogConfirmType = 1
        }
      },
      dismissDialog () {
        this.isShow = false
      },
      confirmDialog () {
        switch (this.dialogConfirmType) {
          case 1:
            if (this.$wanka.isWanka()) {
              this.$wanka.CopyAndShowWechat(this.app_name)
              this.dismissDialog()
            } else {
              this.dismissDialog()
              window.location.href = 'weixin://'
            }
            break
          case 2 :
            if (this.$wanka.isWanka() && this.$wanka.isAndroid()) {
              this.$wanka.CallPhone(this.service_number)
              this.dismissDialog()
            } else {
              this.dismissDialog()
              //调用电话功能
              phone = 'tel:' + this.service_number
              window.location.href = phone

            }
            break
          default:
        }
      },
      checkUpdate () {
        if (this.$wanka.isWanka() && this.$wanka.isAndroid()) {
          this.$wanka.checkUpdate()
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .mine-about-me {
    background: #fbfbfb;
    height: 100%;

  &
  .item-container-1 {
    display: flex;
    align-items: center;
    flex-direction: column;

  &
  .app-icon {
    margin-top: 13px;
    max-width: 80px;
    max-height: 80px;
  }

  &
  .app-name {
    margin-top: 2px;
  }

  }
  &
  .item-container-2 {
    margin-top: 22px;
    background: #ffffff;

  &
  .wechat-item-style {
    height: 64px;
    min-height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

  &
  .item-name {
    font-size: 16px;
    color: #1c2042;
    margin-left: 27px;
  }

  &
  .item-content {
    margin-right: 18px;
    color: #4477dd;
  }

  }

  &
  .item-style {
    height: 64px;
    min-height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

  &
  .item-name {
    font-size: 16px;
    color: #1c2042;
    margin-left: 27px;
  }

  &
  .item-content {
    margin-right: 18px;
    color: #4477dd;
  }

  }
  &
  .space-line {
    height: 1px;
    margin-left: 27px;
    background: #ececec;
  }

  }
  &
  .item-container-3 {
    margin-bottom: 44px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-direction: column;

  &
  .tips-style {
    font-size: 10px;
    color: #B9BABF;
  }

  }

  }
</style>
