<template>
    <div class="bankcard-item-container">
        <div class="top">
            <img :src="cardInfo.bankIcon">
            <div class="left">
                <span>{{cardInfo.bankName}}</span>
                <span>{{cardInfo.cardType}}</span>
            </div>
            <span @click="deBind" v-show="false">解绑</span>
        </div>
        <span>{{cardInfo.account}}</span>
    </div>
</template>

<script>
export default {
  components: {},
  props: {
    cardInfo: {
      type: Object
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      deBind(){
          //解绑
      }
  },
  created() {
  },
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.bankcard-item-container {
  color: #ffffff;
  background-image: linear-gradient(90deg, #54c0fa 0%, #5092ff 100%);
  border-radius: 8px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  height: 132px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > span{
      font-size: 20px;
      text-align:center;
  }
  & .top {

    display: flex;
    & > img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }

    & .left{
        margin-left: 20px;
        display: flex;
        flex-direction: column;

        & :nth-child(1){
             font-size: 18px;
        }
        & :nth-child(2){
            font-size: 12px;
        }
    }
    & > span{
        flex-grow: 2;
        text-align: right;
        font-size: 14px;
    }
  }
}
</style>