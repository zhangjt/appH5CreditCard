<template>
    <div class="modify_nickname_container">
        <mt-header title="修改昵称" class="boder-header">
            <router-link to="/mineSetting" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button @click="actionModify" slot="right">保存</mt-button>
        </mt-header>
        <mt-field placeholder='请输入昵称' v-model="nName" :attr="{ maxlength: 20 }"></mt-field>
    </div>
</template>

<script>
import { Field } from "mint-ui";
import { mapActions, mapState, mapMutations } from "vuex";
import Vue from 'vue';
Vue.component(Field.name, Field);
export default {
  components: {},
  props: {},
  data() {
    return {
      nName:''
    };
  },
  watch: {},
  computed: {
    ...mapState({
      nickName: state => state.accountInfo.nickname
    })
  },
  methods: {
    actionModify() {
      if(this.nName){
        let params = {nickname:this.nName}
        this.$http.modifyNickname(params).then((res) => {
          if (res && res.statusCode ==0 ) {
            this.$store.commit('modifyNickName',this.nName);
            this.$toast('昵称修改成功!')
          }else{
            if(res.statusMsg){
              this.$toast(res.statusMsg)
            }
          }
        }).catch(err => {
          //do nothing
        })
      }else{
        this.$toast('请输入昵称!')
      }
    }
  },
  created() {
    this.nName = this.nickName;
  },
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.modify_nickname_container {
  background: #fbfbfb;
  height: 667px;
  & .tip {
    font-size: 12px;
    color: #b3b3b3;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }

  & .mint-cell {
    height: 63px;
    border-top: 1px solid #fbfbfb;
    border-bottom: 1px solid #fbfbfb;
    font-size: 16px;
    color: #1c2042;
    padding-left: 10px;
    
  }

  & .mint-cell:last-child {
    background-image: none;
  }
}
</style>