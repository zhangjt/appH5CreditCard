import fly from 'flyio'
import qs from 'qs'

import UUID from './uuid'

import { Toast } from 'mint-ui'
import wanka from './wanka'
/** flyio 配置 */
fly.config.headers = { 'content-type': 'application/json' }
fly.config.timeout = 10000
let h = location.hostname
if (h === 'm.caimiaowanka.com' || h === 'www.caimiaowanka.com' || h === 'h5.caimiaowanka.com') {
  // fly.config.baseURL = 'https://prod.wdjzt88.com'
  fly.config.baseURL = 'https://carta.caimiaowanka.com'
} else {
  fly.config.baseURL = 'http://carta.caimiaoxingqiu.com'
  // fly.config.baseURL = 'http://dev.wdjzt88.com'
}

/**
 * 后端接口方法
 * status
 */

class Http {
  constructor () {
    this.msgSendContent = {
      'body': {
        'content': {},
        'head': {
          'OSVersion': 'A7.1.1',
          'appVersion': '10.0.6',
          'channel': 'sqtes',
          'clientModel': 'OPPO R11s',
          'device_type': 'Android',
          'packageName': 'com.caimiao.wanka',
          'uuid': this.getUUId()
        }
      },
      // 这里的key是session_id
      'key': localStorage.getItem('session_id')
      // 'key': localStorage.getItem('session_id') || 'placeholder'
    }
  }
  getUUId () {
    var uid = localStorage.getItem('uuid')
    if (uid) {
      return uid
    } else {
      var random = UUID.random()
      localStorage.setItem('uuid', random)
      return random
    }
  }

  /** 请求错误处理 */
  errorHandle (err) {
    return err
  }

  /** 获取短信验证码 */
  getMsgCode (phone, code) {
    return this.postData('/app/captcha', { phone: phone, type: 3, imgcode: code })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }

  /** 获取图形验证码 */
  getImageCode (phone) {
    return this.postData('/app/imagecode/index2', { phone: phone })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }

  /** 重置密码 */
  resetPassword (param) {
    return this.postData('/app/user/V10/updatePassword', param)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }
  /** 重置密码 */
  setPassword (param) {
    return this.postData('/app/user/V10/setPassword', param)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }

  /** 登录请求 */
  toLogin (param) {
    return this.postData('/app/login', param)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }
  getUserInfo () {
    return this.postData('/app/user/info')
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }

  /** 提现记录 */
  getWithDrawRecord (params) {
    return this.postData('/app/invite/drawmoneylist', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  /** 获取提现手续费 */
  getCharge (params) {
    return this.postData('/app/invite/getServiceCharge', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  /** 提现 */
  doWithDraw (params) {
    return this.postData('/app/invite/drawmymoney', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  /** 提现 */
  getFee (params) {
    return this.postData('/app/invite/getfee', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  /** 获取钱包信息 */
  getUserWallet (params) {
    return this.postData('/app/invite/mymoneyNew', params)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }

  msgAllRead (readMsgType) {
    let params = {
      type: readMsgType,
      msgid: 'all'
    }
    return this.loadData('/app/msg/readmsg', params, '')
      .then((res) => {
        return res
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }

  /** 获取消息列表 */
  getMsgList (params) {
    return this.postData('/app/msg/list', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }

  // 修改昵称
  modifyNickname (params) {
    return this.postData('/app/user/exit', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  // 根据卡号 查询银行名称
  queryBankName (params) {
    return this.postData('/app/user/queryBankName', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  // 绑定银行卡
  bindBankCard (params) {
    return this.postData('/app/user/bank/', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  // 申请信用卡
  applyCreditCard (params) {
    return this.postData('/creditCardApply/save/', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }

  // 查询银行列表
  queryBankList (params) {
    return this.postData('/app/bank/getBankListByStatus/', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }
  // 我的申卡记录
  queryMyApplyList (params) {
    return this.postData('/creditCardApply/myList/', params)
      .then((res) => {
        return res
      }).catch((err) => {
        return this.errorHandle(err)
      })
  }

  postData (url, data) {
    if (data) {
      this.msgSendContent.body.content = data
      http.msgSendContent.body.head.channel = localStorage.getItem('channel') || 'sqtes'
    }
    let sendData = this.msgSendContent

    // 万卡外
    return fly.post(url, JSON.stringify(sendData), { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        if (url === '/app/login' && res && res.data && res.data.session_id) {
          localStorage.setItem('session_id', res.data.session_id)
          this.msgSendContent.key = res.data.session_id
        }
        if (res.data.body.content && res.data.body.content !== 'null') {
          return res.data.body.content
        } else {
          return res.data.body || res.data
        }
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }
  loadData (url, data, callbackName) {
    let callback = eval(callbackName)

    if (data) {
      http.msgSendContent.body.content = data
    }
    let sendData = http.msgSendContent

    if (wanka.isWanka()) {
      // 万卡app
      return wanka.loadData(url, data, callbackName)
    } else {
      // 万卡外
      return fly.post(url, JSON.stringify(sendData), { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          if (res.data.body.content && res.data.body.content !== 'null') {
            // if(callback){eval(callback+'()')}

            callback && callback(res.data.body.content)
          } else {
            callback && callback(res.data.body || res.data)
            // return res.data.body || res.data
          }
        })
        .catch((err) => {
          return http.errorHandle(err)
        })
    }
  }
  loadDataForGetData (url, data, callbackName) {
    let callback = eval(callbackName)

    if (data) {
      http.msgSendContent.body.content = data
    }
    let sendData = http.msgSendContent

    if (wanka.isWanka()) {
      // 万卡app
      return wanka.loadData(url, data, callbackName)
    } else {
      // 万卡外
      return fly.post(url, JSON.stringify(sendData), { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          // TODO 这里seesion_id 以及出错处理等都需要加
          if (res && res.data && res.data.session_id) {
            localStorage.setItem('session_id', res.data.session_id)
          }
          if (res.data && res.data !== 'null') {
            // if(callback){eval(callback+'()')}
            callback && callback(res.data)
          } else {
            callback && callback(res.data.body || res.data)
            // return res.data.body || res.data
          }
        })
        .catch((err) => {
          return http.errorHandle(err)
        })
    }
  }
  postDataWithoutCode (url, data) {
    if (data) {
      this.msgSendContent.body.content = data
    }
    let sendData = this.msgSendContent
    return fly.post(url,

      JSON.stringify(sendData), { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        return res.data.body.content
      })
      .catch((err) => {
        return this.errorHandle(err)
      })
  }
}

const http = new Http()

export default http
