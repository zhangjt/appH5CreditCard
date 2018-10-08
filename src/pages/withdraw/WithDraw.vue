<template>
  <div class="overflow">
    
     <mt-header fixed :title="title" class="boder-header">
        <router-link to="/mine/mineWallet" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <router-link to="/mine/withDraw/withDrawRecord" slot="right">
          <mt-button>提现记录</mt-button>
        </router-link>
      </mt-header>

    <div class="draw-container">
        <div class="bank">
          <span>到账银行</span>
          <span>{{getBankDesc()}}</span>
        </div>
        
        <div class="all">
          <span>提现金额</span>
          <span @click="drawAll">全部提现</span>
        </div>
        <div class="input-area">
            <span>¥</span><input  v-model.trim = "drawAmount" ref="mInput" autofocus = "autofocus" type="integer" name="points" min="10" :placeholder="minFee"/>
        </div>
        
        <div class="draw-top">
            <span class="tip">我的钱包余额(元):</span>
            <span class="money">{{balance}}</span>
                
        </div>

        <div class="charge">
          <span>手续费</span>
          <span>{{chargeResult}}</span>
        </div>
        <div class="charge">
          <span>实际到账金额</span>
          <span>{{realFeeResult}}</span>
        </div>

        <div @click="doWithDraw" class="btn">
            申请提现
        </div>
        <div class="ck-area">
            <div class="input-ck">
                <input v-model="aggreed" id="agreeCk" type="checkbox" /> <label :class="{'label-highlighted':aggreed}" for="agreeCk"><span>我已经阅读并同意以下条款</span></label>
            </div>
            
            <div class="text-dis">
                1.提现金额<a>{{tip}}</a>
            </div>
            <div class="text-dis">
                2.申请提现后，系统会在每周二，周五审核发放，请留意银行消息通知。
            </div>
            <div class="text-dis">
              3.如有疑问，加入<a  target="_blank" :href="qqHref">qq群</a>并向群主反馈。
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapActions, mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  components: {},
  props: {},
  data() {
    return {
      title: "申请提现",
      balance: 0,
      drawAmount: "",
      aggreed: false,
      tip:'',
      realFee: -1,
      charge: -1,
      chargeResult: 0,
      realFeeResult: 0,
      min: 0,
      qqHref:
        "//shang.qq.com/wpa/qunwpa?idkey=c1e9f25d874732e641357e1c9a8bb311133cb92d9793b2da86ad1030b4dc2fc2"
    };
  },
  watch: {
    drawAmount: function() {
      if(!/^[0-9]*[1-9][0-9]*$/.test(this.drawAmount)){
        if(this.drawAmount ||this.drawAmount == 0){
          this.drawAmount = this.drawAmount.substring(0, this.drawAmount.length - 1);
        }
        if(!this.drawAmount || this.drawAmount == 0){
           this.charge = 0;
           this.realFee = 0;
        }
        return;
      }
      var amount = parseFloat(this.drawAmount);
      if (amount > this.balance) {
        this.drawAmount = this.drawAmount.substring(
          0,
          this.drawAmount.length - 1
        );
        Toast("提现金额超过最大可提现金额");
      } else if (amount >= this.min) {
        this.getCharge();
      } else {
        this.charge = 0;
        this.realFee = 0;
      }
    },
    charge: function() {
      this.chargeResult = this.charge.toFixed(2);
    },
    realFee: function() {
      this.realFeeResult = this.realFee.toFixed(2);
    },
    aggreed: function() {
      if (this.aggreed) {
        localStorage.setItem("agreed", "true");
      }
    }
  },
  computed: {
    ...mapState({
      cardInfo: state => state.accountInfo.cardInfo
    }),
    minFee: function() {
      return "最低可提现金额" + this.min + "元";
    }
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    drawAll() {
      var doubleBalance = parseFloat(this.balance)
      if(doubleBalance){
        this.drawAmount = Math.floor(doubleBalance);
      }
    },
    doWithDraw: function() {
      var amount = parseFloat(this.drawAmount);
      if (amount > this.balance) {
        this.drawAmount = this.drawAmount.substring(
          0,
          this.drawAmount.length - 1
        );
        Toast("提现金额超过最大可提现金额");
      } else if (amount < this.min) {
        Toast("提现金额必须大于" + this.min + "元");
      } else {
        if (this.aggreed) {
          if (this.drawAmount) {
            this.withdrawRequest();
          } else {
            Toast("请输入提现金额");
          }
        } else {
          Toast("请先阅读并同意条款");
        }
      }
    },
    withdrawRequest: function() {
      var params = {
        fee: this.drawAmount
      };
      this.$http.doWithDraw(params).then(res => {
        if (res) {
          if (res.statusMsg) {
            Toast(res.statusMsg);
          }
          this.balance = this.balance - parseFloat(this.drawAmount);
          sessionStorage.setItem("balance", this.balance);
        }
      });
    },
    getCharge: _.throttle(function() {
      var params = {
        amount: this.drawAmount
      };
      this.$http.getCharge(params).then(res => {
        if (res) {
          if (res.fee || res.fee == 0) {
            this.charge = res.fee;
          }
          if (res.accountAmount) {
            this.realFee = res.accountAmount;
          }
        }
      });
    }, 2000),
    getBankDesc() {
      if (
        this.cardInfo &&
        this.cardInfo.cardInfo &&
        this.cardInfo.cardInfo.account &&
        this.cardInfo.cardInfo.account.length > 4
      ) {
        var last = this.cardInfo.cardInfo.account.substr(-4);
        return this.cardInfo.cardInfo.bankName + "(" + last + ")";
      }
    }
  },
  created() {
    this.charge = 0;
    this.realFee = 0;
    this.getUserInfo();
    this.balance = sessionStorage.getItem("balance");
    this.min = sessionStorage.getItem("minfee") || 0;
    if (localStorage.getItem("agreed")) {
      this.aggreed = true;
    }
    this.$http.getFee().then(res => {
        if (res && res.keys) {
          if(res.keys[0]){
            this.tip = res.keys[0];
          }
        }
      });
  },
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.draw-container {
  margin-top: 44px;
  padding-bottom: 20px;
  & .charge {
    display: flex;
    font-size: 14px;
    color: #1c2042;
    justify-content: space-between;
    height: 55px;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    & > span {
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  & .bank {
    display: flex;
    font-size: 12px;
    color: #878da0;
    justify-content: space-between;
    border-bottom: 8px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    height: 40px;
    align-items: center;
    & > span {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
  color: #878da0;

  & .all {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #878da0;
    & > span {
      padding-right: 20px;
      padding-left: 20px;
    }

    & :nth-child(2) {
      color: #ff683f;
    }
  }

  & .ck-area {
    margin-top: 24px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 12px;
  }

  & .btn {
    height: 44px;
    color: white;
    font-size: 16px;
    background: #4477dd;
    border-radius: 5px;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    line-height: 44px;
  }

  & .draw-top {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 40px;
    background: #fbfbfb;
    border-bottom: 8px solid #f2f2f2;
    color: #878da0;
    & > span {
      text-align: center;
    }

    & .tip {
      font-size: 12px;
      height: 40px;
      line-height: 40px;
    }

    & .money {
      font-size: 12px;
      margin-left: 8px;
      height: 40px;
      line-height: 40px;
    }
  }

  & .divider {
    width: 100%;
    height: 12px;
    background: #fbfbfb;
  }

  & .input-area {
    display: flex;
    margin-top: 20px;
    margin-bottom: 25px;
    margin-left: 20px;
    margin-right: 20px;
    align-items: center;
    & > span {
      font-size: 36px;
      color: #1c1b3f;
    }

    & > input {
      font-size: 18px;
      line-height: normal;
      color: #1c1b3f;
      max-width: 300px;
      margin-left: 15px;
      margin-right: 20px;
      border: none;
      outline: none;
    }
  }
}
.text-dis {
  & > a {
    color: #4477dd;
  }
}
.input-ck {
  display: flex;
  align-items: center;

  margin-bottom: 2.5px;
  & > label {
    margin-left: 7.5px;
  }
}
.label-highlighted {
  color: #4477dd;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  font-size: 18px;
  color: #d1d1d1;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 18px;
  color: #d1d1d1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 18px;
  color: #d1d1d1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 18px;
  color: #d1d1d1;
  text-align: center;
}
</style>