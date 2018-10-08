<template>
  <div class="apply-card-container" v-title="title">
    <go-back title="申请提卡" url="/mine" @goBackWith="removeData"/>
    <div class="item-container">
      <div @click="remove">
        <div @click="showBankCardList" class="item-style">
          <div>*银&#12288;&#12288;行</div>
          <div class="bank-input-style">
            {{bankName}}
          </div>
        </div>
        <div class="item-input-style">
          <div>*姓&#12288;&#12288;名</div>
          <input v-model="userName" placeholder="请输入姓名" class="input-style" maxlength="5" type="text"
                 onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"/>
        </div>
        <div @click="openPicker" class="item-input-style">
          <div>*申卡日期</div>
          <div class="input-style">{{pickerValue}}</div>
        </div>
        <div class="item-input-style">
          <div>*电话号码</div>

          <input v-model="phone" placeholder="请输入电话号码" class="input-style" maxlength="11"
                 onkeyup="this.value=this.value.replace(/\D/g,'')"
                 onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
        </div>
        <div class="item-input-style">
          <div>*快递单号</div>
          <input v-model="trackingNumber" placeholder="请输入快递单号" class="input-style"
                 onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"/>
        </div>
      </div>
    </div>
    <div @click="submitApply" class="submit-btn-style">提交</div>
    <div class="pickWrap" v-show="pickShow">
      <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"
                          month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm"
                          @cancel="handleCancel"/>
    </div>
  </div>
</template>
<script>
  import GoBack from '../index/ApplyCardGoBack.vue'
  import {DatetimePicker} from 'mint-ui'

  let vm = null
  export default {
    components: {GoBack, DatetimePicker},
    props: [],
    data () {
      return {
        title: '申请提卡',
        // startDate: new Date(),
        pickShow: true,
        bankName: sessionStorage.getItem('bankname') || '',
        bankId: sessionStorage.getItem('bankId') || '',
        pickerValue: sessionStorage.getItem('pickerValue') || '',
        trackingNumber: sessionStorage.getItem('trackingNumber') || '',
        userName: sessionStorage.getItem('username') || '',
        phone: sessionStorage.getItem('phone') || '',
      }
    },
    created () {
      vm = this
    },
    watch: {
      userName: function (curVal, oldVal) {
        sessionStorage.setItem('username', curVal)
      },
      phone: function (curVal, oldVal) {
        sessionStorage.setItem('phone', curVal)
      },
      trackingNumber: function (curVal, oldVal) {
        sessionStorage.setItem('trackingNumber', curVal)
      },
      pickerValue: function (curVal, oldVal) {
        sessionStorage.setItem('pickerValue', curVal)
      },
    },
    methods: {
      openPicker () {
        this.pickShow = true
        vm.$refs.picker.open()
      },
      showBankCardList () {
        this.$router.push({path: '/mine/applyCard/mineBankCardList'})
      },
      submitApply () {
        if (!this.valideInput()) {
          return
        }
        let params = {
          userName: this.userName,
          applyDate: this.pickerValue,
          bankId: this.bankId,
          bankName: this.bankName||'',
          trackingNumber: this.trackingNumber,
          phone: this.phone
        }
        console.log(params)
        this.$http
          .applyCreditCard(params)
          .then(res => {
            if (res) {
              console.log(res)
              this.$toast('提交成功')
              this.removeData()
              this.$router.push({path: '/mine'})
            }
          })
          .catch(err => {
          })
      },
      valideInput () {
        if (!this.bankId) {
          this.$toast('银行不能为空')
          return false
        }
        if (!this.userName) {
          this.$toast('姓名不能为空')
          return false
        }
        if (!this.pickerValue) {
          this.$toast('日期不能为空')
          return false
        }
        if (!this.phone || this.phone.length < 11) {
          this.$toast('请输入有效手机号码')
          return false
        }
        console.log(this.trackingNumber)
        if (!this.trackingNumber) {
          this.$toast('单号不能为空')
          return false
        } else {
          let str = this.trackingNumber.trim()
          let reg = /^\w+$/
          let r = str.match(reg)
          if (r == null) {
            this.$toast('单号不能包含中文')
            return false
          }
        }
        return true
      },
      handleConfirm (value) {
        this.pickShow = false
        var d = new Date(value)
        this.pickerValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      },
      handleCancel () {
        this.pickShow = false
      },
      remove () {
        if (document.activeElement.tagName === 'INPUT') {
          document.activeElement.scrollIntoView({behavior: 'smooth'})
        }
      },
      removeData () {
        sessionStorage.setItem('username', '')
        sessionStorage.setItem('phone', '')
        sessionStorage.setItem('trackingNumber', '')
        sessionStorage.setItem('pickerValue', '')
        sessionStorage.setItem('bankname', '')
        sessionStorage.setItem('bankId', '')
      }
    }
  }
</script>
<style lang="postcss" scoped>
  .apply-card-container {
    background: #fbfbfb;
    height: 100%;

  &
  .item-container {
    background: white;
    display: flex;
    padding-bottom: 36px;
    flex-direction: column;

  &
  .item-input-style {
    margin-top: 24px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

  &
  .input-style {
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    width: 240px;
    height: 36px;
    border: 1px solid #d6d7de;
    text-align: center;
  }

  }

  &
  .item-style {
    align-items: center;
    margin-top: 24px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;

  &
  .bank-input-style {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    width: 240px;
    height: 36px;
    border: 1px solid #d6d7de;
  }

  }
  }
  &
  .submit-btn-style {
    position: fixed;
    bottom: 0;
    background: #4477dd;
    font-size: 16px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    margin: auto;
  }

  }

</style>
