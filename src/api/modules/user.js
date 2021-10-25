import axios from '@/api/index'
// import qs from 'qs'

// 登录
export function login(data = {}) {
  return axios.request({
    method: 'POST',
    url: '/user/login',
    data: data,
  })
}