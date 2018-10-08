<template>
    <div class="expend-container">
        <div v-if="hasRecord" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="wallet-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="buzy"  infinite-scroll-distance="10">
          <div  v-for="(item, index) in wallteList" :key="index" class="wallet-item">
              <div class="item-left">
                  <span class="intro">{{item.intro}}</span>
                  <span class="time">{{getTime(item.addtime)}}</span>
              </div>
              <span class="right">{{item.fee}}</span>
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
  components: {EmptyCat},
  props: {},
  data() {
    return {
      buzy: false,
      isLoading: false,
      wallteList: [],
      currentPage: 1,
      wrapperHeight: 0,
      hasRecord:true,
    };
  },
  watch: {
  },
  methods: {
    getWalletList: function() {
      this.isLoading = true;
      var params = {
        page: this.currentPage,
        limit: 10,
        type: -1
      };
      this.$http.getUserWallet(params).then(res => {
        this.isLoading = false;
        if (res) {
          if (res.list && res.list.length > 0) {
            this.hasRecord = true;
            this.currentPage = this.currentPage + 1;
            this.wallteList = this.wallteList.concat(res.list);
            if (res.list.length < 10) {
              this.buzy = true;
            }
          } else {
            if(this.currentPage == 1){
              this.hasRecord = false;
            }
            this.buzy = true;
          }
        }
      }).catch((err) => {
        if(this.currentPage == 1){
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
    if(this.hasRecord){
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
};
</script>
<style lang="postcss" scoped>
.expend-container {
   position: relative;
  z-index: 0;
  top: 275px;

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
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E6E6E6 ;
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
      text-align: left;
       overflow:hidden;
        max-width: 200px;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    & .time {
      font-size: 10px;
      color: #878da0;
      margin-bottom: 10px;
      text-align: left;
    }
  }
}
}


</style>