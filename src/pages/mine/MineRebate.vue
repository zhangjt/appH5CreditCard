<template>

  <div class="main-view">
    <mt-header fixed :title="title" class="boder-header">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/mine/mineRebateRecord" slot="right">
        <mt-button>登记记录</mt-button>
      </router-link>
    </mt-header>
  <div class="rebate-container">
    <div class="banner">
      <div class="top">
        <div class="sumRewardFee">
          <label>{{sumFee | moneyFormal}}</label>
          <div class="sumRewardFeeDescription">累计返利(元)</div>
        </div>
        <div class="lastDate">{{lastDate}}</div>
      </div>

      <div class="descriptionView">
      <div  class="pointout" ><img class="image" src="/static/images/pointout@2x.png"></div>
      <pre  class="description" v-html="rebatePageDesc"></pre>
      </div>

    </div>

    <!--<span class="money">{{balance}}</span>-->
    <div class="center">
      <div class="span1"><label class="label">金额(元）</label></div>
      <div class="span2"><label class="label">会员权益返利(元)</label></div>
      <div class="span3"><label class="label">加入日期和类型</label></div>
    </div>
    <div class="space-line"></div>

    <div class="rebate-record-divider"></div>

    <div  ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="buzy"  infinite-scroll-distance="10">
      <div v-if="hasRecord" v-for="(item, index) in list" :key="index">
        <div class="item">
          <div class="span1"><label class="label">{{item.rebateMoney | moneyFormal}}</label></div>
          <div class="span2"><label class="label">{{item.memberInterest | moneyFormal}}</label></div>
          <div class="span3"><label >{{item.investDate}}/加入{{item.platName}}{{item.cycle}}标{{item.investMoney/100}}元</label>
          </div>
        </div>
        <div class="space-line"></div>
      </div>
      <p v-show="isLoading" class="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <empty v-if="!hasRecord"></empty>

  </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { InfiniteScroll } from "mint-ui";
  Vue.use(InfiniteScroll);
  import { Spinner } from "mint-ui";
  Vue.component(Spinner.name, Spinner);
  import Empty from "@/components/Empty";

export default {
  components: {
    Empty
  },
  props: {},
  data() {
    return {
      buzy: false,
      isLoading: false,
      title: "返利记录",
      sumFee: 0,
      lastDate: "截至2018-04-02",
      rebatePageDesc: "",
      list: [],
      curentPage: 1,
      limit:10,
      allLoaded: false,
      bottomDis: 50,
      wrapperHeight: 0
    };
  },
  watch: {},
  computed: {
    hasRecord: function() {
      return this.list && this.list.length > 0;
    }
  },
  methods: {
    getList: function() {
      this.isLoading = true;
      var params = {
        page: this.curentPage,
        limit: this.limit
      };
      this.$http.getUserRebate(params).then(res => {
        this.isLoading = false;
        if (res) {
          this.sumFee = res.userSum.sumFee;
          this.rebatePageDesc = res.rebatePageDesc;
          this.lastDate = res.userSum.lastDate;
          if (res.list && res.list.length > 0) {
            if (this.curentPage == 1) {
              this.list = [];
            }
            this.curentPage = this.curentPage + 1;
            this.list = this.list.concat(res.list);
            if (res.list.length < this.limit) {
              this.buzy = true;
            }
          } else {
            this.buzy = true;
          }
        }
      });
    },
    loadMore: function() {
      this.getList();
    }

  },

  created() {
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>
<style lang="postcss" scoped>

  .main-view {
    background: #f6f7f8;
    min-height: 300px;
    overflow: hidden;
    height: 100%;
  }
.boder-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
}
.rebate-container {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin-top: 44px;
  & .space-line {
    height: 1px;
    width: 100%;
    background: #ececec;
  }
  & .banner {
    height: 113px;
    width: 375px;
    background: url("/static/images/rebate@2x.png");
    display: flex;
    flex-direction: column;
    & .top {
      position: relative;
      display: flex;
      flex-direction: row;
      & .sumRewardFee {
        font-size: 34px;
        color: #ffffff;
        widows: 100px;
        margin-top: 21px;
        margin-left: 18px;
        display: flex;
        flex-direction: column;
        & .sumRewardFeeDescription {
          font-size: 12px;
          color: #ffffff;
        }
      }
      & .lastDate {
        position: absolute;
        font-size: 10px;
        color: #fafdff;
        top: 18px;
        right: 25px;
        /*margin-top: 18px;*/
        /*margin-left: 180px;*/
      }
    }
    & .descriptionView {
      margin-top: 2px;
      margin-left: 0px;
      // opacity: 0.15;
      // background: #003f8d;
      background: rgba(0, 63, 141, 0.15);
      width: 100%;
      height: 34px;
      display: flex;
      flex-direction: row;

      & .pointout {
        margin-left: 16px;
        height: 34px;
        display: flex;
        align-items: center;
        & .image {
          width: 20px;
          height: 20px;
        }
      }
      & .description {
        display: flex;
        align-items: center;
        height: 34px;
        color: #daebff;
        margin-left: 8px;
        font-size: 10px;
        font-family: PingFangSC-Regular;
      }
    }
  }

  & .list {
    margin-top: -1px;
    overflow: scroll;
  }


  & .loading {
      text-align: center;
      height: 50px;
      line-height: 50px;
      justify-content:center;
      align-items:center;
      display: flex;

  & > span{
      margin-left: 8px;
    }
  }

  & .center {
    background: #fbfbfb;
    font-size: 12px;
    color: #878da0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 39px;

    & .span1 {
      margin-left: 20px;
      width: 78px;
      font-size: 12px;
    }

    & .span2 {
      width: 125px;
      font-size: 12px;
    }

    & .span3 {
      width: 132px;
      font-size: 12px;
    }
  }

  & .item {
    background: #fbfbfb;
    font-size: 14px;
    color: #1c1b3f;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    // line-height: 60px;
    & .label {
      // line-height: 60px;
    }
    & .span1 {
      font-size: 14px;
      margin-left: 20px;
      width: 78px;
    }

    & .span2 {
      font-size: 14px;
      width: 125px;
    }

    & .span3 {
      width: 132px;
      font-size: 12px;

      & .label3 {
        // background: red;
        // height: 60px;
        // // width: 132px;
        // display: block;
        // margin: 18px 0;
        /*margin-top: 50px;*/
      }
    }
  }
}
</style>
