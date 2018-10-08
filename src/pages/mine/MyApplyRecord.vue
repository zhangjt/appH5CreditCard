<template>
  <div class="bank-card-list-container" v-title="title">
    <go-back title="我的提单" url="/mine/applyCard"/>
    <div class="bankListWrap">
      <scroller v-if="hasRecord" :on-infinite="loadMore" :class="active!==''?'overflow':''">
        <div class="title-container">
          <div class="bank_style">银行</div>
          <div class="name_style">姓名</div>
          <div class="phone_style">手机号码</div>
        </div>
        <!--<div class="blankDiv" v-if="!this.$wanka.isWanka()"></div>-->
        <div class="bank-item-style" v-for="(item,index) in myApplyList" :key="index">
          <div class="space-line" v-if="index===0"></div>
          <div class="bank-hor-item-style">
            <div class="bank-info-style">
              <div class="black-font-style">{{item.bankName}}</div>
              <div class="gray-font-style">{{formatDate(item.applyDate)}}</div>
            </div>
            <div class="personal-info-style">
              <div class="black-font-style">{{item.userName}}</div>
              <div class="gray-font-style">{{item.trackingNumber}}</div>
            </div>
            <div class="phone-style">
              <div class="black-font-style">{{item.phone}}</div>
            </div>
          </div>
          <div class="space-line"></div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import GoBack from '../index/GoBack'
  import Empty from '@/components/Empty'
  import {Spinner} from 'mint-ui'

  // Vue.use(InfiniteScroll)

  Vue.component(Spinner.name, Spinner)

  export default {
    props: [],
    components: {GoBack, Empty},
    data () {
      return {
        title: '我的提单',
        myApplyList: [],
        currentPage: 1,
        buzy: false,
        isLoading: false,
        hasRecord: true,
        wrapperHeight: 0,
        active: '',
        done () {
        },
      }
    },
    mounted () {
      if (this.$refs && this.$refs.wrapper) {
        this.wrapperHeight =
          document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top
      }
    },
    created () {
      // this.queryBankList()
    },
    methods: {
      queryBankList () {
        this.isLoading = true
        var params = {
          page: this.currentPage,

        }
        this.$http.queryMyApplyList(params)
          .then(res => {
            this.isLoading = false
            if (res) {
              if (res.total) {
                this.total = res.total.toFixed(2)
              }
              if (res.list && res.list.length > 0) {
                this.hasRecord = true
                this.currentPage = this.currentPage + 1
                this.myApplyList = this.myApplyList.concat(res.list)
                if (res.list.length < 10) {
                  this.buzy = true
                }
                this.done && this.done(true)
              } else {
                if (this.currentPage == 1) {
                  this.hasRecord = false
                }
                this.done && this.done(true)
              }
            }
          })
          .catch(err => {
            if (this.currentPage == 1) {
              this.hasRecord = false
            }
          })
      },
      loadMore (done) {
        this.done = done
        this.queryBankList()
      },
      formatDate (date) {
        let d = new Date(date)
        let dateStr = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
        return dateStr
      },
    }
  }
</script>

<style lang="postcss" scoped>
  .bank-card-list-container {
    background: #f6f7f8;
    flex-direction: column;
    display: flex;

  &
  .title-container {
    padding-top: 7px;
    background: #f6f7f8;
    margin-top: 50px;
    height: 31px;

  &
  .bank_style {
    font-size: 12px;
    color: #878da0;
    position: fixed;
    margin-left: 17px;
  }

  &
  .name_style {
    font-size: 12px;
    color: #878da0;
    position: fixed;
    margin-left: 133px;
  }

  &
  .phone_style {
    font-size: 12px;
    color: #878da0;
    position: fixed;
    margin-left: 283px;
  }

  }

  &
  .bankListWrap {

  &
  .bank-item-style {
    flex-direction: column;
    display: flex;

  &
  .bank-hor-item-style {
    padding-top: 11px;
    height: 60px;
    margin-bottom: 11px;

  &
  .bank-info-style {
    position: fixed;
    margin-left: 18px;

  &
  .black-font-style {
    font-size: 12px;
    color: #1c1b3f;
  }

  &
  .gray-font-style {
    margin-top: 4px;
    font-size: 10px;
    color: #878da0;
  }

  }

  &
  .personal-info-style {
    position: fixed;
    margin-left: 133px;

  &
  .black-font-style {
    font-size: 12px;
    color: #1c1b3f;
  }

  &
  .gray-font-style {
    margin-top: 4px;
    font-size: 10px;
    color: #878da0;
  }

  }

  &
  .phone-style {
    margin-left: 283px;
    position: fixed;

  &
  .black-font-style {
    font-size: 12px;
    color: #1c1b3f;
  }

  }

  }

  &
  .space-line {
    height: 1px;
    background: #e6e6e6;
  }

  }
  }
  }
</style>
