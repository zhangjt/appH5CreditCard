<template>
  <article class="topic">
    <div class="left">
      <div class="one" @click="addClick(bigBanner[0])">
        <div class="title">{{bigBanner[0].title}}</div>
        <div class="subTitle">{{bigBanner[0].subTitle}}</div>
        <div class="img"><img :src="bigBanner[0].image" alt="" :onerror="defaultImg"></div>
      </div>
    </div>
    <div class="right">
      <div class="one" v-for='(item,index) in smallBanner' :key="index" @click="addClick(item)">
        <div class="subleft">
          
        <div class="title">{{item.title}}</div>
        <div class="subTitle">{{item.subTitle}}</div>
        </div>
        <div class="img"><img :src="item.image" alt="" :onerror="defaultImg"></div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: 'topic',
  props: {
    topicOption: {
      type: Object
    }
  },
  data() {
    return {
      defaultImg: `this.src='`+require('@/assets/images/default_card.png')+`'`,

    }
  },
  watch: {

  },
  computed: {
    bigBanner() {
      return this.topicOption.bigBanner
    },
    smallBanner() {
      return this.topicOption.smallBanner
    }
  },
  created(){
    // alert(JSON.stringify(this.smallBanner))
  },
  methods:{
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
  }
}

</script>
<style lang="postcss" scoped>
.topic {
  background: #fff;
  width: 100%;
  height: 200px;
  
  overflow:hidden;
  &>div{
    float:left;
  }
  & .left {
    width:170px;
    & .one {
      overflow: hidden;
      width: 170px;
      border-right: .5px solid #ddd;
      display: flex;
      flex-direction: column;
      padding: 20px;

      & .title {
        height:28px;
        overflow:hidden;
        font-size: 18px;
        color: #2F2F2F;
        margin-bottom: 4px;
      }
      & .subTitle {
        height:20px;
        overflow:hidden;
        font-size: 12px;
        color: #FF524F;
        margin-bottom: 10px;
      }
      & img {
        width: 100%;
      }
    }
  }
  & .right {
    width:200px;
    & .one:nth-of-type(1){
      border-bottom:.5px solid #ddd;
    }
    & .one {
      overflow: hidden;
      
      padding: 20px 0 10px 17px;
      display: flex;
      & .subleft{
        display: flex;
        flex-direction: column;
        & .title {
          height:25px;
          overflow:hidden;
          font-size: 16px;
          color: #2F2F2F;
          margin-bottom: 4px;
        }
        & .subTitle{
          height:20px;
          overflow:hidden;
          font-size: 12px;
          color: #FE8418;
          margin-bottom: 10px;
        }

      }

      & img {
        float:left;
        flex:0;
        width: 72px;
        height:auto;
      }
    }
    & .one:nth-of-type(2) {
      & .subleft{
        & .subTitle{
          color: #6E50E3;
        }

      }
    }
  }
}

</style>
