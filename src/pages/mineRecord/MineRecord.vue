<!--  -->
<template>

  <div class="mine-record-container" v-title="title">
    <mt-header v-if="!isWanka" :title="title" class="boder-header">
      <mt-button icon="back" slot="left" @click="reback"></mt-button>
      <mt-button slot="right" @click="goRegisterRecord">登记记录</mt-button>
    </mt-header>

    <mt-navbar v-model="selected" class="navbar-class" :style="{'top':isWanka?'0px':'42px'}">
      <mt-tab-item class="item-class" id="1" @click.native="sleectedTab">我的返利</mt-tab-item>
      <mt-tab-item class="item-class2" id="2" @click.native="sleectedTab">进度查询</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="container-class" :style="{'top':isWanka?'50px':'92px'}">
      <mt-tab-container-item id="1">
        <mine-c-c-rebate-record></mine-c-c-rebate-record>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <credit-card-progress-query></credit-card-progress-query>
      </mt-tab-container-item>

    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import Vue from "vue";
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import MineCCRebateRecord from "@/pages/mineRecord/MineCCRebateRecord";
import CreditCardProgressQuery from "@/components/index/CreditCardProgressQuery";

export default {
  data() {
    return {
      selected: "1",
      isWanka: false,
      title: "我的返利"
    };
  },
  created() {},

  activated() {
    if (this.$route.query.index) {
      this.selected = this.$route.query.index;
    }
    if (this.$route.query.title) {
      this.title = this.$route.query.title;
    }
    this.isWanka = this.$wanka.isWanka() ? true : false;
  },
  components: {
    MineCCRebateRecord,
    CreditCardProgressQuery
  },

  computed: {},

  methods: {
    sleectedTab() {
      window.scrollTo(0, 0);
    },
    reback() {
      this.$router.push("/mine");
    },

    goRegisterRecord() {
      this.$router.push("/mine/mineRecord/ccRegisterRecord");
    }
  }
};
</script>
<style >
.mine-record-container {
  & .boder-header {
    /*控制标题悬停*/
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 1000;
  }

  & .navbar-class {
    /*控制切换按钮下划线悬停*/
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 1000;
    top: 44px;
  }

  & .mint-navbar .mint-tab-item.is-selected {
    color: #649afe;
    border-bottom: 3px solid #649afe;
  }

  & .mint-navbar .mint-tab-item {
    color: #1c1b3f;
  }

  & .item-class {
    width: 93px;
    flex: none;
    margin-left: 48px;
  }

  & .item-class2 {
    width: 93px;
    flex: none;
    margin-left: 100px;
  }

  & .mint-tab-item-label {
    font-size: 16px;
  }

  & .container-class {
    /*控制内容可见区域*/
    position: relative;
    overflow: visible;
    top: 94px;
  }
}
</style>