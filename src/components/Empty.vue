<template>
    <div class="empty-container">
        <img src="/static/images/none_pic.png">
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
   created(){},
   mounted(){}
}
</script>
<style lang="postcss" scoped>
    .empty-container{
        width: 100%;
        left: 0;
        top: 0;

        & img{
             width: 100%;
        }
    }
</style>