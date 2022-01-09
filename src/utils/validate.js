/**
 * 自定义校验规则validate.js
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor',"超管"]
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim().length >= 3
}

/**  规则  */
const regIsPhone = /^1[3|4|5|7|8][0-9]\d{8}$/ // 手机号
const regIsBlank = /^[^\s]*$/ // 空格
const regIsNumber = /^[1-9]\d*$/ // 非0数字
const regIsNumbers = /^\d*$/ // 数字
const regIsChinese = /^[^\u4E00-\u9FA5]*$/ // 汉字
// const regIsPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~$@$!%*#?&])[A-Za-z\d~$@$!%*#?&]{6,18}$/
const regIsPassword = /^[a-zA-Z0-9]{6,18}$/ // 密码
const resIsTemp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/ // 数字小数

// 校验方法
function test(flag, callback, text) {
  if (!flag) {
    callback(new Error(text))
  } else {
    callback()
  }
}

/**
 * 表单自定义校验
 * @param {Object} rule
 * @param {String} value
 * @param {Function} callback
 */
export const validatorForm = (rule, value, callback) => {
  const required = rule.required || false
  if (!required) {
    if (!value) {
      callback()
      return
    }
  }
  switch (rule.type) {
    case 'isPhone':
      // 校验手机号
      test(regIsPhone.test(value), callback, '手机号非法')
      break
    case 'isBlank':
      // 校验是否有空格
      test(regIsBlank.test(value), callback, '请勿输入空格')
      break
    case 'isChinese':
      // 校验是否汉字
      test(regIsChinese.test(value), callback, '请勿输入汉字')
      break
    case 'isPassword':
      // 校验密码
      test(regIsPassword.test(value), callback, '密码非法')
      break
    case 'numbers':
      test(regIsNumbers.test(value), callback, '请输入数字')
      break
    case 'number':
      // 验证零和非零开头的数字
      test(regIsNumber.test(value), callback, '请输入数字,且首位不可为0')
      break
    case 'minlength':
      // 验证长度, 如果是数字，转换成字符串求长度
      if (typeof value === 'number' || value === 'numbers') {
        value = value.toString()
      }
      const flag = !(value.length < rule.typeValue)
      test(flag, callback, `最少输入${rule.typeValue}位字符`)
      break
    case 'maxlength':
      // 验证长度, 如果是数字，转换成字符串求长度
      if (typeof value === 'number' || value === 'numbers') {
        value = value.toString()
      }
      const flag1 = !(value.length > rule.typeValue)
      test(flag1, callback, `最多输入${rule.typeValue}位字符`)
      break
    case 'isTemp':
      // 校验温度值
      test(resIsTemp.test(value), callback, '请输入数字')
      break
    default:
      break
  }
}
