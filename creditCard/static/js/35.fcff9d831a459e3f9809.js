webpackJsonp([35],{"+KC1":function(t,e){},I6d2:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),n=a.n(s),r=a("Au9i"),i=a("NYxO"),o=a("M4fF"),c=a.n(o),d={components:{},props:{},data:function(){return{title:"申请提现",balance:0,drawAmount:"",aggreed:!1,tip:"",realFee:-1,charge:-1,chargeResult:0,realFeeResult:0,min:0,qqHref:"//shang.qq.com/wpa/qunwpa?idkey=c1e9f25d874732e641357e1c9a8bb311133cb92d9793b2da86ad1030b4dc2fc2"}},watch:{drawAmount:function(){if(!/^[0-9]*[1-9][0-9]*$/.test(this.drawAmount))return(this.drawAmount||0==this.drawAmount)&&(this.drawAmount=this.drawAmount.substring(0,this.drawAmount.length-1)),void(this.drawAmount&&0!=this.drawAmount||(this.charge=0,this.realFee=0));var t=parseFloat(this.drawAmount);t>this.balance?(this.drawAmount=this.drawAmount.substring(0,this.drawAmount.length-1),Object(r.Toast)("提现金额超过最大可提现金额")):t>=this.min?this.getCharge():(this.charge=0,this.realFee=0)},charge:function(){this.chargeResult=this.charge.toFixed(2)},realFee:function(){this.realFeeResult=this.realFee.toFixed(2)},aggreed:function(){this.aggreed&&localStorage.setItem("agreed","true")}},computed:n()({},Object(i.d)({cardInfo:function(t){return t.accountInfo.cardInfo}}),{minFee:function(){return"最低可提现金额"+this.min+"元"}}),methods:n()({},Object(i.b)(["getUserInfo"]),{drawAll:function(){var t=parseFloat(this.balance);t&&(this.drawAmount=Math.floor(t))},doWithDraw:function(){var t=parseFloat(this.drawAmount);t>this.balance?(this.drawAmount=this.drawAmount.substring(0,this.drawAmount.length-1),Object(r.Toast)("提现金额超过最大可提现金额")):t<this.min?Object(r.Toast)("提现金额必须大于"+this.min+"元"):this.aggreed?this.drawAmount?this.withdrawRequest():Object(r.Toast)("请输入提现金额"):Object(r.Toast)("请先阅读并同意条款")},withdrawRequest:function(){var t=this,e={fee:this.drawAmount};this.$http.doWithDraw(e).then(function(e){e&&(e.statusMsg&&Object(r.Toast)(e.statusMsg),t.balance=t.balance-parseFloat(t.drawAmount),sessionStorage.setItem("balance",t.balance))})},getCharge:c.a.throttle(function(){var t=this,e={amount:this.drawAmount};this.$http.getCharge(e).then(function(e){e&&((e.fee||0==e.fee)&&(t.charge=e.fee),e.accountAmount&&(t.realFee=e.accountAmount))})},2e3),getBankDesc:function(){if(this.cardInfo&&this.cardInfo.cardInfo&&this.cardInfo.cardInfo.account&&this.cardInfo.cardInfo.account.length>4){var t=this.cardInfo.cardInfo.account.substr(-4);return this.cardInfo.cardInfo.bankName+"("+t+")"}}}),created:function(){var t=this;this.charge=0,this.realFee=0,this.getUserInfo(),this.balance=sessionStorage.getItem("balance"),this.min=sessionStorage.getItem("minfee")||0,localStorage.getItem("agreed")&&(this.aggreed=!0),this.$http.getFee().then(function(e){e&&e.keys&&e.keys[0]&&(t.tip=e.keys[0])})},mounted:function(){}},l=a("XyMi");var u=function(t){a("+KC1")},h=Object(l.a)(d,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"overflow"},[a("mt-header",{staticClass:"boder-header",attrs:{fixed:"",title:t.title}},[a("router-link",{attrs:{slot:"left",to:"/mine/mineWallet"},slot:"left"},[a("mt-button",{attrs:{icon:"back"}})],1),t._v(" "),a("router-link",{attrs:{slot:"right",to:"/mine/withDraw/withDrawRecord"},slot:"right"},[a("mt-button",[t._v("提现记录")])],1)],1),t._v(" "),a("div",{staticClass:"draw-container"},[a("div",{staticClass:"bank"},[a("span",[t._v("到账银行")]),t._v(" "),a("span",[t._v(t._s(t.getBankDesc()))])]),t._v(" "),a("div",{staticClass:"all"},[a("span",[t._v("提现金额")]),t._v(" "),a("span",{on:{click:t.drawAll}},[t._v("全部提现")])]),t._v(" "),a("div",{staticClass:"input-area"},[a("span",[t._v("¥")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.drawAmount,expression:"drawAmount",modifiers:{trim:!0}}],ref:"mInput",attrs:{autofocus:"autofocus",type:"integer",name:"points",min:"10",placeholder:t.minFee},domProps:{value:t.drawAmount},on:{input:function(e){e.target.composing||(t.drawAmount=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("div",{staticClass:"draw-top"},[a("span",{staticClass:"tip"},[t._v("我的钱包余额(元):")]),t._v(" "),a("span",{staticClass:"money"},[t._v(t._s(t.balance))])]),t._v(" "),a("div",{staticClass:"charge"},[a("span",[t._v("手续费")]),t._v(" "),a("span",[t._v(t._s(t.chargeResult))])]),t._v(" "),a("div",{staticClass:"charge"},[a("span",[t._v("实际到账金额")]),t._v(" "),a("span",[t._v(t._s(t.realFeeResult))])]),t._v(" "),a("div",{staticClass:"btn",on:{click:t.doWithDraw}},[t._v("\n          申请提现\n      ")]),t._v(" "),a("div",{staticClass:"ck-area"},[a("div",{staticClass:"input-ck"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.aggreed,expression:"aggreed"}],attrs:{id:"agreeCk",type:"checkbox"},domProps:{checked:Array.isArray(t.aggreed)?t._i(t.aggreed,null)>-1:t.aggreed},on:{change:function(e){var a=t.aggreed,s=e.target,n=!!s.checked;if(Array.isArray(a)){var r=t._i(a,null);s.checked?r<0&&(t.aggreed=a.concat([null])):r>-1&&(t.aggreed=a.slice(0,r).concat(a.slice(r+1)))}else t.aggreed=n}}}),t._v(" "),a("label",{class:{"label-highlighted":t.aggreed},attrs:{for:"agreeCk"}},[a("span",[t._v("我已经阅读并同意以下条款")])])]),t._v(" "),a("div",{staticClass:"text-dis"},[t._v("\n              1.提现金额"),a("a",[t._v(t._s(t.tip))])]),t._v(" "),a("div",{staticClass:"text-dis"},[t._v("\n              2.申请提现后，系统会在每周二，周五审核发放，请留意银行消息通知。\n          ")]),t._v(" "),a("div",{staticClass:"text-dis"},[t._v("\n            3.如有疑问，加入"),a("a",{attrs:{target:"_blank",href:t.qqHref}},[t._v("qq群")]),t._v("并向群主反馈。\n          ")])])])],1)},[],!1,u,"data-v-2634fccf",null);e.default=h.exports}});
//# sourceMappingURL=35.fcff9d831a459e3f9809.js.map