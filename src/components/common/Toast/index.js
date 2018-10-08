
import { Toast } from 'mint-ui'

var toast = {
  install: (vue, options) => {
    vue.prototype.$toast = Toast
  }
}

export default toast
