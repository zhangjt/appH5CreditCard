/**
 * 表单验证方法
 */

const valid = {}

valid.validatePhoneNumber = function (value) {
  if (!value || value === '') {
    return '请输入手机号码'
  }
  var phonrReg = /^1\d{10}$/
  if (!phonrReg.test(value)) {
    return '请输入正确的手机号码'
  } else {
    return ''
  }
}
valid.isPC = function () {
  var u = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var isPC = true;
  for (var v = 0; v < Agents.length; v++) {
    if (u.indexOf(Agents[v]) > 0) {
      isPC = false;
      break;
    }
  }
  return isPC;
};
export default valid
