import http from '../../modules/http'

const state = {
  loginThirdType: null,
  thirdType: null,
  tempToken: null,
  uid: '',
  nickname: '',
  gradeNickname: '',
  headImg: '',
  rebateFee: '',
  balanceFee: '',
  walletValue: '',
  walletList: [],
  walletTotalPage: '',
  minFeeMsg: '',
  minFee: null,
  phone: '',
  passwordSet: '',
  cardInfo: {
    cardInfo: {
      bankIcon: '',
      bankName: '',
      cardType: '',
      account: ''
    },
    isBind: 0
  }
}
const mutations = {
  SET_LOGIN_THIRD_TYPE (state, payload) {
    state.loginThirdType = payload.loginThirdType
  },
  SET_AUTH_TYPE (state, payload) {
    state.thirdType = payload.thirdType
    state.tempToken = payload.tempToken
  },
  getMsgUnread (state, payload) {
    state.unread = payload.unread
  },
  modifyNickName (state, newValue) {
    state.nickname = newValue
  },
  getUserInfo (state, payload) {
    state.uid = payload.res.uid
    state.nickname = payload.res.nickname
    state.headImg = payload.res.head_img
    state.rebateFee = payload.res.rebateFee
    state.balanceFee = payload.res.balance
    state.phone = payload.res.phone
    state.passwordSet = payload.res.passwordSet
    state.cardInfo = payload.res.bankCardInfo
  },
  getWalletValue (state, payload) {
    state.walletValue = payload.walletValue
    state.walletList = payload.walletList
    state.walletTotalPage = payload.walletTotalPage
    state.minFeeMsg = payload.minFeeMsg
    state.minFee = payload.minFee
  }
}

const actions = {
  async getUserInfo ({ commit }, payload) {
    const res = await http.getUserInfo()
    if (res) {
      commit({
        type: 'getUserInfo',
        res: res
      })
    }
  },
  async getWalletValue ({ commit }, payload) {
    let params = {
      page: payload.currentPage,
      limit: payload.limit
    }
    const res = await http.getUserWallet(params)
    if (res.code === 0) {
      commit({
        type: 'getWalletValue',
        walletValue: res.result.balance.toFixed(2),
        walletList: res.result.list,
        walletTotalPage: res.result.count,
        minFeeMsg: res.result.minFeeMsg,
        minFee: res.result.minFee
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
