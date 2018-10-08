<template>
    <div class="empty-cat-container">
        <img src="/static/images/empty_cat.png">
    </div>
</template>

<script>
export default {
   components:{},
   props:{},
   data(){
      return {
      }
   },
   watch:{},
   computed:{},
   methods:{},
   created(){
       //TODO 自动计算容器高度让img垂直居中
   },
   mounted(){}
}
</script>
<style lang="postcss" scoped>
    .empty-cat-container{
        padding-top: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        & img{
            width:200px;
        }
    }
</style>