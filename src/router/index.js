import Vue from 'vue'
import Router from 'vue-router'

import LoansMarket from '@/pages/index/LoansMarket'
import MyCreditCard from '@/pages/index/MyCreditCard'
import MyCreditCardRecord from '@/pages/index/MyCreditCardRecord'

const index = r => require.ensure([], () => r(require('@/pages/Index')), 'index')
const login = r => require.ensure([], () => r(require('@/pages/login/Login')), 'login')
const codeSet = r => require.ensure([], () => r(require('@/pages/login/CodeSet')), 'codeSet')
const msgDetail = r => require.ensure([], () => r(require('@/pages/message/MsgDetail')), 'msgDetail')
const mineMsgList = r => require.ensure([], () => r(require('@/pages/message/MineMsgList')), 'mineMsgList')
const forgetPassword = r => require.ensure([], () => r(require('@/pages/login/ForgetPassword')), 'forgetPassword')
const loginPwd = r => require.ensure([], () => r(require('@/pages/login/LoginPwd')), 'loginPwd')
const agreement = r => require.ensure([], () => r(require('@/pages/login/LoginAgreement')), 'agreement')

const CreditCardIndex = r => require.ensure([], () => r(require('@/pages/index/CreditCardIndex')), 'CreditCardIndex')
const BankInfo = r => require.ensure([], () => r(require('@/pages/index/BankInfo')), 'bankInfo')
const loanHome = r => require.ensure([], () => r(require('@/pages/index/loanHome')), 'loanHome')
const CreditCardInfo = r => require.ensure([], () => r(require('@/pages/index/CreditCardInfo')), 'creditCardInfo')
const CreditCardCenter = r => require.ensure([], () => r(require('@/pages/index/CreditCardCenter')), 'CreditCardCenter')

const MyNetLoanRecord = r => require.ensure([], () => r(require('@/pages/index/MyNetLoanRecord')), 'MyNetLoanRecord')
const MyLoanRebate = r => require.ensure([], () => r(require('@/pages/index/MyLoanRebate')), 'myLoanRebate')
const MyLoanRecord = r => require.ensure([], () => r(require('@/pages/index/MyLoanRecord')), 'myLoanRecord')
const UserAgreement = r => require.ensure([], () => r(require('@/pages/index/UserAgreement')), 'userAgreement')
const LoanStateDetail = r => require.ensure([], () => r(require('@/pages/index/LoanStateDetail')), 'LoanStateDetail')
const CreditCardProgressPage = r => require.ensure([], () => r(require('@/pages/index/CreditCardProgressPage')), 'CreditCardProgressPage')
const fineNews = r => require.ensure([], () => r(require('@/pages/hot/FineNews')), 'fineNews')
const fineNewsDetail = r => require.ensure([], () => r(require('@/pages/hot/fineNewsDetail')), 'fineNewsDetail')

const mine = r => require.ensure([], () => r(require('@/pages/mine/Mine')), 'mine')
const mineSetting = r => require.ensure([], () => r(require('@/pages/mine/MineSetting')), 'mineSetting')
const modifyNickname = r => require.ensure([], () => r(require('@/pages/mine/ModifyNickname')), 'modifyNickname')
const addCard = r => require.ensure([], () => r(require('@/pages/bankcard/AddCard')), 'addCard')
const bankcards = r => require.ensure([], () => r(require('@/pages/bankcard/MyBankCards')), 'bankcards')
const mineAboutMe = r => require.ensure([], () => r(require('@/pages/mine/AboutMe')), 'mineAboutMe')
const mineBankCardList = r => require.ensure([], () => r(require('@/pages/mine/BankList')), 'mineBankCardList')
const mineApplyCard = r => require.ensure([], () => r(require('@/pages/mine/ApplyCard')), 'mineApplyCard')
const mineApplyRecord = r => require.ensure([], () => r(require('@/pages/mine/MyApplyRecord')), 'mineApplyRecord')

