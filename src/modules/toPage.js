;
import Vue from 'vue'
import router from '@/router'
import wanka from './wanka'
var vm = new Vue({ router })
const toPage = {}

toPage.toPage=function(url,data,toApp){
	if (wanka.isWanka()) {
		wanka.ToAppPage(url, data, toApp);
	}else{
		vm.$router.push({path:url,query:data});
	}
}

//app内页跳转
//fromOutSide 是否从App外部跳转进页面
toPage.ToAppPage = function (url, data, toAppPage, fromOutSide) {
  if (url == '') {
    return;
  }

  if (!toAppPage) {
    //跳转app的h5页面;
    var newUrl = url
    var d = data ? JSON.stringify(data) : '';
    if (d.length > 0) {
      d = encodeURIComponent(d);
      newUrl = url + '?query=' + d;
    }
    newUrl = encodeURIComponent(newUrl);
    let appBaseUrl = '/common/webView/&url=';
    url = appBaseUrl + newUrl;

  } else if (toAppPage == true) {
    //跳转到app内页的原生页面, data作为json字符串 由query参数传递
    let d = data ? JSON.stringify(data) : '';
    var newUrl = url
    if (d.length > 0) {
      newUrl = url + '?query=' + d;
    }
    url = newUrl;
  }

  var json = {
    url: url
  };
  if (wanka.isiOS()) {
    if (fromOutSide && fromOutSide == 1) {
      json.url = 'wankarouteglobal:/' + url; //从App外跳转到App内
    } else {
      json.url = 'wankaroutecommon:/' + url; //App内部页面跳转
    }
    
    window.webkit.messageHandlers.pushUrl.postMessage(json);
  }
  if (wanka.isAndroid()) {
    json = JSON.stringify(json);
    window.InviteJs.pushUrl(json);
  }
};


// app内页跳转到广告详情页

toPage.ToAppADWebPage = function (url, data) {
  let routerUrl = '/news/newsDetail';
  var targetUrl = routerUrl;
  data = data || {};
  url = url || "";
  data.title = data.title || "";
  data.intro = data.intro || data.title||"";
  data.img = data.img ||"";
  targetUrl = routerUrl + "/&url=" + encodeURIComponent(url);
  targetUrl = targetUrl + "/&title=" + data.title;
  targetUrl = targetUrl + "/&intro=" + data.intro;
  targetUrl = targetUrl + "/&img=" + data.img;

  this.ToAppPage(targetUrl, "", true);
};

// app内跳转到浏览器
toPage.ToBrowserFromAppPage = function (url, data) {
  let appBaseUrl = '/common/browser/&url=';
  url = appBaseUrl + encodeURIComponent(url);
  this.ToAppPage(url, data, true);
}
export default toPage
