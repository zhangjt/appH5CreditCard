webpackJsonp([10],{"0lIC":function(t,e,a){"use strict";var s={components:{},props:{htmlContent:String,imgSrc:String,desc:String},data:function(){return{}},watch:{},computed:{},methods:{},created:function(){},mounted:function(){}},i=a("XyMi");var o=function(t){a("TTjy")},n=Object(i.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.htmlContent?a("div",{staticClass:"base-info"},[a("div",[a("img",{attrs:{src:t.imgSrc}}),t._v(" "),a("span",{staticClass:"desc"},[t._v(t._s(t.desc))])]),t._v(" "),a("div",{domProps:{innerHTML:t._s(t.htmlContent)}})]):t._e()},[],!1,o,"data-v-681770d9",null);e.a=n.exports},"7Vy2":function(t,e){},TTjy:function(t,e){},nfsd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),o=a("NYxO"),n=a("0lIC"),c=a("V9e1"),r=a("N+NQ"),l=a("M4fF"),d=a.n(l),h=a("6lib"),g=a("FmvK"),p={components:{CardInfoSegment:n.a,CardInfoDialog:c.a,Toast:r.a},props:{},data:function(){return{src:"/static/images/default_card.png",title:"",checkBoxImg:"/static/images/loan_checkbox_unselected.png",agreetProtocol:!1,cardInfo:{annualFee:"",currency:"",grade:"",id:"",imgUrl:"",interestFeePeriod:"",link:"",name:"",organization:"",propaganda:"",rank:"",retateInfo:"",rightsInfo:"",status:"",tab1:"",tab2:"",tab3:"",categoryContent1:"",categoryContent2:"",categoryName1:"",categoryName2:""},apply_button_padding_bottom:0,bg_min_height:0,bg_padding_bottom:0,baseInfoDesc:"基本信息",baseInfoImgSrc:"/static/images/base_icon.png",baseInfoContent:[],baseRightsDesc:"权益",baseRightsImgSrc:"/static/images/king_icon.png",baseRebateDesc:"返利说明",baseRebateImgSrc:"/static/images/money_icon.png",dialogPhoneVisible:!1,dialogSmsVisible:!1,verifyImg:"",inputPhone:"",appUserPhone:"",toastShow:!1,toastContent:"",verifyCode:"",countDownStr:"获取短信验证码",smsBtnDisable:!1,smsCode:"",mainTitle:""}},watch:{},computed:{showMid:function(){return this.baseInfoContent.length>0||this.cardInfo.categoryName2||this.cardInfo.categoryName1}},methods:i()({loadImg:function(t){return'this.onload=null;this.src="'+t+'";'}},Object(o.b)(["getUserInfo"]),{tapCheckBox:function(){this.agreetProtocol=!this.agreetProtocol,!0===this.agreetProtocol?this.checkBoxImg="/static/images/loan_checkbox_selected.png":this.checkBoxImg="/static/images/loan_checkbox_unselected.png"},getUserPhoneCallBack:function(t){this.inputPhone=t,this.appUserPhone=t},getUserUidCallBack:function(t){t?(this.dialogPhoneVisible=!0,g.a.GetUserPhone()):g.a.ToAppPage("/home/loginActivity",null,!0)},loadIsNeedCodeCallBack:function(t){this.dialogPhoneVisible=!1,g.a.isWanka()?0===t.isSuccess?1===t.responseData.code?this.dialogSmsVisible=!0:-1===t.responseData.code?this.showToast(t.responseData.msg):this.addregNew(!1):this.showToast(t.responseData):t.respCode>=0&&t.body.statusCode>=0?1===t.body.content.code?this.dialogSmsVisible=!0:-1===t.body.content.code?this.showToast(t.body.content.msg):this.addregNew(!1):this.showToast(t.body.statusMsg)},onGetVerifyImgCallBack:function(t){g.a.isWanka()?0===t.isSuccess?t.responseData.image&&(this.verifyImg="data:image/png;base64,"+t.responseData.image):this.showToast(t.responseData):t.respCode>=0&&t.body.statusCode>=0?t.body.content.image?this.verifyImg="data:image/png;base64,"+t.body.content.image:this.showToast(t.body.content.msg):this.showToast(t.body.statusMsg)},onGetSmsCodeCallback:function(t){g.a.isWanka()?0===t.isSuccess?this.showToast("验证码已发送至手机"):this.showToast(t.responseData):t.respCode>=0&&t.body.statusCode>=0?this.showToast("验证码已发送至手机"):this.showToast(t.body.statusMsg)},addregNewCallback:function(t){this.dialogPhoneVisible=!1,this.dialogSmsVisible=!1,g.a.isWanka()?0===t.isSuccess?(0===this.cardInfo.type?g.a.ToAppPage(this.cardInfo.link,null,!1):g.a.ToBrowserFromAppPage(this.cardInfo.link),this.dialogSmsVisible=!1):this.showToast(t.responseData):t.respCode>=0&&t.body.statusCode>=0?(window.location.href=this.cardInfo.link,this.dialogSmsVisible=!1):this.showToast(t.body.statusMsg)},dismiss:function(){this.toastShow=!1},defaultClick:function(){this.dialogPhoneVisible=!1,this.dialogSmsVisible=!1},actionApply:d.a.debounce(function(){g.a.isWanka()?g.a.GetUserID():this.$store.state.loginInfo.loginState?(this.inputPhone=localStorage.getItem("caiPhone"),this.appUserPhone=localStorage.getItem("caiPhone"),this.dialogPhoneVisible=!0):this.$router.push({name:"login"})},500),phoneClick:d.a.debounce(function(){this.agreetProtocol?this.inputPhone===this.appUserPhone?this.addregNew(!1):this.checkPhone()&&this.loadDataForGetData("/app/rebate/addreg/needCode",{phone:this.inputPhone,type:"3"},"loadIsNeedCodeCallBack"):this.showToast("请先勾选返利说明")},500),checkPhone:function(){var t=g.a.validaePhoneNumber(this.inputPhone);return!t||(this.showToast(t),!1)},getVerifyImg:d.a.debounce(function(){this.checkPhone()&&this.loadDataForGetData("/app/imagecode/index2",{phone:this.inputPhone},"onGetVerifyImgCallBack")},500),getSmsCode:d.a.debounce(function(){this.smsBtnDisable||(this.checkPhone()&&this.verifyCode?(this.smsCountDown(),this.loadDataForGetData("/app/captcha",{phone:this.inputPhone,type:"3",imgcode:this.verifyCode},"onGetSmsCodeCallback")):this.showToast("请输入图形验证码"))},500),addregNew:function(t){var e={type:3,p2p_name:this.cardInfo.name,reg_account:this.inputPhone};t&&(e.code=this.smsCode),this.loadDataForGetData("/app/rebate/addregNew",e,"addregNewCallback")},smsCountDown:function(){var t=this;this.timer||(this.count=60,this.smsBtnDisable=!0,this.timer=setInterval(function(){t.count>0&&t.count<=60?(t.count--,t.countDownStr=t.count+"s"):(t.smsBtnDisable=!1,clearInterval(t.timer),t.countDownStr="重新发送",t.timer=null)},1e3))},smsClick:d.a.debounce(function(){this.checkPhone()&&(this.smsCode?this.addregNew(!0):this.showToast("请输入短信验证码"))},500),showToast:function(t){0!==t.length&&(this.toastShow=!0,this.toastContent=t)},getCardDetailList:function(){var t=window.location.href;t=decodeURIComponent(t.split("?")[1]);var e=(t=decodeURIComponent(t)).split("&")[0],a=t.split("&")[1],s=e.split("=")[1];this.mainTitle=a.split("=")[1],this.loadData("/app/creditCard/query",{id:s},"getCardListCallBack")},getCardListCallBack:function(t){t.responseData&&(t=t.responseData),this.cardInfo=t.content,h.a.formalTitle(this.cardInfo.name);var e=this.cardInfo.annualFee||{},a=this.cardInfo.interestFeePeriod||{},s=this.cardInfo.grade||{},i=this.cardInfo.organization||{},o=this.cardInfo.currency||{};e.length>0&&this.baseInfoContent.push({title:"年费",titleText:this.cardInfo.annualFee}),a.length>0&&this.baseInfoContent.push({title:"免息期限",titleText:this.cardInfo.interestFeePeriod}),s.length>0&&this.baseInfoContent.push({title:"等级",titleText:this.cardInfo.grade}),i.length>0&&this.baseInfoContent.push({title:"发卡组织",titleText:this.cardInfo.organization}),o.length>0&&this.baseInfoContent.push({title:"币种",titleText:this.cardInfo.currency})}}),created:function(){window.getCardListCallBack=this.getCardListCallBack,this.loadData=this.$http.loadData,this.loadDataForGetData=this.$http.loadDataForGetData,this.getCardDetailList(),window.getUserPhoneCallBack=this.getUserPhoneCallBack,window.getUserUidCallBack=this.getUserUidCallBack,window.loadIsNeedCodeCallBack=this.loadIsNeedCodeCallBack,window.onGetVerifyImgCallBack=this.onGetVerifyImgCallBack,window.onGetSmsCodeCallback=this.onGetSmsCodeCallback,window.addregNewCallback=this.addregNewCallback,this.cardInfo=this.$route.query,this.apply_button_padding_bottom=h.a.isIphoneX()?34:0,this.bg_padding_bottom=h.a.isIphoneX()?34:0,this.bg_min_height=h.a.isIphoneX()?812:0},mounted:function(){}},m=a("XyMi");var u=function(t){a("7Vy2")},f=Object(m.a)(p,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"title",rawName:"v-title",value:t.mainTitle,expression:"mainTitle"}],ref:"body",staticClass:"cc-info-container",style:"min-height:"+t.bg_min_height+"px;padding-bottom: "+t.bg_padding_bottom+"px;"},[t.cardInfo.imgUrl?a("img",{staticClass:"card-img",attrs:{src:t.src,onload:t.loadImg(t.cardInfo.imgUrl),onerror:t.loadImg(t.src)}}):t._e(),t._v(" "),t.cardInfo.propaganda?a("span",{staticClass:"rights"},[t._v(t._s(t.cardInfo.propaganda))]):t._e(),t._v(" "),a("div",{staticClass:"tag-class"},[t.cardInfo.tab1?a("div",{staticClass:"tag1"},[t._v(t._s(t.cardInfo.tab1))]):t._e(),t._v(" "),t.cardInfo.tab2?a("div",{staticClass:"tag2"},[t._v(t._s(t.cardInfo.tab2))]):t._e(),t._v(" "),t.cardInfo.tab3?a("div",{staticClass:"tag3"},[t._v(t._s(t.cardInfo.tab3))]):t._e()]),t._v(" "),t.showMid?a("div",{staticClass:"mid-class"},[t.baseInfoContent.length>0?a("div",{staticClass:"base-info"},[a("div",{staticClass:"base-info-top-bg"},[a("img",{attrs:{src:t.baseInfoImgSrc}}),t._v(" "),a("span",[t._v(t._s(t.baseInfoDesc))])]),t._v(" "),a("div",{staticClass:"base-info-bg"},t._l(t.baseInfoContent,function(e){return a("div",{key:e.title,staticClass:"base-info-bg-text"},[a("div",{staticClass:"base-info-bg-text-1",domProps:{innerHTML:t._s(e.title)}}),t._v(" "),a("div",{staticClass:"base-info-bg-text-2",domProps:{innerHTML:t._s(e.titleText)}})])}))]):t._e(),t._v(" "),a("card-info-segment",{attrs:{desc:t.cardInfo.categoryName1,imgSrc:t.baseRightsImgSrc,htmlContent:t.cardInfo.categoryContent1}}),t._v(" "),a("card-info-segment",{attrs:{desc:t.cardInfo.categoryName2,imgSrc:t.baseRebateImgSrc,htmlContent:t.cardInfo.categoryContent2}})],1):t._e(),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"apply-class-bg",style:"padding-bottom:"+t.apply_button_padding_bottom+"px"},[a("div",{staticClass:"apply-class",on:{click:t.actionApply}},[t._v("\n          立即申请\n      ")])]),t._v(" "),a("card-info-dialog",{attrs:{dialogTitle:"办卡预登记",dialogVisible:t.dialogPhoneVisible},on:{"update:dialogVisible":function(e){t.dialogPhoneVisible=e},defaultClick:t.defaultClick,primaryClick:t.phoneClick}},[a("div",{staticClass:"d-content-phone"},[a("span",[t._v("请输入您申请信用卡的手机号码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputPhone,expression:"inputPhone"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入手机号"},domProps:{value:t.inputPhone},on:{input:function(e){e.target.composing||(t.inputPhone=e.target.value)}}})]),t._v(" "),a("table",{staticClass:"protocol-content"},[a("p",{staticClass:"check-box-bg",on:{click:t.tapCheckBox}},[a("img",{staticClass:"check-box",attrs:{src:t.checkBoxImg}})]),t._v(" "),a("span",{staticClass:"protocol-agreement"},[t._v("返利说明:此返利仅限首次申请该行信用卡用户")])])]),t._v(" "),a("card-info-dialog",{attrs:{dialogTitle:"办卡预登记",dialogVisible:t.dialogSmsVisible},on:{"update:dialogVisible":function(e){t.dialogSmsVisible=e},defaultClick:t.defaultClick,primaryClick:t.smsClick}},[a("div",{staticClass:"d-content-sms"},[a("span",[t._v("请输入您申请信用卡的手机号码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputPhone,expression:"inputPhone"}],staticClass:"weui-input input-sms",attrs:{type:"tel",placeholder:"请输入手机号"},domProps:{value:t.inputPhone},on:{input:function(e){e.target.composing||(t.inputPhone=e.target.value)}}}),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyCode,expression:"verifyCode"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入图形验证码"},domProps:{value:t.verifyCode},on:{input:function(e){e.target.composing||(t.verifyCode=e.target.value)}}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!t.verifyImg,expression:"!verifyImg"}],staticClass:"get-verify-btn",on:{click:t.getVerifyImg}},[t._v("获取图形验证码")]),t._v(" "),a("div",{on:{click:t.getVerifyImg}},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.verifyImg,expression:"verifyImg"}],staticClass:"verify-img",attrs:{src:t.verifyImg,alt:"单击图片刷新"}})])]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.smsCode,expression:"smsCode"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入短信验证码"},domProps:{value:t.smsCode},on:{input:function(e){e.target.composing||(t.smsCode=e.target.value)}}}),t._v(" "),a("span",{staticClass:"get-verify-btn",on:{click:t.getSmsCode}},[t._v(t._s(t.countDownStr))])])])]),t._v(" "),a("toast",{attrs:{showToast:t.toastShow,toastContent:t.toastContent},on:{"update:showToast":function(e){t.toastShow=e},dismiss:t.dismiss}})],1)},[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flow-class"},[a("div",[a("img",{attrs:{src:"/static/images/process-icon.png"}}),t._v(" "),a("span",[t._v("返利流程")])]),t._v(" "),a("div",{staticClass:"flow-step"},[a("img",{attrs:{src:"/static/images/apply.png"}}),t._v(" "),a("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),a("img",{attrs:{src:"/static/images/write.png"}}),t._v(" "),a("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),a("img",{attrs:{src:"/static/images/great.png"}}),t._v(" "),a("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),a("img",{attrs:{src:"/static/images/get.png"}})]),t._v(" "),a("div",{staticClass:"flow-step-text"},[a("span",[t._v("申请卡片")]),t._v(" "),a("span",[t._v("官网填写")]),t._v(" "),a("span",[t._v("成功办卡")]),t._v(" "),a("span",[t._v("获得返利")])])])}],!1,u,"data-v-6a12971a",null);e.default=f.exports}});
//# sourceMappingURL=10.9f732abd3b5736224321.js.map