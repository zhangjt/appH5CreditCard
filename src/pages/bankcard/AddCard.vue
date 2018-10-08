<template>
    <div class="add-card-container">
       <go-back title="添加银行卡"></go-back>
        <span>财喵万卡提现金额将发放到绑定的银行卡内，请先绑定银行卡</span>
        <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
        <mt-field label="身份证号" placeholder="请输入身份证号" v-model="id" :attr="{ maxlength: 18 }"></mt-field>
        <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model="card" :attr="{ maxlength: 19 }"></mt-field>
        <mt-field label="银行" placeholder="根据卡号自动识别支持银行" v-model="bank" :readonly="true"></mt-field>
        <div @click = "reMove">
        <mt-field label="预留手机号" placeholder="请输入银行预留手机号" v-model="phone" :attr="{ maxlength: 11 }"></mt-field>
        </div>
        <div class="confirm-btn" @click="actionAdd">确定</div>
    </div>
</template>

<script>
import { Field } from "mint-ui";
import Vue from "vue";
Vue.component(Field.name, Field);
import _ from "lodash";
import { Button } from "mint-ui";
import GoBack from "@/pages/index/GoBack";
export default {
  components: { GoBack },
  props: {},
  data() {
    return {
      name: "",
      id: "",
      card: "",
      bank: "",
      phone: "",
      bankInfo: {
        id: 0,
        bankName: "",
        bankCode: "",
        bankIcon: "",
        pinYin: "",
        initials: ""
      }
    };
  },
  watch: {
    card: _.throttle(function() {
      if (this.card && this.card.length > 6) {
        var params = {
          cardNo: this.card
        };
        this.$http
          .queryBankName(params)
          .then(res => {
            if (res && res.bankInfo) {
              this.bankInfo = res.bankInfo;
              if (this.bankInfo.bankName) {
                this.bank = this.bankInfo.bankName;
              }
            }
          })
          .catch(err => {});
      }
    }, 2500)
  },
  computed: {},
  methods: {
    actionAdd() {
      if (!this.valideInput()) {
        return;
      }
      var params = {
        userName: this.name,
        idNumber: this.id,
        account: this.card,
        bankName: this.bank,
        gateId: this.bankInfo.bankCode,
        phone: this.phone
      };
      this.$http
        .bindBankCard(params)
        .then(res => {
          if (res && res.cardInfo) {
            this.$toast("绑定成功");
            sessionStorage.setItem("isBind", 1);
            this.$router.go(-1);
          } else {
            if (res.statusMsg) {
              this.$toast(res.statusMsg);
            }
          }
        })
        .catch(err => {
        });
    },
    valideInput() {
      if (!this.name) {
        this.$toast("姓名不能为空");
        return false;
      }
      if (!this.id) {
        this.$toast("身份证号不能为空");
        return false;
      }
      if (this.id.length < 18) {
        this.$toast("请输入有效身份证");
        return false;
      }
      if (!this.card) {
        this.$toast("卡号不能为空");
        return false;
      }
      if (!this.bank || !this.bankInfo.bankCode) {
        this.$toast("银行不能为空");
        return false;
      }
      if (!this.phone || this.length < 11) {
        this.$toast("请输入有效手机号码");
        return false;
      }
      return true;
    },
    queryBank() {
      var params = {
        cardNo: this.card
      };
      this.$http
        .queryBankName(params)
        .then(res => {
          if (res) {
          }
        })
        .catch(err => {
        });
    },
    reMove() {
      if (document.activeElement.tagName === "INPUT") {
        document.activeElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.add-card-container {
  background: #f6f7f8;
  height: 677px;
  & > :nth-child(2) {
    height: 46px;
    background: #fbfbfb;
    line-height: 46px;
    font-size: 12px;
    color: #878da0;
    margin-left: 10px;
  }

  & > :nth-child(5) {
    border-top: 10px solid #fbfbfb !important;
  }

  & .mint-cell {
    height: 60px;
    color: #1c2042;
    padding-left: 10px;
    border: none;
  }

  & .mint-cell:last-child {
    background-image: none;
  }

  & .confirm-btn {
    background: #4477dd;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    color: #ffffff;
    border-radius: 5px;
    margin: 20px;
  }
}
</style>