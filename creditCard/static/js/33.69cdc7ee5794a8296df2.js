webpackJsonp([33],{GyYJ:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("aGOU"),i=e("REo8"),o=(e("N+NQ"),{data:function(){return{creditCardRecordList:[],busy:!1,page:0,isLoadMore:!1,noData:!1,afterLoad:!1,toastShow:!1,toastContent:""}},created:function(){window.loadRecordCallBack=this.loadRecordCallBack},components:{MyCreditCardRecordListItem:a.a,NoneView:i.a},computed:{},mounted:function(){},methods:{dismiss:function(){this.toastShow=!1},showToast:function(t){this.toastContent=t,this.toastShow=!0},apply:function(){(this.isiOS()||this.isAndroid())&&this.ToAppPage("/loanIndex","",!0)},loadMore:function(){this.page++,this.busy=!0,this.isLoadMore=!0,this.GeneralGetData({url:"/app/addreg/record",reqData:{type:4,page:this.page,limit:10},callback:"loadRecordCallBack"})},loadRecordCallBack:function(t){if(this.afterLoad=!0,0==t.isSuccess){if(0==t.responseData.count)return this.busy=!0,void(this.isLoadMore=!1);this.creditCardRecordList=this.creditCardRecordList.concat(t.responseData.list),this.creditCardRecordList.length<t.responseData.count&&(this.busy=!1),this.isLoadMore=!1}else this.busy=!0,this.isLoadMore=!1,this.showToast(t.responseData)}}}),r=e("XyMi");var n=function(t){e("K9E7")},d=Object(r.a)(o,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"my-loan-record-container"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.creditCardRecordList.length>0,expression:"creditCardRecordList.length>0"}]},[t._m(0),t._v(" "),e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"content-style",attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"10"}},[t._l(t.creditCardRecordList,function(t,s){return e("my-credit-card-record-list-item",{key:s,attrs:{recordItem:t}})}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoadMore,expression:"isLoadMore"}],staticClass:"weui-loadmore"},[e("i",{staticClass:"weui-loading"}),t._v(" "),e("span",{staticClass:"weui-loadmore__tips"},[t._v("正在加载")])])],2)]),t._v(" "),e("none-view",{directives:[{name:"show",rawName:"v-show",value:t.afterLoad&&t.creditCardRecordList.length<=0,expression:"afterLoad && creditCardRecordList.length<=0"}],on:{apply:t.apply}}),t._v(" "),e("toast",{attrs:{showToast:t.toastShow,toastContent:t.toastContent},on:{"update:showToast":function(s){t.toastShow=s},dismiss:t.dismiss}})],1)},[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"my-loan-record-title"},[s("span",{staticClass:"data-tip-style"},[this._v("登记日期")]),this._v(" "),s("span",{staticClass:"bank-tip-style"},[this._v("贷款平台")]),this._v(" "),s("span",{staticClass:"check-in-tip-style"},[this._v("登记账号")])])}],!1,n,"data-v-4a3b15c4",null);s.default=d.exports},K9E7:function(t,s){}});
//# sourceMappingURL=33.69cdc7ee5794a8296df2.js.map