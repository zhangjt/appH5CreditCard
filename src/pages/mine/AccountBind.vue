<template>
  <div class="account-bind-container">

    <div class="bind-item-container" @click='goAddCard'>
      <div class="bind-item-style">
        <div class="left-container">
          <span>我的银行卡</span>
        </div>

        <div class="right-container">
          <span>{{cardInfo.isBind > 0? getBankDesc():'未绑定'}}</span>
          <img src='/static/images/personal_enter.png' />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
    };
  },
  props:{
    cardInfo:{
      type:Object
    }
  },
  created() {
  },

  components: {},

  computed: {},

  methods: {
    goAddCard(){
      if(this.cardInfo.isBind > 0){
        //跳转到我的银行卡界面
        this.$router.push({ name: "bankcards",params: { cardInfo:this.cardInfo.cardInfo }});
      }else{
        this.$router.push({ path: "/mineSetting/addCard" });
      }
    },
    getBankDesc(){
      if(this.cardInfo.cardInfo &&this.cardInfo.cardInfo.account.length>4){
        var last = this.cardInfo.cardInfo.account.substr(-4);
        return this.cardInfo.cardInfo.bankName+'('+last+')'
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.account-bind-container {
  background: #fbfbfb;
  padding-bottom: 10px;
  & .bind-item-container {
    & .bind-item-style {
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 20px;
      height: 72px;
      & .left-container {
        display: flex;
        & img {
          width: 30px;
          height: 30px;
          margin: auto 0;
        }
        & span {
          color: #1c2042;
          font-size: 16px;
          line-height: 72px;
          margin-left: 8px;
        }
      }

      & .right-container {
        display: flex;
        & span {
          font-size: 14px;
          color: #1c2042;
          line-height: 72px;
          margin-right: 16px;
        }

        & img {
          width: 7px;
          height: 18px;
          margin: auto 0;
        }
      }
    }

    & .space-line {
      height: 1px;
      margin-left: 27px;
    }
  }
}
</style>
