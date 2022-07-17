import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import router from '@/router'
const service = axios.create({
  // npm run dev => baseURL => env.development => vue.config.js 反向代理
  baseURL: process.env.VUE_APP_BASE_API // '/api'
  // timeout: 5000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use(

)
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // 提示错误信息
  Message.error(error.message)
  // 返回错误  直接进入catch
  return Promise.reject(error)
})

export default service
