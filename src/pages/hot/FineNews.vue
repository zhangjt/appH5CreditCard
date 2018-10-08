<template>
<div class="fineNews" title="资讯">
    <mt-header title="资讯" class="boder-header">
      <!-- <mt-button icon="back" slot="left" @click="reback"></mt-button> -->
    </mt-header>
    <!-- 万卡外添加的空白blankDiv -->
    <div class="blankDiv" v-if="!this.$wanka.isWanka()"></div>
    <scroller v-if="!hasNoData" 
      :on-refresh="refresh"
      :on-infinite="infinite"
      :noDataText="''"
      class="scrollro-bg">
      <div v-for="item in fineNewsList" :key="item.id">
        <div class="cell" @click="navigateFineNewsDetail(item.url, item.type, item.title, item.id)" >
            <h1 class="cell-text">{{ item.title }}</h1>
            <img class="cell-img" :src="src" :onload="loadImg(item.img)" :onerror="loadImg(src)"/>
            <div class="cell-detail">
              <!-- <h1 class="cell-text-platform">{{ item.from }}</h1>
              <div :hidden="item.type !== 1 ? true : false" class="cell-line-1"></div> -->
              <h1 :hidden="item.type !== 1 ? true : false" class="cell-text-time">{{ item.createtime }}</h1>
              <div :hidden="item.type !== 1 ? true : false" class="cell-line-1"></div>
              <img :hidden="item.type !== 1 ? true : false" class="cell-icon-number" src="../../assets/images/hot_read.png"/>
              <h1 :hidden="item.type !== 1 ? true : false" class="cell-text-number">{{ item.readcount }}</h1>
            </div>

        </div>
        <div class="cell-margin"></div>
    </div>

    </scroller>
    <empty class="empty" v-if="hasNoData"></empty>
    </div>
</template>
<script>
  import Vue from 'vue'
import VueScroller from 'vue-scroller'
import Empty from '@/components/Empty'
import http from 'http'

Vue.use(VueScroller)
  export default {
    data () {
      return {
        src: '/static/images/finenewsplacehoder.png',
        hasNoData: false,
        page: 1,
        loadMore: false,
        fineNewsList: [
        ]
      }
    },
    created () {
      this.loadData(true)
    },
    mounted () {

    },
    components: {
      Empty
    },
    methods: {
      loadImg (imgSrc) {
        return 'this.onload=null;this.src=' + '"' + imgSrc + '";'
      },
      navigateFineNewsDetail (url, type, title, id) {
        this.hitClick({id: id})
  
        window.location.href = url
        // this.$router.push({path: '/hot/fineNewsDetail', query: {url: url}})
      },
      refresh (done) {
        this.loadData(true, done)
      },
      infinite (done) {
        this.loadData(false, done)
      },
      async hitClick (json) {
        await this.$http.postData('/app/find/hit', json)
      },
      async loadData (isHeader, done) {
        var tempPage = 1
        if (!isHeader) {
          tempPage = this.page + 1
          if (this.fineNewsList && this.fineNewsList.length === 0) {
            done(false)
            return
          }
        }
        let json = {
          page: tempPage,
          limit: 15
        }
  
        let res = await this.$http.postData('/app/find/newslist', json)
        this.page = tempPage
        if (isHeader) {
          this.fineNewsList = res.list
  
          this.hasNoData = !this.fineNewsList || this.fineNewsList.length === 0
          if (done) {
            done(true)
          }
        } else {
          this.fineNewsList = this.fineNewsList && this.fineNewsList.concat(res.list)
  
          if (!this.fineNewsList || res.count === this.fineNewsList.length || res.count === 0) {
            done(true)
          } else {
            done(false)
          }
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
.fineNews .scrollro-bg {
  position: absolute;
  top: 44px;
}
.empty {
  height: 667px;
  position: absolute;  
}
.fineNews {

    width: 100%;
    height: auto;
    background: #F6F7F8;
}
.cell {
    position: relative;
    width: 100%;
    height: 115px;
    background: white;   
}  
.cell-text {
    position: absolute;
    top: 20px;
    left: 140px;
    width: 221px;
    line-height: 24px;
    height: 51px;
    font-family: 'PingFangSC-Regular';
    font-size: 12px;
    color: #1C1B3F;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow:hidden;
}
.cell-img {
  width: 100px;
  height: 64px;
  top: 25px;
  left: 20px;
  position: absolute; 
}
.cell-detail {
    top: 82px;
    left: 140px;
    height: 14px;
    width: 375px;
    display: flex;
    position: absolute;
}
.cell-text-platform {
      font-size: 12px;
      font-family: 'PingFangSC-Regular';
      line-height: 12px;
      color: #A4A4A4;
    }
.cell-line-1 {
      background: #E0E0E0;
      margin-left: 8px;
      margin-top: 3px;
      width: 0.5px;
      height: 8px;
      position: relative;
    }
.cell-text-time {
      margin-left: 0px;
      font-size: 10px;
      font-family: 'PingFangSC-Regular';
      line-height: 14px;
      color: #A4A4A4;
      position: relative;
}
.cell-icon-number {
      width: 14px;
      height: 14px;
      position: relative;
      margin-left: 8px;
      position: relative;
}
.cell-text-number {
      margin-left: 2px;
      font-size: 10px;
      font-family: 'PingFangSC-Regular';
      line-height: 14px;
      color: #A4A4A4;
      position: relative;
}
.cell-margin {
    width: 100%;
    height: 12px;
    background: #F6F7F8;
}
 </style>