const mineWallet = r => require.ensure([], () => r(require('@/pages/mine/MineWallet')), 'mineWallet')
const mineRebate = r => require.ensure([], () => r(require('@/pages/mine/MineRebate')), 'mineRebate')
const mineRebateRecord = r => require.ensure([], () => r(require('@/pages/mine/MineRebateRecord')), 'mineRebateRecord')

const withDraw = r => require.ensure([], () => r(require('@/pages/withdraw/WithDraw')), 'withDraw')
const withDrawRecord = r => require.ensure([], () => r(require('@/pages/withdraw/WithDrawRecord')), 'withDrawRecord')
const msgCenter = r => require.ensure([], () => r(require('@/pages/message/MsgCenter')), 'msgCenter')
const mineRecord = r => require.ensure([], () => r(require('@/pages/mineRecord/MineRecord')), 'mineRecord')
const ccRegisterRecord = r => require.ensure([], () => r(require('@/pages/mineRecord/CCRegisterRecord.vue')), 'ccRegisterRecord')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: CreditCardIndex,
      meta: {
        requireAuth: false,
        keepAlive: true,
      }
    },
    {
      path: '/hot/fineNews',
      name: 'fineNews',
      component: fineNews,
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/hot/fineNewsDetail',
      name: 'fineNewsDetail',
      components: {
        subpage: fineNewsDetail
      },
      meta: {
        subpage: true,
      }
    },
    {
      path: '/user/forgetPassword',
      name: 'forgetPassword',
      components: {
        subpage: forgetPassword
      },
      meta: {
        subpage: true
      }
    },
    {
      name: '密码设置',
      path: '/user/codeSet',
      meta: {
        requireAuth: true,
        name: '密码设置'
      },
      component: codeSet
    },
    {
      path: '/user/login',
      name: 'login',
      components: {
        subpage: login
      },
      meta: {
        subpage: true
      }
    },
    {
      path: '/user/loginPwd',
      name: 'loginPwd',
      components: {
        subpage: loginPwd
      },
      meta: {
        subpage: true
      }
    },
    {
      path: '/creditCardCenter',
      name: 'CreditCardCenter',
      meta: {
        title: '信用卡中心',
        menu: true,      //需要底部tab
        keepAlive: true // 不需要缓存
      },
      component: CreditCardCenter
    },
    {
      path: '/CreditCardIndex',
      name: 'CreditCardIndex',
      meta: {
        title: '信用卡首页',
      },
      component: CreditCardIndex
    },
    {
      path: '/bankInfo',
      name: 'BankInfo',
      meta: {
        title: '银行详情',
        keepAlive: false // 不需要缓存
      },
      component: BankInfo,
      meta: {
        menu: false
      }
    },
    {
      path: '/loanHome',
      name: 'loanHome',
      meta: {
        title: '贷款首页',
        keepAlive: false // 不需要缓存
      },
      component: loanHome
    },

    {
      path: '/loansMarket',
      name: 'LoansMarket',
      component: LoansMarket
    },
    {
      path: '/myCreditCard',
      name: 'MyCreditCard',
      component: MyCreditCard
    },
    {
      path: '/creditCardInfo',
      name: 'creditCardInfo',
      component: CreditCardInfo,
      meta: {
        menu: false
      }
    },
    {
      path: '/myCreditCardRecord',
      name: 'MyCreditCardRecord',
      component: MyCreditCardRecord
    },
    {
      path: '/myNetLoanRecord',
      name: 'MyNetLoanRecord',
      component: MyNetLoanRecord
    },
    {
      path: '/myLoanRebate',
      name: 'MyLoanRebate',
      component: MyLoanRebate
    },

    {
      path: '/myLoanRecord',
      name: 'MyLoanRecord',
      component: MyLoanRecord
    },
    {
      path: '/userAgreement',
      name: 'UserAgreement',
      component: UserAgreement
    },
    {
      path: '/loanStateDetail',
      name: 'loanStateDetail',
      component: LoanStateDetail
    },
    {
      path: '/creditCardProgressPage',
      name: 'creditCardProgressPage',
      component: CreditCardProgressPage
    },
    {
      path: '/user/agreement',
      name: 'agreement',
      component: agreement,
      meta: {
        menu: false
      }
    },
    {
      path: '/msgDetail',
      name: 'msgDetail',
      component: msgDetail
      ,
      meta: {
        menu: false
      }
    },
    {
      path: '/mine/mineMsgList',
      name: 'mineMsgList',
      component:
      mineMsgList,
      meta: {
        menu: false,
        keepAlive: true,
      }
    },
    {
      path: '/mineSetting/addCard',
      name: 'addCard',
      component: addCard,
      meta: {
        menu: false,
      }
    },
    {
      path: '/mineSetting/bankcards',
      name: 'bankcards',
      components: {
        subpage: bankcards
      },
      meta: {
        subpage: true,
        name: '银行卡',
        title: '银行卡'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        requireAuth: true,
        name: '财喵万卡'
      },
      component: mine
    },
    {
      path: '/mineSetting',
      name: '个人设置',
      components: {
        subpage: mineSetting
      },
      meta: {
        subpage: true,
        requireAuth: true,
        name: '个人设置',
        title: '个人设置'
      }
    },
    {
      path: '/mineSetting/modifyNickname',
      name: '修改昵称',
      components: {
        subpage: modifyNickname
      },
      meta: {
        subpage: true,
        requireAuth: true,
      }
    },
    {
      path: '/mine/mineWallet',
      name: '我的钱包',
      component: mineWallet,
      meta: {
        menu: false
      }
    },
    {
      path: '/mine/mineRebate',
      name: '累计返利',
      components: {
        subpage: mineRebate
      },
      meta: {
        subpage: true,
        requireAuth: true,
        name: '累计返利'
      }
    },
    {
      path: '/mine/mineRebateRecord',
      name: '登记记录',
      components: {
        subpage: mineRebateRecord
      },
      meta: {
        subpage: true,
        requireAuth: true,
        name: '登记记录'
      }
    },
    {
      path: '/mine/withDraw',
      name: '申请提现',
      component: withDraw
      ,
      meta: {
        menu: false
      }
    },
    {
      path: '/mine/withDraw/withDrawRecord',
      name: '提现记录',
      components: {
        subpage: withDrawRecord
      },
      meta: {
        subpage: true,
        requireAuth: true,
        name: '提现记录'
      }
    },
    {
      path: '/mine/aboutUs',
      name: '关于我们',
      component: mineAboutMe,
      meta: {
        menu: false
      }
    }, {
      path: '/mine/applyCard/mineBankCardList',
      name: '选择银行',
      component: mineBankCardList,
      meta: {
        menu: false,
        name: '选择银行'
      }
    },
    {
      path: '/mine/msgCenter',
      name: '消息',
      component: msgCenter
      ,
      meta: {
        menu: false,
        requireAuth: true,
      }
    },
    {
      path: '/mine/applyCard',
      name: '申请提卡',
      component: mineApplyCard,
      meta: {
        menu: false,
      }
    }, {
      path: '/mine/applyCard/mineApplyRecord',
      name: '我的提单',
      components: {
        subpage: mineApplyRecord
      },
      meta: {
        subpage: true,
        requireAuth: true,
        name: '我的提单'
      }
    },
    {
      path: '/mine/mineRecord',
      name: '返利记录',
      component: mineRecord,
      meta: {
        menu: false,
        keepAlive: true,
        requireAuth: true,
      }
    },

    {
      path: '/mine/mineRecord/ccRegisterRecord',
      name: '登记记录',
      component: ccRegisterRecord,
      meta: {
        menu: false,
        requireAuth: true,
        title: '登记记录'
      }
    },
  ]
})
