webpackJsonp([34],{TWM6:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i=n("HnGU"),s=n("iVvP"),r=n("Au9i");a.default.component(r.Spinner.name,r.Spinner);var o={props:[],components:{GoBack:i.a,Empty:s.a},data:function(){return{title:"选择银行",bankList:[],currentPage:1,buzy:!1,isLoading:!1,hasRecord:!0,wrapperHeight:0,active:"",done:function(){}}},mounted:function(){this.$refs&&this.$refs.wrapper&&(this.wrapperHeight=document.documentElement.clientHeight-this.$refs.wrapper.getBoundingClientRect().top)},created:function(){},methods:{queryBankList:function(){var t=this;this.isLoading=!0;var e={page:this.currentPage,limit:15};console.log(this.currentPage),this.$http.queryBankList(e).then(function(e){t.isLoading=!1,e&&(e.total&&(t.total=e.total.toFixed(2)),e.list&&e.list.length>0?(t.hasRecord=!0,t.currentPage=t.currentPage+1,t.bankList=t.bankList.concat(e.list),e.list.length<10&&(t.buzy=!0),t.done&&t.done(!0)):(1==t.currentPage&&(t.hasRecord=!1),t.done&&t.done(!0)))}).catch(function(e){1==t.currentPage&&(t.hasRecord=!1)})},loadMore:function(t){this.done=t,this.queryBankList()},getItem:function(t){sessionStorage.setItem("bankname",t.name),sessionStorage.setItem("bankId",t.id),this.$router.go(-1)}}},c=n("XyMi");var l=function(t){n("othw")},u=Object(c.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}],staticClass:"bank-card-list-container"},[n("go-back",{attrs:{title:"选择银行",url:"/mine/applyCard"}}),t._v(" "),n("div",{staticClass:"bankListWrap"},[t.hasRecord?n("scroller",{class:""!==t.active?"overflow":"",attrs:{"on-infinite":t.loadMore}},[this.$wanka.isWanka()?t._e():n("div",{staticClass:"blankDiv"}),t._v(" "),t._l(t.bankList,function(e,a){return n("div",{key:a,staticClass:"bank-item-style",on:{click:function(n){t.getItem(e)}}},[n("div",{staticClass:"bank-hor-item-style"},[n("img",{staticClass:"bank-img-style",attrs:{src:e.icon}}),t._v(" "),n("div",{staticClass:"bank-name-style"},[t._v(t._s(e.name))])]),t._v(" "),n("div",{staticClass:"space-line"})])})],2):t._e()],1)],1)},[],!1,l,"data-v-336bb94c",null);e.default=u.exports},othw:function(t,e){}});
//# sourceMappingURL=34.c46ffcf560330105748e.js.map