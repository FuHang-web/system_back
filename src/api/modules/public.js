import axios from '@/api/index'

// 获取验证码
export function getCaptcha(data = {}) {
  return axios.request({
    method: 'GET',
    url: '/captcha/getCode',
    params: data,
  })
}

// 校验验证码
export function checkCaptcha(data = {}) {
  return axios.request({
    method: 'POST',
    url: '/captcha/checkCode',
    data,
  })
}