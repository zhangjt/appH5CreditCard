<template>
  <div class="creditCard-wrap" v-title="'信用卡中心'">
    <!-- 筛选filterTap -->
    <article class="filterTapWap">
      <go-back title="信用卡中心" url="/"/>

      <div class="slide-nav">
        <div v-for="(item,index) in list" :key="index" class="iconfont icon-triangle-up" :class="active==item.label?'active':''" size="small" @click.prevent="active = item.label;">
          <template v-if="index===0">{{ itemRadio[index]===''?item.label:itemRadio[index].length>4?itemRadio[index].substring(0,3)+'...':itemRadio[index] }}</template>
          <template v-else-if="index===1||index===2">{{ chooseFilter(index, itemRadio[index]) }}</template>
          <template v-else>更多</template>
        </div>
      </div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" @touchmove.prevent>
          <mt-tab-container-item v-for="(item,ind) in list" :key="ind" :id="item.label">
            <div class="item" v-for="(sub,inde) in item.content" :key="inde">
              <div class="sort" v-if="sub.sort!=''">{{sub.sort}}</div>
              <div class="subcontent">
                <div class="subcontent-li" v-for="(subchild,index) in sub.subcontent" :key="index">
                  <label v-if="item.showBtn===true">
                    <input :name="sub.name" v-model="itemCheck[inde]" type="checkbox" :value="subchild.value" @change="selectionList('check',sub.name)"/><span>{{subchild.label}}</span>
                  </label>
                  <label v-else>
                      <input type="radio" v-model="itemRadio[ind]" :name="sub.name" :value="subchild.value" @click="selectionList"><span>{{subchild.label}}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="filter-btn border-top" v-if="item.showBtn===true">
              <mt-button @click="resetDataForm" class="reset-btn">重置</mt-button>
              <mt-button @click="selectionList" class="sel-btn">确定</mt-button>
            </div>

          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </article>
    <div class="v-modal" @touchmove="touchmove" v-show="active!==''" @click="closeModal"></div>
    <!-- 信用卡列表 -->

    <article class="cardWrap">

      <scroller v-if="cardListShow" :on-refresh="reFresh" :on-infinite="loadMore" :class="active!==''?'overflow':''">
        <!-- 万卡外添加的空白blankDiv -->
        <div class="blankDiv" v-if="!this.$wanka.isWanka()"></div>
        <card-list :card="item" v-for="(item,index) in cardList" :key="index"></card-list>
      </scroller>
      <div v-if="cardList.length===0" class="empty"><img src="~@/assets/images/empty_wap.png" alt="" style="width: 100%"></div>
    </article>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import cardTitle from '@/components/common/IndexCommon/cardTitle'
import cardList from '@/components/common/IndexCommon/cardList'
import utils from '@/modules/utils'
import GoBack from '@/pages/index/GoBack'

