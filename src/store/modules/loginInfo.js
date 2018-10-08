const state = {
  captchaShow: false,
  sendShow: true,
  btnDisable: false,
  loginState: localStorage.getItem('session_id') != null
}
const mutations = {
  SETLOGINVALUE (state, payload) {
    state.captchaShow = payload.captchaShow
    state.sendShow = payload.sendShow
    state.btnDisable = payload.btnDisable
  },

  SETCAPTCHASHOW (state, payload) {
    state.captchaShow = payload.captchaShow
  },
  SETSENDSHOW (state, payload) {
    state.sendShow = payload.sendShow
  },
  SETBTNDISABLE (state, payload) {
    state.btnDisable = payload.btnDisable
  },
  SETLOGINSTATE (state, payload) {
    state.loginState = payload.loginState
  }
}
const actions = {

}

export default {
  state,
  mutations,
  actions
}
