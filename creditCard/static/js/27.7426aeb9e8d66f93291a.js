webpackJsonp([27],{"/nY6":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={components:{},props:{},data:function(){return{arrowUrl:"/static/images/into.png",headImg:"/static/images/photo_f.png",phone:"",rebateFee:0,balance:0,nickname:"",unread:!1}},watch:{},computed:{nick:function(){return this.nickname?this.nickname:this.phone?this.phone.substring(0,3)+"****"+this.phone.substring(8,11):"  "}},methods:{getUserInfo:function(){var t=this;this.$http.getUserInfo().then(function(s){s&&(t.headImg=s.head_img,t.phone=s.phone,t.nickname=s.nickname,t.rebateFee=s.rebateFee.toFixed(2),t.balance=s.balance.toFixed(2),sessionStorage.setItem("balance",t.balance),t.cardInfo=s.bankCardInfo,t.cardInfo&&sessionStorage.setItem("isBind",t.cardInfo.isBind))})},getMsgList:function(){var t=this,s={page:this.curentPage,limit:1};this.$http.getMsgList(s).then(function(s){s&&(t.unread=s.unread>0)})},goProgress:function(){this.$router.push({path:"/mine/mineRecord",query:{index:"2",title:"进度查询"}})},goApply:function(){this.$router.push({path:"/mine/applyCard"})},goMsg:function(){this.$router.push({path:"/mine/msgCenter"})},goSetting:function(){this.$router.push({path:"/mineSetting"})},goRebate:function(){this.$router.push({path:"/mine/mineRecord",query:{index:"1",title:"我的返利"}})},goWallet:function(){this.$router.push({path:"/mine/mineWallet"})},goAboutUs:function(){this.$router.push("/mine/aboutUs")}},created:function(){this.getUserInfo();var t=sessionStorage.getItem("balance");t&&(this.balance=t),this.getMsgList()},mounted:function(){}},e=i("XyMi");var n=function(t){i("9U+O")},r=Object(e.a)(a,function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"mine-container"},[i("div",{staticClass:"mine-top"},[i("div",{staticClass:"top-top"},[i("img",{attrs:{src:t.headImg,onerror:"javascript:this.src='/static/images/photo_f.png';"},on:{click:t.goSetting}}),t._v(" "),i("div",{staticClass:"top-left"},[i("span",[t._v(t._s(t.nick))])]),t._v(" "),i("div",{staticClass:"msg-alert",on:{click:t.goMsg}},[i("img",{attrs:{src:"/static/images/notice@2x.png"}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.unread,expression:"unread"}],staticClass:"badage",attrs:{src:"/static/images/dot.png"}})])]),t._v(" "),i("div",{staticClass:"top-bottom"},[i("div",{staticClass:"bottom-left",on:{click:t.goRebate}},[i("div",{staticClass:"left-text"},[i("span",{staticClass:"big-font"},[t._v(t._s(t.rebateFee))]),t._v(" "),i("span",{staticClass:"small-font"},[t._v("我的返利(元)")])]),t._v(" "),i("img",{attrs:{src:t.arrowUrl}})]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"bottom-right",on:{click:t.goWallet}},[i("div",{staticClass:"right-text"},[i("span",{staticClass:"big-font"},[t._v(t._s(t.balance))]),t._v(" "),i("span",{staticClass:"small-font"},[t._v("我的钱包(元)")])]),t._v(" "),i("img",{attrs:{src:t.arrowUrl}})])])]),t._v(" "),i("div",{staticClass:"mine-divider"}),t._v(" "),i("div",{staticClass:"mine-bottom"},[i("div",{staticClass:"msg-area",on:{click:t.goProgress}},[i("img",{attrs:{src:"/static/images/Group7@2x.png"}}),t._v(" "),t._m(1),i("img",{staticClass:"arrow-img",attrs:{src:"/static/images/personal_enter.png"}})]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("div",{staticClass:"msg-area",on:{click:t.goAboutUs}},[i("img",{attrs:{src:"/static/images/we@2x.png"}}),t._v(" "),t._m(2),i("img",{staticClass:"arrow-img",attrs:{src:"/static/images/personal_enter.png"}})]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("div",{staticClass:"msg-area",on:{click:t.goApply}},[i("img",{attrs:{src:"/static/images/apply@2x.png"}}),t._v(" "),t._m(3),i("img",{staticClass:"arrow-img",attrs:{src:"/static/images/personal_enter.png"}})]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("div",{staticClass:"msg-area",on:{click:t.goSetting}},[i("img",{attrs:{src:"/static/images/fit@2x.png"}}),t._v(" "),t._m(4),i("img",{staticClass:"arrow-img",attrs:{src:"/static/images/personal_enter.png"}})]),t._v(" "),i("div",{staticClass:"line"})])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"top-line"},[s("div",{staticClass:"line"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"dot"},[s("span",[this._v("进度查询")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"dot"},[s("span",[this._v("关于我们")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"dot"},[s("span",[this._v("申卡提单")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"dot"},[s("span",[this._v("个人设置")])])}],!1,n,"data-v-bacce608",null);s.default=r.exports},"9U+O":function(t,s){}});
//# sourceMappingURL=27.7426aeb9e8d66f93291a.js.map