export default {
  name: 'home',
  components: {
    cardTitle,
    cardList,
    GoBack
  },
  data() {
    return {
      isShow:false,
      active: '',
      itemRadio: ['','',''],
      itemCheck: [[],[],[],[]],
      list: [
        {
          label: '全部银行',
          content: [{
            name: 'cardBankName',
            sort: '',
            subcontent: [
              {
                value: '',
                label: '全部银行',
              }
            ]
          }]
        },
        {
          label: '等级',
          content: [{
            name: 'cardGrade',
            sort: '',
            subcontent: [
              {
                value: '',
                label: '全部等级',
              },{
                value: '1',
                label: '普卡',
              },{
                value: '2',
                label: '金卡',
              },{
                value: '3',
                label: '白金卡',
              }
            ]
          }]
        },
        {
          label: '用途',
          content: [{
            name: 'cardUse',
            sort: '',
            subcontent: [
              {
                value: '',
                label: '全部用途',
              },{
                value: '1',
                label: '大额取现',
              },{
                value: '2',
                label: '超市购物',
              },{
                value: '3',
                label: '商旅人士',
              },{
                value: '4',
                label: '主题卡',
              },{
                value: '5',
                label: '航空联名',
              },{
                value: '6',
                label: '境外刷卡',
              },{
                value: '7',
                label: '女性专属',
              },{
                value: '8',
                label: '联名卡',
              }
            ]
          }]
        },
        {
          label: '更多',
          showBtn: true,
          content: [{
              name: 'cardAnnual',
              sort: '年费',
              more: true,
              subcontent: [
                {
                  value: 1,
                  label: '永久免年费',
                },{
                  value: 2,
                  label: '交易累计免年费',
                },{
                  value: 3,
                  label: '不免年费',
                }
              ]
            },
            {
              name: 'cardOrganization',
              sort: '卡组织(多选)',
              subcontent: [
                {
                  value: 1,
                  label: '银联',
                },{
                  value: 2,
                  label: 'VISA',
                },{
                  value: 3,
                  label: '运通',
                },{
                  value: 4,
                  label: 'JCB',
                },{
                  value: 5,
                  label: '万事达',
                }
              ]
            },
            {
              name: 'cardCurrency',
              sort: '币种',
              more: true,
              subcontent: [
                {
                  value: 1,
                  label: '人民币',
                },{
                  value: 2,
                  label: '美元',
                },{
                  value: 3,
                  label: '双币种',
                }
              ]
            },
            {
              name: 'cardExtral',
              sort: '特权(多选)',
              subcontent: [
                {
                  value: 1,
                  label: '新户有礼',
                },{
                  value: 2,
                  label: '购物返现',
                },{
                  value: 3,
                  label: '赠送保险',
                }
              ]
            }
          ]
        }

      ],
      formList:[],
      cardListShow: true,
      page: 1,
      limit: 15,
      totalPage: 1,
      isEmpty: false,
      cardList: [],
      infinite: false
    }
  },
  created() {
    window.getCardSearchCallBack = this.getCardSearchCallBack;
    window.getBankListCallBack = this.getBankListCallBack;
    this.loadData = this.$http.loadData
  },
  activated () {
    this.itemRadio = ['','','']
    this.itemCheck = [[],[],[],[]]
    this.infinite = false
    this.getBankList();
    this.selDataForm();
  },
  methods: {
    chooseFilter (ind, child) {
      if (child===''){
        child = 0
      }else{
        child = parseInt(child)
      }
      let item = this.list[ind].content[0].subcontent[child].label;
      if(item.indexOf('全部')>-1){
        item = item.slice(2)
      }
      return item
    },
    
    done () {},
    closeModal () {
      this.active = ''
    },
    resetDataForm (){
      this.itemRadio = ['','','']
      this.itemCheck = [[],[],[],[]]
      this.infinite = false
      this.loadData('/app/creditCard/search', {status: 1}, 'getCardSearchCallBack')
      this.active = ''
    },
    selectionList (check, name) {
      if(name==='cardAnnual'){
        if(this.itemCheck[0].length>1){
          this.itemCheck[0].shift()
        }
      }else if(name==='cardCurrency'){
        if(this.itemCheck[2].length>1)
        this.itemCheck[2].shift()
      }
      this.infinite = false
      this.selDataForm(check)
    },
    selDataForm (check){
      this.$nextTick(() => {
        let params = {
          status: 1,
          page: this.page,
          limit: this.limit,
          cardBankName: this.itemRadio[0],
          cardGrade: this.itemRadio[1],
          cardUse: this.itemRadio[2],
          cardAnnual: this.itemCheck[0].toString(),
          cardOrganization: this.itemCheck[1].toString(),
          cardCurrency: this.itemCheck[2].toString(),
          cardExtral: this.itemCheck[3].toString()
        }
        if(check!=='check'){
          this.active = ''
          this.loadData('/app/creditCard/search', params, 'getCardSearchCallBack')
        }
      })
    },
    getCardSearchCallBack(res) {
      if (res.responseData) {
        var res = res.responseData
      }
      if (res.page.list.length > 0) {
        this.totalPage = res.page.totalPage;
        let data = res.page.list;
        if(this.infinite===true){
          this.cardList = this.cardList.concat(data);
        }else{
          this.cardList = data;
        }
      }else{
        this.cardList = []
      }
      this.done(true)
    },
    getBankList(){
      this.loadData('/app/bank/getBankList', {
        page: 1,
        limit: 50
      },'getBankListCallBack')
    },
    getBankListCallBack(res){
      if (res.responseData) {
        var res = res.responseData
      }
      this.list[0].content[0].subcontent = [{
        value: '',
        label: '全部银行',
      }];
      if (res.list.length > 0) {
        let d = res.list;
        for (var i = 0; i < d.length; i++) {
          this.list[0].content[0].subcontent.push({value:d[i].name,label:d[i].name})
        }
      }
    },
    //下拉刷新
    reFresh(done) {
      this.done=done;
      this.infinite = false
      this.page = 1;
      this.selDataForm();
    },
    //滚动列表加载更多
    loadMore(done) {
      this.done = done
      this.infinite = true
      if (this.page < this.totalPage) {
        this.page++;
        this.selDataForm();
      }else{
        this.done&&this.done(true)
      }
    },
    touchmove(e) {
      e.preventDefault();
    }
  }
}

