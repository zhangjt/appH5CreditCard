<!--  -->
<template>
  <div class="my-credit-card-record-container" v-title="title">
    <go-back v-if="!isWanka" class="title-class" title="登记记录" ></go-back>
    <div v-show="creditCardRecordList.length>0" >
      <div class="my-credit-card-record-title" :style="{'top':isWanka?'0px':'44px'}">
        <span class="data-tip-style">登记日期</span>
        <span class="bank-tip-style">银行/信用卡名称</span>
        <span class="check-in-tip-style">登记账号</span>
      </div>

      <div class="content-style" :style="{'top':isWanka?'42px':'86px'}" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">

        <my-credit-card-record-list-item v-for="(myCreditCard,index) in creditCardRecordList" :key="index" :recordItem="myCreditCard"></my-credit-card-record-list-item>
        <div v-show="isLoadMore" class="weui-loadmore">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">正在加载</span>
        </div>
      </div>
    </div>


    <empty class="none-class" v-show="afterLoad && creditCardRecordList.length<=0"></empty>
  </div>
</template>

<script>
import MyCreditCardRecordListItem from "@/components/mineRecord/MyCreditCardRecordListItem.vue";
import Empty from "@/components/Empty.vue";
import GoBack from "@/pages/index/GoBack";
import wanka from "@/modules/wanka.js";

export default {
  data() {
    return {
      creditCardRecordList: [],
      busy: false,
      page: 0,
      isLoadMore: false,
      noData: false,
      afterLoad: false,
      isWanka: false,
      title: "登记记录"
    };
  },
  created() {
    window.getCCRegisterRecordCallBack = this.getCCRegisterRecordCallBack;
    this.isWanka = this.$wanka.isWanka() ? true : false;
  },
  components: {
    MyCreditCardRecordListItem,
    Empty,
    GoBack
  },

  computed: {},

  methods: {
    showToast: function(content) {
      this.toastContent = content;
      this.toastShow = true;
    },
    loadMore: function() {
      this.page++;
      this.busy = true;
      this.isLoadMore = true;
      this.loadData();
    },

    loadData() {
      let params = { type: 23, page: this.page, limit: 30 };

      this.$http.loadData(
        "/app/addreg/record",
        params,
        "getCCRegisterRecordCallBack"
      );
    },

    getCCRegisterRecordCallBack(res) {
      this.afterLoad = true;
      if (res) {
        if (res.responseData) {
          res = res.responseData;
        }
        if (res.count == 0) {
          this.busy = true;
          this.isLoadMore = false;
          return;
        }

        this.creditCardRecordList = this.creditCardRecordList.concat(res.list);
        if (this.creditCardRecordList.length < res.count) {
          this.busy = false;
        }
        this.isLoadMore = false;
      } else {
        this.busy = true;
        this.isLoadMore = false;
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-credit-card-record-container {
  background: #f6f7f8;
  & .title-class {
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 1000;
    border-bottom: 10px solid #f6f7f8;
  }

  & .my-credit-card-record-title {
    background-color: #fbfbfb;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 25px;
    padding-right: 25px;
    height: 42px;
    display: flex;
    font-size: 12px;
    color: #878da0;
    line-height: 42px;

    width: 100%;
    position: fixed;
    z-index: 1;
    top: 44px;

    & .data-tip-style {
      width: 33%;
      text-align: left;
    }

    & .bank-tip-style {
      width: 33%;
      text-align: center;
    }

    & .check-in-tip-style {
      width: 33%;
      text-align: right;
    }
  }

  & .content-style {
    position: absolute;
    top: 86px;
    right: 0px;
    left: 0px;
  }

  & .none-class {
    position: absolute;
    top: 44px;
    right: 0px;
    left: 0px;
  }
}
</style>