<template>
  <div class="main-view">
    <mt-header fixed :title="title" class="boder-header">
      <router-link to="/mine/mineRebate" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="rebate-record-container">
      <div class="subjectView"><div class="subject">我的登记记录</div></div>
      <div class="description">奖励将在出借后8个工作日内（不包括周末和法定假日）发放。 有效出借获得的返利金额将以红包形式发放到用户绑定的微信账号上。 绑定微信：财喵万卡APP-【我的】-【设置】-【账号绑定】-微信绑定。</div>
      <div class="space-line"></div>
      <!--<span class="money">{{balance}}</span>-->
      <div class="center">
        <div class="span1">
          <label class="label">登记日期</label>
        </div>
        <div class="span2">
          <label class="label">平台</label>
        </div>
        <div class="span3">
          <label class="label">登记账号</label>
        </div>
        <div class="span4">
          <label class="label">奖励状态</label>
        </div>
      </div>
      <div class="space-line"></div>

      <div class="rebate-record-divider"></div>
      <div  ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="buzy"  infinite-scroll-distance="10">
        <div v-if="hasRecord" v-for="(item, index) in rebaseRecords" :key="index">
          <div class="center">
            <div class="span1">
              <label class="label">{{recalTime(item.addtime)}}</label>
            </div>
            <div class="span2">
              <label class="label">{{item.p2p_name}}</label>
            </div>
            <div class="span3">
              <label class="label">{{item.reg_account}}</label>
            </div>
            <div class="span4">
              <label class="label">{{status(item.rebate_status)}}</label>
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

      <div class="foot" v-show="this.rebaseRecords.length == 0"><label class="label">暂无登记号码</label></div>
      <!--<div class="foot"><img class="image" src="/static/images/more@2x.png"><label class="label">下拉查看更多</label></div>-->

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
      title: "登记记录",
      rebaseRecords: [],
      curentPage: 1,
      limit:20,
      allLoaded: false,
      bottomDis: 50,
      wrapperHeight: 0
    };
  },
  watch: {},
  computed: {
    hasRecord: function() {
      return this.rebaseRecords && this.rebaseRecords.length > 0;
    }
  },
  methods: {
    recalTime: function(str) {
      let newTime = str.slice(0, 10);
      newTime = newTime.replace(/\-/g, "/");
      return newTime;
    },
    status: function(status) {
      if (status == 0) {
        return "已登记";
      } else {
        return "未登记";
      }
    },
    getList: function() {
      this.isLoading = true;
      var params = {
        page: this.curentPage,
        limit: this.limit
      };
      this.$http.getUserRebateRecord(params).then(res => {
        this.isLoading = false;
        if (res && res.list) {
          if (res.list.length > 0) {
            if (this.curentPage == 1) {
              this.rebaseRecords = [];
            }
            this.curentPage = this.curentPage + 1;
            this.rebaseRecords = this.rebaseRecords.concat(res.list);
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
    },
    created() {
      // setTimeout(() => {
      //   window.scroll(0, 0);
      // }, 500);
    }
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

.rebate-record-container {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 44px;


  & .space-line {
    height: 1px;
    width: 100%;
    background: #ececec;
  }

  & .subjectView {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    & .subject {
      font-size: 14px;
      color: #1c1b3f;
      height: 20px;
      width: 100%;
      margin-left: 21px;
    }
  }

  & .description {
    display: flex;
    align-items: center;
    height: 80px;
    margin-left: 21px;
    color: #878da0;
    font-size: 10px;
    font-family: PingFangSC-Regular;
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
    height: 32px;

    & .span1 {
      /*position: fixed;*/
      margin-left: 21px;
      width: 192px;
    }

    & .span2 {
      width: 150px;
    }

    & .span3 {
      width: 220px;
    }

    & .span4 {
      width: 108px;
    }
  }

  & .foot {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 36px;
    background: #fbfbfb;
    & .image {
      // display: block;
      width: 18px;
      height: 18px;
    }
    & .label {
      color: #878da0;
      font-size: 12px;
    }
  }
}
</style>