</script>
<style lang="postcss" scoped>
*{box-sizing:border-box;}
.v-modal{
  z-index: 100;
}
.overflow{
  overflow: hidden;
  -webkit-overflow-scrolling: auto;
}
.filter-btn{

  padding-top: 20px;
  padding-bottom: 17px;
  text-align: center;
  & .mint-button{
    width: 120px;
    height: 38px;
    color: #fff;
    border: none;
  }
  & .reset-btn{
    background-color: #D6D7DE;
    margin-right: 17px;
  }
  & .sel-btn{
    background-color: #4477DD;
  }
}

.creditCard-wrap {
  & .filterTapWap{
    position: fixed;
    top: 0;
    z-index: 101;
    background: #fff;
    width: 100%;
    & .slide-nav{
      background: #FBFBFB;
      border-bottom: .5px solid #E6E6E6;
      & .icon-triangle-up{
        font-size:14px;
        border-bottom: 1px solid #fff;
      }
      & .icon-triangle-up.active{
        color:#FF7909;
      }
      & .icon-triangle-up.active:after {
        transform: rotate(0deg);
      }
      & .icon-triangle-up:after {
        display:inline-block;
        content: "\E60A";
        transform: rotate(180deg);
      }
      & .icon-triangle-up:before {
          content: "";
      }
    }

    & .page-tab-container{
      & .item{
        display:flex;
        flex-direction: column;
        margin:4px 0px 0px;
        max-height: 250px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        & .sort{
          font-size: 12px;
          color: #A4A4A4;
          padding:0 16px;
        }
        & .subcontent-li{
          position: relative;
          font-size:16px;
          padding:16px;
          border-bottom:.5px solid #eee;
          & label{
            display: block;
          }
          & input{
            display: none;
            &+span::after{
                border: 2px solid transparent;
                border-left: 0;
                border-top: 0;
                content: " ";
                top: 50%;
                right: 15px;
                position: absolute;
                margin-top: -6px;
                width: 4px;
                height: 8px;
                transform: rotate(45deg) scale(1);
                -webkit-transform: rotate(45deg) scale(1);
                        transform: rotate(45deg) scale(1);
                transition: -webkit-transform .2s;
                transition: transform .2s;
            }
            &:checked+span{
              color: #ff7909;
              &::after{
                border-color:#ff7909;
              }
            }
          }
        }
        & .subcontent-li.active{
          font-size:18px;
          color:#FF7909;
        }
      }
      & .mint-tab-container-item:nth-last-of-type(1) .item .subcontent{
        margin:0 0 0 16px;
        & .subcontent-li{
          float:left;
          width:110px;
          height:28px;
          font-size: 12px;
          color: #1C2042;
          background: #F3F3F3;
          border-radius: .3em;
          padding: 0;
          margin:8px;
          margin-left:0px;
          display:flex;
          justify-content:center;
          align-items:center;
          & label{
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 28px;
          }
          & input:checked+span:after{
            width: 3px;
            height: 6px;
            right: 4px;
            bottom: 4px;
            top: auto;
          }
        }
        & .subcontent-li:nth-of-type(3){
          margin-right:0;
        }
      }
    }
  }
  & .cardWrap {
    overflow: hidden;
    & .card:nth-of-type(1){
      padding-top:40px;
    }
  }
  & .slide-nav {
    padding: 0 16px;
    display: flex;
    position: -webkit-sticky;
    position: sticky;
    &>div {
      width: 50%;
      color: #1c2042;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
    }
    &>div.active {
      
      border-bottom: 1px solid #FF7909;
    }
  }
}

</style>
