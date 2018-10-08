<template>
  <div class="home-wrap" v-title="'财喵万卡'">
    <!-- 首页轮播图 -->
    <index-top v-if="!this.$wanka.isWanka()"></index-top>
    <div class="home-banner" v-if="imgShow">
      <div v-if="banner.length==1" class="single-image">
        <div v-if="banner[0].url==''"><img :src="banner[0].image"></div>
        <div v-else>
          <div v-if="banner[0].type==0" class="nei">
            <div @click="addClick(banner[0])"><img :src="banner[0].image"></div>
          </div>
          <div v-else class="wai">
            <div @click="addClick(banner[0])"><img :src="banner[0].image"></div>
          </div>
        </div>
      </div>
      <div v-if="banner.length!=1">
        <swiper :options="swiperOption" ref="homebanner" v-if="banner.length>1">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in banner" :key="index">
            <div v-if="item.url==''"><img :src="item.image"></div>
            <div v-if="item.url!=''">
              <div v-if="item.type==0" class="nei">
                <div><img :src="item.image"></div>
              </div>
              <div v-if="item.type!=0" class="wai">
                <div><img :src="item.image"></div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 办卡查询 -->
    <!--     <div class="iconfont icon-Group" @click="toCardProgress" v-if="imgShow">快速查询 办卡进度<b class="iconfont icon-arrow_left"></b></div> -->
    <!-- 银行tab轮播图 -->
    <div class="bank-banner" v-if="bankListShow">
      <div v-if="bank.length==1" class="bankList">
        <div class="bank" v-for="(one,index) in bank[0].list" :key="index" @click="bankDetail(one)">
          <img :src="one.icon" alt="">
          <div class="title">{{one.name}}</div>
          <div class="rebate" v-if="!one.rebateDescription==''"><span>{{one.rebateDescription}}</span></div>
        </div>
      </div>
      <swiper :options="swiperOption_bank" ref="bank" v-if="bank.length>1">
        <swiper-slide v-for="(item,index) in bank" :key="index">
          <div class="bankList">
            <div class="bank" v-for="(one,index) in item.list" :key="index" @click="bankDetail(one)">
              <img :src="one.icon" alt="">
              <div class="title">{{one.name}}</div>
              <div class="rebate" v-if="!one.rebateDescription==''"><span>{{one.rebateDescription}}</span></div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination pagination3" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 主题精选 -->
    <div class="topicWrap" v-if="topicShow">
      <!-- <img src="" alt="" :onerror="defaultImg"> -->
      <card-title :title="topicTitle"></card-title>
      <topic :topicOption="topicOption"></topic>
    </div>
    <!-- 活动banner -->
    <div class="activity-banner" v-if="imgShow">
      <div v-if="activity.length==1" class="single-image">
        <div v-if="activity[0].url==''"><img :src="activity[0].image"></div>
        <div v-else>
          <div v-if="activity[0].type==0" class="nei">
            <div @click="addClick(activity[0])"><img :src="activity[0].image"></div>
          </div>
          <div v-else class="wai">
            <div @click="addClick(activity[0])"><img :src="activity[0].image"></div>
          </div>
        </div>
      </div>
      <div v-else class="multi-image">
        <swiper :options="swiperOption_activity" ref="activitybanner" v-if="activity.length>1">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in activity" :key="index">
            <div v-if="item.url==''"><img :src="item.image"></div>
            <div v-else>
              <div v-if="item.type==0" class="nei">
                <div><img :src="item.image"></div>
              </div>
              <div v-else class="wai">
                <div><img :src="item.image"></div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination pagination2" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- <div class="activity"><img :src="activityOption[0].image" alt=""></div> -->
    <!-- 信用卡列表 -->
    <div class="cardTitleWrap">
      <card-title title="热卡排行" v-if="cardListShow"></card-title>
      <div class="toAll " @click="toCreditCardAll">查看全部 <span class="iconfont icon-arrow_left"></span></div>
    </div>
    <div class="cardWrap">
      <div v-if="cardListShow">
        <card-list :card="item" v-for="(item,index) in cardList" :key="index"></card-list>
        <div class="blankDiv" v-if="!this.$wanka.isWanka()"></div>
      </div>
      <div v-if="isEmpty" class="empty"><img src="~@/assets/images/empty_wap.png" alt=""></div>
    </div>
    <div>
      <div v-if="isLoad" class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import cardTitle from '@/components/common/IndexCommon/cardTitle'
