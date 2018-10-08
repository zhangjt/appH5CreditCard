/**
 * 表单验证方法
 */
import qs from 'qs'

const wanka = {}
//是否是万卡app
wanka.isWanka = function () {
  let u = navigator.userAgent
  let isWanka = undefined
  if (~u.indexOf('WDBrowser')) {
    isWanka = true
  }
  return isWanka
}
// window.loadDataCallBack = wanka.loadDataCallBack;
// wanka.loadDataCallBack=function(data){
//   return data
// };
// wanka.callBack=function(){
//   var p = new Promise(wanka.loadDataCallBack);
//   return p;
// }
wanka.loadData = function (url, data, callbackName) {
  let json = {
    reqData: data,
    url: url,
    callback: callbackName
  }
  if (this.isAndroid()) {
    var reqData = JSON.stringify(json.reqData)
    window.InviteJs.loadData(json.url, reqData, json.callback)
  } else if (this.isiOS()) {
    this.setupWebViewJavascriptBridge(function (bridge) {
      // alert(JSON.stringify(json))
      bridge.callHandler('LOAD_DATA', json)
    })
  }
  // this.callBack().then(function(data){
  //     return data
  //     //后面可以用传过来的数据做些其他操作
  //     //......
  // });

}
wanka.setupWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}
wanka.isAndroid = function () {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Windows') > -1 //android终端
  return isAndroid
}
wanka.isiOS = function () {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.match(/Mac OS X/) //ios终端
  return isiOS
}
//app内页跳转
wanka.GetUserPhone = function () {

  if (this.isAndroid()) {
    return window.InviteJs.getUserPhone()
  } else if (this.isiOS()) {
    this.setupWebViewJavascriptBridge(function (bridge) {
      return bridge.callHandler('GET_USER_PHONE')
    })
  }
}

wanka.GetUserID = function () {

  if (this.isAndroid()) {
    return window.InviteJs.getUserUid()
  } else if (this.isiOS()) {
    this.setupWebViewJavascriptBridge(function (bridge) {
      return bridge.callHandler('GET_USER_UID')
    })
  }
}

wanka.validaePhoneNumber = function (value) {
  if (!value || value == '') {
    return '请输入手机号码'
  }
  var phonrReg = /^1\d{10}$/
  if (!phonrReg.test(value)) {
    return '请输入正确的手机号码'
  } else {
    return ''
  }
}

wanka.ToAppPage = function (url, data, toApp, fromOutSide) {
  
  if (url == '') {
    return
  }

  if (!toApp) {
    //跳转app的h5页面;
    var newUrl = url
    var d = data ? qs.stringify(data) : ''

    // var d = data ? JSON.stringify(data) : '';
    if (d.length > 0) {
      d = encodeURIComponent(d)
      newUrl = url + '?' + d
    }
    newUrl = encodeURIComponent(newUrl)
    let appBaseUrl = '/common/webView/&url='
    url = appBaseUrl + newUrl

  } else if (toApp == true) {
    //跳转到app内页的原生页面, data作为json字符串 由query参数传递
    let d = data ? JSON.stringify(data) : ''
    var newUrl = url

    url = newUrl
  }

  var json = {
    url: url
  }
  if (this.isiOS()) {
    // json.url = 'routecommon:/' + url;   //外部启动app
    if (fromOutSide && fromOutSide == 1) {
      json.url = 'wankarouteglobal:/' + url; //从App外跳转到App内
    } else {
      json.url = 'wankaroutecommon:/' + url; //App内部页面跳转
    }
    window.webkit.messageHandlers.pushUrl.postMessage(json)
  }
  if (this.isAndroid()) {
    json = JSON.stringify(json)
    window.InviteJs.pushUrl(json)
  }
}

// app内页跳转到广告详情页

wanka.ToAppADWebPage = function (url, data) {
  let routerUrl = '/news/newsDetail'
  var targetUrl = routerUrl
  data = data || {}
  url = url || ''
  data.title = data.title || ''
  data.intro = data.intro || data.title || ''
  data.img = data.img || ''
  targetUrl = routerUrl + '/&url=' + encodeURIComponent(url)
  targetUrl = targetUrl + '/&title=' + data.title
  targetUrl = targetUrl + '/&intro=' + data.intro
  targetUrl = targetUrl + '/&img=' + data.img

  this.ToAppPage(targetUrl, '', true)
}

// app内跳转到浏览器
wanka.ToBrowserFromAppPage = function (url, data) {
  let appBaseUrl = '/common/browser/&url='
  url = appBaseUrl + encodeURIComponent(url)
  this.ToAppPage(url, data, true)
}

wanka.CopyAndShowWechat = function (key) {
  if (wanka.isAndroid()) {
    window.InviteJs.copytoweixin(key)
  } else if (wanka.isiOS()) {
    this.setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('WEIXINJS_FOLLOW', {key: key})
    })
  }
}

wanka.CallPhone = function (content) {
  window.InviteJs.callPhoneFromJs(content)
}

wanka.checkUpdate = function () {
  window.InviteJs.checkUpdate()
}

export default wanka
