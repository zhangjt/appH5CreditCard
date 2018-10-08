<template>
    <div class="my-card-container">
        <go-back title="银行卡" url="/mineSetting"></go-back>
        <bank-card-item v-for="(item, index) in bankCardList" :key="index" :cardInfo="item"></bank-card-item>
    </div>
</template>

<script>
import BankCardItem from './BankCardItem'
import GoBack from "@/pages/index/GoBack";
export default {
   components:{BankCardItem,GoBack},
   props:{},
   data(){
      return {
          bankCardList:[],
      }
   },
   watch:{},
   computed:{},
   methods:{},
   created(){
       if(this.$route.params){
           this.bankCardList.push(this.$route.params.cardInfo);
       }
   },
   mounted(){}
}
</script>
<style lang="postcss" scoped>
    .my-card-container{
        background: #3D414A;
        height: 667px;
    }
</style>