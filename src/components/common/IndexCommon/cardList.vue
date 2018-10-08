<template>
  <article class="card border-bottom" @click="turnUrl">
  	<div class="logo">
  		<img :src="card.imgUrl" alt="">
  		<div v-show="false" class="test">
  		<img  src="~@/assets/images/empty_wap.png" alt="">
  		</div>
  		<div class="annualFee" v-if="!card.rebateDescription==''">{{card.rebateDescription}}</div>
  	</div>

  	<div class="content">
  		<div class="title">{{card.name}}</div>
  		<div class="subtitle">{{card.propaganda}}</div>
  		<div class="decWrap">
  			<div class="dec dec1" v-if="card.tab1!=''&&card.tab1!=null">{{card.tab1}}</div>
  			<div class="dec dec2" v-if="card.tab2!=''&&card.tab2!=null">{{card.tab2}}</div>
  			
  		</div>

  	</div>
  </article>
</template>
<script>
// import {accessUrl, baseUrl} from '@/utils/env'
export default {
  name: 'cardList',
  props: {
    card: {
      type: Object
    }
  },
  methods: {
    turnUrl () {

      let url;
      let routeData = this.$router.resolve({name: 'creditCardInfo' });
      if (this.$wanka.isWanka()) {
        //app要加上域名
        let protocol = window.location.protocol
        let host = window.location.host
        url = protocol + host + routeData.href;
      }else{
        url=routeData.href
      }

      this.$toPage.toPage(url,{id:this.card.id,name:this.card.name})

    }
  }
}
</script>
<style lang="postcss" scoped>
.test {
  background: url("~@/assets/images/empty_wap.png");
}
.card {
  font-size: 14px;
  color: #1c2042;
  margin: 0px 20px;
  padding-top:0px;
  display: flex;

  & .logo {
    position: relative;
    width: 128px;
    height: 80px;
    margin: 30px 22px 20px 0;
    flex: none;

    & img {
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 4px;
      background: none;
      z-index: 1;
    }
    & .annualFee {
      position: absolute;
      top: -17px;
      right: 0;
      background: #ff534f;
      font-size: 10px;
      color: #fff;
      padding: 0 4px 8px;
      border-radius: 4px;
      z-index: 0;
    }
  }
  & .content {
    margin: 30px 0 20px;
    display: flex;
    flex-direction: column;
    & .title {
      font-size: 18px;
      color: #1c2042;
    }
    & .subtitle {
      font-size: 12px;
      color: #a4a4a4;
    }
    & .decWrap {
      /*display:flex;*/
      & .dec {
        font-size: 10px;
        border-radius: 10px;
        border: 1px solid #999;
        margin: 10px 5px 0 0;
        padding: 0 5px;
        float: left;
      }
      & .dec1 {
        color: #ff9000;
        border: 1px solid #ff9000;
      }
      & .dec2 {
        color: #597ffe;
        border: 1px solid #597ffe;
      }
      & .dec3 {
        color: #00d6a6;
        border: 1px solid #00d6a6;
      }
    }
  }
}
</style>
