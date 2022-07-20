import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth.js'
import router from '@/router'
const TimeOut = 3600
// import store from '@/store'
// import router from '@/router'
const service = axios.create({
  // npm run dev => baseURL => env.development => vue.config.js 反向代理
  baseURL: process.env.VUE_APP_BASE_API // '/api'
  // timeout: 5000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 是请求的配置信息
  if (store.getters.token) {
    // 只有在有token的情况下,才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果为true 表示token 过期 退出登录 清空数据 跳转到登录页面
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    }
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return config // 必须要返回的
}, error => {
  return Promise.reject(error)
})
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
  if (error.response && error.response.data && error.response.code === 10002) {
    // 如果返回来的错误等于10002是,表示token失效, 退出登录
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    // 提示错误信息
    Message.error(error.message)
  }
  // 返回错误  直接进入catch
  return Promise.reject(error)
})

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
