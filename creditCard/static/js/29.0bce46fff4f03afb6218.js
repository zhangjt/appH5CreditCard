webpackJsonp([29],{kV3w:function(t,e){},zixU:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),a=i("iVvP"),n=i("Au9i");s.default.use(n.InfiniteScroll),s.default.component(n.Spinner.name,n.Spinner);var r={components:{Empty:a.a},props:{},data:function(){return{buzy:!1,isLoading:!1,wrapperHeight:0,title:"提现记录",total:"--/--",currentPage:1,recordList:[],hasRecord:!0}},computed:{},methods:{getRecordListData:function(){var t=this;this.isLoading=!0;var e={page:this.currentPage,limit:10};this.$http.getWithDrawRecord(e).then(function(e){t.isLoading=!1,e&&((e.total||e.total>=0)&&(t.total=e.total.toFixed(2)),e.list&&e.list.length>0?(t.hasRecord=!0,t.currentPage=t.currentPage+1,t.recordList=t.recordList.concat(e.list),e.list.length<10&&(t.buzy=!0)):1==t.currentPage&&(t.hasRecord=!1))}).catch(function(e){1==t.currentPage&&(t.hasRecord=!1)})},loadMore:function(){this.getRecordListData()},getDate:function(t){return t.split(" ",2)[0]},getTime:function(t){return t.split(" ",2)[1]},getStatus:function(t){return t<=0&&t>-1?"待审核":t>=1?"已通过":"已拒绝"}},created:function(){},mounted:function(){this.$refs&&this.$refs.wrapper&&(this.wrapperHeight=document.documentElement.clientHeight-this.$refs.wrapper.getBoundingClientRect().top)}},o=i("XyMi");var c=function(t){i("kV3w")},l=Object(o.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"w-record-container"},[i("mt-header",{staticClass:"boder-header",attrs:{fixed:"",title:t.title}},[i("router-link",{attrs:{slot:"left",to:"/mine/withDraw"},slot:"left"},[i("mt-button",{attrs:{icon:"back"}})],1)],1),t._v(" "),i("div",{staticClass:"record-top"},[i("span",[t._v("累计提现(元)")]),t._v(" "),i("span",{staticClass:"big"},[t._v(t._s(t.total))])]),t._v(" "),t._m(0),t._v(" "),t.hasRecord?i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],ref:"wrapper",staticClass:"wallet-list",style:{height:t.wrapperHeight+"px"},attrs:{"infinite-scroll-disabled":"buzy","infinite-scroll-distance":"10"}},[t._l(t.recordList,function(e,s){return i("div",{key:s,staticClass:"draw-item"},[i("div",{staticClass:"draw-item-top"},[i("span",{staticClass:"time"},[t._v(t._s(t.getDate(e.addtime)+"\n"+t.getTime(e.addtime)))]),t._v(" "),i("span",{staticClass:"center"},[t._v(t._s(e.fee.toFixed(2)))]),t._v(" "),i("span",{staticClass:"center"},[t._v(t._s(e.poundage.toFixed(2)))]),t._v(" "),i("span",{staticClass:"right"},[t._v(t._s(t.getStatus(e.audit_status)))])]),t._v(" "),i("div",{staticClass:"draw-item-top"})])}),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading"},[i("mt-spinner",{attrs:{type:"fading-circle"}}),t._v(" "),i("span",[t._v("加载中...")])],1)],2):t._e(),t._v(" "),t.hasRecord?t._e():i("empty")],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fake-head"},[e("span",[this._v("提现时间")]),this._v(" "),e("span",[this._v("提现金额(元)")]),this._v(" "),e("span",[this._v("手续费(元)")]),this._v(" "),e("span",[this._v("审核结果")])])}],!1,c,"data-v-6ab6e35c",null);e.default=l.exports}});
//# sourceMappingURL=29.0bce46fff4f03afb6218.js.map