// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'weui/dist/style/weui.css'
import router from './router'
import store from './store'
import http from './modules/http'
import valid from './modules/valid'
import wanka from './modules/wanka'
import toPage from './modules/toPage'
import App from './App'
import Toast from './components/common/Toast'

import utils from './modules/utils'
// import Loading from './components/common/Loading'
// import Alert from './components/common/Alert'
// import Confirm from './components/common/Confirm'
import {
  Button,
  Header,
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Navbar,
  Field,
  Loadmore,
  Checklist,
  MessageBox,
  Popup,
  InfiniteScroll,
  Cell,
  DatetimePicker
} from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/iconfont.css'
import '@/assets/css/mint_reset.css'

// 滚动
import VueScroller from 'vue-scroller'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$valid = valid
Vue.prototype.$wanka = wanka
Vue.prototype.$toPage = toPage

/** 引入的插件列表 */
Vue.use(Toast)
Vue.use(InfiniteScroll)
// Vue.use(Loading)
// Vue.use(Alert)
// Vue.use(Confirm)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Navbar.name, Navbar)
Vue.component(Field.name, Field)
Vue.component(Checklist.name, Checklist)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Popup.name, Popup)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Cell.name, Cell)
Vue.use(VueScroller)

router.beforeEach((to, from, next) => {
  var channel = utils.getUrlParam('channel', from.fullPath) || ''
  console.log(222)
  if (channel) {
    localStorage.setItem('channel', channel)
  }

  if (wanka.isWanka()) {
    // 万卡app直接跳转
    next()
  } else {
    if (to.meta.requireAuth) {
      if (store.state.loginInfo.loginState) {
        next()
      } else {
        next({
          path: '/user/login',
          query: { redirected: to.fullPath } // 登录成功后跳转到该路由
        })
      }
    } else {
      next()
    }
  }
})

Vue.filter('moneyFormal', function (value) {
  if (!value || value == 0) return '0'
  value = parseInt(value) / 100
  value += ''
  var reg = value.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g
  value = value.replace(reg, '$1,')
  return value
})
/** filter */
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

Vue.filter('moneyFormal', function (value) {
  if (!value || value === 0) return '0'
  value = parseInt(value) / 100 // 分到元
  value += '' // 转成字符串
  var reg = value.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g // 千分符的正则
  value = value.replace(reg, '$1,') // 千分位格式化
  return value
})

Vue.filter('moneyFormal2', function (number) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = number / 100
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number

  var prec = !isFinite(+2) ? 0 : Math.abs(2)

  var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep

  var dec = (typeof dec_point === 'undefined') ? '.' : dec_point

  var s = ''

  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  var re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
