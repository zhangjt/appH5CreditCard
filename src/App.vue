<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    
    <menu-con v-if="menuShow" :activeVal="activeVal"></menu-con>
    <mt-popup v-model="popupVisible" class="subpage" position="right">
      <router-view name="subpage"></router-view>
    </mt-popup>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import menuCon from '@/pages/index/menu'

export default {
  name: 'App',
  data() {
    return {
      tabSelected: 0,
      popupVisible: false,
      menuShow: false,
      subTitle: '',
      subTitleShow: false,
      activeVal:'home',
    }
  },
  components: {
    menuCon
  },
  methods: {
    changeStoreRoute(now) {
      // menu切换icon
      if (~now.path.indexOf('mine')) {
        this.activeVal='mine'
      }
      if (~now.path.indexOf('FineNews')) {
        this.activeVal='news'
      }
      if (now.path=='/') {
        this.activeVal='home'
      }
      /** 显示、隐藏子页面 */
      if (now.meta.subpage) {
        this.popupVisible = true
      } else {
        this.popupVisible = false
      }
      //辨别app/web,显示隐藏底部菜单tab
      if(this.$wanka.isWanka()){
        this.menuShow = false
      }else{

        // 显示、隐藏底部菜单tab 
        if (now.meta.menu == false) {
          this.menuShow = false
        } else {
          this.menuShow = true
        }
      }
    },
    hidePopup() {
      this.$router.go(-1)
    }
  },
  watch: {
    $route: 'changeStoreRoute',
    // tabSelected: function (val, oldVal) {
    //   switch (val) {
    //     case 'home':
    //       this.$router.push('/')
    //       break
    //     case 'invite':
    //       this.$router.push('/mine/msgCenter')
    //       break
    //     case 'news':
    //       this.$router.push('/hot/fineNews')
    //       break
    //     case 'mine':
    //       this.$router.push('/mine')
    //       break
    //   }
    // }
  },
  mounted() {}
}

</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.subpage {
  width: 100%;
  height: 100%;
}

img {
  /* 图片兼容性处理 */
  content: normal !important;
}

html,
body {
  /* 会影响我的返利悬浮效果，所以注释掉 */
  /* overflow: scroll;
  overflow-x: hidden; */
  /* -webkit-overflow-scrolling: touch; */
  user-select: none;
  background: white;
}

body {
  padding-top: constant(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "dinm";
  src: url("/static/font/DINMittelschrift.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

a {
  text-decoration: none;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bodyRel {
  position: relative;
}

.bodyFixed {
  position: fixed;
  width: 100%;
}
/*homebanner*/
.home-banner {
  .swiper-wrapper {
    padding-top: 4px;
  }
}
/*bankbanner*/

.bank-banner {
  background-color: none;
  .swiper-wrapper {
    padding-top: 4px;
  }
  & .swiper-container {
    & .swiper-pagination {
      & .swiper-pagination-bullet {
        width: 10px;
        height: 5px;
        background-color: #6b3ae3;
        border-radius: 1rem;
      }
    }
  }
}

.border-top {
  background-image: linear-gradient( 180deg,
  #e6e6e6,
  #e6e6e6 50%,
  transparent 50%);
  background-repeat: no-repeat;
  background-size: 120% 1px;
  background-position: 100% 0;
}

.border-bottom {
  background-image: linear-gradient( 180deg,
  #e6e6e6,
  #e6e6e6 50%,
  transparent 50%);
  background-repeat: no-repeat;
  background-size: 120% 1px;
  background-position: 0 100%;
}

.border-right {
  background-image: linear-gradient( 90deg,
  #e6e6e6,
  #e6e6e6 50%,
  transparent 50%);
  background-repeat: no-repeat;
  background-size: 1px 100%;
  background-position: right top;
}

.single-image img {
  vertical-align: middle;
}


/*swiper-start*/

.s-menu {
  position: absolute;
  top: 0;
  height: 39px;
  overflow: hidden;
  display: flex;
  & span {
    flex: 1;
    display: block;
    height: 39px;
    background-color: #fff !important;
    border-radius: 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #1c2042;
    letter-spacing: -0.23px;
    margin: 0 !important;
    line-height: 39px;
    opacity: 1;
    border: none;
    border-radius: 0;
  }

  & .swiper-pagination-bullet-active {
    font-weight: bold;
  }
}

.swiper-wrapper {
  padding-top: 39px;
}

.swiper-scrollbar {
  height: 3px !important;
  position: absolute;
  top: 36px;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  & .swiper-scrollbar-drag {
    height: 3px;
    background: #ffa300;
    border-radius: 3px;
  }
}

.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: default;
}

.swiper-pagination-bullet-custom {
  width: 10px;
  height: 10px;
  text-align: center;
  line-height: 10px;
  font-size: 6px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}


/*swiper-end*/

.activity-banner {
  background: none;
  & .swiper-wrapper {
    padding-top: 0 !important;
  }
}
.activity-banner {
  background-color: none;
  & .multi-image{
    & .swiper-container {

      & img{
        margin-top:10px;
        margin-bottom:25px;
      }
      & .swiper-pagination {
        & .swiper-pagination-bullet {
          width: 10px;
          height: 5px;
          background-color: #6b3ae3;
          border-radius: 1rem;
        }
      }
    }
  }

}

.blankDiv{
  width:100%;
  height:44px;
}
</style>
