webpackJsonp([16],{Lp6z:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7+uW"),a=e("POcy"),n=e.n(a),o=e("iVvP"),r=(e("nFqq"),{data:function(){return{}},created:function(){},components:{},computed:{},props:{msgItem:{type:Object},isShowDate:{type:Boolean},msgType:{type:String}},methods:{goToMsgDetail:function(){"0"==this.msgType?this.$router.push({path:"/msgDetail",query:{msgId:this.msgItem.id}}):window.location.href=this.msgItem.url}}}),m=e("XyMi");var c=function(t){e("W1L0")},l=Object(m.a)(r,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"msg-list-item-container",on:{click:t.goToMsgDetail}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowDate,expression:"!isShowDate"}],staticClass:"date-style"},[t._v(t._s(t.msgItem.addtime.substring(0,10)))]),t._v(" "),e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:Boolean(t.msgItem.image),expression:"Boolean(msgItem.image)"}],staticClass:"advert-container"},[e("img",{staticClass:"advert-img",attrs:{src:t.msgItem.image}})]),t._v(" "),e("div",{staticClass:"intro-container",style:{"margin-top":Boolean(t.msgItem.image)?"0px":"10px"}},[e("div",{staticClass:"title-class"},[t._v(t._s(t.msgItem.title))]),t._v(" "),"3"==t.msgType?e("div",{staticClass:"intro-class"},[t._v(t._s(t.msgItem.content))]):t._e(),t._v(" "),e("div",{staticClass:"cut-off-img"}),t._v(" "),e("div",{staticStyle:{"font-size":"12px",color:"#909090","margin-top":"8px"}},[t._v("查看详情")])])])])},[],!1,c,"data-v-c199233a",null).exports;i.default.use(n.a);var g={components:{MsgListItem:l,Empty:o.a},data:function(){return{titleName:"",msgType:"0",page:1,hasNoData:!1,msgList:[],isRefresh:!1,isCreate:!1}},created:function(){this.isCreate=!0},activated:function(){window.getMsgListCallBack=this.getMsgListCallBack,this.titleName=this.$route.query.titleName,this.msgType=this.$route.query.msgType,this.$http.msgAllRead(this.msgType),this.isCreate||this.refresh()},methods:{reback:function(){this.$router.push({path:"/mine/msgCenter"})},done:function(){},refresh:function(t){this.page=1,this.isRefresh=!0,this.getMsgList(t)},infinite:function(t){this.isRefresh=!1,this.getMsgList(t)},getMsgList:function(t){var s={type:this.msgType,limit:30,page:this.page};this.done=t,this.$http.loadData("/app/msg/list",s,"getMsgListCallBack")},getMsgListCallBack:function(t){if(this.page+=1,this.isCreate=!1,t){if(t.responseData&&(t=t.responseData),this.hasNoData=0==t.count,this.hasNoData)return this.done(!0),void(this.msgList=[]);this.isRefresh?(this.msgList=t.list,this.done(!0)):(this.msgList=this.msgList.concat(t.list),this.done(this.msgList.length==t.count))}},getLastDate:function(t){var s=t-1;if(s<0)return!1;var e=this.msgList[s];return this.msgList[t].addtime.substring(0,10)==e.addtime.substring(0,10)}}};var h=function(t){e("fFH8")},u=Object(m.a)(g,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mine-msg-container"},[e("mt-header",{staticClass:"boder-header",attrs:{title:t.titleName}},[e("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.reback},slot:"left"})],1),t._v(" "),e("scroller",{staticClass:"scroller-class",attrs:{"on-refresh":t.refresh,"on-infinite":t.infinite}},[t.hasNoData?t._e():e("div",{staticClass:"all-msg-container"},t._l(t.msgList,function(s,i){return e("div",{key:i},[e("msg-list-item",{attrs:{msgItem:s,isShowDate:t.getLastDate(i),msgType:t.msgType}})],1)})),t._v(" "),t.hasNoData?e("empty",{staticClass:"empty"}):t._e()],1)],1)},[],!1,h,"data-v-4d0d18c2",null);s.default=u.exports},W1L0:function(t,s){},fFH8:function(t,s){}});
//# sourceMappingURL=16.afb0f883aaceb7cf9312.js.map