/* 函数工具库
=================================================== */

class Utils {
  /**
   * @description 格式化时间戳
   * @param {any} timestamp js的时间戳
   * @param {any} format 格式
   * @param {any} fill 个位数是否填充0
   * @returns
   * @memberof Utils
   */
  formatTime(timestamp, format, fillDate = true, fillTime = true) {
    var time = new Date(timestamp)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hour = time.getHours()
    var minute = time.getMinutes()
    var second = time.getSeconds()
    if (month < 10 && fillDate) month = '0' + month
    if (date < 10 && fillDate) date = '0' + date
    if (hour < 10 && fillTime) hour = '0' + hour
    if (minute < 10 && fillTime) minute = '0' + minute
    if (second < 10 && fillTime) second = '0' + second
    format = format.replace('YY', year + '')
    format = format.replace('MM', month + '')
    format = format.replace('DD', date + '')
    format = format.replace('HH', hour + '')
    format = format.replace('mm', minute + '')
    format = format.replace('ss', second + '')
    return format
  }
  /**
   * @description 获取url参数
   * @param {any} name url参数
   * @returns
   * @memberof Utils
   */
  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  }
  removeUrlParam(url, name) {
    if (url.indexOf(name) === -1) return url
    var urlArr = url.split('?')
    var urlBase = urlArr[0]
    var urlSearch = urlArr[1].split('#')[0]
    var urlHash = urlArr[1].split('#')[1]
    var urlParams = urlSearch.split('&')
    var index = -1
    for (var i = 0; i < urlParams.length; i++) {
      var paired = urlParams[i].split('=')
      if (paired[0] === name) {
        index = i
        break
      }
    }
    if (index === -1) {
      return url
    } else {
      urlParams.splice(index, 1)
      return urlBase + '?' + urlParams.join('&') + (urlHash ? ('#' + urlHash) : '')
    }
  }

  // 循环每n次归类
  recalObject(json, n) {

    if (!json) { return }
    let l = json // 标准json对象
    // 清除空对象
    for (let j = 0; j < l.length; j++) {
      if (JSON.stringify(l[j]) === '{}') {
        l.splice(j, 1)
        j--
      }
    }
    let big = []
    let num = Math.ceil(l.length / n)
    if (l.length >= 1) {
      for (let x = 1; x < (num + 1); x++) {
        let small = []
        for (let i = n * (x - 1); i < (n * x); i++) {
          small.push(l[i])
        }

        big.push({
          'list': small
        })
      }
    }
    return big
  }

  getQuery(params) {
    let str = location.search
    let query = str.split(params + '=').slice(-1).join('')
    query = decodeURIComponent(query)
    return query
  }

  // 判断iPhoneX
  isIphoneX() {
    return /iphonex/gi.test(navigator.userAgent)
  }

  formalTitle(value) {
    document.title = value
  }

  // 获取url参数
  getUrlParam(e, url) {
    var t = new RegExp('(^|&)' + e + '=([^&]*)(&|$)')
    var r = ''
    if (url) {
      r = url.substr(1).match(t)
    } else {
      r = window.location.search.substr(1).match(t)
    }
    return r != null ? encodeURIComponent(r[2]) : null
  }
}

export default new Utils()
