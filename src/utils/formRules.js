//  手机验证规则
const validatePhone = (rule, value, callback) => {
  let reg = /^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([0125689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的电话号码'))
  } else {
    callback()
  }
}

export default {
  // isExternal: isExternal,
  phone: [{
    required: true,
    validator: validatePhone,
    trigger: 'blur',
  }],
  // 必填项
  required: [{
    required: true,
    message: '该项不能为空',
    trigger: 'blur',
  }],
}
