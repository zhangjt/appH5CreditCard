<template>
  <div class="income-container">
    <div v-if="hasRecord" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="wallet-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="buzy" infinite-scroll-distance="10">
      <div v-for="(item, index) in wallteList" :key="index" class="wallet-item">
        <div class="top">
          <div class="item-left">
            <span class="intro">{{item.intro}}</span>
            <span class="time">{{getTime(item.addtime)}}</span>
          </div>
          <span class="right">{{item.fee}}</span>
          <!-- <div class="arrow" @click="swithShowingStatus(item)" v-if="false">
                  <img src="/static/images/personal_down@2x.png" :class="item.showing? 'arrow-up':'arrow-down'" >
                </div> -->
        </div>
        <!-- <div class ="bottom" v-show="item.showing">
                 <span>{{返利  +item.rebate}}</span>
                 <span>{{会员权益  +item.rights}}</span>
                 <span>{{活动奖励 +item.activity}}</span>
              </div> -->
      </div>
      <p v-show="isLoading" class="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <empty-cat v-if="!hasRecord"></empty-cat>
  </div>
</template>

<script>
import Vue from "vue";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
import { Spinner } from "mint-ui";
Vue.component(Spinner.name, Spinner);
import EmptyCat from "@/components/EmptyCat";
export default {
  components: { EmptyCat },
  props: {
    incomeType: 0
  },
  data() {
    return {
      buzy: false,
      isLoading: false,
      currentPage: 1,
      wrapperHeight: 0,
      hasRecord: true,
      wallteList: []
    };
  },
  created() {},
  watch: {},
  methods: {
    // swithShowingStatus(item) {
    //   item.showing = !item.showing;
    // },
    getWalletList: function() {
      this.isLoading = true;
      var params = {
        page: this.currentPage,
        limit: 10,
        type: this.incomeType
      };
      this.$http
        .getUserWallet(params)
        .then(res => {
          this.isLoading = false;
          if (res) {
            sessionStorage.setItem("minfee", res.minFee);
            if (res.list && res.list.length > 0) {
              res.list = res.list.map(item => {
                // item.showing = false;

                if (item.type == 1002) {
                  item.intro = "[信用卡] " + item.intro;
                } else {
                  item.intro = "[平台活动] " + item.intro;
                }
                return item;
              });
              this.hasRecord = true;
              this.currentPage = this.currentPage + 1;
              this.wallteList = this.wallteList.concat(res.list);
              if (res.list.length < 10) {
                this.buzy = true;
              }
            } else {
              this.buzy = true;
              if (this.currentPage == 1) {
                this.hasRecord = false;
              }
            }
          }
        })
        .catch(err => {
          if (this.currentPage == 1) {
            this.hasRecord = false;
          }
        });
    },
    getTime: function(time) {
      if (time) {
        return time.split(" ", 2)[0];
      } else {
        return time;
      }
    },
    loadMore() {
      this.getWalletList();
    }
  },
  created() {},
  mounted() {
    if (this.hasRecord) {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
};
</script>

<style lang="postcss" scoped>
.income-container {
  position: relative;
  z-index: 0;
  top: 315px;
  & .wallet-list {
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

  & .wallet-item {
    border-bottom: 1px solid #e6e6e6;
    & .top {
      width: 100%;
      height: 60px;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .arrow {
        padding-left: 10px;
        height: 30px;
        display: flex;
        align-items: center;
        & > img {
          width: 14px;
          height: 9px;
        }
      }

      & .right {
        font-size: 20px;
        color: #334354;
        line-height: 60px;
        text-align: right;
      }
      & .item-left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-grow: 2;
        height: 60px;
        & .intro {
          font-size: 14px;
          margin-top: 15px;
          color: #1c1b3f;
          overflow: hidden;
          max-width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }

        & .time {
          font-size: 10px;
          color: #878da0;
          margin-bottom: 10px;
          text-align: left;
        }
      }
    }

    & .bottom {
      width: 100%;
      height: 37px;
      background: #fbfbfb;
      font-size: 12px;
      color: #1c1b3f;
    }
  }
  & .arrow-up {
    transition: transform 0.2s;
    transform: rotate(180deg);
  }
  & .arrow-down {
    transition: transform 0.2s;
    transform: rotate(0deg);
  }
}
</style>