import cardList from '@/components/common/IndexCommon/cardList'
import topic from '@/components/common/IndexCommon/topic'
import utils from '@/modules/utils'
import IndexTop from '@/pages/index/IndexTop'
let vm = null
// import { accessUrl, baseUrl } from '@/utils/env'
export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide,
    cardTitle,
    cardList,
    topic,
    IndexTop
  },
  data() {
    return {

      imgShow: false,
      isEmpty: false,
      cardListShow: false,
      isLoad: true,
      bankListShow: false,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        autoplay: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: -55, // slide左右距离
          depth: 400, // slide前后距离
          modifier: 0.5, //
          slideShadows: false // 滑块遮罩层
        },
        loop: true, // loop模式下slides前后会复制若干个slide，从而形成一个环路，但是却不会复制绑定在dom上的click事件
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper

        // 点击事件，避免在dom上绑定事件时，loop复制的dom无点击事件
        on: {
          click: function() {
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex
            vm.handleClickSlide(realIndex)
          }
        }
      },
      swiperOption_bank: {
        pagination: { el: '.pagination3' },
        effect: 'coverflow',
        grabCursor: true,
        autoplay: false, // 不自动
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: -55, // slide左右距离
          depth: 100, // slide前后距离
          modifier: 0.5, //
          slideShadows: false // 滑块遮罩层
        },
        loop: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
        // on: {
        //   click: function () {
        //     const realIndex = this.realIndex;
        //     vm.handleClickSlideBank(realIndex);
        //   }
        // }
      },
      swiperOption_activity: {
        spaceBetween: 30,
        // effect: 'coverflow',
        centeredSlides: true,
        autoplay: false,
        loop: true,
        // coverflowEffect: {

        //   slideShadows: false // 滑块遮罩层
        // },
        on: {
          click: function() {
            const realIndex = this.realIndex
            vm.handleClickActivity(realIndex)
          }
        },
        pagination: {
          el: '.pagination2',
          clickable: true
        }
      },
      bannerList: [],
      bankList: [],
      bannerActivityList: [],
      cardList: [],
      // 主题精选
      defaultImg: `this.src='`+require('@/assets/images/default_card.png')+`'`,
      topicShow: false,
      topicTitle: '主题精选',
      topicOption: {
        bigBanner: [{
          title: '',
          subTitle: '',
          image: ''

        }],
        smallBanner: [

          { title: '', subTitle: '', image: '' }
        ]
      }

    }
  },
  computed: {
    banner() {
      return this.bannerList
    },
    bank() {
      return this.bankList
    },

    activity() {
      return this.bannerActivityList
    }

  },
  created() {
    vm = this

    window.getTopicCenterCb = this.getTopicCenterCb
    window.getTopicBigCb = this.getTopicBigCb
    window.getTopicSmallCb = this.getTopicSmallCb
    this.loadData = this.$http.loadData
    this.getBanner()
    this.getBankList()
    this.getCardList()
    this.getTopicBig(3) // 大广告
    this.getTopicSmall(4) // 小广告
    this.getTopicCenter(5) // 首页中部广告
  },
  activated() {

  },
  mounted() {

  },
  methods: {
    toCreditCardAll() {
      let url = '/creditCardCenter'
      if (this.$wanka.isWanka()) {
        // app要加上域名
        let protocol = window.location.protocol
        let host = window.location.host
        url = protocol + host + url
        // this.$toPage.ToAppADWebPage(url, one)
        this.$toPage.toPage(url)
        // this.$wanka.ToAppPage(url)
      } else {
        this.$router.push({ name: 'CreditCardCenter' })
      }
    },
    // 主题精选
    getTopicBig:function(position) {
      console.log(position)
      let callback = 'getTopicBack' + position
      this.loadData('/app/banner/list', {
        position: position
      }, 'getTopicBigCb')
    },
    getTopicSmall:function(position) {
      console.log(position)
      let callback = 'getTopicBack' + position
      this.loadData('/app/banner/list', {
        position: position
      }, 'getTopicSmallCb')
    },
    getTopicCenter:function(position) {
      console.log(position)
      let callback = 'getTopicBack' + position
      this.loadData('/app/banner/list', {
        position: position
      }, 'getTopicCenterCb')
    },

    // 首页中部广告
    getTopicCenterCb(res) {
      if (res.responseData) {
        var res = res.responseData
      }

      this.bannerActivityList = res.list
      console.log(res.list[0].title)
    },
    // 大广告
    getTopicBigCb(res) {
      if (res.responseData) {
        var res = res.responseData
      }
      this.topicOption.bigBanner = res.list 
      console.log(res.list[0].title)
      // alert(res.list[0].title) 
    },
    // 小广告
    getTopicSmallCb(res) {
      if (res.responseData) {
        var res = res.responseData
      }
      this.topicOption.smallBanner = res.list
      if (res.list[0]) {
        this.topicShow = true
      }
      console.log(res.list[0].title)

    },

    // 办卡进度跳转
    toCardProgress() {
      this.$router.push({ name: 'creditCardProgressPage' })
      // if (!this.isPC()) {
      //   var protocol = window.location.protocol
      //   var host = window.location.host
      //   var root = protocol + '//' + host + '/'
      //   let url = root + 'wap/cardmarket/creditCardProgressPage'

      //   // 内链
      //   this.ToAppPage(url)
      // } else {

      // }
    },
    handleClickSlide(index) {
      let item = this.bannerList[index]
      this.addClick(item)
    },
    handleClickActivity(index) {
      let item = this.bannerActivityList[index]
      this.addClick(item)
    },
    addClick(item) {
      this.clickNum(item)
    },
    async clickNum(item) {
      let res = await this.$http.postData('/app/banner/click', { id: item.id })
      // alert(JSON.stringify(res) +item.id)
      if (this.$wanka.isWanka()) {
        if (item.type === 0) {
          // 内链

          this.$toPage.ToAppADWebPage(item.url, item)
        } else {
          this.$toPage.ToBrowserFromAppPage(item.url)
        }
      } else {
        // return
        window.open(item.url, '_self')
      }

    },
    // 跳转去银行详情
    bankDetail(one) {
      let url = '/bankInfo'
      if (this.$wanka.isWanka()) {
        // app要加上域名
        let protocol = window.location.protocol
        let host = window.location.host
        url = protocol + host + url
        // this.$toPage.ToAppADWebPage(url, one)
        this.$toPage.toPage(url, { id: one.id, name: one.name })
      } else {
        this.$router.push({ name: 'BankInfo', query: { id: one.id, name: one.name } })
      }
    },
    // getData-start
    async getBanner() {
      let json = {
        position: 1
      }

      let res = await this.$http.postData('/app/banner/list', json)
      this.bannerList = res.list
      this.imgShow = true
    },

    async getCardList() {
      let json = {
        page: 1,
        limit: 10
      }
      let res = await this.$http.postData('/app/creditCard/getList', json)
      this.isLoad = false
      if (res.page.list.length > 0) {
        this.cardList = res.page.list
        this.cardListShow = true
      } else {
        this.cardListShow = false
        this.isEmpty = true
      }
    },

    async getBankList() {
      let json = {
        page: 1,
        limit: 100
      }
      let res = await this.$http.postData('/app/bank/getBankList', json)
      // http.postWithoutCode('/bank/getBankList', json).then((res) => {
      // http.getLocal('/static/json/bankList.json').then((res)=>{
      let l = res.list

      let newObject = utils.recalObject(l, 8) // 每8个分类

      this.bankList = newObject
      if (newObject.length != 0) {
        this.bankListShow = true
      }

      // })
    },
    // getData-end

    HandleDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    HandleResult() {
      this.isShowResult = !this.isShowResult
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.home-wrap {
  background-color: #F6F7F8;
  overflow: hidden;
  & .home-banner {
    background: #fff;
    margin-top: 10px;
  }

  & .icon-Group {
    position: relative;
    color: #878DA0;
    font-size: 12px;
    padding-left: 20px;
    background: #FBFBFB;
    height: 37px;
    display: flex;
    align-items: center;

    & b {

      position: absolute;
      color: #C6C6C6;
      right: 20px;
    }
  }
  & .icon-Group:before {
    padding-right: 6px;
    color: #6B3AE3;
    font-size: 20px;
  }
}

.home-header {
  width: 100%;
  position: fixed;
  top: 0;
}

.single-image {
  border-radius: 8px;
  overflow: hidden;
  margin: 0px 10px 0;

  & img {
    width: 100%;
    display: block;
  }
}

.home-swipe {
  height: 115px;
}

.swiper-container {
  z-index: 0;
  margin: 0;
  padding: 4px 0;
}

.swiper-slide {
  width: 315px;
  height: 112px;
}

[slide-block] {
  width: 315px;
  height: 112px;
}

.swiper-slide img {
  display: block;
  margin: 0 auto;
  margin-top: 2%;
  width: 92%;
  height: 92%;
  vertical-align: middle;
  transition: all 1s ease 0s;
  box-shadow: 0px 0px 4px #888888;
  border-radius: .3rem;
}

.swiper-slide-active img {
  margin-top: 0;
  width: 100%;
  height: 100%;
}

.home-top {
  background-color: #fff;
  /* margin-bottom: 15px; */
}

.home-nav {
  display: flex;
  padding: 15px 0;
  font-size: 12px;
}







/*bank*/

.bank-banner {
  background: #fff;
  margin-bottom: 12px;
  & .bankList {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 4%;
    /* justify-content:center; */
    & .bank {
      width: 23%;
      margin: 10px 0px 4px;
      position: relative;
      & img {
        display: block;
        margin: 0 auto;
        margin-top: 0;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        vertical-align: middle;
        transition: all 1s ease 0s;
        box-shadow: none;
      }
      & .title {
        font-size: 12px;
        color: #1C2042;
        width: 100%;
        height: 22px;
        /*overflow:hidden;*/
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        margin-top: 6px;
      }
      & .rebate {
        overflow: hidden;
        width: 120%;
        position: absolute;
        top: -5px;
        left: 46px;

        & > span {
          font-size: 10px;
          background: #FF534F;
          color: #fff;
          padding: 2px 4px;
          border-radius: 10px;
        }
      }
    }
  }
  & .swiper-container {
    z-index: 0;
    margin: 0;
    padding: 4px 0;
    & .swiper-pagination {
      & .swiper-pagination-bullet {}
    }
  }
  & .swiper-slide {
    width: 100%;
    height: 205px;
  }
  & [slide-block] {
    width: 345px;
    height: auto;
  }
}



/*活动广告*/

.activity-banner {
  background: #fff;
  overflow: hidden;
  margin-bottom: 10px;

  & .swiper-wrapper {
    padding-top: 0 !important;
  }
  & .swiper-container {
    z-index: 0;
    margin: 0;
    padding: 4px 0;
    & .swiper-pagination {
      & .swiper-pagination-bullet {}
    }
  }
  & .swiper-slide {
    width: 100%;
    height: auto;
  }
  & [slide-block] {
    width: auto;
    height: auto;
  }
  & img {
    /*控制img来控制效果*/
    width: 340px;
    height: 57px;
    margin: 5px 20px;
    border-radius: 2em;
  }
  & .single-image {
    & img {
      margin: 10px 10px;
    }
  }
}

.cardWrap {
  background: #fff;
}

.empty {
  width: auto;
  margin: 0px 20px;
  & img {
    width: 100%;
  }
}

.topicWrap {
  margin-bottom: 10px;
}

.activity {
  width: 100%;
  height: 64px;
  overflow: hidden;
  padding: 5px 20px;
  background: #fff;
  margin-bottom: 10px;

  & img {


    width: 100%;
    height: 100%;
  }
}

.cardTitleWrap {
  position: relative;
  & .toAll {
    position: absolute;
    top: 12px;
    right: 20px;
    font-size: 12px;
    color: #A4A4A4;
    & span {
      font-size: 10px;
    }
  }
}


/* 当前页 */

.cardWrap {
  overflow: hidden;
  & .card:nth-last-of-type(1) {
    /*padding-bottom:50px;*/
  }
}

</style>
