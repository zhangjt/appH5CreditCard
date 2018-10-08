<template>

  <div class="wallet-container" >

    <div class="header-container">
      <go-back title="我的钱包" url="/mine"></go-back>

      <span>余额(元)</span>
      <span class="money">{{balance}}</span>
      <div class="center">
        <div class="btn" @click="goWithDraw">申请提现</div>
      </div>

      <div class="wallet-divider"></div>

      <wallet-tabs :activeIndex="activeIndex" :tabs="tabs" @tabSelected="tabSelected"></wallet-tabs>
    </div>
    <wallet-income-tab v-if="activeIndex == 0"></wallet-income-tab>
    <wallet-expend-list v-if="activeIndex == 1"></wallet-expend-list>
  </div>
</template>

<script>
import Vue from "vue";
import WalletTabs from "@/components/wallet/WalletTabs";
import WalletExpendList from "@/components/wallet/WalletExpendList";
import WalletIncomeTab from "@/components/wallet/WalletIncomeTab";
import GoBack from "@/pages/index/GoBack";
export default {
  props: {},
  data() {
    return {
      title: "我的钱包",
      balance: 0,
      isBind: false,
      activeIndex: 0,
      tabs: ["收入", "支出"]
    };
  },
  methods: {
    tabSelected(ind) {
      this.activeIndex = ind;
    },
    goWithDraw: function() {
      if (this.isBind == 1) {
        //申请提现
        this.$router.push({ name: "申请提现" });
      } else {
        //绑卡
        this.$router.push({ name: "addCard" });
      }
    }
  },
  components: { WalletTabs, WalletExpendList, WalletIncomeTab, GoBack },
  created() {
    this.balance = sessionStorage.getItem("balance");
    this.isBind = sessionStorage.getItem("isBind");
  },
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.wallet-container {
  

  & .header-container{
    background: #ffffff;
    width: 100%;
    position: fixed;
    z-index: 1200;
    display: flex;
  flex-direction: column;


    & > span {
    font-size: 12px;
    color: #878da0;
    text-align: center;
    margin-top: 20px;
  }
  & .money {
    font-size: 36px;
    color: #334354;
    margin-top: 10px;
  }

  & .center {
    display: flex;
    justify-content: center;
    & .btn {
      width: 270px;
      height: 40px;
      color: #4477dd;
      border: 1px solid #4477dd;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      border-radius: 5px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }

  & .wallet-divider {
    background: #fbfbfb;
    height: 12px;
    width: 100%;
  }
  }

  
}
</style>