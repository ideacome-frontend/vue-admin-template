import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 将post请求参数中的值为 空字符串与null的参数去掉
    // if (config.method == 'post' && config.data) {
    //   Object.keys(config.data).forEach(key => {
    //     if (config.data[key] === '' || config.data[key] === null) {
    //       delete config.data[key]
    //     }
    //   });
    // }
    // 请求头增加token参数
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
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
    const res = response.data

    // if the custom code is not 10000, it is judged as an error.
    // 9999 => realVedio params videoOperate = 4
    if (res.code !== 10000) {
      // 50001: Illegal token
      if (res.code === 50001) {
        // to re-login
        MessageBox.confirm('你已经登出，你可以点击“取消”停留在这个页面或者“重新登录”', '登出确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await store.dispatch('user/resetToken')
          await store.dispatch('user/changeRoles')
          location.reload()
        })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
