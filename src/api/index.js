import axios from 'axios'
import {
  // MessageBox,
  Message,
  Loading
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
// let baseUrlList = ['http', 'https']
console.log(window.location.origin);
console.log(process.env.VUE_APP_BASE_API);
// let BaseUrl = baseUrlList.includes(process.env.VUE_APP_BASE_API) ? '' : process.env.VUE_APP_BASE_API
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: window.location.origin,
  timeout: 30000,
  withCredentials: true,
  post: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
  }
})
let loadingInstance = null
// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config);
    if (config.method != 'get') {
      loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    if (getToken('token')) {
      config.headers['Authorization'] = getToken('token')
    }
    // console.log(config);
    // console.log(config.status);
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    error.message = '请求超时!!'
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // const res = response.data
    // console.log(res);
    if (loadingInstance) {
      setTimeout(() => {
        loadingInstance.close()
      }, 300)
    }

    // if the custom code is not 20000, it is judged as an error.
    if (response.data.code === 201 && response.data.data === 'unauthorized') {
      return {
        code: 1,
        data: false,
        msg: '用户不存在',
      }
    } else if (
      response.data.code === 201 &&
      response.data.data === 'invalid_exception'
    ) {
      return {
        code: 1,
        data: false,
        msg: '用户名或密码错误',
      }
    } else if ('' + response.status === '401') {
      store.commit('SET_ROLE')
      // removeToken('admin_token')
      // router.push({
      //   name: 'login',
      //   params: {
      //     logOUt: true,
      //   },
      // })
      return {
        code: 1,
        data: false,
        msg: '请先登录',
      }
    } else if ('' + response.status === '403') {
      return Message.error('资源不存在')
    } else if ('' + response.status === '404') {
      return Message.error('资源不存在')
    } else if ('' + response.status === '500') {
      return Message.error('服务器或者接口参数错误')
    } else if ('' + response.status === '503') {
      return Message.error('服务器错误')
    } else if ('' + response.status === '200') {
      return response.data
    } else {
      return Message.error('网络错误')
    }
  },
  error => {
    // console.log(error);
    // console.log(error.response);
    // console.log(loadingInstance);
    // loadingInstance.close()
    if (loadingInstance) {
      // setTimeout(() => {
      loadingInstance.close()
      // }, 300)
    }
    // const err = error.response
    // console.log(err);
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '未授权，请重新登录(401)'
          break
        case 403:
          error.message = '权限不足，拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    } else {
      error.message = '连接服务器失败!!!'
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
