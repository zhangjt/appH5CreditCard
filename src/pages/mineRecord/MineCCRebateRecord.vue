<!--  -->
<template>
  <div class="credit-card-container">

    <div v-show="myCreditCardList.length>0">
      <div class="credit-card-title">
        <span class="date-tip">截止{{dueDate}}</span>
        <span class="reward-tip-up">{{totalRebateMoney|moneyFormal2}}</span>
        <span class="reward-tip-dowm">总奖励(元)</span>
      </div>

      <div class="credit-card-rebate-tip">
        <img src="/static/images/point_out.png" />
        <span>
          返利记录将在每周到账后更新数据<br/>返利金额发放至您的钱包余额，请在钱包余额里面申请提现
        </span>
      </div>
      <!-- -->
      <div :style="{'top':isWanka?'48px':'89px'}" :class="['credit-card-rebate-title', isAdd ?  'nav-fixed'  : '' ]">
        <div class="credit-tip-container">
          <span>
            信用卡返利
          </span>
          <img src="/static/images/group.png" :style="{'top':isWanka?'39px':'40px'}" />
        </div>
      </div>

      <mine-c-c-rebate-record-list-item v-for="(myCreditCard,index) in myCreditCardList" :key="index" :myCreditCardItem="myCreditCard">

      </mine-c-c-rebate-record-list-item>

      <div class="lore-more-class" v-on:click="loreMore" v-if="!finishLoadMore">
        加载更多
        <img src="../../assets/images/personal_down.png" />
      </div>
      <div class="no-more-class" v-if="finishLoadMore">
        <!-- <div class="no-more-class" > -->
        <img class="left-img" src="../../assets/images/left_img.png" /> 已经到底啦～
        <img class="right-img" src="../../assets/images/right_img.png" />
      </div>
    </div>

    <none-view v-show="myCreditCardList.length<=0" v-on:apply="apply"></none-view>
  </div>
</template>

<script>
import MineCCRebateRecordListItem from "@/components/mineRecord/MineCCRebateRecordListItem.vue";
import NoneView from "@/components/NoneView";
let vm = null;
export default {
  data() {
    return {
      totalRebateMoney: "--/--",
      dueDate: "--/--",
      myCreditCardList: [],
      page: 0,
      finishLoadMore: false,
      isWanka: false,
      h2: 0,
      isAdd: false
    };
  },
  created() {
    vm = this;
  },

  activated() {
    let elem = window.document.documentElement;
    let w = elem.clientWidth;
    this.h2 = w * (200 / 412); //使用sticky定位的顶端是一个16比9的div

    window.getCCRebateRecordCallBack = this.getCCRebateRecordCallBack;
    this.isWanka = this.$wanka.isWanka() ? true : false;
    this.page = 1;
    this.finishLoadMore = false;
    this.myCreditCardList = [];
    this.loadData();
  },

  mounted() {
    // this.fixBottomBar();
    !this.isSupportSticky() && this.fixBottomBar();
  },
  components: {
    MineCCRebateRecordListItem,
    NoneView
  },

  computed: {},

  methods: {
    fixBottomBar() {
      var topbarTop = this.h2;
      window.onscroll = function(e) {
        let winTop = document.body.scrollTop;
        vm.isAdd = winTop > topbarTop;
      };
    },

    isSupportSticky() {
      //判断是否支持sticky
      var prefixTestList = ["", "-webkit-"];
      var stickyText = "";
      for (var i = 0; i < prefixTestList.length; i++) {
        stickyText += "position:" + prefixTestList[i] + "sticky;";
      }
      // 创建一个dom来检查
      var div = document.createElement("div");
      div.style.cssText = stickyText;
      document.body.appendChild(div);
      var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
      document.body.removeChild(div);
      div = null;
      return isSupport;
    },

    apply() {
      if (this.$wanka.isWanka()) {
        this.$toPage.toPage("/rebate", {}, true);
      } else {
        this.$router.push({ path: "/" });
      }
    },

    loreMore() {
      this.page += 1;
      this.loadData();
    },

    loadData() {
      let params = {
        page: this.page,
        limit: 30
      };
      this.$http.loadData(
        "/creditCardRecord/rebateRecord",
        params,
        "getCCRebateRecordCallBack"
      );
    },

    getCCRebateRecordCallBack(res) {
      if (res) {
        if (res.responseData) {
          res = res.responseData;
        }
        var page = res.page;
        this.totalRebateMoney = res.total;
        this.dueDate = res.system_time.substring(0, 10);
        this.myCreditCardList = this.myCreditCardList.concat(page.list);
        if (this.myCreditCardList.length == page.totalNum) {
          this.finishLoadMore = true;
        }
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.credit-card-container {
  background: #f6f7f8;
  height: 550px;
  border-top: 10px solid #f6f7f8;

  & .credit-card-title {
    height: 135px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    & .reward-tip-up {
      font-size: 36px;
      color: #1c2042;
      text-align: center;
      margin-top: 40px;
    }

    & .reward-tip-dowm {
      font-size: 12px;
      color: #878da0;
      text-align: center;
    }

    & .date-tip {
      position: absolute;
      top: 18px;
      right: 15px;
      font-size: 10px;
      color: #878da0;
    }
  }

  & .credit-card-rebate-tip {
    position: relative;
    height: 46px;
    & img {
      position: absolute;
      width: 20px;
      height: 20px;
      left: 28px;
      top: 14px;
    }

    & span {
      font-size: 10px;
      color: #878da0;
      position: absolute;
      left: 56px;
      top: 13px;
    }
  }

  & .credit-card-rebate-title {
    height: 50px;
    background: #ffffff;
    /*控制中间按钮悬停顶部*/
    overflow-x: hidden;
    position: -webkit-sticky;
    position: sticky;
    top: 89px;
    z-index: 1000;

    & .credit-tip-container {
      display: flex;
      flex-direction: column;
      width: 375px !important;
      & span {
        display: block;
        height: 40px;
        background: #649afe;
        color: #ffffff;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
      }

      & img {
        height: 10px;
        width: 14px;
        margin-left: 50%;
        margin-right: 50%;
      }
    }
  }

  & .lore-more-class {
    background: #fbfbfb;
    height: 50px;
    display: flex;
    justify-content: center;
    font-size: 15px;
    color: #878da0;
    line-height: 50px;
    align-items: center;
    & img {
      width: 10px;
      height: 5px;
      margin-left: 5px;
    }
  }

  & .no-more-class {
    background: #f6f7f8;
    height: 33px;
    font-size: 12px;
    color: #878da0;
    line-height: 33px;
    display: flex;
    justify-content: center;
    padding-top: 15px;
    align-items: center;

    & .left-img {
      width: 60px;
      height: 8px;
      margin-right: 5px;
    }

    & .right-img {
      width: 60px;
      height: 8px;
      margin-left: 5px;
    }
  }
}

.nav-fixed {
  position: fixed;
  z-index: 1200;
  top: 52px;
}
</style>