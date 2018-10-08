<template>
    
    <div class="w-record-container">

        <mt-header fixed :title="title" class="boder-header">
        <router-link to="/mine/withDraw" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>

        <div class="record-top">
          <span>累计提现(元)</span>
          <span class="big">{{total}}</span>
        </div>

        <div class="fake-head">
          <span>提现时间</span>
          <span>提现金额(元)</span>
          <span>手续费(元)</span>
          <span>审核结果</span>
        </div>
         <div  v-if="hasRecord" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="wallet-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="buzy"  infinite-scroll-distance="10">
            <div class="draw-item" v-for="(item, index) in recordList" :key="index">
                <div class="draw-item-top">
                    <span class="time" >{{getDate(item.addtime) +'\n'+getTime(item.addtime)}}</span>
                    <span class="center">{{item.fee.toFixed(2)}}</span>
                    <span class="center">{{item.poundage.toFixed(2)}}</span>
                    <span class="right">{{getStatus(item.audit_status)}}</span>
                </div>
                <div class="draw-item-top">
                 </div>
            </div>
            <p v-show="isLoading" class="loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              <span>加载中...</span> 
          </p>
       </div>
        
        <empty v-if="!hasRecord"></empty>
    </div>
</template>

<script>
import Vue from "vue";
import Empty from "@/components/Empty";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
import { Spinner } from "mint-ui";
Vue.component(Spinner.name, Spinner);
export default {
  components: { Empty },
  props: {},
  data() {
    return {
      buzy: false,
      isLoading: false,
      wrapperHeight: 0,
      title: "提现记录",
      total: "--/--",
      currentPage: 1,
      recordList: [],
      hasRecord: true
    };
  },
  computed: {},
  methods: {
    getRecordListData: function() {
      this.isLoading = true;
      var params = {
        page: this.currentPage,
        limit: 10
      };
      this.$http.getWithDrawRecord(params).then(res => {
        this.isLoading = false;
        if (res) {
          if (res.total ||res.total>=0) {
            this.total = res.total.toFixed(2);
          }
          if (res.list && res.list.length > 0) {
            this.hasRecord = true;
            this.currentPage = this.currentPage + 1;
            this.recordList = this.recordList.concat(res.list);
            if (res.list.length < 10) {
              this.buzy = true;
            }
          } else {
            if (this.currentPage == 1) {
              this.hasRecord = false;
            }
          }
        }
      }).catch((err) => {
        if(this.currentPage == 1){
            this.hasRecord = false;
          }
      });;
    },
    loadMore() {
      this.getRecordListData();
    },
    getDate: function(d) {
      return d.split(" ", 2)[0];
    },
    getTime: function(d) {
      return d.split(" ", 2)[1];
    },
    getStatus: function(status) {
      if (status <= 0 && status>-1) {
        return "待审核";
      } else if (status >= 1) {
        return "已通过";
      } else  {
        return "已拒绝";
      } 
    }
  },
  created() {},
  mounted() {
    if (this.$refs && this.$refs.wrapper) {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
};
</script>
<style lang="postcss" scoped>
.w-record-container {
  & .record-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > span {
      margin-top: 60px;
      font-size: 12px;
      color: #878da0;
    }

    & .big {
      margin-top: 10px;
      font-size: 32px;
      color: #334354;
      margin-bottom: 30px;
    }
  }

  & .fake-head {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fbfbfb;
    border: 0 solid #e6e6e6;
    border-radius: 2.5px;
    color: #878da0;
    font-size: 12px;

    & > span {
      width: 25%;
      text-align: center;
    }
  }

  & .draw-item {
    color: #000000;
    font-size: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #fbfbfb;
    & .draw-item-top {
      display: flex;
      justify-content: space-between;
      & > span {
        width: 25%;
        text-align: center;
      }
    }
  }
}
.wallet-list {
  margin-top: -1px;
  overflow: scroll;
  & .loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
    justify-content: center;
    align-items: center;
    display: flex;

    & > span {
      margin-left: 8px;
    }
  }
}
.time {
  color: #334354;
  text-align: left !important;
  padding-left: 20px;
}
</style>