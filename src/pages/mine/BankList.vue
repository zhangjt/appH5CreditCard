<template>
  <div class="bank-card-list-container" v-title="title">
    <go-back title="选择银行" url="/mine/applyCard"/>
    <div class="bankListWrap">
      <scroller v-if="hasRecord" :on-infinite="loadMore" :class="active!==''?'overflow':''">
        <div class="blankDiv" v-if="!this.$wanka.isWanka()"></div>
        <div class="bank-item-style" v-for="(item,index) in bankList" :key="index" @click="getItem(item)">
          <div class="bank-hor-item-style">
            <img class="bank-img-style" :src="item.icon"/>
            <div class="bank-name-style">{{item.name}}</div>
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
        title: '选择银行',
        bankList: [],
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
      
    },
    methods: {
      queryBankList () {

        this.isLoading = true
        var params = {
          page: this.currentPage,
          limit: 15

        }
        console.log(this.currentPage)
        this.$http.queryBankList(params)
          .then(res => {
            this.isLoading = false
            if (res) {
              if (res.total) {
                this.total = res.total.toFixed(2)
              }
              if (res.list && res.list.length > 0) {
                this.hasRecord = true
                this.currentPage = this.currentPage + 1
                this.bankList = this.bankList.concat(res.list)
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
      getItem (item) {
        sessionStorage.setItem('bankname', item['name'])
        sessionStorage.setItem('bankId', item['id'])
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .bank-card-list-container {
    background: #f6f7f8;
    flex-direction: column;
    display: flex;

  &
  .bankListWrap {
    overflow: hidden;

  &
  .bank-item-style {
    flex-direction: column;
    display: flex;

  &
  .bank-hor-item-style {
    margin-top: 12px;
    margin-bottom: 11px;
    display: flex;
    margin-left: 30px;
    flex-direction: row;

  &
  .bank-img-style {
    height: 42px;
    width: 42px;
  }

  &
  .bank-name-style {
    margin-left: 14px;
    display: flex;
    align-items: center;
  }

  }

  &
  .space-line {
    height: 1px;
    margin-left: 27px;
    background: #ececec;
  }

  }
  }
  }
</style>
