webpackJsonp([15],{LxKC:function(t,e){},SjTx:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"GoBack",props:{url:{type:String},title:{title:String}},data:function(){return{isShow:!1}},components:{},created:function(){this.isShowTop()},methods:{turnTo:function(){this.url?this.$router.push(this.url):this.$router.back(),this.$emit("goBackWith")},isShowTop:function(){this.$wanka.isWanka()||(this.isShow=!0)},showPage:function(){this.$router.push({path:"/mine/applyCard/mineApplyRecord"})}},watch:{},mounted:function(){}},s=i("XyMi");var n=function(t){i("rqR9")},o=Object(s.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return this.isShow?e("mt-header",{staticClass:"boder-header",attrs:{title:this.title}},[e("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:this.turnTo},slot:"left"}),this._v(" "),e("mt-button",{attrs:{slot:"right"},on:{click:this.showPage},slot:"right"},[this._v("我的提单")])],1):this._e()},[],!1,n,null,null).exports,r=i("Au9i"),u=null,c={components:{GoBack:o,DatetimePicker:r.DatetimePicker},props:[],data:function(){return{title:"申请提卡",pickShow:!0,bankName:sessionStorage.getItem("bankname")||"",bankId:sessionStorage.getItem("bankId")||"",pickerValue:sessionStorage.getItem("pickerValue")||"",trackingNumber:sessionStorage.getItem("trackingNumber")||"",userName:sessionStorage.getItem("username")||"",phone:sessionStorage.getItem("phone")||""}},created:function(){u=this},watch:{userName:function(t,e){sessionStorage.setItem("username",t)},phone:function(t,e){sessionStorage.setItem("phone",t)},trackingNumber:function(t,e){sessionStorage.setItem("trackingNumber",t)},pickerValue:function(t,e){sessionStorage.setItem("pickerValue",t)}},methods:{openPicker:function(){this.pickShow=!0,u.$refs.picker.open()},showBankCardList:function(){this.$router.push({path:"/mine/applyCard/mineBankCardList"})},submitApply:function(){var t=this;if(this.valideInput()){var e={userName:this.userName,applyDate:this.pickerValue,bankId:this.bankId,bankName:this.bankName||"",trackingNumber:this.trackingNumber,phone:this.phone};console.log(e),this.$http.applyCreditCard(e).then(function(e){e&&(console.log(e),t.$toast("提交成功"),t.removeData(),t.$router.push({path:"/mine"}))}).catch(function(t){})}},valideInput:function(){if(!this.bankId)return this.$toast("银行不能为空"),!1;if(!this.userName)return this.$toast("姓名不能为空"),!1;if(!this.pickerValue)return this.$toast("日期不能为空"),!1;if(!this.phone||this.phone.length<11)return this.$toast("请输入有效手机号码"),!1;if(console.log(this.trackingNumber),!this.trackingNumber)return this.$toast("单号不能为空"),!1;return null!=this.trackingNumber.trim().match(/^\w+$/)||(this.$toast("单号不能包含中文"),!1)},handleConfirm:function(t){this.pickShow=!1;var e=new Date(t);this.pickerValue=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},handleCancel:function(){this.pickShow=!1},remove:function(){"INPUT"===document.activeElement.tagName&&document.activeElement.scrollIntoView({behavior:"smooth"})},removeData:function(){sessionStorage.setItem("username",""),sessionStorage.setItem("phone",""),sessionStorage.setItem("trackingNumber",""),sessionStorage.setItem("pickerValue",""),sessionStorage.setItem("bankname",""),sessionStorage.setItem("bankId","")}}};var l=function(t){i("LxKC")},m=Object(s.a)(c,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}],staticClass:"apply-card-container"},[i("go-back",{attrs:{title:"申请提卡",url:"/mine"},on:{goBackWith:t.removeData}}),t._v(" "),i("div",{staticClass:"item-container"},[i("div",{on:{click:t.remove}},[i("div",{staticClass:"item-style",on:{click:t.showBankCardList}},[i("div",[t._v("*银　　行")]),t._v(" "),i("div",{staticClass:"bank-input-style"},[t._v("\n          "+t._s(t.bankName)+"\n        ")])]),t._v(" "),i("div",{staticClass:"item-input-style"},[i("div",[t._v("*姓　　名")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"input-style",attrs:{placeholder:"请输入姓名",maxlength:"5",type:"text",onkeyup:"this.value=this.value.replace(/[^\\u4e00-\\u9fa5]/g,'')"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"item-input-style",on:{click:t.openPicker}},[i("div",[t._v("*申卡日期")]),t._v(" "),i("div",{staticClass:"input-style"},[t._v(t._s(t.pickerValue))])]),t._v(" "),i("div",{staticClass:"item-input-style"},[i("div",[t._v("*电话号码")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"input-style",attrs:{placeholder:"请输入电话号码",maxlength:"11",onkeyup:"this.value=this.value.replace(/\\D/g,'')",onafterpaste:"this.value=this.value.replace(/\\D/g,'')"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"item-input-style"},[i("div",[t._v("*快递单号")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.trackingNumber,expression:"trackingNumber"}],staticClass:"input-style",attrs:{placeholder:"请输入快递单号",onkeyup:"value=value.replace(/[^\\w\\.\\/]/ig,'')"},domProps:{value:t.trackingNumber},on:{input:function(e){e.target.composing||(t.trackingNumber=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"submit-btn-style",on:{click:t.submitApply}},[t._v("提交")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.pickShow,expression:"pickShow"}],staticClass:"pickWrap"},[i("mt-datetime-picker",{ref:"picker",attrs:{type:"date","year-format":"{value} 年","month-format":"{value} 月","date-format":"{value} 日"},on:{confirm:t.handleConfirm,cancel:t.handleCancel}})],1)],1)},[],!1,l,"data-v-7e165d62",null);e.default=m.exports},rqR9:function(t,e){}});
//# sourceMappingURL=15.2d08a2daed2c2996d9cb.js.map