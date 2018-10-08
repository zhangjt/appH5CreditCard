<template>
  <div class="income-tab-container">
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">全部</mt-tab-item>
      <mt-tab-item id="1">信用卡</mt-tab-item>
      <mt-tab-item id="2">平台活动</mt-tab-item>
    </mt-navbar>

    <wallet-incom-list :incomeType="0" v-show="firstShow"></wallet-incom-list>
    <wallet-incom-list :incomeType="1002" v-show="secondShow"></wallet-incom-list>
    <wallet-incom-list :incomeType="1000" v-show="thridShow"></wallet-incom-list>
  </div>

  <!-- <mt-tab-container v-model="selected">
                <wallet-incom-list :incomeType ="0" ></wallet-incom-list>
            <mt-tab-container-item id="0">
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <wallet-incom-list :incomeType ="1002" ></wallet-incom-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <wallet-incom-list :incomeType ="1000" ></wallet-incom-list>
            </mt-tab-container-item>
        </mt-tab-container> -->

</template>

<script>
import Vue from "vue";
import { Navbar, TabItem } from "mint-ui";
import WalletIncomList from "@/components/wallet/WalletIncomList";
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import { TabContainer, TabContainerItem } from "mint-ui";
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
export default {
  components: { WalletIncomList },
  props: {},
  data() {
    return {
      selected: "0",
      firstShow: true,
      secondShow: false,
      thridShow: false
    };
  },
  watch: {
    selected: function() {
      window.scrollTo(0, 0);
      this.firstShow = this.selected == "0";
      this.secondShow = this.selected == "1";
      this.thridShow = this.selected == "2";
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.income-tab-container {
  & .mint-navbar {
    width: 100%;
    position: fixed;
    z-index: 1200;
    top: 290px;
    background: #ffffff;
    border-bottom: 8px solid #ebebeb;
    & .mint-tab-item.is-selected {
      border-bottom: 4px solid #ff683f;
      color: #1c2042;
    }

    & .mint-tab-item {
      color: #828282;
      padding: 0px 0px 8px 0px;
      margin-left: 30px;
      margin-right: 30px;
      & > :nth-child(2) {
        font-weight: 500 !important;
        font-size: 14px !important;
      }
    }
  }
}
</style>