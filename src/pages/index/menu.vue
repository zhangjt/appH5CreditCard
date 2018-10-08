<template>
    <div class="menu-wrap">
      <div v-for="(item,index) in option" :class="active==item.id?'active':''" size="small" @click.prevent="active = item.id;" @click="turnTo(item.url)"  v-if="item.isShow">
        <div class="img">
          <img slot="icon" :src="active==item.id?item.src_f:item.src">
        </div>
        <div class="label">{{item.label}}</div>
        
      </div>
    </div>
  
</template>
<script>

export default {
  name: 'App',
  props:{
    activeVal:{
      type:String
    }
  },
  data () {
    return {
      tabSelected: 0,
      popupVisible: false,
      active: this.activeVal,
      option: [{
        id: 'home',
        label: '首页',
        src_f: require('@/assets/images/menu_home_f.png'),
        src: require('@/assets/images/menu_home.png'),
        url: '/',
        isShow:true,

      },
      {
        id: 'invite',
        label: '邀请',
        src_f: require('@/assets/images/menu_invite_f.png'),
        src: require('@/assets/images/menu_invite.png'),
        url: 'https://www.baidu.com',
        isShow:false,
      },
      {
        id: 'news',
        label: '资讯',
        src_f: require('@/assets/images/menu_info_f.png'),
        src: require('@/assets/images/menu_info.png'),
        url: '/hot/FineNews',
        isShow:true,
      },
      {
        id: 'mine',
        label: '我的',
        src_f: require('@/assets/images/menu_my_f.png'),
        src: require('@/assets/images/menu_my.png'),
        url: '/mine',
        isShow:true,
      }
      ]
    }
  },
  components: {},
  methods: {
    turnTo (url) {
      if (~url.indexOf('http')) {
        window.location.href=url;
      }else{

      this.$router.push(url)
      }
    },
    changeRoute(newR,oldR){
      //登录成功后跳转到首页时用到
      if (newR.path==='/') {
        this.active="home";
      }
      // if (newR.path==='/creditCardCenter') {
      //   this.active="mine";
      // }
      if (newR.path==='/hot/FineNews') {
        this.active="news";
      }
      if (newR.path==='/mine') {
        this.active="mine";
      }
      
    }

  },
  watch: {
    $route: 'changeRoute',

  },
  mounted () {}
}
</script>
<style lang='postcss' scoped> 

.menu-wrap{
  position:fixed;
  bottom:0;
  z-index:2;
  background:#fff;
  display:flex;
  flex-wrap: wrap;
  height:50px;
  width:100%;
  border-top: .5px solid #C6C6C6;
  &>div{
    flex:1;
    display:flex;
    flex-direction:column;
    & .img{

      flex:1;
      display:flex;
      justify-content:center;
      align-items:center;
      & img{

        height:25px;
      }
    }
    & .label{
      display:flex;
      justify-content:center;
      align-items:center;
      font-size: 9px;
      color: #9EA8A9;
    }

  }
}

</style>
